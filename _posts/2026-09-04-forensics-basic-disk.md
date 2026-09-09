---
layout: post
title: "Forensics: Basic Disk"
tags: [note, study]
---
{% raw %}
# Basic Disk
writeup: basic disk 2

công cụ dùng: ftk imager, registry explorer, db browser for sqlite

câu 1: tìm build number

em biết build number nằm trong registry hive `SOFTWARE` vì windows lưu toàn bộ thông tin phần mềm và hệ điều hành vào đó, cụ thể là key `Microsoft\Windows NT\CurrentVersion`, 

b1: mở file ảnh đĩa trong ftk imager, vào:

```
[root]\Windows\System32\config\
```

b2: chuột phải vào file SOFTWARE -> export file -> lưu ra desktop

<img width="1410" height="701" alt="image" src="https://github.com/user-attachments/assets/4d2690aa-fc00-4e83-9127-08de32141348" />


b3: mở registry explorer, load file `SOFTWARE` vừa export vào


b4: tìm tới CurrentVersion trong:

```
ROOT\Microsoft\Windows NT\CurrentVersion
```

<img width="1547" height="875" alt="image" src="https://github.com/user-attachments/assets/2bc826d5-9b9d-40b2-b8bd-f01c6d94e1e0" />

b5: nhìn khung bên phải, tìm 2 dòng:

<img width="695" height="370" alt="image" src="https://github.com/user-attachments/assets/33bf5e22-c36f-43cf-804c-4f2a72ab0fd2" />


kết quả câu 1: `Win10-19043`

câu 2: tìm tài liệu bí mật và mật khẩu

 tìm file tài liệu

quay lại ftk imager, bới các thư mục của user k137:


 em chỉ thấy Appdata với Downloads


 <img width="627" height="105" alt="image" src="https://github.com/user-attachments/assets/b15b8eba-ff5d-422f-a412-d0dc469c8cd1" />

 em lục vào appdata và tìm tới history của trình duyệt:

 <img width="810" height="583" alt="image" src="https://github.com/user-attachments/assets/756d82c8-e3d0-4710-b652-568e3627ae38" />

 sau đó export -> Desktop

 và dùng DB Browser đê tìm thêm thông tin 

 <img width="1370" height="322" alt="image" src="https://github.com/user-attachments/assets/6fc85b68-d2b9-4929-b8ad-8ba52f73e591" />

 em thấy user có tải winrar và 1 file exe lạ tên uwu, mà em lục không t

{% endraw %}
