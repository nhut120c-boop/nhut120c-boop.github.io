---
layout: post
title: "Tryhackme: Investigating Windows"
tags: [writeup, ctf, study]
---
# Investigating-Windows
câu 1
em vào system information

<img width="1919" height="960" alt="image" src="https://github.com/user-attachments/assets/13eb04c4-07e2-4979-a25a-7a5603af31b8" />

thấy dòng OS name 

<img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/bd8ccbf3-bb35-4770-a965-07d373d9272f" />

 os name: microsoft windows server 2016 datacenter, nên em điền trước windows server 2016 nếu ko được sẽ điền windows server 2016  datacenter

<img width="952" height="1046" alt="image" src="https://github.com/user-attachments/assets/83dca06e-bffb-4c8b-8833-e5a4ef20f695" />
 em điền  windows server 2016 thì pass luôn

 câu 2 

 Which user logged in last?

em vào 
<img width="1872" height="1014" alt="image" src="https://github.com/user-attachments/assets/5bf45db7-ab1f-4ce8-bf92-f3e92faeec27" />

thấy được các user 
<img width="1919" height="941" alt="image" src="https://github.com/user-attachments/assets/47ef3372-196e-46b1-ae6a-001ae1206936" />
và có 3 cái đáng nghi nhất là jenny
john
ssm-user

Nên em dùng net user jenny
net user john
net user ssm-user để kiểm tra thời giang login của từng user

<img width="1788" height="765" alt="image" src="https://github.com/user-attachments/assets/958e6377-e2b6-438d-87b7-b9e41614db55" />


<img width="1551" height="858" alt="image" src="https://github.com/user-attachments/assets/7beb9121-16f9-485e-915f-465a938fb2d1" />

<img width="1913" height="982" alt="image" src="https://github.com/user-attachments/assets/d71522d2-498e-42e0-ba97-203dedf7592f" />

<img width="1918" height="921" alt="image" src="https://github.com/user-attachments/assets/8cf08a11-ee67-45d5-8787-95974e21e7b6" />

<img width="1919" height="1022" alt="image" src="https://github.com/user-attachments/assets/24268e05-a708-47a2-90f5-60620e4bb67b" />


với administrator

kết quả:

last logon: 6/2/2026 3:26:23 pm

với john
kết quả:

last logon: 3/2/2019 5:48:32 pm

các user còn lại khi kiểm tra last logon thì hiện never

so sánh các mốc thời gian, administrator có thời gian đăng nhập mới nhất

=> user logged in last là administrator nên đáp án là 

administrator

câu 3

when did john log onto the system last?

câu này hỏi john đăng nhập vào hệ thống lần cuối lúc nào

ở câu trước, em đã dùng net user để so sánh last logon của các tài khoản

trong lúc kiểm tra user nào đăng nhập cuối, em cũng đã chạy:

net user john

kết quả của john có dòng:

last logon: ```3/2/2019 5:48:32 pm```

vì câu này hỏi riêng thời gian đăng nhập cuối của john, nên em lấy trực tiếp giá trị ở dòng last logon đó

đáp án
```
03/02/2019 5:48:32 PM
```
---
câu 4
đầu tiên em vào regedit

sau đó em tìm đến đường dẫn ```hkey_local_machine\software\microsoft\windows\currentversion\run```để xem các chương trình tự động chạy cùng hệ thống

tại đây em thấy một key tên là updatesvc rất đáng nghi

nhìn sang cột data của nó em thấy chuỗi lệnh c:\tmp\p.exe -s \\10.34.2.3 'net user' > c:\tmp\o...

<img width="1919" height="988" alt="image" src="https://github.com/user-attachments/assets/151819f3-b674-474c-bef0-19765c0bf7f8" />

kẻ tấn công đã giấu lệnh ở đây để máy tính tự động kết nối đến ip 10.34.2.3 mỗi khi vừa khởi động

từ chuỗi này em lấy được ip cần tìm

đáp án
```10.34.2.3```

câu 5

em vào computer management

mở local users and groups chọn groups

nhấp đúp vào administrators

trong bảng members thấy có administrator, guest và jenny

đề yêu cầu 2 tài khoản ngoài administrator và xếp abc nên em chọn guest và jenny


<img width="1023" height="520" alt="image" src="https://github.com/user-attachments/assets/a3078fd2-bb06-4dd0-9324-7b61db3e6cff" />


đáp án
```
Guest, Jenny
```
câu 6

em mở ```task scheduler``` và kiểm tra danh sách active tasks

em chú ý đến task ```clean file system``` được lên lịch chạy hàng ngày vào ```4:55 pm```

lý do em chốt task này là vì cách đặt tên của nó, kẻ tấn công cố tình dùng cái tên nghe có vẻ giống chức năng dọn dẹp để ngụy trang đánh lừa mắt người quản trị, nhưng thực tế windows không có tác vụ mặc định nào ghi tên chung chung như vậy

<img width="1024" height="535" alt="image" src="https://github.com/user-attachments/assets/06d72a89-6ba6-400a-a9e4-6fd352df8823" />

<img width="1024" height="525" alt="image" src="https://github.com/user-attachments/assets/7a409608-1462-4815-abce-1197980e3422" />

đáp án

```
clean file system

```
---

câu 7

em mở thẻ actions của task clean file system

trong cột details có ghi rõ đường dẫn c:\tmp\nc.ps1 -l 1348

từ đây em thấy file được cấu hình để chạy hàng ngày là nc.ps1

đáp án

<img width="1919" height="944" alt="image" src="https://github.com/user-attachments/assets/785dd9bb-ee84-45b0-be84-e53eaaf45bf9" />

```
nc.ps1

```

câu 8

kiểm tra thẻ actions của task clean file system

trong phần details lệnh thực thi là c:\tmp\nc.ps1 -l 1348

tham số -l là listen và 1348 chính là cổng cục bộ mã độc dùng để listen


<img width="1895" height="935" alt="image" src="https://github.com/user-attachments/assets/932480a3-658e-4c9c-bf0f-e2ed03b78cf8" />

đáp án
```
1348
```
câu 9

như lúc làm câu 2 em đã chạy lệnh net user jenny rồi

nhìn lại kết quả trong ảnnh 


 <img width="1788" height="765" alt="image" src="https://github.com/user-attachments/assets/7b08001d-67c8-400a-a7d7-8f8738722055" />


ở dòng last logon hiện chữ never

vậy nên tài khoản này chưa từng được đăng nhập

đáp án
```
Never
```

câu 10

để tìm ngày hệ thống bị xâm nhập em xem lại các mốc thời gian bất thường đã thu thập được từ đầu đến giờ

thời gian đăng nhập cuối cùng của user john là 3/2/2019

<img width="1919" height="946" alt="image" src="https://github.com/user-attachments/assets/8c784bc7-a6f8-42e3-a338-8319319f5e1f" />


ngoài ra khi xem phần triggers của task clean file system cũng dc tạo để chạy bắt đầu từ ngày 3/2/2019

<img width="984" height="745" alt="image" src="https://github.com/user-attachments/assets/bb8e460e-a1c4-4320-ba73-94193bc36120" />

nên em nghĩ ngày xảy ra sự cố là 3/2/2019

đáp án
```
03/02/2019
```
câu 11
để tìm thời gian cấp quyền em mở powershell lên và chạy lệnh lọc log 4672 trong ngày 3/2/2019:

Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4672} | Where-Object {$_.TimeCreated.Month -eq 3 -and $_.TimeCreated.Day -eq 2} | Sort-Object TimeCreated | Select-Object TimeCreated, Message

kết quả hiện ra rất nhiều log cấp quyền cho user SYSTEM, trong đó có mốc 4:04:40 pm và 4:04:49 pm nội dung giống hệt nhau

vì không có gì khác biệt để phân biệt nên em mở hint của đề bài xem thử thì thấy gợi ý là: 00/00/0000 0:00:49 PM

<img width="667" height="512" alt="image" src="https://github.com/user-attachments/assets/971cd3f2-607e-425b-a084-17bd6b8beeae" />

dựa vào số 49 giây ở đuôi của hint, em coi lại số giây giống

đáp án
```
03/02/2019 4:04:49 PM
```
câu 12

để tìm xem hacker đã dùng tool gì để lấy mật khẩu, em mở event viewer lên

sau đó em tìm đến đường dẫn applications and services logs 

<img width="1522" height="750" alt="image" src="https://github.com/user-attachments/assets/f06312dd-296b-44a7-a2cb-407718dc6add" />

-> microsoft
<img width="1530" height="812" alt="image" src="https://github.com/user-attachments/assets/f2bfa880-b643-4e3c-a19c-ae6c447f77ca" />

-> windows 

<img width="1495" height="781" alt="image" src="https://github.com/user-attachments/assets/ad3ea886-edd5-4dbc-a8e1-e7223ce8bc8c" />

-> windows defender -> operational để xem lịch sử của phần mềm diệt virus windows defender

<img width="1501" height="792" alt="image" src="https://github.com/user-attachments/assets/e603d93c-fc73-4e3d-a76a-43864f5899e7" />


kiểm tra các log cảnh báo trong này, em thấy có log ghi nhận windows defender đã phát hiện ra mã độc

nhìn vào phần chi tiết của log đó, em thấy hệ thống ghi rõ tên phần mềm độc hại là mimikatz

<img width="1531" height="761" alt="image" src="https://github.com/user-attachments/assets/0343e8c9-b304-4fb2-900d-f3bf1fa2d5a4" />


đáp án
```
mimikatz
```
câu 13

để tìm ip máy chủ c2 của kẻ tấn công, em kiểm tra file hosts của hệ thống vì hacker rất hay sửa file này để đầu độc dns (dns poisoning)

thay vì dùng lệnh, em mở file explorer lên và vào theo đường dẫn c:\windows\system32\drivers\etc
<img width="1536" height="822" alt="image" src="https://github.com/user-attachments/assets/a113dcc6-5cfd-4c1f-8771-e85cbb34e07a" />

để tìm ip máy chủ c2, em vào đường dẫn c:\windows\system32\drivers\etc và mở file hosts bằng notepad

kéo xuống cuối file em thấy có nhiều dòng bị chèn thêm vào bất thường

nó ép các web diệt virus như virustotal về 127.0.0.1 để vô hiệu hóa bảo mật, không cho máy quét mã độc

nó đưa google.com về một ip public lạ là 76.32.97.132

<img width="1297" height="762" alt="image" src="https://github.com/user-attachments/assets/b373119b-529b-4bca-a67f-ba926b065b02" />

vì đề hỏi ip bên ngoài, nên cái ip lạ được gán cho google.com là server để thu thập dữ liệu
đáp án 
```
 76.32.97.132

```
câu 14

để tìm đuôi file shell hacker upload qua web, em kiểm tra log của iis

khong thấy thư mục log nên em vào thẳng c:\inetpub\wwwroot chứa code web

xem cột date modified (3/2/2019) thấy lòi ra file lạ b.jsp

<img width="900" height="492" alt="image" src="https://github.com/user-attachments/assets/2ae9ce84-8877-4422-ade1-fea5ee94b1f5" />

đuôi jsp hay dc dùng làm web shell

đáp án
```
.jsp
```
câu 15

mở windows defender firewall with advanced security

chọn mục inbound rules

ta thấy 1 rules có tên lạ

<img width="1536" height="757" alt="image" src="https://github.com/user-attachments/assets/ed9f5387-7c1d-4647-b68c-1f0113b700d5" />

bấm đúp vào nó, chuyển sang tab protocols and ports

nhìn vào dòng local port sẽ thấy cổng được mở

<img width="990" height="707" alt="image" src="https://github.com/user-attachments/assets/d922a0ff-a64f-4a80-ae4c-63e64354f356" />

đáp án
```
1337
```

câu 16

như cái ảnh chụp file hosts ở câu 13 lúc nãy, anh thấy rõ hacker đã ép ip lạ 76.32.97.132 đi liền với tên miền nào

đó chính là trang web bị nhắm mục tiêu (targeted) để đầu độc dns

đáp án

google.com

