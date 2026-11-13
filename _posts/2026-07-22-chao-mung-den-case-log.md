---
title: "Welcome to Case Log"
tags: [note, meta]
category: meta
excerpt: "Introductory entry — quick guide on how to write a new entry in Case Log, including examples of supported Markdown formats."
---

This is a sample post demonstrating the Markdown formatting options supported by this blog — identical to standard GitHub README formatting.

## Heading Level 2

Standard paragraph text. You can use **bold**, *italics*, or `inline code` within sentences.

### Heading Level 3

- First bullet item
- Second bullet item
- Third bullet item

1. Numbered list item
2. Second numbered item

---

The horizontal rule `---` above is used to divide sections.

## Code Block

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

## Images

Insert images just like in a README — place your image in `assets/images/` or link to an external image URL:

![Screenshot](https://placehold.co/800x360/141A26/EDE9DD?text=Screenshot)

## Blockquotes

> Important notes or references can be highlighted inside a blockquote like this.

## Tables

| Artifact        | Location                         | Notes                    |
|-----------------|----------------------------------|--------------------------|
| Prefetch        | `C:\Windows\Prefetch`            | Execution history        |
| Event Log       | `C:\Windows\System32\winevt`     | System & Security logs   |

## Links

Learn more on my [GitHub profile](https://github.com/nhut120c-boop) or the [ctf-writeups repository](https://github.com/nhut120c-boop/ctf-writeups).

---

**How to add a new post:** create a new `.md` file inside `_posts/` with the naming format `YYYY-MM-DD-title.md`, include front matter (`title`, `tags`, `excerpt`) at the top, and write your content below. Push to GitHub and it will automatically appear on `/log/`.
