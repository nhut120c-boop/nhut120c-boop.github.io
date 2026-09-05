---
layout: post
title: "No hack No CTF : Kira - Notes"
tags: [writeup, ctf]
---
{% raw %}
## Tên challenge: Kira - Notes
## Tác giả: UmmIt Kin
## Mảng: Forensics
---
Đầu tiên mình tải file về được 1 tệp sqlite có tên là ```places.sqlite```

<img width="1016" height="428" alt="image" src="https://github.com/user-attachments/assets/c95b28be-506f-4dce-8d7b-598d3db84146" />

mình bỏ file đó vào tool ```SQLite``` để điều tra

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/8002d273-003d-4a16-a9fa-339349781c96" />

 mình qua Browse Data và bắt đầu tìm kiếm

 <img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/3f5341cf-5ee7-447e-9571-b5a895b67665" />

thấy ở table moz_places có nhiều url thú vị như 
```
https://drive.proton.me/urls/00MNVW0SHG#do4wWWpAQ0Lw
```

```
http://151.158.224.74:31337/
```

```
https://github.com/UmmItKin/Kira-Notes
```

Khi phát hiện ra, mình vào ```http://151.158.224.74:31337/``` đầu tiên vì thấy đây khả năng cao là link web của challenge

Mình thấy được giao diện Kira- Notes

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/9383f110-f767-4c8c-afba-c4c1982a5eb6" />

Có rất nhiều thông tin như 
<img width="417" height="77" alt="image" src="https://github.com/user-attachments/assets/ea473d14-a0f2-4a6d-be09-ad42c98919ee" />

<img width="985" height="301" alt="image" src="https://github.com/user-attachments/assets/6e074b2e-e368-4cb8-b977-ba2f818e97d1" />


<img width="928" height="442" alt="image" src="https://github.com/user-attachments/assets/378f5fb1-3912-4c13-8b5a-940637bfe98c" />

<img width="1043" height="607" alt="image" src="https://github.com/user-attachments/assets/2e23fa12-6da2-4a24-abdd-7d5b7f439038" />


Mình đã note lại hết thông tin trên và vào tất cả link có trong web đều bị 404

Tiếp tục mình qua  ``` https://drive.proton.me/urls/00MNVW0SHG#do4wWWpAQ0Lw ```

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/91783484-2215-4cad-96dc-da89c72870ee" />

Đây mới là mục tiêu chính cần khai thác

Đầu tiên mình xem ảnh <img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/84b8d272-cc79-4f1b-98b3-ac28af5c09bc" />

Nhìn giống như pass nhưng bị xé mất một phần

Tiếp theo là ổ đĩa of.img 

và ảnh backup của web Kira-Notes ở link đầu

<img width="1364" height="1197" alt="image" src="https://github.com/user-attachments/assets/f9ca221a-a4d0-48af-b629-194b2eacf92d" />


Sau đó mình phân tích file of.img bằng tool FTK Image

Mình thấy các file tạo thành dòng chữ I will not less see it ở trong folder ctf

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/d9062513-a156-4951-aa44-21526543116d" />

Mình nghi họ đã giấu flag trong đây và quyết định bỏ nguyên file of.img và HDx để tìm

Khi ctrl F và ghi flag thì được 3 file lạ gồm có final.zip, flag.txt và wtf.img

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/78d251e7-2e54-4077-8f6c-845bc80d90c3" />


Mình tiếp tục dùng binwwalk để trích file ẩn và nhận lại được file 10000.ext

<img width="996" height="225" alt="image" src="https://github.com/user-attachments/assets/4451fdcb-dfef-476f-aa18-c8b524538dd1" />

Sau đó mình dùng tool forenmost để lôi hết file ẩn ra

Đầu tiên là file zip 

<img width="730" height="172" alt="image" src="https://github.com/user-attachments/assets/4947db53-fd3e-4b34-98ac-d0ddd7cba439" />

và được tệp 00541698.zip 

Mình thử unzip thì nó bắt nhập pass

<img width="1235" height="661" alt="image" src="https://github.com/user-attachments/assets/557486e5-444c-41d5-a433-117b92217522" />

 Mình nhập thử 0x0Kira thì sai, mình tiếp tục lôi thêm file png còn lại ra vì nghi là ảnh pass

 <img width="1027" height="252" alt="image" src="https://github.com/user-attachments/assets/3169d858-624a-469a-ae2b-ef29d3541f34" />

và được 00541700.png chứa ảnh đầy đủ của passwword

<img width="1208" height="843" alt="00541700" src="https://github.com/user-attachments/assets/eaec5935-bb61-4b82-ace7-fbd9136f5f06" />


và được flag khi unzip là 

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/769740d9-93d8-421a-a376-8e167c2f1de0" />


{% endraw %}