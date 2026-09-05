# HƯỚNG DẪN THÊM CHỨNG CHỈ (CERTIFICATE) / THÀNH TÍCH MỚI

Trang web của bạn đã được thiết kế hoàn toàn tự động! Để thêm 1 chứng chỉ mới vào trang Exhibits, bạn chỉ cần làm 2 bước cực kỳ đơn giản:

### BƯỚC 1: Quăng file ảnh/pdf vào thư mục
Copy file ảnh (hoặc pdf) của chứng chỉ mới và dán vào thư mục:
ssets/images/ (hoặc bất kỳ thư mục nào bạn thích trên web).
Ví dụ: ssets/images/chungchi_moi.png

### BƯỚC 2: Điền tên và phân loại vào file cấu hình
Mở file _data/exhibits.yml bằng VS Code (hoặc Notepad).
Ở đó đã chia sẵn 2 phần: ctf: và cademic:. Bạn chỉ cần copy dòng mẫu dưới đây và dán vào phần tương ứng.

Ví dụ thêm 1 giải CTF mới, bạn dán vào dưới chữ ctf: như sau:
`yaml
  - name: "Tên giải CTF hoặc Chứng chỉ mới"
    type: "Hình ảnh"
    url: "/assets/images/chungchi_moi.png"
    desc: "Đạt giải nhì hoặc giải ba gì đó..."
`

Xong! Giờ chỉ cần git add ., git commit, git push là nó TỰ ĐỘNG hiện lên trên web cực kỳ đẹp mắt mà không cần code thêm 1 dòng HTML nào!
