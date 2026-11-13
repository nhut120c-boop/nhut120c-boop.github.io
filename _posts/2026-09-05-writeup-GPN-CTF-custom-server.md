---
layout: post
title: "GPN CTF: Customer Service"
tags: [writeup, ctf]
---
{% raw %}
## Challenge: Customer Service (Miscellaneous)
## Author: s1nn105
---

### Challenge Description

> The customer is always right. RIGHT? Experienced staff will tell you that customers are always worst case users. Just last week one customer proclaimed that pineapple does not belong on sushi pizza. Yeah I know, how could he? But the customer is always right. My friend fears for his sanity. So please help me work out the logic details for such an argument.

---

### Initial Connection

Download the challenge files:

<img width="778" height="471" alt="image" src="https://github.com/user-attachments/assets/9e7df565-7242-4c30-b1c8-074786962354" />

Connecting to the instance via Netcat:

```bash
ncat --ssl torched-kimchi-stuffed-with-toasted-wine-smzt.gpn24.ctf.kitctf.de 443
```

The service prompts:

```
give me your hex proof
```

<img width="1008" height="315" alt="image" src="https://github.com/user-attachments/assets/1f804359-5627-47a1-951a-f2a6447feeeb" />

The service expects a hex-encoded proof string. Extract `customer-service.tar.gz` to examine the source code.

<img width="406" height="212" alt="image" src="https://github.com/user-attachments/assets/237bb9a7-9ebd-45e4-9fbc-ab3efa16e928" />

---

### Source Code Analysis

Inside the archive is `checker.py`, which implements the verification logic:

```python
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
    Returns True if theorem conclusion is false and has no assumptions/hypotheses.
    """
    try:
        concl_str = str(thm.concl).strip().lower()
        is_false = (
            thm.concl.is_const("false") or concl_str == "false" or concl_str == "?false"
        )
        no_assumptions = len(thm.assums) == 0
        no_hypotheses = len(thm.hyps) == 0
        return is_false and no_assumptions and no_hypotheses
    except Exception as e:
        print(f"Warning: error checking theorem: {e}")
        return False

if __name__ == "__main__":
    hex_proof = input("give me your hex proof")
    proof = bytes.fromhex(hex_proof).decode("utf-8")

    try:
        data = json.loads(proof)
    except Exception as e:
        print(f"Failed to load JSON: {e}")
        sys.exit(1)

    with theory.fresh_theory():
        imports = data.get("imports", [])
        for imp in imports:
            try:
                basic.load_theory(imp)
            except Exception as e:
                print(f"Warning: failed to load import '{imp}': {e}")

        content = data.get("content", [])
        for idx in range(len(content)):
            raw_item = content[idx]
            item = items.parse_item(raw_item)
            if item.error:
                continue

            if item.ty == "thm":
                result = monitor.check_proof(item, rewrite=False)
                if result["status"] in ["OK", "ProofOK"]:
                    print("✓ Proof check passed")
                    exts = item.get_extension()
                    report = theory.thy.checked_extend(exts)
                    if len(report.get_axioms()) > 1:
                        sys.exit(1)
                    try:
                        thm = theory.thy.get_theorem(item.name)
                        if theorem_proves_false_unconditioned(thm):
                            win()
                            sys.exit(2)
                    except Exception as e:
                        pass
                    sys.exit(0)
                else:
                    print("✗ Proof check failed")
                    sys.exit(1)
            else:
                exts = item.get_extension()
                report = theory.thy.checked_extend(exts)
```

### Exploit Strategy

The service accepts a JSON object encoded in hexadecimal:

1. Imports are loaded into a fresh theory.
2. Items in `content` are parsed sequentially.
3. For theorems (`thm`), `monitor.check_proof` validates the proof.
4. If proof check passes, `theory.thy.checked_extend(item.get_extension())` registers the theorem.

To trigger `win()`, we need an unconditioned theorem proving `false`:
```
|- false
```
with `len(thm.assums) == 0` and `len(thm.hyps) == 0`.

The flaw lies in the discrepancy between proof checking and theory extension:
- `monitor.check_proof(item, rewrite=False)` verifies validity.
- `item.get_extension()` creates extensions directly based on the user-controlled `prop` attribute.

By providing an axiom `thm.ax` with `prop: "false"`, we can derive a theorem that references this axiom. When extended into the theory, it satisfies `theorem_proves_false_unconditioned` without hypotheses or assumptions, triggering `win()`.

### Exploit Script

```python
import json, sys, time

payload = {
    "imports": [],
    "content": [
        {"ty": "thm.ax", "name": "bad", "vars": {"false": "bool"}, "prop": "false"},
        {
            "ty": "thm",
            "name": "pwn",
            "vars": {"false": "bool"},
            "prop": "false",
            "proof": [{"id": "0", "rule": "theorem", "args": "bad", "prevs": [], "th": ""}],
            "num_gaps": 0
        }
    ]
}

hex_data = json.dumps(payload, separators=(',', ':')).encode().hex() + "\n"
sys.stdout.buffer.write(hex_data.encode())
sys.stdout.buffer.flush()
```

<img width="946" height="394" alt="image" src="https://github.com/user-attachments/assets/e6ae2ddd-6050-48a4-8b71-5d9301667ff4" />

Execution output:

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
**zeroD**

{% endraw %}
