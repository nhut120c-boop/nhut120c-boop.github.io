---
layout: post
title: "Bronco CTF : EX-BOOST"
tags: [writeup, ctf]
---
{% raw %}
## Tên challenge: EX-BOOST
## Tác giả: blunderous_wonders
## Mảng: Forensics
---
 Đầu tiên mình tải 3 ảnh về máy 

 <img width="732" height="326" alt="image" src="https://github.com/user-attachments/assets/ecdf4a75-52f3-43d6-aacf-5a49240ed7ea" />

Mô tả chall cũng đã gợi ý về màu rgb và nhắc mình chú ý về các thanh năng lượng, nên mình  quyết định quăng 3 file ảnh lên zsteg để phân tích các lớp màu ra để phân tích: 

 ở ảnh Tiger.png 

 <img width="164" height="146" alt="image" src="https://github.com/user-attachments/assets/ff3f59d2-9009-42d8-b2fc-450c9b971803" />

trong kênh red có chữ ẩn là F33L

<img width="865" height="380" alt="image" src="https://github.com/user-attachments/assets/5f77c16f-a3aa-4813-8856-f9f3ef306872" />


ở ảnh snake.png 

<img width="111" height="96" alt="image" src="https://github.com/user-attachments/assets/72fdee6a-e820-4de4-aef1-726778804855" />

trong kênh green có kí tự ẩn là TH3

<img width="717" height="366" alt="image" src="https://github.com/user-attachments/assets/73a62a47-7912-46ff-83cb-3c9693f9c083" />


ở ảnh Crane.png 

<img width="154" height="136" alt="image" src="https://github.com/user-attachments/assets/b6657fa7-374b-4b1a-b5ba-19ef03e3123e" />

trong kênh blue có kí ẩn là H34T

<img width="965" height="516" alt="image" src="https://github.com/user-attachments/assets/6065f357-2223-4228-bfb3-6bf196c43352" />


và ghép 3 chữ lại dù theo thứ tự RBG hay theo mô tả là các thanh năng lượng thì cũng đều được F33LTH3H34T


## flag là bronco{F33LTH3H34T}
--- 
Đọc xong lời giải phía trên, chắc anh em sẽ thắc mắc: "Ủa, bài này quăng lên web tách màu là ra, viết write-up làm gì? Mấy bài trước thường có độ phức tạp nhất định, sao nay lại lên bài cho một chall dễ thế này?"

Thật ra, tôi viết bài này để trải lòng về một vố đau do chính mình tự lừa mình.

Riêng bài này, tôi đã tốn một buổi tối chỉ vì câu mô tả: "But what's with the heat bar amount on each style? Are they trying to tell me something?"

Chính câu hỏi đó đã giăng ra một cái bẫy tâm lý quá hoàn hảo. Tôi tự kỷ ám thị rằng đằng sau nó là một thuật toán giấu tin kinh điển. Tôi cắm mặt ngồi đếm từng pixel trên thanh heat bar, vắt óc ốp đủ mọi công thức toán học vào từng con số để rồi kẹt cứng trong sự bất lực đến bứt rứt.

Sự thật đắng lòng là... bài này quá dễ. Nó dễ đến mức khiến tôi tự che mắt mình lại, lờ luôn cụm "RGB trifecta" chình ình ngay đó. Tôi gạt phăng luôn cả bước check Stegano cơ bản nhất là tách dải màu, để đâm đầu vào một ngõ cụt do chính trí tưởng tượng của mình vẽ ra.

Khoảnh khắc ném thử file lên Zsteg và thấy flag hiện ra ngay lập tức, cảm giác trong tôi không phải là thỏa mãn, mà là một sự hụt hẫng và tự trách tột độ. Tại sao mình lại ngớ ngẩn đến vậy? Tại sao lại đi khinh thường những bước nền tảng nhất chỉ vì mải đuổi theo những suy nghĩ cao siêu, phức tạp hóa vấn đề? Trong CTF, đôi khi thứ đánh gục mình không phải là độ khó của đề, mà là cái "tôi" thích làm quá mọi chuyện lên.

Viết chiếc write-up này ra đây, xem như một cái tát gõ tỉnh bản thân. Kỹ năng có thể trau dồi, nhưng nếu đánh mất đi tư duy tỉnh táo từ những bước cơ sở, thì sẽ còn tiếp tục tự mua dây buộc mình. Nhìn lại cả một buổi tối quý giá bốc hơi tan tành chỉ vì một pha overthinking cồng kềnh, chạnh lòng và tiếc đứt ruột... bởi suy cho cùng, thời gian không chờ một ai.

{% endraw %}