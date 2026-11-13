---
layout: post
title: "Bronco CTF: Suspicious Remix 2"
tags: [writeup, ctf]
---
{% raw %}
## Challenge: Suspicious Remix 2
## Author: blunderous_wonders
## Category: Forensics
---

First, download the 2 challenge files and inspect the description:

<img width="387" height="247" alt="image" src="https://github.com/user-attachments/assets/e8028f3f-dd01-49aa-ac8f-916130298b19" />

```
They told me it's supposedly more hide-n, whatever that means. I keep seeing with a command prompt, typing the steg command...

Also they told me there's a password of this, apparently it's in this image?
```

These two hints virtually outline the entire solution strategy: `steghide` on the audio file, with the password embedded inside the image.

### Inspecting the Image File

Looking at the image initially:

<img width="500" height="409" alt="tolerate_this" src="https://github.com/user-attachments/assets/cc682e1b-f7d1-43da-a3fd-638678d7e519" />

No obvious visual anomalies, so I analyzed the color planes using `zsteg` (via Aperi'Solve at `https://www.aperisolve.com/`):

In the Red plane, hidden text appears:

<img width="500" height="409" alt="image" src="https://github.com/user-attachments/assets/7a135d52-0b91-48df-a162-6de3e07f3993" />

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/9c4d59e0-d821-4a97-9d41-b2a7bd843ec5" />

Listening to the WAV audio identifies Rick Astley's song *Together Forever*, released in the year **1988**.

### Extracting with Steghide

With the password `1988`, extract the payload from `sg_remix2.wav`:

```bash
steghide extract -sf sg_remix2.wav -p "1988"
```

Extracted file: `got_u_so_good.txt`

<img width="1037" height="183" alt="image" src="https://github.com/user-attachments/assets/299a8e0e-14d4-4bcb-af51-28c3ee82f377" />

Printing `got_u_so_good.txt` yields the flag:

```
bronco{7h3y_g07_y0u_4g4in_didn'7_7h3y?}
```

<img width="812" height="116" alt="image" src="https://github.com/user-attachments/assets/91d02cd9-1701-4205-b0a9-95489cf53d97" />

---
zeroD

{% endraw %}
