---
title: "Chào mừng đến Case Log"
tags: [note, meta]
category: meta
excerpt: "Bài viết đầu tiên — hướng dẫn nhanh cách viết một entry mới trong Case Log, kèm ví dụ đầy đủ các định dạng Markdown hay dùng."
---

Đây là bài viết mẫu để test các định dạng Markdown mà trang blog hỗ trợ —
y hệt cách viết README trên GitHub.

## Heading cấp 2

Đoạn văn thường. Có thể **in đậm**, *in nghiêng*, hoặc `inline code` ngay trong câu.

### Heading cấp 3

- Gạch đầu dòng thứ nhất
- Gạch đầu dòng thứ hai
- Gạch đầu dòng thứ ba

1. Danh sách có số
2. Mục thứ hai

---

Dòng gạch ngang `---` ở trên dùng để ngăn cách các phần trong bài.

## Code block

```python
def parse_evidence(path):
    with open(path, "rb") as f:
        data = f.read()
    return {"size": len(data), "sha256": hash(data)}
```

```bash
$ autopsy --case CASE-2026-01 --add-image ./disk.img
[+] Image mounted, starting timeline analysis...
```

## Ảnh

Chèn ảnh giống hệt README — thay link bên dưới bằng ảnh thật của bạn
(upload vào `assets/images/` trong repo, hoặc dùng link ngoài).

![Mô tả ảnh](https://placehold.co/800x360/141A26/EDE9DD?text=Screenshot)

## Trích dẫn

> Ghi chú quan trọng hoặc trích một đoạn tham khảo có thể để trong blockquote như thế này.

## Bảng

| Artifact        | Vị trí                          | Ghi chú                  |
|------------------|----------------------------------|---------------------------|
| Prefetch         | `C:\Windows\Prefetch`            | Lịch sử chạy chương trình |
| Event Log        | `C:\Windows\System32\winevt`     | Log hệ thống / bảo mật    |

## Link

Tham khảo thêm tại [GitHub của mình](https://github.com/nhut120c-boop) hoặc
[repo ctf-writeups](https://github.com/nhut120c-boop/ctf-writeups).

---

**Cách thêm bài mới:** tạo file `.md` mới trong thư mục `_posts/` với tên dạng
`YYYY-MM-DD-tieu-de.md`, thêm phần front matter (`title`, `tags`, `excerpt`) ở đầu
giống bài này, rồi viết nội dung bên dưới. Không cần sửa code, push lên GitHub
là bài tự lên trang `/log/`.
