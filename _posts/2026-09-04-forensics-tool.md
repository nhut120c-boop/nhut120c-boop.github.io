---
layout: post
title: 'Forensics: Disk Analysis & Autopsy'
tags:
  - note
  - study
---

{% raw %}
# Disk Analysis & Autopsy

---

### Question 1
```plain
What is the MD5 hash of the E01 image?
```

Open Autopsy and load the case. Right-click `HASAN2.E01` -> **View Summary Information**:

<img width="1522" height="812" alt="image" src="https://github.com/user-attachments/assets/cd7c8de2-db12-43aa-bdc5-df9f4226930f" />

Under container details, locate the MD5 hash:

<img width="1522" height="770" alt="image" src="https://github.com/user-attachments/assets/8e46d0c3-fefa-41e0-a513-42f2e40df528" />

---

### Question 2
```text
What is the computer account name?
```

Search for `ComputerName` across the extracted registry artifacts in Autopsy. Inspecting the results reveals:

```text
ComputerName = DESKTOP-0R59DJ3
```

<img width="1535" height="777" alt="image" src="https://github.com/user-attachments/assets/7704aaf4-9ac0-451b-b08b-6f2cf3317c69" />

**Answer:**
```text
DESKTOP-0R59DJ3
```

---

### Question 3
```text
List all the user accounts. (alphabetical order)
```

Navigate to `/Users` within Autopsy to review user profiles. Filter out default Windows profiles (`All Users`, `Default`, `Default User`, `Public`).

The remaining user accounts are:
```text
H4S4N, joshwa, keshav, sandhya, shreya, sivapriya, srini, suba
```

<img width="1530" height="757" alt="image" src="https://github.com/user-attachments/assets/b18a1fc5-623a-4cc1-8a4e-ba14c8bd0ba2" />

**Answer:**
```plain
H4S4N, joshwa, keshav, sandhya, shreya, sivapriya, srini, suba
```

---

### Question 4
```text
Who was the last user to log into the computer?
```

Go to **Results -> Extracted Content -> Operating System User Account**. Review logon timestamps across all accounts. The last account to log on was `sivapriya`:

<img width="1518" height="787" alt="image" src="https://github.com/user-attachments/assets/1585ddd0-910a-4555-a9c6-3bb0c8a2d38c" />

**Answer:**
```plain
sivapriya
```

---

### Question 5
```text
What was the IP address of the computer?
```

Initial inspection of `Windows\System32\config\SYSTEM` under network interfaces returned `DhcpIPAddress = 0.0.0.0`:

<img width="1536" height="697" alt="image" src="https://github.com/user-attachments/assets/a954143f-a134-4c55-88aa-c548f87317bc" />

Checking installed applications under `Program Files (x86)` reveals `Look@LAN`. Opening its configuration file `Program Files (x86)\Look@LAN\irunin.ini`:

```text
LANIP=192.168.130.216
```

<img width="1532" height="762" alt="image" src="https://github.com/user-attachments/assets/7d606ace-1aa8-4a38-92fc-1cc3b82ec3de" />

**Answer:**
```text
192.168.130.216
```

---

### Question 6
```text
What was the MAC address of the computer? (XX-XX-XX-XX-XX-XX)
```

In the same `Look@LAN\irunin.ini` configuration file:

```text
LANNIC=0800272cc4b9
```

<img width="1528" height="717" alt="image" src="https://github.com/user-attachments/assets/12d6f7d5-6bbf-4767-b6df-09687660e818" />

Formatting as `XX-XX-XX-XX-XX-XX`:

**Answer:**
```text
08-00-27-2C-C4-B9
```

---

### Question 7
```text
What is the name of the network card on this computer?
```

Checking RegRipper output parsed from the `SOFTWARE` hive:
`Case Files\ModuleOutput\RecentActivity\reg\SOFTWARE-regripper-179465-full`

Under section:
`Microsoft\Windows NT\CurrentVersion\NetworkCards`

<img width="1535" height="796" alt="image" src="https://github.com/user-attachments/assets/c55cfa09-bc09-4911-9be9-c348ccd9db23" />

The adapter name is listed as:

**Answer:**
```text
Intel(R) PRO/1000 MT Desktop Adapter
```

---

### Question 8
```plain
What is the name of the network monitoring tool?
```

As found in Question 5, the installed network monitoring utility is:

**Answer:**
```plain
Look@Lan
```

---

### Question 9
```plain
A user bookmarked a Google Maps location. What are the coordinates of the location?
```

Inspecting browser history from `places.sqlite` in Autopsy. Under **Visit Details**, the coordinates are captured in the title bar:

<img width="1526" height="772" alt="image" src="https://github.com/user-attachments/assets/eedd4ffc-2ea5-4cf5-a0db-5075612e693e" />

**Answer:**
```plain
12°52'23.0"N 80°13'25.0"E
```

---

### Question 10
```text
A user has his full name printed on his desktop wallpaper. What is the user's full name?
```

Extracting `Users\joshwa\NTUSER.DAT` and navigating to:
`Control Panel\Desktop`

The `Wallpaper` value points to an image file in Downloads:

<img width="1536" height="762" alt="image" src="https://github.com/user-attachments/assets/a507b327-56d3-4635-9c0e-aaf171d85b5b" />

Navigating to `Users\joshwa\Downloads` and viewing the wallpaper image reveals the full name `Anto Joshwa` printed across the graphic:

<img width="1533" height="792" alt="image" src="https://github.com/user-attachments/assets/64b0c51f-a37f-4953-a942-5470cbd76f37" />

**Answer:**
```text
Anto Joshwa
```

---

### Question 11
```text
A user had a file on her desktop. It had a flag but she changed the flag using PowerShell. What was the first flag?
```

Checking PowerShell history for user `shreya`:
`Users\shreya\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt`

<img width="1166" height="712" alt="image" src="https://github.com/user-attachments/assets/82bde5df-09af-473a-ba25-a743e055ab8f" />

The first command used to write the flag into `shreya.txt` was:

```powershell
Add-Content .\shreya.txt 'flag{HarleyQuinnForQueen}'
```

**Answer:**
```text
flag{HarleyQuinnForQueen}
```

---

### Question 12
```text
The same user found an exploit to escalate privileges on the computer. What was the message to the device owner?
```

Examining `Users\shreya\Desktop\exploit.ps1`:

```powershell
New-Item "C:\Users\H454N\Desktop\hacked.txt"
Add-Content C:\Users\H454N\Desktop\hacked.txt 'Flag{I-hacked-you}'
```

<img width="1024" height="601" alt="image" src="https://github.com/user-attachments/assets/2d68a13d-2cd4-4fc4-9e20-3ddccc616b4d" />

The script drops a note onto `H454N`'s desktop:

**Answer:**
```text
Flag{I-hacked-you}
```

---

### Question 13
```text
2 hack tools focused on passwords were found in the system. What are the names of these tools? (alphabetical order)
```

1. In `Users\H454N\Downloads`, finding `mimikatz_trunk.zip`:

<img width="1040" height="555" alt="image" src="https://github.com/user-attachments/assets/4a67ce66-21d8-48fa-a13b-8bc02d1bddfa" />

2. Under **Extracted Content -> Run Programs** (Prefetch artifacts), finding execution records for `LAZAGNE.EXE`:

<img width="1097" height="692" alt="image" src="https://github.com/user-attachments/assets/70097d9a-2c85-4d1c-9461-f73b7883dbcf" />

Alphabetical order:

**Answer:**
```text
lazagne, mimikatz
```

---

### Question 14
```text
There is a YARA file on the computer. Inspect the file. What is the name of the author?
```

Searching for `*.yar` returns `kiwi_passwords.yar`. Inspecting the file's `meta:` block shows the author name:

<img width="1077" height="673" alt="image" src="https://github.com/user-attachments/assets/bc37dc5e-799e-4892-bc2f-0d6301500f7a" />

**Answer:**
```text
Benjamin DELPY (gentilkiwi)
```

{% endraw %}
