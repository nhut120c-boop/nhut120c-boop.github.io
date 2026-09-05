---
layout: post
title: "Bronco CTF : Suspicious Remix 2"
tags: [writeup, ctf]
---
{% raw %}

## Tên challenge: Suspicious Remix 2
## Tác giả: blunderous_wonders
## Mảng: Forensics 
---
Đầu tiên mình tải 2 file về và đọc đề 

<img width="387" height="247" alt="image" src="https://github.com/user-attachments/assets/e8028f3f-dd01-49aa-ac8f-916130298b19" />


```
They told me it's supposedly more hide-n, whatever that means. I keep seeing with a command prompt, typing the steg command...

Also they told me there's a password of this, apparently it's in this image?
```

Qua 2 câu này gần như lộ toàn bộ cách giải bài này 


Mình xử lí file hình trước, mình xem qua bức ảnh 


<img width="500" height="409" alt="tolerate_this" src="https://github.com/user-attachments/assets/cc682e1b-f7d1-43da-a3fd-638678d7e519" />


không thấy có dấu hiệu bất thường nên mình xài zsteg để phân tích kĩ hơn 


Mình xài ``` https://www.aperisolve.com/ ```


Thấy ở kênh red có chữ lộ ra là


<img width="500" height="409" alt="image" src="https://github.com/user-attachments/assets/7a135d52-0b91-48df-a162-6de3e07f3993" />


<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/9c4d59e0-d821-4a97-9d41-b2a7bd843ec5" />

Sau khi nghe đoạn wav thì mình biết được nó là bài ```Together Forever``` vào năm 1988


Dựa vào đề bài, mình nghĩ là tác giả đã xài steghide để giấu dữ liệu vào file sg_remix2.wav


Với password là 1988 đã có thì mình chạy thẳng lệnh 

```
steghide extracted -sf sg_remix2.wav -p "1988"
```

Và được file ```got_u_so_good.txt ```


<img width="1037" height="183" alt="image" src="https://github.com/user-attachments/assets/299a8e0e-14d4-4bcb-af51-28c3ee82f377" />


mình cat file got_u_so_good.txt và được flag là ```bronco{7h3y_g07_y0u_4g4in_didn'7_7h3y?}```


<img width="812" height="116" alt="image" src="https://github.com/user-attachments/assets/91d02cd9-1701-4205-b0a9-95489cf53d97" />

---
ZeroD 


{% endraw %}

