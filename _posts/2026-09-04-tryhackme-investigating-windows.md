---
layout: post
title: "TryHackMe: Investigating Windows"
tags: [note, study]
---
{% raw %}
# Investigating Windows Walkthrough

### Question 1: What's the version and year of the windows operating system?

Open **System Information**:

<img width="1919" height="960" alt="image" src="https://github.com/user-attachments/assets/13eb04c4-07e2-4979-a25a-7a5603af31b8" />

Locate the OS Name line:

<img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/bd8ccbf3-bb35-4770-a965-07d373d9272f" />

OS Name: `Microsoft Windows Server 2016 Datacenter`. Submitting `Windows Server 2016`:

<img width="952" height="1046" alt="image" src="https://github.com/user-attachments/assets/83dca06e-bffb-4c8b-8833-e5a4ef20f695" />

**Answer:**
```
Windows Server 2016
```

---

### Question 2: Which user logged in last?

Inspect user accounts:

<img width="1872" height="1014" alt="image" src="https://github.com/user-attachments/assets/5bf45db7-ab1f-4ce8-bf92-f3e92faeec27" />

<img width="1919" height="941" alt="image" src="https://github.com/user-attachments/assets/47ef3372-196e-46b1-ae6a-001ae1206936" />

Running `net user <username>` on each account (`jenny`, `john`, `ssm-user`, `administrator`):

<img width="1788" height="765" alt="image" src="https://github.com/user-attachments/assets/958e6377-e2b6-438d-87b7-b9e41614db55" />

<img width="1551" height="858" alt="image" src="https://github.com/user-attachments/assets/7beb9121-16f9-485e-915f-465a938fb2d1" />

<img width="1913" height="982" alt="image" src="https://github.com/user-attachments/assets/d71522d2-498e-42e0-ba97-203dedf7592f" />

<img width="1918" height="921" alt="image" src="https://github.com/user-attachments/assets/8cf08a11-ee67-45d5-8787-95974e21e7b6" />

<img width="1919" height="1022" alt="image" src="https://github.com/user-attachments/assets/24268e05-a708-47a2-90f5-60620e4bb67b" />

Results:
* `administrator`: Last logon `6/2/2026 3:26:23 PM`
* `john`: Last logon `3/2/2019 5:48:32 PM`
* Other accounts display `Never`.

Comparing timestamps, `administrator` was the last account to log on.

**Answer:**
```
Administrator
```

---

### Question 3: When did John log onto the system last?

From the `net user john` command:

```text
Last logon: 3/2/2019 5:48:32 PM
```

**Answer:**
```
03/02/2019 5:48:32 PM
```

---

### Question 4: What is the IP of the system that the malware connects to?

Open `regedit` and inspect startup persistence:
`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run`

A suspicious value named `UpdateSvc` executes:
`C:\tmp\p.exe -s \\10.34.2.3 'net user' > C:\tmp\o...`

<img width="1919" height="988" alt="image" src="https://github.com/user-attachments/assets/151819f3-b674-474c-bef0-19765c0bf7f8" />

**Answer:**
```
10.34.2.3
```

---

### Question 5: What two accounts had administrative privileges (other than Administrator)?

Open **Computer Management -> Local Users and Groups -> Groups -> Administrators**.
Members listed: `Administrator`, `Guest`, `Jenny`.

<img width="1023" height="520" alt="image" src="https://github.com/user-attachments/assets/a3078fd2-bb06-4dd0-9324-7b61db3e6cff" />

Alphabetical order:

**Answer:**
```
Guest, Jenny
```

---

### Question 6: What is the name of the scheduled task that is malicious?

Open **Task Scheduler** and review the Task Scheduler Library for suspicious jobs.
A task named `Clean File System` is configured to run daily at `4:55 PM`:

<img width="1024" height="535" alt="image" src="https://github.com/user-attachments/assets/06d72a89-6ba6-400a-a9e4-6fd352df8823" />

<img width="1024" height="525" alt="image" src="https://github.com/user-attachments/assets/7a409608-1462-4815-abce-1197980e3422" />

**Answer:**
```
Clean File System
```

---

### Question 7: What file does this task execute?

Under the **Actions** tab for `Clean File System`:
`C:\tmp\nc.ps1 -l 1348`

<img width="1919" height="944" alt="image" src="https://github.com/user-attachments/assets/785dd9bb-ee84-45b0-be84-e53eaaf45bf9" />

**Answer:**
```
nc.ps1
```

---

### Question 8: What port does this task listen on?

The parameter `-l 1348` instructs the script to bind a listening listener on port `1348`:

<img width="1895" height="935" alt="image" src="https://github.com/user-attachments/assets/932480a3-658e-4c9c-bf0f-e2ed03b78cf8" />

**Answer:**
```
1348
```

---

### Question 9: When referenced in question 5, when was Jenny's last login?

From the `net user jenny` output:

<img width="1788" height="765" alt="image" src="https://github.com/user-attachments/assets/7b08001d-67c8-400a-a7d7-8f8738722055" />

The account shows `Never`.

**Answer:**
```
Never
```

---

### Question 10: At what date was the compromise?

Reviewing the timeline:
* John's last logon was `3/2/2019`:

<img width="1919" height="946" alt="image" src="https://github.com/user-attachments/assets/8c784bc7-a6f8-42e3-a338-8319319f5e1f" />

* The malicious scheduled task `Clean File System` was scheduled with a trigger start date of `3/2/2019`:

<img width="984" height="745" alt="image" src="https://github.com/user-attachments/assets/bb8e460e-a1c4-4320-ba73-94193bc36120" />

**Answer:**
```
03/02/2019
```

---

### Question 11: At what time was the compromise?

Filter Event ID 4672 (Special privileges assigned to new logon) on `03/02/2019` in PowerShell:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4672} | Where-Object {$_.TimeCreated.Month -eq 3 -and $_.TimeCreated.Day -eq 2} | Sort-Object TimeCreated | Select-Object TimeCreated, Message
```

<img width="667" height="512" alt="image" src="https://github.com/user-attachments/assets/971cd3f2-607e-425b-a084-17bd6b8beeae" />

Matching the hint ending in `:49 PM`:

**Answer:**
```
03/02/2019 4:04:49 PM
```

---

### Question 12: What tool was used to dump credentials?

Open **Event Viewer -> Applications and Services Logs -> Microsoft -> Windows -> Windows Defender -> Operational**:

<img width="1522" height="750" alt="image" src="https://github.com/user-attachments/assets/f06312dd-296b-44a7-a2cb-407718dc6add" />

<img width="1530" height="812" alt="image" src="https://github.com/user-attachments/assets/f2bfa880-b643-4e3c-a19c-ae6c447f77ca" />

<img width="1495" height="781" alt="image" src="https://github.com/user-attachments/assets/ad3ea886-edd5-4dbc-a8e1-e7223ce8bc8c" />

<img width="1501" height="792" alt="image" src="https://github.com/user-attachments/assets/e603d93c-fc73-4e3d-a76a-43864f5899e7" />

A detection event logs `Mimikatz`:

<img width="1531" height="761" alt="image" src="https://github.com/user-attachments/assets/0343e8c9-b304-4fb2-900d-f3bf1fa2d5a4" />

**Answer:**
```
Mimikatz
```

---

### Question 13: What is the external IP that the attacker used?

Check `C:\Windows\System32\drivers\etc\hosts`:

<img width="1536" height="822" alt="image" src="https://github.com/user-attachments/assets/a113dcc6-5cfd-4c1f-8771-e85cbb34e07a" />

The attacker modified `hosts` to map AV sites to `127.0.0.1`, and mapped `google.com` to `76.32.97.132`:

<img width="1297" height="762" alt="image" src="https://github.com/user-attachments/assets/b373119b-529b-4bca-a67f-ba926b065b02" />

**Answer:**
```
76.32.97.132
```

---

### Question 14: What file extension did the web shell use?

Inspect the web root at `C:\inetpub\wwwroot`:

<img width="900" height="492" alt="image" src="https://github.com/user-attachments/assets/2ae9ce84-8877-4422-ade1-fea5ee94b1f5" />

A suspicious file `b.jsp` was created on `03/02/2019`.

**Answer:**
```
.jsp
```

---

### Question 15: What port was opened on the firewall?

Open **Windows Defender Firewall with Advanced Security -> Inbound Rules**:

<img width="1536" height="757" alt="image" src="https://github.com/user-attachments/assets/ed9f5387-7c1d-4647-b68c-1f0113b700d5" />

Inspect the suspicious rule's **Protocols and Ports** tab:

<img width="990" height="707" alt="image" src="https://github.com/user-attachments/assets/d922a0ff-a64f-4a80-ae4c-63e64354f356" />

**Answer:**
```
1337
```

---

### Question 16: What website was poisoned in the hosts file?

From the hosts file examined in Question 13:

**Answer:**
```
google.com
```

{% endraw %}
