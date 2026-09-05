---
layout: post
title: "Forensics: Tool"
tags: [writeup, ctf, study]
---
Disk Analysis & Autopsy
---
câu 1
câu hỏi là 
```
What is the MD5 hash of the E01 image?
```
để làm câu này em vào Autopsy mở case lên, chuột phải HASAN2.E01 -> View Summary Information

<img width="1522" height="812" alt="image" src="https://github.com/user-attachments/assets/cd7c8de2-db12-43aa-bdc5-df9f4226930f" />

rồi vào container, thấy MD5

<img width="1522" height="770" alt="image" src="https://github.com/user-attachments/assets/8e46d0c3-fefa-41e0-a513-42f2e40df528" />

đáp án là
```
## câu 2

câu hỏi là:

```text
What is the computer account name?
```

với câu này, em hiểu “computer account name” là tên máy tính của Windows trong disk image

```text
ComputerName
```

Autopsy trả về nhiều kết quả có chứa chuỗi này. Sau khi xem phần preview, em thấy có dòng:

```text
ComputerName = DESKTOP-0R59DJ3
```

<img width="1535" height="777" alt="image" src="https://github.com/user-attachments/assets/7704aaf4-9ac0-451b-b08b-6f2cf3317c69" />

đáp án

```text
DESKTOP-0R59DJ3
```
câu 3 


câu hỏi:

```text
List all the user accounts. (alphabetical order)
```

em vào thư mục:

```text
/Users
```

trong Autopsy để xem các user profile. Sau đó loại các thư mục mặc định của Windows như:

```text
All Users
Default
Default User
Public
```

các user account còn lại là:

```text
H4S4N, joshwa, keshav, sandhya, shreya, sivapriya, srini, suba
```
<img width="1530" height="757" alt="image" src="https://github.com/user-attachments/assets/b18a1fc5-623a-4cc1-8a4e-ba14c8bd0ba2" />

đáp án 
```
H4S4N, joshwa, keshav, sandhya, shreya, sivapriya, srini, suba
```
câu 4
## câu 4

câu hỏi:

Who was the last user to log into the computer?

em vào:

Results -> Extracted Content -> Operating System User Account

ở bảng này em kiểm tra danh sách user account và thông tin logon/access liên quan. user đúng với câu hỏi là:

sivapriya

<img width="1518" height="787" alt="image" src="https://github.com/user-attachments/assets/1585ddd0-910a-4555-a9c6-3bb0c8a2d38c" />

đáp án:
```
sivapriya
```
câu 5

câu hỏi:

```text
What was the IP address of the computer?
```

ban đầu em kiểm tra trong registry `SYSTEM` vì IP của Windows thường nằm ở phần network interface:

```text
Windows\System32\config\SYSTEM
```

nhưng giá trị tìm được là:

```text
DhcpIPAddress = 0.0.0.0
```
<img width="1536" height="697" alt="image" src="https://github.com/user-attachments/assets/a954143f-a134-4c55-88aa-c548f87317bc" />

nên không lấy được IP thật từ chỗ này

sau đó em kiểm tra các chương trình liên quan tới mạng trong `Program Files (x86)` và thấy phần mềm `Look@LAN`. Đây là tool liên quan tới mạng LAN nên có thể lưu IP local của máy

em mở file cấu hình:

```text
Program Files (x86)\Look@LAN\irunin.ini
```

trong file này có dòng:

```text
LANIP=192.168.130.216
```

<img width="1532" height="762" alt="image" src="https://github.com/user-attachments/assets/7d606ace-1aa8-4a38-92fc-1cc3b82ec3de" />


`LANIP` là IP nội bộ của máy trong mạng LAN, nên đáp án là:

```text
192.168.130.216
```


câu 6

câu hỏi:

```text
What was the MAC address of the computer? (XX-XX-XX-XX-XX-XX)
````

em kiểm tra tiếp file cấu hình của Look@LAN:

```text
Program Files (x86)\Look@LAN\irunin.ini
```

trong file có dòng:

```text
LANNIC=0800272cc4b9
```

<img width="1528" height="717" alt="image" src="https://github.com/user-attachments/assets/12d6f7d5-6bbf-4767-b6df-09687660e818" />


`LANNIC` là thông tin card mạng LAN. Đề yêu cầu format `XX-XX-XX-XX-XX-XX`, nên em tách giá trị này thành:

```text
08-00-27-2C-C4-B9
```

đáp án:

```text
08-00-27-2C-C4-B9
```
````markdown
câu 7

câu hỏi:

```text
What is the name of the network card on this computer?
````

ban đầu em thử kiểm tra registry hive `SYSTEM`:

```text
Windows\System32\config\SYSTEM
```

nhưng khi extract ra ngoài thì file bị rỗng / không đọc được đúng dữ liệu, nên không lấy được thông tin card mạng theo hướng này.

sau đó em chuyển qua output RegRipper mà Autopsy đã tạo sẵn từ hive `SOFTWARE` của image:

<img width="1535" height="792" alt="image" src="https://github.com/user-attachments/assets/4f0f9637-41e9-4182-8f98-89be79c572b8" />

<img width="1536" height="806" alt="image" src="https://github.com/user-attachments/assets/e1eb5524-5a24-4fb1-b7b0-56d4616da0f8" />
<img width="1527" height="787" alt="image" src="https://github.com/user-attachments/assets/2064f8e8-128c-4615-8ea1-84a38442100d" />


```text
Case Files\ModuleOutput\RecentActivity\reg\SOFTWARE-regripper-179465-full
```
<img width="1528" height="807" alt="image" src="https://github.com/user-attachments/assets/542d4f55-8465-4f32-b5c4-fd96b73a3e9e" />

trong file này em tìm section:

```text
networkcards
Microsoft\Windows NT\CurrentVersion\NetworkCards
```

ở đây thấy tên card mạng là:

```text
Intel(R) PRO/1000 MT Desktop Adapter
```

<img width="1535" height="796" alt="image" src="https://github.com/user-attachments/assets/c55cfa09-bc09-4911-9be9-c348ccd9db23" />

đáp án:

```text
Intel(R) PRO/1000 MT Desktop Adapter
```

```
```
câu 8
câu hỏi: 
```
What is the name of the network monitoring tool?
```
như câu ở trên thì công cụ em thấy được là look@lan

đáp án là:
```
Look@Lan
```

câu 9
câu hỏi:
```
A user bookmarked a Google Maps location. What are the coordinates of the location?
```
em kiểm tra dữ liệu lịch sử duyệt web từ file places.sqlite trong Autopsy

nhìn xuống phần Visit Details ở góc dưới màn hình, tọa độ vị trí được lưu ngay trong phần Title khi người dùng xem hoặc đánh dấu trên Google Maps
<img width="1526" height="772" alt="image" src="https://github.com/user-attachments/assets/eedd4ffc-2ea5-4cf5-a0db-5075612e693e" />

đáp án là:
```
12°52'23.0"N 80°13'25.0"E
```

câu 10 
câu hỏi:

```text
A user has his full name printed on his desktop wallpaper. What is the user's full name?

```

để tìm hình nền thực tế đang được sử dụng, em trích xuất và kiểm tra registry hive `NTUSER.DAT` của tài khoản `joshwa`:

```text
Users\joshwa\NTUSER.DAT

```
<img width="1530" height="770" alt="image" src="https://github.com/user-attachments/assets/ae104bf1-f161-4be0-a29d-e86963d55643" />

trong registry, em tìm đến key cấu hình ảnh nền:

```text
Control Panel\Desktop

```

tại đây, giá trị `Wallpaper` lưu đường dẫn trỏ về một file ảnh nằm ở Downloads

<img width="1536" height="762" alt="image" src="https://github.com/user-attachments/assets/a507b327-56d3-4635-9c0e-aaf171d85b5b" />


em lần theo đường dẫn đó và mở thư mục:

```text
Users\joshwa\Dowloads 

```

<img width="1528" height="753" alt="image" src="https://github.com/user-attachments/assets/7cd30184-497a-4711-bf4b-415d97aa8860" />

khi xem trực tiếp file ảnh cyberpunk này trong Autopsy, trên bề mặt bức ảnh có in rõ dòng chữ tên đầy đủ của user là `Anto Joshwa`.


<img width="1533" height="792" alt="image" src="https://github.com/user-attachments/assets/64b0c51f-a37f-4953-a942-5470cbd76f37" />

đáp án là:

```text
Anto Joshwa

```

câu 11:

câu hỏi:

```text
A user had a file on her desktop. It had a flag but she changed the flag using PowerShell. What was the first flag?

```

bước làm:

để tìm flag ban đầu, em tiến hành kiểm tra lịch sử gõ lệnh powershell của user `shreya`. em truy cập vào file lịch sử theo đường dẫn sau:

```text
Users\shreya\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt

```

<img width="1166" height="712" alt="image" src="https://github.com/user-attachments/assets/82bde5df-09af-473a-ba25-a743e055ab8f" />


khi xem nội dung text của file này, em thấy danh sách các lệnh đã được nhập. lệnh đầu tiên được sử dụng để tạo và ghi flag vào file `shreya.txt` là:

```text
Add-Content .\shreya.txt 'flag{HarleyQuinnForQueen}'

```

đáp án là:

```text
flag{HarleyQuinnForQueen}

```
câu 12

câu hỏi:

```text
The same user found an exploit to escalate privileges on the computer. What was the message to the device owner?

```

bước làm:

để tìm thông điệp mã khai thác để lại cho chủ máy, em kiểm tra thư mục Desktop của user `shreya` theo đường dẫn:

```text
Users\shreya\Desktop\

```

tại đây có một file tên là `exploit.ps1`. khi xem nội dung của file này ở phần text, em thấy đoạn mã:

```text
New-Item "C:\Users\H454N\Desktop\hacked.txt"
Add-Content C:\Users\H454N\Desktop\hacked.txt 'Flag{I-hacked-you}'

```

<img width="1024" height="601" alt="image" src="https://github.com/user-attachments/assets/2d68a13d-2cd4-4fc4-9e20-3ddccc616b4d" />


đoạn mã này thực thi quyền administrator để tạo một file tên `hacked.txt` trên màn hình desktop của chủ máy (user `H454N`) và ghi vào đó một thông điệp

đáp án là:

```text
Flag{I-hacked-you}

```
câu 13

câu hỏi:

```text
2 hack tools focused on passwords were found in the system. What are the names of these tools? (alphabetical order)

```

bước làm:

để tìm các công cụ hack mật khẩu trên hệ thống, em tiến hành thu thập dấu vết từ các thư mục và lịch sử thực thi:

1. kiểm tra thư mục `Downloads` của user `H454N`, em phát hiện file nén của công cụ thứ nhất là `mimikatz_trunk.zip`.


<img width="1040" height="555" alt="image" src="https://github.com/user-attachments/assets/4a67ce66-21d8-48fa-a13b-8bc02d1bddfa" />

   
3. kiểm tra danh sách các chương trình đã từng chạy trên hệ thống tại mục `Extracted Content` -> `Run Programs` (dữ liệu Prefetch). tại đây, em phát hiện lịch sử thực thi của công cụ thứ hai là `LAZAGNE.EXE`

<img width="1097" height="692" alt="image" src="https://github.com/user-attachments/assets/70097d9a-2c85-4d1c-9461-f73b7883dbcf" />

hai công cụ được tìm thấy là `lazagne` và `mimikatz`. sắp xếp tên 2 công cụ này theo thứ tự bảng chữ cái.

đáp án là:

```text
lazagne, mimikatz

```
câu 14

câu hỏi:

```text
There is a YARA file on the computer. Inspect the file. What is the name of the author?

```

bước làm:

để tìm file YARA trên hệ thống, em sử dụng tính năng tìm kiếm (File Search) với từ khóa `*.yar`.

kết quả lọc ra được một file tên là `kiwi_passwords.yar`. khi coi nội dung của file này ở tab text, phần `meta:` có chứa các thông tin mô tả về rule (quy tắc). tại đây, em thấy thông tin tác giả được ghi chú rõ ràng ở dòng `author`.


<img width="1077" height="673" alt="image" src="https://github.com/user-attachments/assets/bc37dc5e-799e-4892-bc2f-0d6301500f7a" />


đáp án là:

```text
Benjamin DELPY (gentilkiwi)

```

