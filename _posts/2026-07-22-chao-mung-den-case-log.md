---
title: "ChÃ o má»«ng Ä‘áº¿n Case Log"
tags: [note, meta]
category: meta
excerpt: "BÃ i viáº¿t Ä‘áº§u tiÃªn â€” hÆ°á»›ng dáº«n nhanh cÃ¡ch viáº¿t má»™t entry má»›i trong Case Log, kÃ¨m vÃ­ dá»¥ Ä‘áº§y Ä‘á»§ cÃ¡c Ä‘á»‹nh dáº¡ng Markdown hay dÃ¹ng."
---

ÄÃ¢y lÃ  bÃ i viáº¿t máº«u Ä‘á»ƒ test cÃ¡c Ä‘á»‹nh dáº¡ng Markdown mÃ  trang blog há»— trá»£ â€”
y há»‡t cÃ¡ch viáº¿t README trÃªn GitHub.

## Heading cáº¥p 2

Äoáº¡n vÄƒn thÆ°á»ng. CÃ³ thá»ƒ **in Ä‘áº­m**, *in nghiÃªng*, hoáº·c `inline code` ngay trong cÃ¢u.

### Heading cáº¥p 3

- Gáº¡ch Ä‘áº§u dÃ²ng thá»© nháº¥t
- Gáº¡ch Ä‘áº§u dÃ²ng thá»© hai
- Gáº¡ch Ä‘áº§u dÃ²ng thá»© ba

1. Danh sÃ¡ch cÃ³ sá»‘
2. Má»¥c thá»© hai

---

DÃ²ng gáº¡ch ngang `---` á»Ÿ trÃªn dÃ¹ng Ä‘á»ƒ ngÄƒn cÃ¡ch cÃ¡c pháº§n trong bÃ i.

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

## áº¢nh

ChÃ¨n áº£nh giá»‘ng há»‡t README â€” thay link bÃªn dÆ°á»›i báº±ng áº£nh tháº­t cá»§a báº¡n
(upload vÃ o `assets/images/` trong repo, hoáº·c dÃ¹ng link ngoÃ i).

![MÃ´ táº£ áº£nh](https://placehold.co/800x360/141A26/EDE9DD?text=Screenshot)

## TrÃ­ch dáº«n

> Ghi chÃº quan trá»ng hoáº·c trÃ­ch má»™t Ä‘oáº¡n tham kháº£o cÃ³ thá»ƒ Ä‘á»ƒ trong blockquote nhÆ° tháº¿ nÃ y.

## Báº£ng

| Artifact        | Vá»‹ trÃ­                          | Ghi chÃº                  |
|------------------|----------------------------------|---------------------------|
| Prefetch         | `C:\Windows\Prefetch`            | Lá»‹ch sá»­ cháº¡y chÆ°Æ¡ng trÃ¬nh |
| Event Log        | `C:\Windows\System32\winevt`     | Log há»‡ thá»‘ng / báº£o máº­t    |

## Link

Tham kháº£o thÃªm táº¡i [GitHub cá»§a mÃ¬nh](https://github.com/nhut120c-boop) hoáº·c
[repo ctf-writeups](https://github.com/nhut120c-boop/ctf-writeups).

---

**CÃ¡ch thÃªm bÃ i má»›i:** táº¡o file `.md` má»›i trong thÆ° má»¥c `_posts/` vá»›i tÃªn dáº¡ng
`YYYY-MM-DD-tieu-de.md`, thÃªm pháº§n front matter (`title`, `tags`, `excerpt`) á»Ÿ Ä‘áº§u
giá»‘ng bÃ i nÃ y, rá»“i viáº¿t ná»™i dung bÃªn dÆ°á»›i. KhÃ´ng cáº§n sá»­a code, push lÃªn GitHub
lÃ  bÃ i tá»± lÃªn trang `/log/`.

