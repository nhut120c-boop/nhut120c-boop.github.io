---
layout: post
title: "RIFFHACK CTF: Vecna's Memory Palace"
tags: [writeup, ctf]
---
{% raw %}
## Challenge: Vecna's Memory Palace
## Category: Forensics

> Description: After a Hawkins Lab blackout, responders recovered a corrupted memory snapshot. Find the final token to close the incident.

**Host:** `107.170.70.73:5000`  
**Artifact:** `https://drive.google.com/file/d/1VywHaKWGQ8g-S4Oviyl52LzQqGaPaGJB/view?usp=sharing`  
**Flag:** `bitctf{v3cn45_m3m0ry_p4l4c3_br34ch}`

---

### Initial Assessment

Accessing the challenge web portal:

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/22932b0d-0dc6-48dd-afdb-099c71c7ff78" />

Downloading and reading the memory snapshot capture file:

<img width="890" height="357" alt="image" src="https://github.com/user-attachments/assets/1bd75cf9-5ac5-48c1-86cc-0a05fe62a683" />

```
=== HAWKINS_LAB_VOLATILE_CAPTURE ===
proc=svchost.exe pid=1948 parent=services.exe
driver=.tmp\mindflayer\resident.sys state=orphaned
radio_tag=UNJX
tv_tag=VAF
clockface=13
DEC0Y_PIPE=Vecna\Clock_One\ringbuffer
noise_0:nInxPHet2cbSHn2yPVL0NCqS
memfrag[4]=UklEPTR8UE9TPTR8U0laRT01M3xCTE9CPTcxNjA3ZDc5N2I2YjdkNzIzMjJmN2U3ZDMxNzA3MTZlMmE2YjYyNzEzZDJmM2IyNDJhMjUw
cache_shadow[0]=UklEPTh8UE9TPTR8U0laRT0xMnxCTE9CPWRlYWRjYWZlYmFiZQ==
noise_1:U054PXwLexPCKEBhiR7xLzJy
memfrag[1]=UklEPTF8UE9TPTN8U0laRT01M3xCTE9CPTY2OTczNmM2NDJlNzgzNDc5MmIyZjY3MmQ3OTZmMmQ3MTdjNjQyYzc3NjY3ZDc5N2E2Njdk
cache_shadow[1]=UklEPTJ8UE9TPTl8U0laRT0xMHxCTE9CPTQxNDE0MTQxNDE=
noise_2:oiYVPQ5rAO3V7GS2Vqy9h1Wl
memfrag[5]=UklEPTV8UE9TPTJ8U0laRT01M3xCTE9CPTNhM2EzMjNhMjIzODNlM2IzYTBjMjYyODMwMjMzZDNkM2IyMTI3MjM2OTY1NmMyMDIwMjA2
noise_3:cc8fSspC/O0rb1rOzSkfa56K
memfrag[0]=UklEPTB8UE9TPTF8U0laRT01M3xCTE9CPWIyMTE3MmQzODJhMmQyYjIxNjYyNTNiMjc2YjYyNzEyYjIwM2EzYjI4MjczNDI2NjM2ZDY5
noise_4:G/BuWOA3uS9HoKXY12jIk5US
memfrag[2]=UklEPTJ8UE9TPTV8U0laRT01M3xCTE9CPWMzYzJlM2MyZTI3NmM2OTZhMTIxNDA0MDYxZTAwNjUwMDFmMDQxMDYzNjI3MTc5NjI2OTM0
noise_5:bQbZGWckADMyJzMrxwhQ9NNp
memfrag[3]=UklEPTN8UE9TPTB8U0laRT01M3xCTE9CPTMzNjMzNjM5M2QyNzM1MjkyMjIzMTQyNzJmM2UyZDYzNmQ2OTI0MjczZDJjMjczYjJhMzAy
diag=heap snapshot complete
analyst_note=fragment metadata survived even when the slab order did not
=== END_CAPTURE ===
```

Key fields:
```
radio_tag=UNJX
tv_tag=VAF
clockface=13
analyst_note=fragment metadata survived even when the slab order did not
```

The note tells us the memory slab order was shuffled, but the fragment metadata remained intact.

### Reconstructing Memory Fragments

Decoding each `memfrag` base64 string reveals structured fields: `RID`, `POS`, `SIZE`, and `BLOB`. Sorting by `POS`:

* `memfrag[3]` -> `POS=0`
* `memfrag[0]` -> `POS=1`
* `memfrag[5]` -> `POS=2`
* `memfrag[1]` -> `POS=3`
* `memfrag[4]` -> `POS=4`
* `memfrag[2]` -> `POS=5`

Order: `3 -> 0 -> 5 -> 1 -> 4 -> 2`

### Key Derivation

With `clockface=13` indicating ROT13, decode `UNJX` and `VAF`:
* `UNJX` (ROT13) -> `HAWK`
* `VAF` (ROT13) -> `INS`
* Combined: `HAWKINS`

Concatenating the reordered BLOB hex strings:
```
336336393d273529222314272f3e2d636d6924273d2c273b2a302b21172d382a2d2b2166253b276b62712b203a3b28273426636d693a3a323a22383e3b3a0c262830233d3d3b21272369656c2020206669736c642e7834792b2f672d796f2d717c642c77667d797a667d71607d797b6b7d72322f7e7d3170716e2a6b62713d2f3b242a250c3c2e3c2e276c696a121404061e0065001f041063627179626934
```

Decrypting with XOR / CyberChef using key `HAWKINS`:

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d09226a8-41b8-496e-89be-49dc9a344bd7" />

```json
{"artifact_name":"mindflayer_loader.dll","campaign":"starcourt_nightshift","sha1":"7f9c2ba4e88f827d616045507605853ed73b809a","unlock_token":"SCOOPS-AHOY-1985"}
```

Submitting these parameters to the portal unlocks the flag:

<img width="1920" height="1078" alt="image" src="https://github.com/user-attachments/assets/bba51786-6065-462d-a6ba-13f5911b1fc5" />

**Flag:** `bitctf{v3cn45_m3m0ry_p4l4c3_br34ch}`

{% endraw %}
