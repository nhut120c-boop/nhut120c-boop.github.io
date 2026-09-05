---
layout: post
title: "RIFFHACK CTF : Black Mirror Memory Fragments"
tags: [writeup, ctf]
---
{% raw %}
Tên chall: Wiped Conversation

Mảng: Forensics

Mô tả: A corrupted mobile backup is all that remains of a wiped conversation. Sort the real evidence from the noise, reconstruct what actually happened, and recover the hidden key.

File artifact: 1781949803_black-mirror-memory-fragments-backup.tar

Flag: **bitctf{{sm1th3r33n_thr34d_r3assembled_4cross_fragments}}**

---

Đầu tiên mình tải file artifact về và giải nén ra được các thư mục để phân tích

mình vào thư mục `decoy` và cat thử file `quarantine_note.txt` thì biết được thông tin

<img width="1405" height="212" alt="image" src="https://github.com/user-attachments/assets/b2e7408b-b6c1-409b-a0c8-765e9e304108" />

```
Recovered quarantine banner claims to be official support. It reassembles to a different file type than the signed camera media in the primary inbox.

```

Như vậy thông tin từ `echo.support` là dữ liệu nhiễu lừa đảo. Tiếp theo mình quay lại thư mục `app_export` và cat thử file `messages.db`
```
�QLite format 3@  .��
����
�
.�
11�Ctablerecovered_messagesrecovered_messagesCREATE TABLE recovered_messages (
recovery_id INTEGER PRIMARY KEY,
original_row_id INTEGER,
thread_id TEXT NOT NULL,
seq INTEGER NOT NULL,
ts TEXT NOT NULL,
sender_id TEXT NOT NULL,
body TEXT NOT NULL,
attachment_id TEXT,
recovery_source TEXT NOT NULL,
FOREIGN KEY(thread_id) REFERENCES threads(thread_id)
)�)�%tablemessagesmessagesCREATE TABLE messages (
row_id INTEGER PRIMARY KEY,
thread_id TEXT NOT NULL,
seq INTEGER NOT NULL,
ts TEXT NOT NULL,
sender_id TEXT NOT NULL,
body TEXT NOT NULL,
attachment_id TEXT,
FOREIGN KEY(thread_id) REFERENCES threads(thread_id)
)�MtablethreadsthreadsCREATE TABLE threads (
thread_id TEXT PRIMARY KEY,
contact_id TEXT NOT NULL,
thread_label TEXT NOT NULL,
FOREIGN KEY(contact_id) REFERENCES contacts(contact_id)
)-Andexsqlite_autoindex_threads_1threads�\�
tablecontactscontactsCREATE TABLE contacts (
contact_id TEXT PRIMARY KEY,
display_name TEXT NOT NULL,
source_bucket TEXT NOT NULL,
handshake_state TEXT NOT NULL,
trust_score INTEGER NOT NULL
o��o9%%1echo.supportecho.supportquarantine_restoreunsigned*'mara.veymara.veyprimary_inboxsignedT(iver.kriver.kprimary_inboxsignedX
����%echo.support
mara.vey
����(%1t_echoecho.supportQuarantine restore )t_maramara.veyMotorway claim_riverriver.kCabin thread
����
t_echo
t_mara
_river
�
I       �{�\
�
�
:
�
5nl     !�
t_river2024-11-02T23:50:31Zjaden.colesending you the loc▒er now. tell me the mo▒ent you have it.�o    5�7't_mara2024-11-02T23:52:18Zmara.veyThat should settle the claim. The blackout stop is the only thing those images prove.att_mara_stubrn  !�t_river
Bl�k-11-5�C-t_mara2024-11-02T23:49:11Zmara.veySending the cafe receipt now. I also found the parking stub in the glovebox if you need it.att_mara_receipt�jne fo5%�Q't_echo2024-11-02T23:49:05Zecho.supportFor your safety, ignore any otherthread claiming to hold your key. Only this channel is official.att_echo_lureri        !�t_river2024-11-02T23:48:40Zjaden.colegood. the lawyer says anything syn??d to the clo... is already comp�h    5%�et_echo2024-11-02T23:48:02Zecho.supportSECURITY NOTICE: your evidence locker was suspended. Restore access through the attached notice immediately.�
g            5%�Et_echo2024-11-02T23:47:55Zecho.supportHi Jaden. We noticed unusual activity. An agent is standing by to help restore your account.�f            5!�Ot_mara2024-11-02T23:46:52Zjaden.coleIf you kept the receipt from the motorway stop, send it over before I forget the claim reference.�e             !�5t_river2024-11-02T23:46:11Zjaden.coleriver, the precinct is breathing down my neck. did you keep anything from the cabin?
�       ^j�2    ^
A
�

�       ���L
3�t_river2024-11-02T23:49:58Zriver.kUse the draft plus the porch still comment. Start the base64 key with Yml0Y3Rme3tzbTF0aDNydeleted row rebuild��R
!�7lt_river2024-11-02T23:50:31Zjaden.colesending you the locker now. tell methe moment you have it.overflow page rebuild�
�Q
�P                                              !�!-it_river2024-11-02T23:48:40Zjaden.colegood. the lawyer says anything synced to the cloud is already compromised.page slack carve�
5!�')�t_mara2024-11-02T23:52:41Zjaden.colePerfect. Neither image says anything about the cabin, so legal can have them.freelist carve��O
5�I�t_mara2024-11-02T23:51:02Zmara.veyDo not overthink the receipt, it is just timestamp proof forthe claim and the parking appeal.wal merge�T�N
_river   2024-11-02T23:51:40Zriver.kIf they wiped the live thread, the off-grid copy is all you have got. The draft attachment is real; the porch still metadata holds the rest.att_river_finalwal merge���M
_rive2024-11-02T23:50:57Zriver.kThen continue MzNuX3RocjM0ZF9y before you check the image metadata.freelist carve�#�K
+�t_river2024-11-02T23:49:33Zriver.kRoute snapshot is attached too, but it only proves the approach road�Jnd checkpoint timing.att_river_routewal merge�
_river2024-11-02T23:49:20Zriver.kTrail cam still is attached first so you know I mean the right cabin.att_river_photowal merge��I
)�t_river2024-11-02T23:47:02Zriver.kI kept the porch still and the draft off-grid. The thread copy came back fragmented.freelist carve%                                                                                                                                                                                                              
```
Nhìn sơ qua thấy khá nhiều dữ liệu nhiễu từ các thread khác, nhưng có vài trường đáng chú ý từ tin nhắn đã bị xóa của `t_river`:

```
_river2024-11-02T23:49:58Zriver.kUse the draft plus the porch still comment. Start the base64 key with Yml0Y3Rme3tzbTF0aDNy

```

Ngoài ra còn có:

```
_rive2024-11-02T23:50:57Zriver.kThen continue MzNuX3RocjM0ZF9y before you check the image metadata.

```

VVà dòng note này:

```
_river  2024-11-02T23:51:40Zriver.kIf they wiped the live thread, the off-grid copy is all you have got. The draft attachment is real; the porch still metadata holds the rest.

```

Dòng note này cho biết flag được chia thành nhiều mảnh, và phần cuối nằm trong metadata của ảnh porch still.

=> Khả năng cao phải giải mã base64 các mảnh đang có và tìm metadata của ảnh để ghép lại

Tiếp theo mình decode thử các chuỗi base64 thu được

mảnh 1

mảnh 2

Kết quả thu được:
Yml0Y3Rme3tzbTF0aDNy -> bitctf{{sm1th3r
MzNuX3RocjM0ZF9y -> 33n_thr34d_r

Sau khi xác định được 2 phần đầu của flag, mình tiếp tục tìm cách lấy mảnh cuối trong metadata của porch still. Mình kiểm tra file `attachment_index.json` trong thư mục `metadata`

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

Như vậy file ảnh porch_still được chia thành 2 chunk là `ch_x7.dat` và `ch_y4.dat` nằm trong thư mục `cache`.

rồi bắt đầu xếp lại bằng lệnh cat và xxd để đọc dữ liệu hex của ảnh

```bash
cat ch_x7.dat ch_y4.dat > porch_still.jpg
xxd porch_still.jpg

```
<img width="1278" height="551" alt="image" src="https://github.com/user-attachments/assets/97fa2e18-d497-4388-905e-310c38059165" />

được

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

Quan sát thấy mảnh base64 cuối cùng nằm ở trường `UserComment=M2Fzc2V0YmxlZF80Y3Jvc3NfZnJhZ21lbnRzfX0=`

sau đó đem vào CypherChef deocde
ra được:

```
3assembled_4cross_fragments}}

```

rồi ghép các thông tin lại
ta được flag **bitctf{{sm1th3r33n_thr34d_r3assembled_4cross_fragments}}**

{% endraw %}