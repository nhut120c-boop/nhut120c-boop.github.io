---
layout: post
title: "RIFFHACK CTF : Vecna's Memory Palace"
tags: [writeup, ctf]
---
{% raw %}
Tên chall: Vecna's Memory Palace

Mảng: Forensics

Mô tả: After a Hawkins Lab blackout, responders recovered a corrupted memory snapshot. Find the final token to close the incident.

Host: 107.170.70.73:5000

File artifact: https://drive.google.com/file/d/1VywHaKWGQ8g-S4Oviyl52LzQqGaPaGJB/view?usp=sharing

Flag: **bitctf{{v3cn45_m3m0ry_p4l4c3_br34ch}}**

---
Đầu tiên vào host mình thấy được giao diện web

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/22932b0d-0dc6-48dd-afdb-099c71c7ff78" />

sau đó mình tải file artifact về để phân tích được file 

<img width="890" height="357" alt="image" src="https://github.com/user-attachments/assets/1bd75cf9-5ac5-48c1-86cc-0a05fe62a683" />

mình cat thử thì biết được thông tin 

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
Nhìn sơ qua thấy khá nhiều dữ liệu nhiễu như noise_1, cache_shadow nhưng có vài trường đáng chú ý:
```
radio_tag=UNJX
tv_tag=VAF
clockface=13
```
Ngoài ra còn có:
```
analyst_note=fragment metadata survived even when the slab order did not
```
Dòng note này cho biết dữ liệu đã bị xáo trộn thứ tự, nhưng metadata vẫn còn nguyên

=> Khả năng cao phải dựa vào metadata để ghép lại các fragment

Tiếp theo mình decode thử các ```memfrag```

memfrag 0


<img width="1281" height="690" alt="image" src="https://github.com/user-attachments/assets/cfaf7a29-9a31-40e7-805b-ea8d179b217a" />


memfrag 1 


<img width="1266" height="692" alt="image" src="https://github.com/user-attachments/assets/8d84ba96-5e10-43f1-84e2-6d8a4c0ec363" />

memfrag 2


<img width="1355" height="779" alt="image" src="https://github.com/user-attachments/assets/6be7f66d-788c-4d6e-a7bc-b03d4340bc51" />

memfrag 3


<img width="1273" height="644" alt="image" src="https://github.com/user-attachments/assets/4d1f4acb-bb82-42c0-b670-12370cbe81e9" />

memfrag 4


<img width="1332" height="680" alt="image" src="https://github.com/user-attachments/assets/86f0bde3-1579-4efc-bf78-9d07364d7df1" />

Mỗi fragment đều chứa:
```
RID
POS
SIZE
BLOB
```
Trong đó POS nhiều khả năng là vị trí thật của fragment trong bộ nhớ

sắp xếp lại

memfrag[3] -> POS=0
memfrag[0] -> POS=1
memfrag[5] -> POS=2
memfrag[1] -> POS=3
memfrag[4] -> POS=4
memfrag[2] -> POS=5

Như vậy thứ tự đúng không phải:

0 1 2 3 4 5

mà là:

3 0 5 1 4 2

Đây chính là ý nghĩa của hint fragment metadata survived even when the slab order did not

Sau khi xác định được thứ tự chính xác của các fragment, mình tiếp tục tìm cách giải mã phần dữ liệu bên trong.

Quan sát lại các trường đáng chú ý ở đầu file:

radio_tag=UNJX
tv_tag=VAF
clockface=13

Giá trị clockface=13 khá đáng ngờ vì con số 13 thường gợi ý tới phép biến đổi ROT13. Do đó mình thử decode hai chuỗi UNJX và VAF bằng ROT13.


Kết quả thu được:

UNJX -> HAWK
VAF  -> INS

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a07a7451-45b8-412d-8ea3-3393fee0a3b2" />

<img width="1920" height="1050" alt="image" src="https://github.com/user-attachments/assets/d8a3f058-16b0-44b7-9a4d-30c08f5d4d1d" />

Ghép hai chuỗi lại:

HAWK + INS = HAWKINS

Đây là một keyword rất hợp lý vì toàn bộ challenge đều xoay quanh Hawkins Lab

=> Mình suy đoán HAWKINS chính là khóa dùng để giải mã payload

rồi bắt đầu xếp lại BLOB 

POS0:
336336393d273529222314272f3e2d636d6924273d2c273b2a302

POS1:
b21172d382a2d2b2166253b276b62712b203a3b28273426636d69

POS2:
3a3a323a22383e3b3a0c262830233d3d2b21272369656c2020206

POS3:
669736c642e7834792b2f672d796f2d717c642c77667d797a667d

POS4:
71607d797b6b7d72322f7e7d3170716e2a6b62713d2f3b242a250

POS5:
c3c2e3c2e276c696a121404061e0065001f041063627179626934

được 
```
336336393d273529222314272f3e2d636d6924273d2c273b2a302b21172d382a2d2b2166253b276b62712b203a3b28273426636d693a3a323a22383e3b3a0c262830233d3d3b21272369656c2020206669736c642e7834792b2f672d796f2d717c642c77667d797a667d71607d797b6b7d72322f7e7d3170716e2a6b62713d2f3b242a250c3c2e3c2e276c696a121404061e0065001f041063627179626934
```

sau đó đem vào CypherChef deocde với KEY là HAWKINS
ra được:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d09226a8-41b8-496e-89be-49dc9a344bd7" />

```
{"artifact_name":"mindflayer_loader.dll","campaign":"starcourt_nightshift","sha1":"7f9c2ba4e88f827d616045507605853ed73b809a","unlock_token":"SCOOPS-AHOY-1985"}
```
rồi điền các thông tin vào web 

<img width="1920" height="1078" alt="image" src="https://github.com/user-attachments/assets/bba51786-6065-462d-a6ba-13f5911b1fc5" />
ta được flag **bitctf{{v3cn45_m3m0ry_p4l4c3_br34ch}}**


{% endraw %}