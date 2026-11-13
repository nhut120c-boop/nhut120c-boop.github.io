---
layout: post
title: "Forensics: Task 1"
tags: [note, study]
---
{% raw %}
Task Steganography

File type: 

Image files such as: PNG, JPG, SVG...

Audio files such as: WAV, AIFF..

Thrown files such as: zip, docx, mp3...

Example of image file

<img width="615" height="82" alt="image" src="https://github.com/user-attachments/assets/3e7d46f8-3d34-4d79-8658-cd55c3026a49" />

Example of audio file

<img width="624" height="67" alt="image" src="https://github.com/user-attachments/assets/414c8602-7d08-4a18-a2db-f1bb5a3990ba" />

Example of compressed file

<img width="1337" height="129" alt="image" src="https://github.com/user-attachments/assets/aa95f67d-073e-4bce-9271-c0510cdf0dc2" />

Structure of PNG:

Includes magic bytes as the first 8 bytes:

 89 50 4e 47 0d 0a 1a 0a
 
Consists of chunks, a chunk includes 4 fields:

The Length field is 4 bytes: indicates the length of the byte

 vidu: 00 00 00 0d

The chunk type field consists of 4 bytes: indicates the name of the block to identify

For example: 49 48 44 52 translates to IHDR as the image title

The data field consists of 13 bytes after the chunk type

For example: 00 00 03 84 00 00 02 58 08 02 00 00 00 this is the content containing width, height...

CRC field includes the last 4 bytes of the chunk: used to check whether the block's data is error-free or not

For example: b5 a7 bf 8c, when opening the image, the computer will recalculate if b5 a7 bf 8c is correct.
 
The way to identify file type is:
Use command
```
file
```
Or look at the leading bytes of magic bytes
```
 hexdump -C anh1.png | head
```
<img width="790" height="233" alt="image" src="https://github.com/user-attachments/assets/82572c8f-128a-4f11-9393-977244f790d3" />

Learn about Pillow and Open CV libraries

Open CV is an open source library of more than 2,500 algorithms for computers to see objects. It includes two main areas: image processing and computer vision.

Image processing is used to crop and collage images, change color, blur...

Computer vision is used to identify people, count cars or identify thieves...

The py codes are common to the Open CV library

basic command

first declare
```
import cv2
```
cv2.imread(path, flag) reads images: flag=0: gray image, flag=1: color image
```
For example: xam = cv2.imread('anhtest.jpg', 0), then the anhtest file will be read as gray
```
cv2.imshow(winname, mat) displays the image
```
for example: cv2.imshow('dis1', xam)
```
cv2.imwrite(image name, img, params) uses compression adjustment
```
cv2.imwrite('anhtest.jpg', xam, [cv2.IMWRITE_JPEG_QUALITY, 10])
```
cv2.cvtColor is used to change color
```
anh = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
```
for example: cropped_img = img[100:300, 200:400]
```
cropped_img = img[first y:last y, first x:last x] used to crop the image
```
cv2.putText(...): Write text on the image

```
cv2.putText(img, "zeroD", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
```
cv2.resize(src, dsize) resize the image
```
anh_nho = cv2.resize(img, (200, 200))
```
declare and read camera
```
cap = cv2.cam(0)

ret, frame = cap.read()
```
Denoising: cv2.GaussianBlur
```
for example: blur = cv2.GaussianBlur(img, (5, 5), 0)
```
Find the outline of an object: cv2.Canny
```
vien = cv2.Canny(img, 100, 200)
```
Color filter: cv2.inRange
```
mask_mask = cv2.inRange(hsv_image, lowest_color, highest_color)

```
flip image: cv2.flip
```
flip = cv2.flip(img, 1) # 1: flip horizontally, 0: flip vertically, -1: both
```

Keep the image when the show is not turned off
```
cv2.waitKey(0)
```
cv2.destroyAllWindows() to clean up ram
There are more commands... (I will learn slowly)


Uses in for:

Identify heavily edited photos

example code:
```
import cv2
import matplotlib.pyplot as plt

# Read photos
img = cv2.imread('evidence.jpg')

# Calculate Histogram for 3 color channels (BGR)
colors = ('b', 'g', 'r')
for i, col in enumerate(colors):
    hist = cv2.calcHist([img], [i], None, [256], [0, 256])
    plt.plot(hist, color=col)
    plt.xlim([0, 256])

plt.title('Histogram - Check pixel distribution')
plt.show()
```
Image clarification:
example code:
```
import cv2
import numpy as np

img = cv2.imread('dark_evidence.jpg', 0) # Read grayscale images

# Equalize histogram to clarify details in dark areas
equ = cv2.equalizeHist(img)

# Or use the sharpen filter (Kernel)
kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
sharpened = cv2.filter2D(img, -1, kernel)

cv2.imshow('Original', img)
cv2.imshow('Enhanced', equ)
cv2.waitKey(0)
```

Crop photos, change photo colors:
example code:
```
import cv2

img = cv2.imread('secret.png')
# 1. Slicing the image (Slicing the NumPy array)
# Syntax: img[y_start:y_end, x_start:x_end]
crop_img = img[100:400, 200:500] 

# 2. Change image color (Color Space Conversion)
# Convert to Grayscale to easily identify edges (Edges)
gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Switch to HSV to filter specific colors (e.g. filter red)
hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Save the processed image
cv2.imwrite('cropped_evidence.png', crop_img)

cv2.imshow('Cropped', crop_img)
cv2.imshow('Gray Scale', gray_img)
cv2.waitKey(0)
```
FOR EXAMPLE:
Create a png file with a black background and the word KMA with GRB color 1,0,0:

<img width="1152" height="648" alt="anhtesst" src="https://github.com/user-attachments/assets/d09cd0c1-085a-4f6e-95ac-30ace9ba79f0" />

Put the image into the virtual machine to start filtering, first create soi.py file

<img width="373" height="66" alt="image" src="https://github.com/user-attachments/assets/8b1a67dc-aa0d-4565-af97-ac0e3bb7915c" />

Then write a script to filter colors:

<img width="533" height="137" alt="image" src="https://github.com/user-attachments/assets/a14a91ed-95ee-4415-9c87-da9d0bae9522" />

script to filter the last bit of the red channel and then exaggerate the contrast to reveal hidden text, then run py

<img width="405" height="64" alt="image" src="https://github.com/user-attachments/assets/c343c75f-c0eb-4fbc-8b6d-44775c362146" />

I can

<img width="624" height="351" alt="image" src="https://github.com/user-attachments/assets/fe66045c-87f2-4d7d-9617-6f09d67406cf" />

Pillow: 

Learn Pillow Is a still image processing library, its strength is to extract metadata and intervene deeply into pixels without the need for complex arrays.

Popular py codes with Pillow library

The first basic command declares: from PIL import Image

Image.open(path): Open the image

For example:
```
img = Image.open('evidence.jpg')
```
img.show(): Displays the image

img.save(new_name): Save image

For example:
```
img.save('output.png')
```

img.convert(mode): Convert color system (RGB, L, CMYK...)

For example:
```
anh_xam = img.convert('L')
```

img.crop((left, top, right, bottom)): Crop image by tuple

For example:
```
vung_cat = img.crop((0, 0, 100, 100))
```

img.resize((width, height)): Change the size

For example:
```
nho = img.resize((50, 50))
```

img.rotate(angle): Rotate image

For example:
```
xoay = img.rotate(90)
```
img.getpixel((x, y)): Get the color value at 1 pixel

For example:
```
r, g, b = img.getpixel((10, 10))
```
img.putpixel((x, y), (r, g, b)): Change the color of 1 pixel

For example:
```
img.putpixel((10, 10), (255, 0, 0))
```
Uses in Forensics:

Extract Metadata (EXIF): Used to find GPS coordinates, shooting date and time, device type.... I see it as exiftool
example code:
```
from PIL import Image
from PIL.ExifTags import TAGS
img = Image.open('bi_mat.jpg')
exif = img._getexif()
for tag_id, value in exif.items():
    tag_name = TAGS.get(tag_id, tag_id)
    print(f"{tag_name}: {value}")
```
examine each bit layer: Use Pillow to access each pixel and filter bits similar to OpenCV but in an image object management way.
Example code (Squeeze the last bit of the Red channel):
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
PRACTICAL EXAMPLES:
Find the position of a photo using the pillow library

Firstly:
<img width="253" height="42" alt="image" src="https://github.com/user-attachments/assets/6bf375bc-e02a-44b5-a71c-dad174b4d1bf" />

write scripts

<img width="784" height="113" alt="image" src="https://github.com/user-attachments/assets/a7aab579-b378-4773-8706-d082398ac823" />

Later
<img width="325" height="61" alt="image" src="https://github.com/user-attachments/assets/122b7726-2a3d-431b-8eba-100e5acc6ec6" />

Then paste it into gg map and we get the coordinates:

<img width="1902" height="1017" alt="image" src="https://github.com/user-attachments/assets/a0448d26-42bd-410e-b774-8db77fcc0f8f" />

Hex Editor

Used to view and edit raw file data, to check magic bytes, fix file errors, or find hidden text strings.

Command: xxd, hexedit

vidu file anh.png cannot be opened due to header editing.

<img width="1481" height="821" alt="image" src="https://github.com/user-attachments/assets/5081d382-f988-45f3-98c5-34f20928276b" />

check with hexedit

<img width="244" height="47" alt="image" src="https://github.com/user-attachments/assets/1d53dcb4-2b66-46a8-8544-560c05d4b19a" />

see magic byte error

<img width="1906" height="900" alt="image" src="https://github.com/user-attachments/assets/74133b0c-2e9b-4e26-b4d9-7625c1230b94" />

Adjust the first 2 bytes to FF to correct format

<img width="1627" height="870" alt="image" src="https://github.com/user-attachments/assets/db17ca63-6c90-4eb6-a9b5-d75390e36182" />

Binwalk

Extract hidden files nested inside an original file

Command: binwalk file_can_trich

vidu

<img width="1142" height="216" alt="image" src="https://github.com/user-attachments/assets/f3b6a409-9869-4599-b090-fec60122fba4" />

then ls

<img width="580" height="260" alt="image" src="https://github.com/user-attachments/assets/6da18c57-65de-42b5-816d-ab79f671422a" />

cd into the _image.jpg.extracted folder

<img width="468" height="182" alt="image" src="https://github.com/user-attachments/assets/779aaf76-6734-47c3-8003-1e0c858748af" />

We see the flag.txt file

<img width="425" height="115" alt="image" src="https://github.com/user-attachments/assets/d4cb9ee6-7299-41a4-9607-3a70d4f77ae4" />

Learn about stephide: is a tool for image files such as .jpg, .bmp, .wav, .au,

For example:

We have 1 image, anh1.jpg, and 1 file, flag.txt

We use the following command to hide

```
steghide embed -ef flag.txt -cf anh1.jpeg
```

<img width="396" height="167" alt="image" src="https://github.com/user-attachments/assets/03223524-d0fa-41c7-9db1-d919b7e10572" />

and use command

```
steghide extract -sf anh1.jpeg
```

<img width="488" height="142" alt="image" src="https://github.com/user-attachments/assets/c32a1a65-aa04-4d8e-bd92-8b0c3cbebcb3" />


about Stegsolve: helps view different color layers, compare two XOR, ADD, SUB images.

<img width="620" height="352" alt="image" src="https://github.com/user-attachments/assets/f23f8513-2a83-4eec-809c-1dfec1b75979" />

<img width="259" height="339" alt="image" src="https://github.com/user-attachments/assets/8f8c9fea-34f1-4727-9c18-601cae0b4ac0" />

<img width="243" height="337" alt="image" src="https://github.com/user-attachments/assets/312b66f8-c919-44f3-8425-d98ae1bf028b" />

<img width="267" height="351" alt="image" src="https://github.com/user-attachments/assets/90309726-84bf-4342-ae73-9605755a1c41" />

and many more photo layers...

Next is foremost: separating files that are hidden or included inside another file based on header/footer.

<img width="324" height="86" alt="image" src="https://github.com/user-attachments/assets/e5507260-bb4a-4c2c-bfb5-aa1473424480" />

<img width="765" height="102" alt="image" src="https://github.com/user-attachments/assets/8f3fbae6-77e9-4b75-9fb4-0b4126d3d670" />

<img width="367" height="122" alt="image" src="https://github.com/user-attachments/assets/e6dd4a1a-d4f7-48a4-ab88-0ff17e4cb404" />

Next is ImageMagick used to convert image formats and determine image distortion parameters

Use this command to view image data

<img width="340" height="63" alt="image" src="https://github.com/user-attachments/assets/e9248bac-7957-41f4-9688-9f38cbc31340" />

whose output is

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
and find the difference, we have 2 identical images, image 1 and image 2

<img width="419" height="302" alt="image" src="https://github.com/user-attachments/assets/bade76a8-6d8a-4b16-8974-796044555a62" />

We use the compare command to see if there is any difference between the two images

<img width="405" height="125" alt="image" src="https://github.com/user-attachments/assets/e239c5de-0db4-4de8-a070-398a12f607ed" />


and there is output, there are many red points showing that the two images are not the same


<img width="225" height="225" alt="image" src="https://github.com/user-attachments/assets/053217af-668e-4847-8fc7-02efb179587f" />


Sonic Visualiser tool: is a tool to view the sound spectrum and find hidden messages in audio files


<img width="491" height="161" alt="image" src="https://github.com/user-attachments/assets/5e3975f7-9cc8-49e5-a329-d83ef2ce75c1" />


<img width="1034" height="688" alt="image" src="https://github.com/user-attachments/assets/e301e0e3-0fc0-4575-9630-79f8ebfbce06" />

select

 <img width="400" height="33" alt="image" src="https://github.com/user-attachments/assets/60218318-02b6-4987-af90-e9387e875a97" />

it shows up on the sound spectrum

 <img width="1107" height="857" alt="image" src="https://github.com/user-attachments/assets/cd6500d0-1462-4b07-88fa-d4d9e2839c1c" />

I saw the word kcsc that I intentionally hid

SSTV - Slow Scan TV: decodes images transmitted via radio/audio signals

First create an audio file from an image

 <img width="434" height="74" alt="image" src="https://github.com/user-attachments/assets/388253e4-c033-425b-9ae6-a509b7de309d" />


then use
  ```
qsstv
```

  <img width="807" height="680" alt="image" src="https://github.com/user-attachments/assets/01ee1f34-5bb8-47e8-8858-0db6fb93ffda" />

to open it up

and open a new terminal tab to run the command

<img width="373" height="102" alt="image" src="https://github.com/user-attachments/assets/ee1a9b50-9e03-4054-a6e7-ca467d4e99d1" />

to play sound

and back to qsstv

<img width="1920" height="923" alt="image" src="https://github.com/user-attachments/assets/2dfd759f-e7d4-4f9b-b8fa-2469c66082b2" />

qsstv will draw the hidden image hidden in the image

zsteg is a tool to detect and extract hidden data in the lowest bits of image files, it tries all combinations of RGB, BGR, rows, columns...

Here is an example of finding flags in images


<img width="1920" height="923" alt="Screenshot_2026-04-10_10_49_03" src="https://github.com/user-attachments/assets/7edc6276-82c8-470e-8f3a-07c67e4e3a25" />

Learn about encryption types:

 
AES: is a cryptography that uses the same key to lock and open, fast and strong, specialized for hiding files or large data.

RSA: A cryptography that uses a public key pair to lock and a private key to open. It's a bit slow so it's only used to send passwords or sign names.

Base16 (Hex): encodes data into character pairs including only numbers 0-9 and letters A-F such as 4a 6b 20

Base64: Is an encoding that turns data into character strings A-Z, a-z, 0-9, +, / and often has an = sign at the end like S0NTQ3t...=

Base85: An encoding that uses more strange characters than base64 to compress data compactly, looking extremely confusing like <+U92H..

Lesson 1 converts from an image file to a text file containing pixels
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
opposite
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
Lesson 2 hides text in file
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

Read the description in the photo
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