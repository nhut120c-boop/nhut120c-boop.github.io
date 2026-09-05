---
layout: post
title: "Forensics: Task 1"
tags: [note, study]
---
{% raw %}
Task Steganography

File type: 

File ảnh như : PNG, JPG, SVG...

File âm thanh như: WAV, AIFF..

File ném như: zip, docx, mp3...

Ví dụ về file ảnh

<img width="615" height="82" alt="image" src="https://github.com/user-attachments/assets/3e7d46f8-3d34-4d79-8658-cd55c3026a49" />

Ví dụ về file âm thanh

<img width="624" height="67" alt="image" src="https://github.com/user-attachments/assets/414c8602-7d08-4a18-a2db-f1bb5a3990ba" />

Ví dụ về file nén

<img width="1337" height="129" alt="image" src="https://github.com/user-attachments/assets/aa95f67d-073e-4bce-9271-c0510cdf0dc2" />

Cấu trúc của PNG:

Gồm magic byte là 8 byte đầu:

 89 50 4e 47 0d 0a 1a 0a
 
 Gồm các chunk, một chunk gồm 4 trường:

 Trường Length là 4 byte: cho biết độ dài của byte

 vidu: 00 00 00 0d

 Trường chunk type gồm 4 byte: cho biết tên của khối để nhận biết 

 ví dụ: 49 48 44 52 dịch ra là IHDR là tiêu đề ảnh

 Trường data gồm 13 byte sau chunk type

ví dụ:  00 00 03 84 00 00 02 58 08 02 00 00 00 đây là nội dung chứa chiều rộng, chiều cao...

Trường CRC gồm 4 byte cuối chunk: dùng để kiểm tra xem dữ liệu của khối có bị lỗi hay không

ví dụL: b5 a7 bf 8c, khi mở ảnh thì máy tính sẽ tính toán lại nếu b5 a7 bf 8c thì đúng
 
Cách nhận biết file type là:
Xài lệnh 
```
file
```
Hoặc nhìn vào các byte đầu của magic byte
```
 hexdump -C anh1.png | head
```
<img width="790" height="233" alt="image" src="https://github.com/user-attachments/assets/82572c8f-128a-4f11-9393-977244f790d3" />

Tìm hiểu về thư viện Pillow và Open CV

Open CV là 1 thư viện mã nguồn mở gồm hơn 2500 thuật toán cho máy tính có thể nhìn được vật thể,nó gồm 2 mảng chính là image processing và computer vision 

image processing dùng dể cắt ghép ảnh, đổi màu làm mờ.....

computer vision dùng để nhận diện người, đếm xe hay nhận diện trộm...

Các code py phổ biến với thư viện Open CV

lệnh cơ bản

đầu tiên khai báo
```
import cv2
```
cv2.imread(path, flag) đọc ảnh: flag=0: ảnh xám, flag=1: ảnh màu
```
ví dụ: xam = cv2.imread('anhtest.jpg', 0), thì file anhtest sẽ được đọc là màu xám
```
cv2.imshow(winname, mat) hiển thị ảnh
```
ví dụ: cv2.imshow('dis1', xam)
```
cv2.imwrite(tên ảnh, img, params) dùng chỉnh độ nén
```
cv2.imwrite('anhtest.jpg', xam, [cv2.IMWRITE_JPEG_QUALITY, 10])
```
cv2.cvtColor dùng để đổi màu sắc
```
anh = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
```
ví dụ: cropped_img = img[100:300, 200:400]
```
cropped_img = img[y đầu:y cuối, x đầu:x cuối] dùng để cắt ảnh
```
cv2.putText(...): Viết chữ lên ảnh

```
cv2.putText(img, "zeroD", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
```
cv2.resize(src, dsize) thay đổi kích thước ảnh
```
anh_nho = cv2.resize(img, (200, 200))
```
khai báo và đọc camera
```
cap = cv2.cam(0)

ret, frame = cap.read()
```
Khử nhiễu: cv2.GaussianBlur
```
ví dụ: blur = cv2.GaussianBlur(img, (5, 5), 0)
```
Tìm đường viền của vật thể: cv2.Canny
```
vien = cv2.Canny(img, 100, 200)
```
Lọc màu: cv2.inRange
```
mặt_nạ = cv2.inRange(ảnh_hsv, màu_thấp_nhất, màu_cao_nhất)

```
lật ảnh: cv2.flip
```
flip = cv2.flip(img, 1) # 1: lật ngang, 0: lật dọc, -1: cả hai
```

Giữ ảnh khi show không bị tắt
```
cv2.waitKey(0)
```
cv2.destroyAllWindows() để dọn ram
Còn các lệnh nữa... (em sẽ tìm hiểu từ từ ạ)


Công dụng trong for:

Nhận biết ảnh sửa chữa nhiều 

code ví dụ:
```
import cv2
import matplotlib.pyplot as plt

# Đọc ảnh
img = cv2.imread('evidence.jpg')

# Tính toán Histogram cho 3 kênh màu (BGR)
colors = ('b', 'g', 'r')
for i, col in enumerate(colors):
    hist = cv2.calcHist([img], [i], None, [256], [0, 256])
    plt.plot(hist, color=col)
    plt.xlim([0, 256])

plt.title('Biểu đồ Histogram - Kiểm tra mức độ phân bổ pixel')
plt.show()
```
Làm rõ ảnh: 
code ví dụ: 
```
import cv2
import numpy as np

img = cv2.imread('dark_evidence.jpg', 0) # Đọc ảnh hệ xám (grayscale)

# Cân bằng histogram để làm rõ chi tiết trong vùng tối
equ = cv2.equalizeHist(img)

# Hoặc dùng bộ lọc làm sắc nét (Kernel)
kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
sharpened = cv2.filter2D(img, -1, kernel)

cv2.imshow('Original', img)
cv2.imshow('Enhanced', equ)
cv2.waitKey(0)
```

Cắt ảnh, đổi màu ảnh:
code ví dụ: 
```
import cv2

img = cv2.imread('secret.png')
# 1. Cắt ảnh (Slicing mảng NumPy)
# Cú pháp: img[y_start:y_end, x_start:x_end]
crop_img = img[100:400, 200:500] 

# 2. Đổi màu ảnh (Color Space Conversion)
# Đổi sang Grayscale để dễ nhận diện biên (Edges)
gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Đổi sang HSV để lọc các màu sắc cụ thể (ví dụ lọc màu đỏ)
hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Lưu lại ảnh đã xử lý
cv2.imwrite('cropped_evidence.png', crop_img)

cv2.imshow('Cropped', crop_img)
cv2.imshow('Gray Scale', gray_img)
cv2.waitKey(0)
```
VÍ DỤ:
tạo 1 file png có nền đen và chữ KMA có màu GRB là 1,0,0:

<img width="1152" height="648" alt="anhtesst" src="https://github.com/user-attachments/assets/d09cd0c1-085a-4f6e-95ac-30ace9ba79f0" />

đưa ảnh vô máy ảo để bắt đầu lọc, đầu tiên tạo file soi.py

<img width="373" height="66" alt="image" src="https://github.com/user-attachments/assets/8b1a67dc-aa0d-4565-af97-ac0e3bb7915c" />

xong viết script để lọc màu:

<img width="533" height="137" alt="image" src="https://github.com/user-attachments/assets/a14a91ed-95ee-4415-9c87-da9d0bae9522" />

script để lọc bit cuối kênh red rồi phóng đại tương phản để làm hiện chữ ẩn, sau đó chạy py

<img width="405" height="64" alt="image" src="https://github.com/user-attachments/assets/c343c75f-c0eb-4fbc-8b6d-44775c362146" />

ta được

<img width="624" height="351" alt="image" src="https://github.com/user-attachments/assets/fe66045c-87f2-4d7d-9617-6f09d67406cf" />

Pillow: 

Tìm hiểu Pillow Là thư viện xử lý ảnh tĩnh, thế mạnh là trích xuất metadata và can thiệp sâu vào pixel mà không cần mảng phức tạp.

Các code py phổ biến với thư viện Pillow

Lệnh cơ bản đầu tiên khai báo: from PIL import Image

Image.open(path): Mở ảnh

ví dụ: 
```
img = Image.open('evidence.jpg')
```
img.show(): Hiển thị ảnh 

img.save(tên_mới): Lưu ảnh

ví dụ: 
```
img.save('output.png')
```

img.convert(mode): Chuyển đổi hệ màu (RGB, L, CMYK...)

ví dụ: 
```
anh_xam = img.convert('L')
```

img.crop((left, top, right, bottom)): Cắt ảnh bằng tuple 

ví dụ: 
```
vung_cat = img.crop((0, 0, 100, 100))
```

img.resize((width, height)): Thay đổi kích thước

ví dụ: 
```
nho = img.resize((50, 50))
```

img.rotate(angle): Xoay ảnh

ví dụ: 
```
xoay = img.rotate(90)
```
img.getpixel((x, y)): Lấy giá trị màu tại 1 pixel 

ví dụ:
```
r, g, b = img.getpixel((10, 10))
```
img.putpixel((x, y), (r, g, b)): Thay đổi màu của 1 pixel

ví dụ:
```
img.putpixel((10, 10), (255, 0, 0))
```
Công dụng trong Forensics:

Trích xuất Metadata (EXIF): Dùng để tìm tọa độ GPS, ngày giờ chụp, loại thiết bị....em thấy như exiftool
code ví dụ:
```
from PIL import Image
from PIL.ExifTags import TAGS
img = Image.open('bi_mat.jpg')
exif = img._getexif()
for tag_id, value in exif.items():
    tag_name = TAGS.get(tag_id, tag_id)
    print(f"{tag_name}: {value}")
```
soi từng lớp bit: Dùng Pillow để truy cập từng pixel và lọc bit tương tự như OpenCV nhưng theo cách quản lý đối tượng ảnh. 
Code ví dụ (Vắt bit cuối kênh Red):
```
from PIL import Image
img = Image.open('anhtest.png').convert('RGB')
pixels = img.load()
width, height = img.size
out = Image.new('L', (width, height))
out_pix = out.load()
for y in range(height):
    for x in range(width):
        r, g, b = pixels[x, y]
        out_pix[x, y] = (r & 1) * 255
out.save('res_pil.png')
```
VÍ DỤ THỰC TẾ:
Để tim vị trí của một bức ảnh bằng thư viện pillow

đầu tiên:
<img width="253" height="42" alt="image" src="https://github.com/user-attachments/assets/6bf375bc-e02a-44b5-a71c-dad174b4d1bf" />

viết script 

<img width="784" height="113" alt="image" src="https://github.com/user-attachments/assets/a7aab579-b378-4773-8706-d082398ac823" />

sau đó 
<img width="325" height="61" alt="image" src="https://github.com/user-attachments/assets/122b7726-2a3d-431b-8eba-100e5acc6ec6" />

rồi past vào gg map ta có được tọa độ:

<img width="1902" height="1017" alt="image" src="https://github.com/user-attachments/assets/a0448d26-42bd-410e-b774-8db77fcc0f8f" />

Hex Editor

dùng để xem và chỉnh sửa dữ liệu thô của file,để kiểm tra magic byte, sửa lỗi file, hoặc tìm các chuỗi text ẩn.

Lệnh: xxd, hexedit

vidu file anh.png không mở được do bị chỉnh sửa header.

<img width="1481" height="821" alt="image" src="https://github.com/user-attachments/assets/5081d382-f988-45f3-98c5-34f20928276b" />

kiểm tra bằng hexedit 

<img width="244" height="47" alt="image" src="https://github.com/user-attachments/assets/1d53dcb4-2b66-46a8-8544-560c05d4b19a" />

thấy magic byte bị lỗi 

<img width="1906" height="900" alt="image" src="https://github.com/user-attachments/assets/74133b0c-2e9b-4e26-b4d9-7625c1230b94" />

chỉnh lại cho đúng dạng 2 byte đầu thành FF ta được

<img width="1627" height="870" alt="image" src="https://github.com/user-attachments/assets/db17ca63-6c90-4eb6-a9b5-d75390e36182" />

Binwalk

trích xuất các file ẩn nằm lồng bên trong một file gốc

Lệnh: binwalk file_can_trich

vídu

<img width="1142" height="216" alt="image" src="https://github.com/user-attachments/assets/f3b6a409-9869-4599-b090-fec60122fba4" />

sau đó ls 

<img width="580" height="260" alt="image" src="https://github.com/user-attachments/assets/6da18c57-65de-42b5-816d-ab79f671422a" />

cd vào thư mục _image.jpg.extracted 

<img width="468" height="182" alt="image" src="https://github.com/user-attachments/assets/779aaf76-6734-47c3-8003-1e0c858748af" />

ta thấy file flag.txt

<img width="425" height="115" alt="image" src="https://github.com/user-attachments/assets/d4cb9ee6-7299-41a4-9607-3a70d4f77ae4" />

tìm hiểu về stephide: là công cụ file trong ảnh như .jpg, .bmp, .wav, .au, 

ví dụ: 

ta có ảnh 1 là anh1.jpg và 1 file là flag.txt 

ta dùng lệnh sau để giấu 

```
steghide embed -ef flag.txt -cf anh1.jpeg
```

<img width="396" height="167" alt="image" src="https://github.com/user-attachments/assets/03223524-d0fa-41c7-9db1-d919b7e10572" />

và dùng lệnh

```
steghide extract -sf anh1.jpeg
```

<img width="488" height="142" alt="image" src="https://github.com/user-attachments/assets/c32a1a65-aa04-4d8e-bd92-8b0c3cbebcb3" />


về Stegsolve: giúp xem các lớp màu khác nhau, so sánh hai ảnh XOR, ADD, SUB.

<img width="620" height="352" alt="image" src="https://github.com/user-attachments/assets/f23f8513-2a83-4eec-809c-1dfec1b75979" />

<img width="259" height="339" alt="image" src="https://github.com/user-attachments/assets/8f8c9fea-34f1-4727-9c18-601cae0b4ac0" />

<img width="243" height="337" alt="image" src="https://github.com/user-attachments/assets/312b66f8-c919-44f3-8425-d98ae1bf028b" />

<img width="267" height="351" alt="image" src="https://github.com/user-attachments/assets/90309726-84bf-4342-ae73-9605755a1c41" />

và nhiều lớp ảnh khác nữa...

tiếp theo là foremost: tách các file bị ẩn hoặc bị gộp bên trong một file khác dựa trên header/footer.

<img width="324" height="86" alt="image" src="https://github.com/user-attachments/assets/e5507260-bb4a-4c2c-bfb5-aa1473424480" />

<img width="765" height="102" alt="image" src="https://github.com/user-attachments/assets/8f3fbae6-77e9-4b75-9fb4-0b4126d3d670" />

<img width="367" height="122" alt="image" src="https://github.com/user-attachments/assets/e6dd4a1a-d4f7-48a4-ab88-0ff17e4cb404" />

tiếp theo là ImageMagick dùng để chuyển đổi định dạng ảnh, xác định thông số sai lệch ảnh

dùng lệnh này để xem dữ liệu ảnh

<img width="340" height="63" alt="image" src="https://github.com/user-attachments/assets/e9248bac-7957-41f4-9688-9f38cbc31340" />

có output là

```
Image:
  Filename: anh1.jpeg
  Permissions: rw-rw-r--
  Format: JPEG (Joint Photographic Experts Group JFIF format)
  Mime type: image/jpeg
  Class: DirectClass
  Geometry: 225x225+0+0
  Units: Undefined
  Colorspace: sRGB
  Type: TrueColor
  Base type: Undefined
  Endianness: Undefined
  Depth: 8-bit
  Channels: 3.0
  Channel depth:
    Red: 8-bit
    Green: 8-bit
    Blue: 8-bit
  Channel statistics:
    Pixels: 50625
    Red:
      min: 0  (0)
      max: 255 (1)
      mean: 172.747 (0.677438)
      median: 184 (0.721569)
      standard deviation: 43.1777 (0.169324)
      kurtosis: -0.0156261
      skewness: -0.716078
      entropy: 0.901378
    Green:
      min: 0  (0)
      max: 247 (0.968627)
      mean: 148.16 (0.58102)
      median: 162 (0.635294)
      standard deviation: 52.0588 (0.204152)
      kurtosis: -0.856686
      skewness: -0.50109
      entropy: 0.939082
    Blue:
      min: 0  (0)
      max: 233 (0.913725)
      mean: 124.737 (0.489165)
      median: 136 (0.533333)
      standard deviation: 62.1773 (0.243833)
      kurtosis: -1.28635
      skewness: -0.313784
      entropy: 0.970476
  Image statistics:
    Overall:
      min: 0  (0)
      max: 255 (1)
      mean: 148.548 (0.582541)
      median: 160.667 (0.630065)
      standard deviation: 52.4713 (0.20577)
      kurtosis: -0.719554
      skewness: -0.510317
      entropy: 0.936979
  Rendering intent: Perceptual
  Gamma: 0.454545
  Chromaticity:
    red primary: (0.64,0.33,0.03)
    green primary: (0.3,0.6,0.1)
    blue primary: (0.15,0.06,0.79)
    white point: (0.3127,0.329,0.3583)
  Matte color: grey74
  Background color: white
  Border color: srgb(223,223,223)
  Transparent color: black
  Interlace: None
  Intensity: Undefined
  Compose: Over
  Page geometry: 225x225+0+0
  Dispose: Undefined
  Iterations: 0
  Compression: JPEG
  Quality: 75
  Orientation: Undefined
  Properties:
    date:create: 2026-04-10T12:54:00+00:00
    date:modify: 2026-04-10T12:54:00+00:00
    date:timestamp: 2026-04-10T13:08:57+00:00
    jpeg:colorspace: 2
    jpeg:sampling-factor: 2x2,1x1,1x1
    signature: 83c8828b00d3686e6b52e4df52e8e9b66d75946b4b7afbcb70f3f60986f1e4b8
  Artifacts:
    verbose: true
  Tainted: False
  Filesize: 5764B
  Number pixels: 50625
  Pixel cache type: Memory
  Pixels per second: 57.6575MP
  User time: 0.000u
  Elapsed time: 0:01.000
  Version: ImageMagick 7.1.2-15 Q16 x86_64 23686 https://imagemagick.org
```
và tìm điểm khác biệt, ta có 2 ảnh y như nhauu là anh1 và ảnh 2

<img width="419" height="302" alt="image" src="https://github.com/user-attachments/assets/bade76a8-6d8a-4b16-8974-796044555a62" />

ta dùng lệnh compare để xem 2 ảnh có gì khác ko

<img width="405" height="125" alt="image" src="https://github.com/user-attachments/assets/e239c5de-0db4-4de8-a070-398a12f607ed" />


và có output, có nhiều điểm đỏ cho thấy 2 ảnh ko giống nhau 


<img width="225" height="225" alt="image" src="https://github.com/user-attachments/assets/053217af-668e-4847-8fc7-02efb179587f" />


công cụ Sonic Visualiser: là công cụ để xem phổ âm và tìm thông điệp ẩn trong file âm thanh


<img width="491" height="161" alt="image" src="https://github.com/user-attachments/assets/5e3975f7-9cc8-49e5-a329-d83ef2ce75c1" />


<img width="1034" height="688" alt="image" src="https://github.com/user-attachments/assets/e301e0e3-0fc0-4575-9630-79f8ebfbce06" />

 chọn 

 <img width="400" height="33" alt="image" src="https://github.com/user-attachments/assets/60218318-02b6-4987-af90-e9387e875a97" />

 nó hiện lên phổ âm 

 <img width="1107" height="857" alt="image" src="https://github.com/user-attachments/assets/cd6500d0-1462-4b07-88fa-d4d9e2839c1c" />

  thấy dc chữ kcsc mà em cố tình giấu

  SSTV - Slow Scan TV: giải mã hình ảnh được truyền tải qua tín hiệu radio/âm thanh

  đầu tiên tạo 1 file âm thanh từ 1 ảnh 

 <img width="434" height="74" alt="image" src="https://github.com/user-attachments/assets/388253e4-c033-425b-9ae6-a509b7de309d" />


  sau đó dùng 
  ```
qsstv
```

  <img width="807" height="680" alt="image" src="https://github.com/user-attachments/assets/01ee1f34-5bb8-47e8-8858-0db6fb93ffda" />

để mở lên 

và mở 1 tab terminal mới chạy lệnh 

<img width="373" height="102" alt="image" src="https://github.com/user-attachments/assets/ee1a9b50-9e03-4054-a6e7-ca467d4e99d1" />

để phát âm thanh

và quay lại qsstv 

<img width="1920" height="923" alt="image" src="https://github.com/user-attachments/assets/2dfd759f-e7d4-4f9b-b8fa-2469c66082b2" />

qsstv sẽ vẽ ra ảnh ẩn đã đc giấu trong ảnh

zsteg là công cụ dò tìm và trích xuất dữ liệu ẩn trong các bit thấp nhất của file ảnh, nó thử được tất cả các tổ hợp RGB, BGR, theo hàng, theo cột...

đây là 1 ví dụ tìm flag trong ảnh


<img width="1920" height="923" alt="Screenshot_2026-04-10_10_49_03" src="https://github.com/user-attachments/assets/7edc6276-82c8-470e-8f3a-07c67e4e3a25" />

 tìm hiểu về các loại mã hóa:

 
AES: là mật mã dùng chung 1 khóa để khóa và mở, nhanh và trâu chuyên dùng để giấu file hay dữ liệu lớn

RSA: Là mật mã dùng cặp khóa public để khóa và private để mở, hơi chậm nên chỉ dùng để gửi mật khẩu hoặc ký tên

Base16 (Hex): là mã hóa dữ liệu thành các cặp ký tự chỉ gồm số 0-9 và chữ A-F như 4a 6b 20

Base64: Là mã hóa biến dữ liệu thành chuỗi ký tự A-Z, a-z, 0-9, +, / và hay có dấu = ở cuối như S0NTQ3t...=

Base85: Là mã hóa dùng nhiều ký tự lạ hơn cả base64 để nén dữ liệu cho gọn, nhìn cực kỳ loạn mắt nhhư <+U92H..

bài 1 chuyển từ file ảnh sang file text chứa pixel 
```
from PIL import Image
def chuyenanh(anh, text):
    anhgoc = Image.open(anh).convert('RGB')
    rong, cao = anhgoc.size
    px = anhgoc.load()
    with open(text, 'w') as textt:
        textt.write(f"{rong},{cao}\n")
        for y in range(cao):
            for x in range(rong):
                do, xanhla, xanhduong = px[x,y]
                textt.write(f"{do},{xanhla},{xanhduong}\n")
```
ngược lại
```
from PIL import Image
def chuyenchu(text, anh):
    with open(text, 'r') as text1:
        dong = text1.readlines()
    rong, cao = map(int, dong[0].strip().split(','))
    anhmoi = Image.new('RGB', (rong, cao))
    px = anhmoi.load()
    i = 1
    for y in range(cao):
        for x in range(rong):
            do, xanhla, xanhduong = map(int, dong[i].strip().split(','))
            px[x, y] = (do, xanhla, xanhduong)
            i += 1
    anhmoi.save(anh)
```
bài 2 giấu text vào file
```
from PIL import Image
def giautin(anh, ndung, out):
    anhgoc = Image.open(anh).convert('RGB')
    rong, cao = anhgoc.size
    px = anhgoc.load()
    ndung += "stopppp"
    bit = ''.join([format(ord(i), '08b') for i in ndung]) 
    idx = 0
    dai = len(bit)
    for y in range(cao):
        for x in range(rong):
            if idx < dai:
                do, xanhla, xanhduong = px[x, y]
                if idx < dai:
                    do = (do & ~1) | int(bit[idx])
                    idx += 1
                if idx < dai:
                    xanhla = (xanhla & ~1) | int(bit[idx])
                    idx += 1
                if idx < dai:
                    xanhduong = (xanhduong & ~1) | int(bit[idx])
                    idx += 1
                px[x, y] = (do, xanhla, xanhduong)
            else:
                break
    anhgoc.save(out, "PNG")

```

đọc nd trong ảnh
```
from PIL import Image
def doctin(anh, text):
    anhbi = Image.open(anh).convert('RGB')
    rong, cao = anhbi.size
    px = anhbi.load()
    bit = ""
    for y in range(cao):
        for x in range(rong):
            do, xanhla, xanhduong = px[x, y]
            bit += str(do & 1)
            bit += str(xanhla & 1)
            bit += str(xanhduong & 1)
    chuoi = ""
    for i in range(0, len(bit), 8):
        byte = bit[i:i+8]
        if len(byte) < 8: break
        chuoi += chr(int(byte, 2))
    if "stoppp" in chuoi:
        that = chuoi.split("stoppp")[0]
        with open(text, 'w') as f:
            f.write(that)
```

















{% endraw %}