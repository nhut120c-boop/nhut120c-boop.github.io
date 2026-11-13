---
layout: post
title: "RIFFHACK CTF: Black Mirror Memory Fragments"
tags: [writeup, ctf]
---
{% raw %}
## Challenge: Wiped Conversation
## Category: Forensics

> Description: A corrupted mobile backup is all that remains of a wiped conversation. Sort the real evidence from the noise, reconstruct what actually happened, and recover the hidden key.

**Artifact:** `1781949803_black-mirror-memory-fragments-backup.tar`  
**Flag:** `bitctf{sm1th3r33n_thr34d_r3assembled_4cross_fragments}`

---

### Initial Extraction & Triage

Download and extract the artifact archive to inspect the directories:

In the `decoy` directory, reading `quarantine_note.txt`:

<img width="1405" height="212" alt="image" src="https://github.com/user-attachments/assets/b2e7408b-b6c1-409b-a0c8-765e9e304108" />

```
Recovered quarantine banner claims to be official support. It reassembles to a different file type than the signed camera media in the primary inbox.
```

This confirms messages from `echo.support` are deceptive decoy noise.

### Database Carving (`messages.db`)

In `app_export`, inspecting `messages.db` reveals SQLite schemas and carved records:

```
SQLite format 3
CREATE TABLE recovered_messages (...)
CREATE TABLE messages (...)
CREATE TABLE threads (...)
CREATE TABLE contacts (...)
```

Carved records from the deleted conversation thread `t_river`:

```
_river2024-11-02T23:49:58Zriver.kUse the draft plus the porch still comment. Start the base64 key with Yml0Y3Rme3tzbTF0aDNy
```

Further down:

```
_rive2024-11-02T23:50:57Zriver.kThen continue MzNuX3RocjM0ZF9y before you check the image metadata.
```

And:

```
_river 2024-11-02T23:51:40Zriver.kIf they wiped the live thread, the off-grid copy is all you have got. The draft attachment is real; the porch still metadata holds the rest.
```

The note clarifies that the flag is split across multiple base64-encoded segments, with the final piece embedded inside the metadata of `porch still`.

### Decoding Base64 Fragments

Decoding the carved base64 fragments:

* Fragment 1: `Yml0Y3Rme3tzbTF0aDNy` -> `bitctf{sm1th3r`
* Fragment 2: `MzNuX3RocjM0ZF9y` -> `33n_thr34d_r`

### Reconstructing `porch_still.jpg`

Inspecting `attachment_index.json` under the `metadata` directory:

<img width="1130" height="746" alt="image" src="https://github.com/user-attachments/assets/86ce9884-5c7e-4bb4-bdd3-ee6071f46729" />

```json
{
  "attachment_id": "att_river_photo",
  "thread_id": "t_river",
  "chunk_files": [
    "ch_x7.dat",
    "ch_y4.dat"
  ],
  "sha1": "ee224b600d2a34c19d812261ae05ddf451dad7cf",
  "kind": "porch_still"
}
```

The image is split into two chunk files: `ch_x7.dat` and `ch_y4.dat` inside `cache`. Reassemble them:

```bash
cat ch_x7.dat ch_y4.dat > porch_still.jpg
xxd porch_still.jpg
```

<img width="1278" height="551" alt="image" src="https://github.com/user-attachments/assets/97fa2e18-d497-4388-905e-310c38059165" />

Inspecting the EXIF metadata header:

```
00000000: ffd8 ffe1 4578 6966 0000 4d61 6b65 3d53  ....Exif..Make=S
00000010: 6d69 7468 6572 6565 6e3b 4d6f 6465 6c3d  mithereen;Model=
00000020: 5068 6f6e 6558 3b44 6174 6554 696d 654f  PhoneX;DateTimeO
00000030: 7269 6769 6e61 6c3d 3230 3234 3a31 313a  riginal=2024:11:
00000040: 3032 2032 333a 3439 3a31 383b 4c65 6e73  02 23:49:18;Lens
00000050: 3d72 6561 722d 7769 6465 3b46 7261 6d65  =rear-wide;Frame
00000060: 3d70 6f72 6368 2d73 7469 6c6c 3b55 7365  =porch-still;Use
00000070: 7243 6f6d 6d65 6e74 3d4d 3246 7a63 3256  rComment=M2Fzc2V
00000080: 7459 6d78 6c5a 4638 3059 334a 7663 334e  tYmxlZF80Y3Jvc3N
00000090: 665a 6e4a 685a 3231 6c62 6e52 7a66 5830  fZnJhZ21lbnRzfX0
000000a0: 3d3b ffd9                                =;..
```

The final base64 string is in `UserComment`:
```
M2Fzc2V0YmxlZF80Y3Jvc3NfZnJhZ21lbnRzfX0=
```

Base64 decoding via CyberChef yields:
```
3assembled_4cross_fragments}}
```

Concatenating all three pieces:
```
bitctf{sm1th3r + 33n_thr34d_r + 3assembled_4cross_fragments}}
```

**Flag:** `bitctf{sm1th3r33n_thr34d_r3assembled_4cross_fragments}`

{% endraw %}
