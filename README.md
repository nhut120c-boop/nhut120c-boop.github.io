# Website cá nhân — Lê Minh Nhựt

Site tĩnh dùng **Jekyll**, build tự động bởi **GitHub Pages** (không cần server,
không cần chạy lệnh build thủ công khi deploy — cứ push là xong).

## Cấu trúc chính

```
_config.yml       # thông tin chung: tên, vai trò, team, email...
index.html        # trang chủ
exhibits.html      # trang "Thành tích"
log/index.html     # trang danh sách bài viết (Case Log)
_posts/            # từng bài viết = 1 file .md ở đây
_data/exhibits.yml  # dữ liệu thành tích — SỬA FILE NÀY khi có giải mới
_data/repos.yml     # danh sách repo nổi bật ở trang chủ
assets/css/style.css
```

## 1. Chạy thử ở máy local (không bắt buộc)

Cần cài Ruby + Bundler một lần:

```bash
bundle install
bundle exec jekyll serve
```

Mở `http://localhost:4000`.

Nếu không muốn cài Ruby, có thể bỏ qua bước này — cứ push lên GitHub,
GitHub Pages sẽ tự build giúp bạn.

## 2. Thêm bài viết mới (Case Log)

Tạo 1 file mới trong `_posts/`, đặt tên đúng format:

```
_posts/2026-08-01-ten-bai-viet.md
```

Đầu file thêm front matter, rồi viết nội dung Markdown bình thường
(hỗ trợ `---`, code block, ảnh, link, bảng... y như README trên GitHub):

```markdown
---
title: "Tiêu đề bài viết"
tags: [ctf, forensics]
excerpt: "Mô tả ngắn hiện ở trang danh sách"
---

Nội dung bài viết ở đây...
```

Push lên GitHub là bài tự xuất hiện ở `/log/`, không cần sửa code.

## 3. Thêm thành tích mới

Mở `_data/exhibits.yml`, copy 1 khối mẫu (đã có comment hướng dẫn trong file),
điền tên giải / hạng / mô tả rồi push lên. Không cần sửa HTML.

## 4. Deploy lên GitHub Pages

**Cách A — dùng repo user site (khuyên dùng, đơn giản nhất):**

1. Đổi tên/tạo repo tên đúng `nhut120c-boop.github.io`.
2. Push toàn bộ nội dung thư mục này vào nhánh `main` của repo đó.
3. Vào **Settings → Pages**, chọn nguồn build là nhánh `main`, thư mục `/ (root)`.
4. Sau 1–2 phút, site chạy tại `https://nhut120c-boop.github.io`.

**Cách B — dùng repo project riêng (vd `nhut120c-boop/my-site`):**

1. Push nội dung vào nhánh `main`.
2. Vào **Settings → Pages**, chọn nhánh `main` (hoặc tạo nhánh `gh-pages`).
3. Site chạy tại `https://nhut120c-boop.github.io/my-site`.
   Nếu dùng cách này, thêm dòng sau vào `_config.yml`:
   ```yaml
   baseurl: "/my-site"
   ```

## 5. Đổi thông tin cá nhân

Sửa các dòng đầu trong `_config.yml`: `title`, `role`, `org`, `team`,
`focus_line`, `email`, `github_username`.
