---
layout: post
title: "Tryhackme: Windows Fundamentals 2"
tags: [writeup, ctf, study]
---
{% raw %}
# Windows-Fundamentals-2

task 1 

module này tiếp tục windows fundamentals 1

nội dung chính -> học thêm các công cụ có sẵn trong windows như: system configuration, uac settings, computer management, system information, resource monitor, command prompt, registry editor

để làm lab -> bấm start machine

task 2

ở task này, em học về system configuration và advanced system settings

system configuration còn được gọi là msconfig

msconfig là công cụ dùng để troubleshoot các lỗi liên quan đến quá trình khởi động windows

nói dễ hiểu hơn thì khi windows boot lỗi, service bị lỗi, hoặc nghi có thứ gì đó làm máy khởi động bất thường thì có thể dùng msconfig để kiểm tra

cách mở msconfig

```text
win + r -> msconfig -> enter
```

hoặc

```text
start menu -> search system configuration
```

lưu ý là muốn mở msconfig thì cần quyền local administrator

trong msconfig có 5 tab chính

```text
general
boot
services
startup
tools
```

tab general dùng để chọn cách windows load khi khởi động

normal startup -> khởi động bình thường, load đầy đủ driver và service

diagnostic startup -> chỉ load driver và service cơ bản, dùng để kiểm tra lỗi

selective startup -> cho phép chọn thành phần nào sẽ được load khi boot

tab boot dùng để chỉnh các tùy chọn khởi động của hệ điều hành

ví dụ có thể chỉnh safe boot, boot log hoặc timeout

trong forensics, tab boot có thể giúp kiểm tra máy có bị chỉnh option khởi động bất thường không

tab services liệt kê các service có trên hệ thống

service là dạng chương trình chạy nền trong windows

service có thể đang running hoặc stopped

trong forensics, tab services rất quan trọng vì malware có thể tạo service để tự chạy lại sau khi restart máy

nếu thấy service lạ, manufacturer lạ hoặc service nằm ở đường dẫn bất thường thì cần kiểm tra kỹ hơn

tab startup dùng để xem các chương trình tự chạy khi user đăng nhập

nhưng trong máy lab này là windows server nên tab startup thường không hiện giống windows 10 hoặc windows 11

với windows server, để xem startup user-level thì dùng lệnh

```text
win + r -> shell:startup
```

folder startup sẽ hiện các shortcut hoặc file được cấu hình chạy tự động khi user đăng nhập

trong forensics, startup folder cũng là nơi cần soi vì malware có thể đặt shortcut ở đây để tự chạy mỗi lần user login

tab tools chứa nhiều công cụ hệ thống có sẵn trong windows

mỗi tool sẽ có phần mô tả ngắn để biết công cụ đó dùng làm gì

khi chọn một tool, phần selected command sẽ hiện lệnh dùng để mở tool đó

có thể bấm launch để chạy tool hoặc copy command đem chạy bằng run / cmd

advanced system settings là nơi chỉnh các thiết lập nâng cao của hệ thống

cách mở

```text
start menu -> search view advanced system settings
```

trong advanced system settings có các mục quan trọng như performance và startup and recovery

performance dùng để chỉnh các thiết lập liên quan đến hiệu năng của windows

trong performance có phần page file

page file là bộ nhớ ảo mà windows dùng thêm khi ram bị đầy

khi ram không đủ, windows có thể dùng một phần ổ đĩa làm virtual memory để tránh chương trình bị crash

page file có thể cho biết các thông tin như

```text
ổ đĩa chứa page file
initial size
maximum size
windows có tự quản lý size không
```

trong forensics, page file có thể hữu ích vì đôi khi nó còn chứa dấu vết dữ liệu từng nằm trong ram

ví dụ có thể còn sót chuỗi text, command, đường dẫn file, hoặc dữ liệu liên quan đến process từng chạy

startup and recovery dùng để chỉnh hành vi của windows khi hệ thống bị lỗi nặng

ví dụ khi máy bị blue screen of death

windows có thể tạo crash dump để lưu lại thông tin tại thời điểm hệ thống bị crash

crash dump giúp admin hoặc analyst phân tích nguyên nhân lỗi

các loại crash dump thường gặp gồm

```text
automatic memory dump
kernel memory dump
small memory dump
complete memory dump
none
```

trong forensics, crash dump có thể chứa thông tin về process, driver hoặc lỗi hệ thống tại thời điểm crash

nếu máy bị malware làm crash hoặc driver độc hại gây lỗi thì crash dump có thể giúp tìm manh mối

tóm tắt task 2

msconfig -> dùng để troubleshoot lỗi startup

general -> chọn kiểu windows khởi động

boot -> chỉnh tùy chọn boot

services -> soi service chạy nền

startup -> soi app tự chạy khi login

tools -> xem command mở các công cụ windows

advanced system settings -> xem performance, page file và crash dump

trong forensics, task này giúp em kiểm tra service lạ, startup bất thường, bộ nhớ ảo và crash dump để tìm dấu hiệu hệ thống bị can thiệp

trả lời câu hỏi

```text
câu hỏi 1

what is the name of the service that lists systems internals as the manufacturer?

cách tìm

mở msconfig -> tab services -> tìm cột manufacturer có systems internals -> lấy tên service ở cột service
```

<img width="1905" height="1023" alt="image" src="https://github.com/user-attachments/assets/f7b4badb-0f15-479b-bd42-d7fc4a223a35" />

đáp án

```
psshutdown
```

```text
câu hỏi 2

whom is the windows license registered to?

cách tìm

mở msconfig -> tab tools -> chọn about windows -> bấm launch -> xem dòng registered to
```
<img width="1894" height="1030" alt="image" src="https://github.com/user-attachments/assets/0ad0b364-795e-4cde-803c-9319667f566d" />

đáp án

```
windows user
```


```text
câu hỏi 3

what is the command for windows troubleshooting?

cách tìm

mở msconfig -> tab tools -> chọn windows troubleshooting -> nhìn phần selected command

```
<img width="1903" height="1028" alt="image" src="https://github.com/user-attachments/assets/0d97a21b-59fd-4e97-ae1a-a1b6a6815d41" />

đáp án
```
c:\windows\system32\control.exe /name microsoft.troubleshooting
```

```text
câu hỏi 4

what command will open the control panel?

cách tìm

mở msconfig -> tab tools -> chọn system properties -> nhìn phần selected command
```

<img width="1910" height="1012" alt="image" src="https://github.com/user-attachments/assets/eb53da1f-5b9d-42f3-955c-ae82abbefb7e" />

đáp án

```
control.exe
```

task 3

ở task này, em học về cách thay đổi uac settings trong windows

uac là user account control

uac dùng để cảnh báo khi app hoặc user muốn thay đổi những thứ ở cấp hệ thống

ví dụ như cài phần mềm, sửa setting quan trọng, hoặc chạy chương trình cần quyền admin

nói dễ hiểu hơn

uac giống như lớp hỏi lại của windows

nó không cho app tự nhiên chạy quyền cao ngay lập tức

nếu chương trình cần quyền admin -> windows sẽ hiện bảng xác nhận

mục đích của uac là giảm rủi ro malware tự ý sửa hệ thống

trong task này, uac settings có thể mở thông qua system configuration -> tools

trong cửa sổ uac settings sẽ có một thanh trượt

thanh trượt này có 4 mức bảo mật

mức 1

always notify

đây là mức cao nhất

windows sẽ báo mỗi khi app hoặc chính user muốn thay đổi hệ thống

màn hình sẽ bị làm tối lại bằng secure desktop

mức này an toàn hơn nhưng có thể hơi phiền vì hỏi nhiều

mức 2

notify for apps

windows chỉ báo khi app cố thay đổi hệ thống

nếu user tự đổi setting windows thì thường không báo

đây là mức mặc định của windows

mức này cân bằng giữa bảo mật và tiện dụng

mức 3

notify without dimming

giống mức notify for apps

nhưng màn hình không bị làm tối

mức này kém an toàn hơn một chút vì không dùng secure desktop

mức 4

never notify

windows sẽ không cảnh báo khi app hoặc user thay đổi hệ thống

mức này không được khuyến nghị

vì nếu malware chạy được thì nó có thể dễ dàng thay đổi hệ thống hơn mà user không được cảnh báo

trong forensics, uac settings cũng đáng chú ý

nếu thấy uac bị tắt hoặc đặt ở never notify -> có thể là dấu hiệu máy bị cấu hình yếu bảo mật hoặc đã bị malware chỉnh để dễ leo quyền / chạy lệnh nguy hiểm

vì vậy khi điều tra máy windows, em có thể kiểm tra uac để biết hệ thống có đang bật lớp cảnh báo quyền admin hay không

trả lời câu hỏi

```text
câu hỏi

what is the command to open user account control settings?

câu này hỏi file .exe dùng để mở cửa sổ user account control settings

đề nói chỉ lấy tên file .exe, không lấy full path

vì vậy không cần ghi đường dẫn đầy đủ

```
<img width="1919" height="977" alt="image" src="https://github.com/user-attachments/assets/07401c87-46d2-41cf-b67e-b83bcc7dc350" />

đáp án

```
UserAccountControlSettings.exe
```

task 4

ở task này, em học về computer management trên windows

computer management là công cụ gom nhiều tiện ích quản lý hệ thống vào một cửa sổ

<img width="1050" height="964" alt="image" src="https://github.com/user-attachments/assets/2f684e64-34f1-4111-ab69-d2102caa4035" />


thay vì mở từng tool riêng lẻ, em có thể dùng computer management để xem nhiều phần quan trọng như task scheduler, event viewer, shared folders, local users and groups, performance, device manager, disk management và services

computer management có 3 nhóm chính

```text
system tools
storage
services and applications
```

<img width="1246" height="900" alt="image" src="https://github.com/user-attachments/assets/8f97d978-55fa-4dd5-b3d2-b1378eec2ec5" />


system tools là nhóm dùng để xem và quản lý các thành phần hệ thống

trong system tools có task scheduler

<img width="1225" height="890" alt="image" src="https://github.com/user-attachments/assets/1b085e25-05b3-418a-ac9c-6991a1204149" />


task scheduler dùng để tạo và quản lý các tác vụ tự động

một task có thể chạy chương trình, script hoặc command theo điều kiện nhất định

ví dụ task có thể chạy khi user đăng nhập, khi máy khởi động, hoặc theo lịch cố định mỗi ngày

trong forensics, task schedule qtrong

vì malware có thể tạo scheduled task để tự chạy lại sau khi restart hoặc sau khi user login

khi soi task scheduler, cần chú ý

```text
tên task
trạng thái task
trigger
last run time
last run result
actions
command được chạy
```

trigger cho biết task chạy khi nào

actions cho biết task sẽ chạy chương trình hoặc command gì

nếu thấy action chạy powershell, cmd, file exe lạ hoặc script trong thư mục lạ thì cần điều tra kỹ hơn

trong ảnh lab, task scheduler library hiển thị các task có sẵn trên máy

task npcapwatchdog được hỏi trong lab vì nó là scheduled task có cấu hình thời điểm chạy cụ thể

muốn biết task chạy lúc nào thì phải xem cột triggers

event viewer là công cụ dùng để xem log sự kiện trên windows

event log giống như dấu vết hoạt động của hệ thống

nó ghi lại các sự kiện như lỗi chương trình, đăng nhập thành công, đăng nhập thất bại, service lỗi, driver lỗi hoặc hoạt động bảo mật

<img width="1233" height="888" alt="image" src="https://github.com/user-attachments/assets/62408580-eb31-4bff-a28a-3f726ff80908" />


<img width="742" height="304" alt="image" src="https://github.com/user-attachments/assets/ed0e18bc-5ed7-4c94-86fb-2cd220745044" />


các loại event thường gặp gồm

```text
error
warning
information
success audit
failure audit
```

error -> lỗi nghiêm trọng

warning -> cảnh báo, có thể chưa lỗi ngay nhưng có nguy cơ

information -> thông tin hoạt động bình thường

success audit -> hành động bảo mật thành công, ví dụ đăng nhập thành công

failure audit -> hành động bảo mật thất bại, ví dụ đăng nhập sai

trong windows logs có các log phổ biến như

```text
application
security
system
```

<img width="737" height="439" alt="image" src="https://github.com/user-attachments/assets/0e3a8681-ab9d-4d21-8c94-337e0fad5439" />


application -> log của ứng dụng

security -> log đăng nhập, audit, truy cập tài nguyên

system -> log của thành phần hệ thống, driver, service

trong for, event viewer giúp dựng lại timeline và biết chuyện gì đã xảy ra trên máy

ví dụ có thể soi đăng nhập bất thường, service bị lỗi, task được chạy, hoặc phần mềm nào gây lỗi

shared folders dùng để xem các thư mục đang được chia sẻ trên máy

trong shared folders có các mục như shares, sessions và open files

shares -> danh sách thư mục đang share

sessions -> user nào đang kết nối tới share

open files -> file nào đang được user khác mở qua share

trong windows có các share mặc định như

```text
admin$
c$
ipc$
```

shared folders

`$` sau tên share -> hidden share

hidden share -> không hiện khi duyệt mạng thường, nhưng biết path + có quyền thì vẫn vào được


<img width="1234" height="878" alt="image" src="https://github.com/user-attachments/assets/6d2bad99-b6cf-41b0-8441-2e283b588d91" />


trong for -> soi share lạ, share thư mục nhạy cảm 

local users and groups

quản lý user + group local

giống `lusrmgr.msc`

trong for -> soi user lạ, user mới tạo, user bị add vào administrators

performance


<img width="1216" height="861" alt="image" src="https://github.com/user-attachments/assets/b0720020-aad0-4c1d-98a0-e3128cc41e1d" />


có performance monitor, perfmon


<img width="1226" height="875" alt="image" src="https://github.com/user-attachments/assets/b4203dc4-3562-4670-b1ec-ddc4fbbb1b5b" />


xem cpu, ram, disk, network theo realtime hoặc log

dùng khi máy chậm / nghi process ăn tài nguyên

device manager

<img width="1245" height="911" alt="image" src="https://github.com/user-attachments/assets/95bba4c2-43f6-4f7e-a1eb-d05ca98ca3b8" />


xem phần cứng + driver

trong for -> soi driver lạ, thiết bị lạ, network adapter bất thường

storage

liên quan ổ đĩa

disk management -> xem disk, partition, file system, drive letter

<img width="1282" height="909" alt="image" src="https://github.com/user-attachments/assets/fdc86c5f-96b4-4a7a-bd0c-f246bc0d694c" />


trong for -> soi partition lạ, ổ phụ, ổ  đĩa lạ

services and applications

chứa services + wmi control

services -> xem service chạy nền

<img width="1229" height="880" alt="image" src="https://github.com/user-attachments/assets/ae0f05d1-1a68-464e-a085-07f7de6f906c" />


```text
automatic -> tự chạy khi boot
manual -> chỉ chạy khi được gọi
disabled -> không cho chạy
```

<img width="1226" height="889" alt="image" src="https://github.com/user-attachments/assets/d33fa6ab-e87e-43d8-9167-7b2007ae65f4" />


trong for , services là nơi rất cần soi

vì malware hay tạo service mới để persistence

nếu service có path lạ, tên lạ, chạy từ temp/appdata/downloads hoặc startup type là automatic thì cần kiểm tra kĩ

wmi control dùng để cấu hình windows management instrumentation

wmi cho phép quản lý windows bằng script hoặc powershell, cả local và remote

trong forensics, wmi cũng đáng chú ý vì attacker có thể lợi dụng wmi để chạy lệnh hoặc tạo persistence

```text
câu hỏi 1

what is the command to open computer management

câu này hỏi file .msc dùng để mở computer management
```

<img width="873" height="257" alt="image" src="https://github.com/user-attachments/assets/b82259d4-426b-4837-a548-78144da05c26" />


đáp án
```
compmgmt.msc
```

```text
câu hỏi 2

when is the npcapwatchdog scheduled task set to run at

hỏi task npcapwatchdog được đặt chạy khi nào

trong lab, npcapwatchdog có trigger là chạy lúc hệ thống khởi động

```

<img width="1909" height="1018" alt="image" src="https://github.com/user-attachments/assets/3c03bf8e-abf2-4790-a56e-b9b5e196c856" />

đáp án
```
at system startup
```

```text
câu hỏi 3

what is the name of the hidden folder that is shared

câu này hỏi tên folder bị share dạng hidden

muốn tìm thì vào computer management -> shared folders -> shares

folder hidden share trong lab 

```

<img width="1910" height="953" alt="image" src="https://github.com/user-attachments/assets/6a62992d-ba5f-42a3-ac65-21d7ead3706c" />

```

đáp án

sh4r3dF0ld3r
```

task 5

system information = `msinfo32`

dùng để xem thông tin tổng quan của máy

cách mở

```text
win + r -> msinfo32
```

hoặc

```text
msconfig -> tools -> system information
```

<img width="691" height="486" alt="image" src="https://github.com/user-attachments/assets/7b7d65ab-b76a-4da7-85cb-a03f301101ad" />

<img width="665" height="470" alt="image" src="https://github.com/user-attachments/assets/71cc01de-4ab0-4478-b2a5-97b3886ef384" />

msinfo32 có 3 nhóm chính

```text
hardware resources
components
software environment
```
<img width="1787" height="901" alt="image" src="https://github.com/user-attachments/assets/dfd84f0a-bb2c-4b17-b439-47e3aade7abf" />


system summary

xem info tổng quan của máy

<img width="1783" height="919" alt="image" src="https://github.com/user-attachments/assets/282f595c-72cb-433a-9f52-1297ee630fc8" />

ví dụ

```text
os name
version
system name
processor
bios
ram
```

hardware resources

xem tài nguyên phần cứng


<img width="1765" height="895" alt="image" src="https://github.com/user-attachments/assets/c4795c90-f228-4166-949a-e72c569e48fc" />


ví dụ

```text
memory
irq
dma
i/o
```

phần này hơi sâu, thường dùng khi troubleshoot phần cứng

components

xem thiết bị / phần cứng trên máy


<img width="1785" height="913" alt="image" src="https://github.com/user-attachments/assets/80c3816e-d85a-4c56-924c-baa5a0370f8e" />


ví dụ

```text
display
sound device
keyboard
network adapter
storage
usb
problem devices
```

forensics -> soi thiết bị lạ, card mạng lạ, driver lạ

software environment

xem môi trường phần mềm của windows

<img width="1846" height="1013" alt="image" src="https://github.com/user-attachments/assets/339fa5d4-8ed7-4e95-bd64-c557417f842d" />


ví dụ

```text
system drivers
environment variables
network connections
running tasks
loaded modules
services
startup programs
```

forensics -> soi task, service, startup, module, biến môi trường bất thường



```text
câu hỏi 1

what is the command to open system information?
```
<img width="930" height="473" alt="image" src="https://github.com/user-attachments/assets/008bb339-c2ae-498b-8d48-7a8cfcb5c525" />

```
đáp án

msinfo32.exe
```
```
câu hỏi 2

what is listed under system name?

câu này hỏi tên máy đang hiển thị trong system information

system name = hostname của máy windows

vào `system summary`

tìm dòng `system name`

```
<img width="1895" height="956" alt="image" src="https://github.com/user-attachments/assets/18b2c65f-69c7-42da-9068-75d43b3176f5" />

```
đáp án

thm-winfun2
```
```
câu hỏi 3

under environment variables, what is the value for comspec?

câu này hỏi giá trị của biến môi trường comsspec

vào software environment

chọn environment variables

tìm biến comspec
```

<img width="1915" height="960" alt="image" src="https://github.com/user-attachments/assets/10fb2353-a844-41e1-a024-92fb72075322" />

```

đáp án


%SystemRoot%\system32\cmd.exe

```
task 6

resource monitor = `resmon`

dùng để xem tài nguyên hệ thống theo từng process

xem được

```text
cpu
memory
disk
network
```

khác task manager ở chỗ resmon chi tiết hơn

nó cho biết process nào đang dùng cpu, ram, disk, network

overview

hiển thị tổng quan 4 phần chính

```text
cpu
disk
network
memory
```

cpu

xem process nào đang dùng cpu

có thể thấy

```text
image
pid
description
status
threads
cpu
average cpu
```

forensics -> soi process lạ, process ăn cpu bất thường, process bị suspended

memory

xem ram đang được dùng thế nào

có thể thấy

```text
hard faults/sec
commit
working set
shareable
private
```

forensics -> soi process ăn ram bất thường hoặc process đáng nghi đang chạy nền

disk

xem process nào đang đọc/ghi file trên ổ đĩa

có thể thấy

```text
file path
read b/sec
write b/sec
total b/sec
response time
```

forensics -> rất hữu ích để biết process đang đụng tới file nào

ví dụ process lạ ghi vào log, temp, appdata hoặc system32 thì cần soi tiếp

network

xem process nào đang dùng mạng

có thể thấy

```text
send
receive
local address
local port
remote address
remote port
listening ports
```

forensics -> soi kết nối lạ, ip lạ, port lạ, process đang nghe port

resmon còn có thể lọc theo process

tick vào process -> các tab disk/network/memory sẽ lọc theo process đó

dùng khi muốn điều tra riêng một process nghi ngờ

tóm tắt

resmon -> xem chi tiết cpu, ram, disk, network theo process

cpu -> process dùng cpu

memory -> process dùng ram

disk -> process đọc/ghi file nào

network -> process kết nối tới đâu

forensics -> soi process lạ, file bị ghi bất thường, kết nối mạng lạ, port đang mở

trả lời câu hỏi

```text
câu hỏi

what is the command to open resource monitor?

câu này hỏi file .exe dùng để mở resource monitor

resource monitor có tên lệnh là resmon

```
<img width="905" height="240" alt="image" src="https://github.com/user-attachments/assets/0d9f55cd-df43-4584-82a6-fdcc8b59a0ba" />

đáp án
```
resmon.exe
```

task 7

command prompt = `cmd`

cmd là nơi nhập lệnh để làm việc với windows

trước khi có giao diện gui, command line là cách chính để tương tác với hệ điều hành

giờ windows chủ yếu dùng gui, nhưng cmd vẫn rất hữu ích để xem thông tin hệ thống và troubleshoot

cách mở cmd

```text
win + r -> cmd
```

hoặc

```text
start menu -> search command prompt
```

một số lệnh cơ bản

`hostname`

dùng để xem tên máy

```text
hostname
```

<img width="1580" height="785" alt="image" src="https://github.com/user-attachments/assets/ce35a846-a4b9-403a-925f-607dae27b9f1" />



`whoami`


<img width="1163" height="565" alt="image" src="https://github.com/user-attachments/assets/c957e081-9d6b-4b79-8f38-d796e6e7b034" />


dùng để xem user hiện tại đang đăng nhập

```text
whoami
```

for-> biết lệnh đang chạy dưới quyền user nào

`ipconfig`

dùng để xem cấu hình mạng của máy

xem được ip address, subnet mask, gateway, dns

```text
ipconfig
```

muốn xem chi tiết hơn thì dùng

```text
ipconfig /alld
```

forensics -> soi ip, mac address, dns, dhcp, card mạng

`/?`

dùng để xem help của lệnh

ví dụ muốn xem hướng dẫn của ipconfig

```text
ipconfig /?
```

`cls`

dùng để xóa màn hình cmd

```text
cls
```

`netstat`

dùng để xem thống kê mạng và kết nối tcp/ip hiện tại

```text
netstat
```

có thể thêm tham số như `-a`, `-b`, `-e`

forensics -> soi kết nối mạng lạ, port đang mở, process đang kết nối

`net`

dùng để quản lý tài nguyên mạng, user, group, share, session

nếu gõ `net` không thì nó hiện các sub-command có thể dùng

```text
net
```

với lệnh `net`, muốn xem help thì không dùng `/?`

mà dùng

```text
net help
```

ví dụ xem help của net user

```text
net help user
```

một số sub-command hay gặp

```text
net user
net localgroup
net share
net session
net use
```

forensics -> soi user, group, share, session, kết nối mạng

tóm tắt

cmd -> nhập lệnh để lấy thông tin windows

hostname -> tên máy

whoami -> user hiện tại

ipconfig -> thông tin mạng

ipconfig /all -> thông tin mạng chi tiết

netstat -> kết nối mạng

net -> quản lý user/group/share/session

trả lời câu hỏi

```text
câu hỏi 1

in system configuration, what is the full command for internet protocol configuration?

câu này hỏi full command của tool internet protocol configuration trong system configuration

vì task đang nói các tool trong msconfig nên phải mở msconfig -> tools

chọn internet protocol configuration


```

<img width="938" height="750" alt="image" src="https://github.com/user-attachments/assets/5fa2ce0c-36a6-4a77-9b95-33cc5c779130" />


đáp án

```
c:\windows\system32\cmd.exe /k %windir%\system32\ipconfig.exe
```

```text
câu hỏi 2

for the ipconfig command, how do you show detailed information?

câu này hỏi dùng tham số nào để hiện thông tin chi tiết của ipconfig

muốn xem đầy đủ thì dùng /all

```

<img width="859" height="222" alt="image" src="https://github.com/user-attachments/assets/add17bdc-efd5-4c99-8f22-12b6d51d0f71" />


đáp án

```
ipconfig /all
```

task 8

registry editor là công cụ dùng để mở windows registry

windows registry là nơi lưu cấu hình của windows, user, app và phần cứng

cách mở từ run

```text
win + r -> regedit.exe
```

hoặc mở trong

```text
msconfig -> tools -> registry editor
```

lưu ý

registry dành cho user nâng cao

chỉnh sai registry có thể làm windows hoặc app bị lỗi

trong task này chỉ cần biết registry editor là tool để xem / chỉnh registry

trả lời câu hỏi

```text
câu hỏi

what is the command to open the registry editor?

câu này hỏi tên file .exe dùng để mở registry editor

ban đầu em nghĩ là regedit.exe nhưng ko đủ

theo format ô đáp án có 8 ký tự trước .exe nên chọn regedt32.exe

đáp án

regedt32.exe
```




{% endraw %}
