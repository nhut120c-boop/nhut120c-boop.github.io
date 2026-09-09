---
layout: post
title: "Forensics: HireMe Lab"
tags: [note, study]
---
{% raw %}
# HireMe Lab

What is the administrator's username?

Đầu tiên em mở file trong FTK, vào Users thấy tên Karen và submit 

<img width="1220" height="554" alt="image" src="https://github.com/user-attachments/assets/18dd1999-4d65-40b6-b1e2-efbe10a7c0e8" />

câu trả lời 

```
Karen
```
câu 2:
What is the OS's build number?
 em export file system ra
<img width="622" height="258" alt="image" src="https://github.com/user-attachments/assets/9bc73f86-5d8b-4382-9f2a-419f2ed648b1" />

và tìm osbuild bằng Registry explorer

<img width="1536" height="782" alt="image" src="https://github.com/user-attachments/assets/9800952b-e9d0-40ba-a1a7-406d32af7b0d" />

câu trả lời 
```
16299
```
What is the hostname of the computer?

em tiêp tục coi trong ControlSet001 ở mục Computername

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/c3deb8a1-402d-4d73-84f4-c85d06854667" />

câu trả lời 
```
TOTALLYNOTAHACK
```
câu 4 A messaging application was used to communicate with a fellow Alpaca enthusiest. What is the name of the software?

em export file software xong tìm trong App path theo hint 

<img width="1536" height="577" alt="image" src="https://github.com/user-attachments/assets/cd7c776f-6ce1-4831-8207-4840e89c2a1c" />
thấy được Skype là app để nhắn tin duy nhất trong đó

câu trả lời: 
Skype

câu 5: What is the zip code of the administrator's post?

em vào trong Karen thì thấy user chỉ xài chrome nên em bắt đầu trích data từ web data của chrome và dùng SQlite để dò 

<img width="967" height="456" alt="image" src="https://github.com/user-attachments/assets/c5513ed5-4975-4245-9fc6-af6a3ee85fa7" />
thấy được mã zip đề bài yêu cầu 

câu trả lời: 
19709
câu hỏi:

What are the initials of the person who contacted the admin user from TAAUSAI?

em vào Mirosotf vào outlook để export file ost ra, và dùng kernel OST  để đọc file ost
và soi tìm thấy mail từ taausai mà thấy chữ MS ở đầu
<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/c66b147b-5a44-40e3-8d6d-94b451c1384d" />

câu trả lời: ```MS```

câu hỏi 

ở câu này em tiếp tục xem các email của taausai gửi cho karen và thấy được mức lương là 150,000

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/5381024f-890c-4984-b3e5-c46504ad17f0" />

câu trả lời là: ```150000```
câu hỏi 
em tiếp tục tìm trong mail, tháy có đề cập đến tọa độ 
<img width="1430" height="747" alt="image" src="https://github.com/user-attachments/assets/5cf5ff80-14a6-4472-89d3-f6833870e544" />


em dùng AI để xác định quốc gia
Đầu tiên em mở file trong F

{% endraw %}
