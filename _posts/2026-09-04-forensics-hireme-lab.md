---
layout: post
title: "Forensics: HireMe Lab"
tags: [note, study]
---
{% raw %}
# HireMe Lab

### What is the administrator's username?

First, open the disk image in FTK Imager. Under `Users`, locate the user profile named `Karen`:

<img width="1220" height="554" alt="image" src="https://github.com/user-attachments/assets/18dd1999-4d65-40b6-b1e2-efbe10a7c0e8" />

**Answer:**
```
Karen
```

### Question 2: What is the OS's build number?
Export the `SYSTEM` hive:
<img width="622" height="258" alt="image" src="https://github.com/user-attachments/assets/9bc73f86-5d8b-4382-9f2a-419f2ed648b1" />

Open it with Registry Explorer to find `CurrentBuild`:

<img width="1536" height="782" alt="image" src="https://github.com/user-attachments/assets/9800952b-e9d0-40ba-a1a7-406d32af7b0d" />

**Answer:**
```
16299
```

### Question 3: What is the hostname of the computer?

Inspect `ControlSet001\Control\ComputerName\ComputerName`:

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/c3deb8a1-402d-4d73-84f4-c85d06854667" />

**Answer:**
```
TOTALLYNOTAHACK
```

### Question 4: A messaging application was used to communicate with a fellow Alpaca enthusiast. What is the name of the software?

Export the `SOFTWARE` hive and look under `App Paths` following the challenge hint:

<img width="1536" height="577" alt="image" src="https://github.com/user-attachments/assets/cd7c776f-6ce1-4831-8207-4840e89c2a1c" />

Skype is the messaging software installed:

**Answer:**
```
Skype
```

### Question 5: What is the zip code of the administrator's post?

Inspecting Karen's user folder shows Chrome browser usage. Extract `Web Data` from Chrome's directory and query with SQLite Browser:

<img width="967" height="456" alt="image" src="https://github.com/user-attachments/assets/c5513ed5-4975-4245-9fc6-af6a3ee85fa7" />

Found the requested zip code:

**Answer:**
```
19709
```

### Question 6: What are the initials of the person who contacted the admin user from TAAUSAI?

Navigate to Microsoft Outlook directories, export the `.ost` file, and open it with Kernel for OST viewer.
Inspect the emails received from TAAUSAI and identify the initials `MS` at the start:

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/c66b147b-5a44-40e3-8d6d-94b451c1384d" />

**Answer:**
```
MS
```

### Question 7: Salary offer

Review the email exchange from TAAUSAI to Karen detailing the proposed salary:

<img width="1536" height="863" alt="image" src="https://github.com/user-attachments/assets/5381024f-890c-4984-b3e5-c46504ad17f0" />

**Answer:**
```
150000
```

### Question 8: Location Coordinates
Reviewing the emails further reveals geographic coordinates:
<img width="1430" height="747" alt="image" src="https://github.com/user-attachments/assets/5cf5ff80-14a6-4472-89d3-f6833870e544" />

{% endraw %}
