---
layout: post
title: 'Task 3: Volatility và Phân Tích Ram'
tags:
  - writeup
  - ctf
---

## Dump Ram

\*\*cách 1 lấy ram máy thật\*\*

công cụ \`\`\`ftk imager bản portable\`\`\`

bước 1 chép công cụ vào một usb sạch

bước 2 cắm usb vào máy đang cần lấy ram

bước 3 chuột phải vào file ftk imager.exe chọn run as administrator

bước 4 trên thanh công cụ nhấn file chọn capture memory

bước 5 ở dòng destination path nhấn browse và chọn đường dẫn lưu vào usb

bước 6 tích chọn include pagefile nếu muốn lấy thêm bộ nhớ ảo

bước 7 nhấn capture đợi chạy xong là có file mem

\*\*cách 2 lấy ram máy ảo\*\*

\*với vmware\*

bước 1 lúc máy ảo đang chạy nhấn nút suspend để tạm dừng

bước 2 mở thư mục chứa máy ảo trên máy thật

bước 3 tìm copy file có đuôi .vmem ra chỗ khác

file .vmem chính là file ram của máy ảo

\*với virtualbox\*

bước 1 mở cmd trên máy thật

bước 2 gõ lệnh vboxmanage debugvm "tên_máy_ảo" dumpguestcore --filename ramdump.elf

bước 3 lấy file ramdump.elf vừa tạo ra để dùng

---

## Volatility là gì 

volatility là framework mã nguồn mở dùng để phân tích ảnh bộ nhớ ram trong điều tra số,

ứng phó sự cố, phân tích malware và nghiên cứu hệ điều hành

volatility không phải công cụ thu thập RAM, nó chỉ đọc và  phân tích file dump có sẵn để tìm thông tin cần thiết

\`\`\`volatility2\`\`\` là thế hệ cũ với mô hình profile, address space, overlay và plugin dựa nhiều vào

python2

\`\`\`volatility3\`\`\` là bản viết lại với context, symbol table, translation layer, template, object,

automagic, requirements và treegrid

\*\*1. memory forensics và cách volatility nhìn ảnh nhớ\*\*

\*ram không phải là ổ đĩa\*

ổ đĩa thường lưu file và metadata theo cấu trúc tương đối ổn định, còn ram chứa trạng thái

đang chạy của hệ điều hành và ứng dụng tại một thời điểm

ram có thể chứa \`\`\`object chưa từng được ghi đầy đủ\`\`\` xuống ổ đĩa như \`\`\`token, command line,

socket, khóa mã hóa, vùng code đã giải mã và dữ liệu tạm\`\`\`

\`\`\`RAM\`\`\`có thể thiếu dữ liệu do \`\`\`swap\`\`\`, \`\`\`vùng nhớ không được thu thập\`\`\`, \`\`\`nén bộ nhớ\`\`\`, \`\`\`lỗi đọc\`\`\` hoặc \`\`\`memory image không đầy đủ\`\`\`. Vì vậy, không tìm thấy \*\*artifact không có nghĩa là nó chưa từng tồn tại\*\* 

plugin thường làm việc với \*\*\`virtual address\`\*\* do kernel hoặc process sử dụng, nhưng dữ liệu trong memory dump lại nằm ở \*\*\`physical address\`\*\* hoặc \*\*\`file offset\`\*\*. vì vậy framework phải dịch địa chỉ theo chuỗi:

\*\*\`virtual address\` → \`page table/dtb\` → \`physical address\` → \`file offset\` → byte trong memory dump\*\*

nếu một bước dịch bị sai, plugin có thể báo lỗi, trả output rỗng, hoặc nguy hiểm hơn là trả về dữ liệu có vẻ hợp lệ nhưng thực tế bị đọc hoặc diễn giải sai.

\*\*list và scan\*\*

\*\*list plugin\*\* thường đi theo \*\*linked list\*\* hoặc các \*\*cấu trúc quản lý chuẩn của kernel\*\* để lấy ra các object mà hệ điều hành đang quản lý. Có thể hình dung giống như xem \*\*mục lục của một cuốn sách\*\*: plugin dựa vào "danh sách" có sẵn để tìm process hoặc object

\*\*scan plugin\*\* thì không phụ thuộc hoàn toàn vào linked list đó mà \*\*quét các vùng nhớ\*\* để tìm \*\*chữ ký, header hoặc object có hình dạng phù hợp\*\*. Có thể hình dung như tự lật các trang của cả cuốn sách để tìm nội dung, thay vì chỉ xem mục lục

\*\*malware có thể unlink object khỏi linked list\*\*, làm cho object không còn xuất hiện trong danh sách quản lý của kernel nhưng dữ liệu của object chưa chắc bị xóa ngay khỏi RAM. Vì vậy cùng một memory dump, \*\*list và scan có thể cho kết quả khác nhau\*\*

Cách làm hợp lý là dùng \*\*nhiều góc nhìn để đối chiếu\*\* như \`pslist\`, \`psscan\`, \`pstree\`, \`netscan\`, \`malfind\`, \*\*module list\*\*, \*\*handle\*\* và \*\*command line\*\*. Sau đó kết hợp với \*\*dữ liệu trên ổ đĩa và log\*\* để xem các dấu vết có khớp với nhau hay không.

\*\*giữ nguyên hiện trạng và kiểm chứng memory dump\*\*

Trước khi phân tích cần ghi lại \*\*hash, kích thước file, thời điểm thu thập, nguồn ảnh, công cụ thu thập, phiên bản framework, phiên bản Python và command line\*\* để có thể kiểm tra lại nguồn gốc và tính toàn vẹn của memory dump.

Nên dùng \*\*bản sao làm việc\*\* để phân tích thay vì chỉnh sửa trực tiếp file gốc. Nếu cần thao tác hoặc chuyển đổi dữ liệu thì giữ lại file gốc để đối chiếu.

Có thể kiểm tra nhanh bằng các lệnh:

\`\`\`

sha256sum memory.raw

stat memory.raw

file memory.raw

\`\`\`

--- 

## Volatility2

luồng cơ bản của volatility có thể mô tả như sau

<img width="2048" height="768" alt="image" src="https://github.com/user-attachments/assets/ca753713-c184-4062-8760-6610aaaf2f38" />


tham số \`\`\`-f\`\`\` trỏ tới ảnh nhớ, \`\`\`--profile\`\`\` chọn mô tả hệ điều hành và plugin quyết định cách

truy vấn object

\`\`\`

python2 vol.py -f memory.raw --profile=win7sp1x64 pslist

\`\`\`

trong volatility, nhiều option được quản lý qua cấu hình chung hoặc được plugin đăng ký

riêng, nên cách đặt tên và cách xuất file có thể không đồng nhất
