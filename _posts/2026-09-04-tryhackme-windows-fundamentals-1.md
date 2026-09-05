---
layout: post
title: "Tryhackme: Windows Fundamentals 1"
tags: [writeup, ctf, study]
---
{% raw %}
# Lab-Windows-Fundamentals-1

ở phần này, em đọc nội dung lab thì thấy windows hiện tại có nhiều phiên bản khác nhau, trong đó bản phổ biến là home và pro

câu hỏi lab hỏi là:

```
what encryption can you enable on pro that you can't enable in home?

```

hiểu đơn giản là lab đang hỏi: tính năng mã hóa nào có thể bật trên bản pro, nhưng bản home thì không bật được đầy đủ

sau khi xem sự khác nhau giữa windows home và windows pro, em thấy tính năng đó là:

```
bitlocker
```

ở task này, em học về windows desktop/gui, là giao diện hiện ra sau khi đăng nhập vào windows. trong bài có nhắc các thành phần chính như desktop, start menu, search box, task view, taskbar, toolbars và notification area 

với câu hỏi:

```text
which selection will hide/disable the search box?
```

ban đầu em dựa vào phần taskbar settings và chọn đáp án:

```text
hidden
```

đáp án này đúng vì muốn ẩn ô search trên taskbar thì chọn **hidden**.

tiếp theo, câu hỏi:

```text
which selection will hide/disable the task view button?
```

lúc đầu em trả lời sai theo kiểu mô tả hành động là:

```text
hide task view button
```

nhưng lab báo sai, vì nó cần đúng tên selection trong windows. sau đó em sửa lại thành:

```text
show task view button
```

lý do là mục show task view button dùng để bật/tắt nút task view. muốn ẩn nó thì bỏ tick ở mục này.

cuối cùng, câu hỏi:

```text
besides clock and network, what other icon is visible in the notification area?
```

ban đầu em nghĩ đáp án là:

```text
volume
```

vì trong bài có nhắc notification area có thể hiện volume icon và network/wireless icon. nhưng đáp án này không khớp format vì chỉ có 6 chữ. 
sau đó em kiểm tra lại giao diện notification area trên windows và nhận ra ngoài clock, network thì còn có action center. đây là khu vực dùng để hiển thị thông báo hệ thống và truy cập nhanh một số thiết lập của windows

vì vậy em sửa đáp án thành:
```
action center
```
task 3

task này em chỉ đọc hướng dẫn và khởi động máy ảo windows được lab cấp

task 4
ở task này, em học về các hệ thống tập tin (file system) trên windows.

<img width="553" height="676" alt="image" src="https://github.com/user-attachments/assets/1f523e4f-b98a-455d-adeb-bef193712835" />


trong bài có nhắc đến ntfs là hệ thống tập tin mặc định của các bản windows hiện đại


chuẩn mới này được dùng để thay thế cho các chuẩn cũ như fat16, fat32 hay hpfs

ntfs mang lại nhiều ưu điểm vượt trội, điển hình nhất là hỗ trợ các file có dung lượng lớn hơn 4gb

ngoài ra, nó có tính năng tự ghi chú (journaling) để tự động phục hồi lỗi

ntfs cũng cho phép bảo mật tốt hơn thông qua việc thiết lập phân quyền (permissions) cho từng thư mục và tệp tin.

chuẩn này còn có một tính năng gọi là alternate data streams (ads). đây là nơi mà các phần mềm độc hại (malware) thường lợi dụng để ẩn giấu dữ liệu.

câu hỏi 
```
what is the meaning of ntfs?
```
hiểu đơn giản là lab đang hỏi: ntfs là viết tắt của cụm từ gì.

sau khi đọc ngay dòng đầu tiên của tài liệu trong task, bài đã giải thích rất rõ

nguyên văn là: "The file system used in modern versions of Windows is the New Technology File System or simply NTFS"

đáp án
```
new technology file system
```
task 5:

task 5

ở task này, em học về thư mục windows.

thư mục windows thường nằm ở:

```text
C:\Windows
```

thư mục này dùng để chứa các file của hệ điều hành windows.

nhưng nó không bắt buộc phải luôn nằm ở ổ C.

=> vì vậy windows dùng biến môi trường để trỏ tới đúng vị trí thư mục windows.

biến môi trường là nơi lưu các thông tin của hệ thống, ví dụ:

```text
đường dẫn hệ điều hành
số lượng CPU
vị trí thư mục tạm
```

trong task còn nhắc tới thư mục:

```text
System32
```

System32 nằm bên trong thư mục Windows.

đây là thư mục rất quan trọng vì chứa nhiều file core của hệ điều hành.

lưu ý:

```text
xóa nhầm file trong System32 -> windows có thể lỗi / không chạy được
```

câu hỏi lab hỏi là:

```text
what is the system variable for the windows folder?
```

hiểu đơn giản là:

```text
biến hệ thống đại diện cho thư mục windows là gì?
```

trong bài có ghi rõ:

```text
the system environment variable for the Windows directory is %windir%
```

=> đáp án là:

```text
%windir%
```


task 6

ở task này, em học về user accounts trên windows.

trên windows local thường có 2 loại tài khoản:

```text
Administrator
Standard User
```

Administrator -> có quyền cao, có thể thêm user, xóa user, sửa group, đổi setting hệ thống

Standard User -> quyền thấp hơn, chỉ sửa được file/folder của chính user đó, không đổi được các thiết lập cấp hệ thống

khi tạo user mới, windows sẽ tạo profile riêng cho user

profile của user thường nằm trong:

```text
C:\Users
```

ví dụ user tên Max thì profile sẽ là:

```text
C:\Users\Max
```

ngoài phần Settings, em có thể xem user bằng Local Users and Groups

cách mở:

```text
Win + R
```

sau đó nhập:

```text
lusrmgr.msc
```

rồi Enter.

sau khi mở `lusrmgr.msc`, em thấy có 2 mục chính:

```text
Users
Groups
```

Users -> dùng để xem danh sách tài khoản local.

Groups -> dùng để xem các nhóm quyền trên máy.

user thuộc group nào -> sẽ kế thừa quyền của group đó.

một user có thể nằm trong nhiều group cùng lúc.

câu hỏi 1:

```text
What is the name of the other user account?
```

hiểu đơn giản là hỏi: tên user khác trên máy là gì?

cách tìm:

```text
mở lusrmgr.msc -> chọn Users -> xem danh sách user
```

<img width="1919" height="1014" alt="image" src="https://github.com/user-attachments/assets/5c117773-2e01-4f55-b380-1e1b6826d167" />

trong danh sách Users, em thấy ngoài các tài khoản mặc định còn có user:

<img width="1918" height="1079" alt="image" src="https://github.com/user-attachments/assets/3997e7a9-4a34-4fc5-afdd-514fed13d612" />

```text
tryhackmebilly
```

=> đáp án:

```text
tryhackmebilly
```

câu hỏi 2:

```text
What groups is this user a member of?
```

hiểu đơn giản là hỏi: user này thuộc những group nào

cách tìm:

```text
mở lusrmgr.msc -> Users -> double click tryhackmebilly -> tab Member Of
```

<img width="1900" height="1011" alt="image" src="https://github.com/user-attachments/assets/fc791aad-7aa8-4baa-be0b-bdc667c7954d" />


trong tab Member Of sẽ hiện các group mà user này thuộc về.

=> đáp án:

```text
Remote Desktop Users,Users
```

câu hỏi 3:

```text
What built-in account is for guest access to the computer?
```

hiểu đơn giản là hỏi: tài khoản built-in nào dùng cho khách truy cập máy?

cách tìm:

```text
mở lusrmgr.msc -> Users -> nhìn cột Name
```

<img width="1893" height="1019" alt="image" src="https://github.com/user-attachments/assets/f5770944-fa40-4d01-909d-fdd48cc8fa4b" />


trong danh sách có tài khoản:

```text
Guest
```

đây là tài khoản mặc định dùng cho guest access.


=> đáp án:


```text
Guest
```


câu hỏi 4:


```text
What is the account description?
```


hiểu đơn giản là hỏi: mô tả của tài khoản Guest là gì?


cách tìm:


```text
mở lusrmgr.msc -> Users -> nhìn dòng Users -> cột Description
```


ở dòng Guest, phần Description ghi là:

 
```text
window$Fun1!
```


<img width="1885" height="1017" alt="image" src="https://github.com/user-attachments/assets/b320c2ff-14b1-4501-aebf-f708f5f58929" />



=> đáp án:

```text
window$Fun1!
```
task 7

ở task này, em học về User Account Control (UAC).

trên windows, nhiều user cá nhân thường đăng nhập bằng tài khoản local administrator.

administrator -> có quyền thay đổi hệ thống.

nhưng không phải lúc nào user cũng cần chạy với quyền cao.

ví dụ:

```text
lướt web
mở word
xem file
làm việc bình thường
```

=> mấy việc này không cần quyền administrator cao.

nếu lúc nào cũng chạy quyền cao -> nguy hiểm hơn.

lý do:

```text
malware chạy theo quyền của user
user có quyền admin -> malware cũng dễ tác động hệ thống hơn
```

để giảm rủi ro này, microsoft tạo ra UAC.

UAC xuất hiện từ Windows Vista và tiếp tục có trong các bản Windows sau đó.

lưu ý:

```text
UAC mặc định không áp dụng cho built-in local administrator account
```

cách UAC hoạt động:

khi user thuộc nhóm administrator đăng nhập vào windows, phiên làm việc ban đầu không chạy full quyền cao.

khi chương trình cần quyền cao hơn -> windows hiện hộp thoại UAC để hỏi xác nhận.

ví dụ khi cài chương trình:

```text
double click file cài đặt
-> hiện biểu tượng cái khiên
-> UAC prompt xuất hiện
-> yêu cầu xác nhận / nhập password admin
```

biểu tượng cái khiên trên icon chương trình nghĩa là:

```text
chương trình cần quyền cao để chạy
```

nếu không nhập password hoặc không cho phép -> chương trình không được cài.

=> UAC giúp giảm khả năng malware tự ý thay đổi hệ thống.

câu hỏi lab hỏi là:

```text
What does UAC mean?
```

hiểu đơn giản là:

```text
UAC là viết tắt của cụm từ gì?
```

trong bài có ghi rõ tên đầy đủ là User Account Control.

=> đáp án:

```text
User Account Control
```


task 8

ở task này, em học về Settings và Control Panel trên Windows.

đây là 2 nơi chính dùng để thay đổi cấu hình hệ thống.

Settings -> giao diện mới hơn, xuất hiện từ Windows 8.

Control Panel -> giao diện cũ hơn, dùng để chỉnh nhiều thiết lập nâng cao.

ví dụ:

```text
thêm máy in
gỡ chương trình
xem phần mềm đã cài
đổi network adapter
chỉnh firewall
```

Settings hiện nay là nơi user thường mở trước khi muốn đổi setting.

nhưng một số mục nâng cao vẫn sẽ chuyển qua Control Panel.

ví dụ:

```text
Settings
-> Network & Internet
-> Change adapter options
-> mở cửa sổ thuộc Control Panel
```

nếu không biết mục cần chỉnh nằm ở đâu -> dùng Start Menu để search.

ví dụ search:

```text
wallpaper
```

=> Windows sẽ đưa tới đúng mục đổi hình nền trong Settings.

Control Panel còn có mục Programs and Features.

mục này dùng để xem phần mềm đã cài trên máy.

có thể thấy:

```text
tên phần mềm
publisher
version
```

trong forensics, mục này giúp kiểm tra máy có phần mềm lạ nào được cài thêm không.

câu hỏi lab hỏi là:

```text
In the Control Panel, change the view to Small icons. What is the last setting in the Control Panel view?
```

hiểu đơn giản là:

```text
vào Control Panel -> đổi View by thành Small icons -> xem mục cuối cùng là gì?
```

cách làm:

```text
mở Start Menu
-> search Control Panel
-> mở Control Panel
-> góc phải chọn View by: Small icons
-> kéo xuống / nhìn mục cuối cùng
```

<img width="1889" height="954" alt="image" src="https://github.com/user-attachments/assets/7b345faf-af93-4d9c-a347-4ee237ae03b1" />

mục cuối cùng trong lab là:

```text
Windows Defender Firewall
```

=> đáp án:

```text
Windows Defender Firewall
```

task 9

ở task này, em học về task manager trên windows.

task manager dùng để xem các chương trình và tiến trình đang chạy trên hệ thống.

trong task manager có thể xem:

```text
ứng dụng đang mở
process đang chạy
cpu đang dùng bao nhiêu
ram đang dùng bao nhiêu
hiệu năng hệ thống
```

cách mở task manager:

```text
right-click taskbar -> task manager
```

hoặc dùng phím tắt:

```text
ctrl + shift + esc
```

khi mới mở, task manager có thể hiện ở simple view.

simple view -> chỉ hiện ít thông tin.

muốn xem chi tiết hơn thì bấm:

```text
more details
```

sau đó task manager sẽ hiện nhiều tab và nhiều thông tin hơn.

trong forensics, task manager giúp em kiểm tra nhanh process lạ đang chạy trên máy.

ví dụ có thể soi:

```text
process lạ
app đang chạy nền
mức cpu/ram bất thường
chương trình nghi malware
```

câu hỏi lab hỏi là:

```text
what is the keyboard shortcut to open task manager?
```

hiểu đơn giản là:

```text
phím tắt để mở task manager là gì?
```

đáp án:

```text
ctrl + shift + esc
```
<img width="900" height="335" alt="image" src="https://github.com/user-attachments/assets/d6bedd5b-64e2-44a2-88d4-7da498f45ad1" />





{% endraw %}
