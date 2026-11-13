---
layout: post
title: "No Hack No CTF: Kira - Notes"
tags: [writeup, ctf]
---
{% raw %}
## Challenge: Kira - Notes
## Author: UmmIt Kin
## Category: Forensics
---

Downloading the challenge file yields a SQLite database file named `places.sqlite`:

<img width="1016" height="428" alt="image" src="https://github.com/user-attachments/assets/c95b28be-506f-4dce-8d7b-598d3db84146" />

Opening the file with `DB Browser for SQLite`:

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/8002d273-003d-4a16-a9fa-339349781c96" />

Under **Browse Data**, exploring the `moz_places` table reveals several noteworthy URLs:

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/3f5341cf-5ee7-447e-9571-b5a895b67665" />

Key URLs:
```
https://drive.proton.me/urls/00MNVW0SHG#do4wWWpAQ0Lw
http://151.158.224.74:31337/
https://github.com/UmmItKin/Kira-Notes
```

Navigating to `http://151.158.224.74:31337/` first:

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/9383f110-f767-4c8c-afba-c4c1982a5eb6" />

Noting information found on the site:

<img width="417" height="77" alt="image" src="https://github.com/user-attachments/assets/ea473d14-a0f2-4a6d-be09-ad42c98919ee" />

<img width="985" height="301" alt="image" src="https://github.com/user-attachments/assets/6e074b2e-e368-4cb8-b977-ba2f818e97d1" />

<img width="928" height="442" alt="image" src="https://github.com/user-attachments/assets/378f5fb1-3912-4c13-8b5a-940637bfe98c" />

<img width="1043" height="607" alt="image" src="https://github.com/user-attachments/assets/2e23fa12-6da2-4a24-abdd-7d5b7f439038" />

Next, visiting the Proton Drive link: `https://drive.proton.me/urls/00MNVW0SHG#do4wWWpAQ0Lw`:

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/91783484-2215-4cad-96dc-da89c72870ee" />

The drive holds:
1. A torn password image
2. A disk image named `of.img`
3. A backup archive of the web application

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/84b8d272-cc79-4f1b-98b3-ac28af5c09bc" />

<img width="1364" height="1197" alt="image" src="https://github.com/user-attachments/assets/f9ca221a-a4d0-48af-b629-194b2eacf92d" />

### Disk Image Analysis

Analyzing `of.img` with FTK Imager. In the `ctf` directory, file names spell out `I will not less see it`:

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/d9062513-a156-4951-aa44-21526543116d" />

Opening `of.img` in HxD and searching for `flag` reveals references to `final.zip`, `flag.txt`, and `wtf.img`:

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/78d251e7-2e54-4077-8f6c-845bc80d90c3" />

Using `binwalk` and `foremost` to extract hidden embedded files:

<img width="996" height="225" alt="image" src="https://github.com/user-attachments/assets/4451fdcb-dfef-476f-aa18-c8b524538dd1" />

<img width="730" height="172" alt="image" src="https://github.com/user-attachments/assets/4947db53-fd3e-4b34-98ac-d0ddd7cba439" />

Extracted zip file: `00541698.zip`. Attempting to unzip prompts for a password:

<img width="1235" height="661" alt="image" src="https://github.com/user-attachments/assets/557486e5-444c-41d5-a433-117b92217522" />

Extracting remaining carved PNG files:

<img width="1027" height="252" alt="image" src="https://github.com/user-attachments/assets/3169d858-624a-469a-ae2b-ef29d3541f34" />

Found `00541700.png` showing the full uncut password:

<img width="1208" height="843" alt="00541700" src="https://github.com/user-attachments/assets/eaec5935-bb61-4b82-ace7-fbd9136f5f06" />

Using this password to extract the zip file successfully reveals the flag:

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/769740d9-93d8-421a-a376-8e167c2f1de0" />

{% endraw %}
