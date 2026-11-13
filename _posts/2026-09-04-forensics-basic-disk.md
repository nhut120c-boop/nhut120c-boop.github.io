---
layout: post
title: "Forensics: Basic Disk"
tags: [note, study]
---
{% raw %}
# Basic Disk
Writeup: Basic Disk 2

Tools used: FTK Imager, Registry Explorer, DB Browser for SQLite

### Question 1: Find the OS Build Number

The build number resides within the `SOFTWARE` registry hive, where Windows stores OS configuration and installed software data, specifically under `Microsoft\Windows NT\CurrentVersion`.

**Step 1:** Open the disk image in FTK Imager and navigate to:

```
[root]\Windows\System32\config\
```

**Step 2:** Right-click the `SOFTWARE` file -> Export File -> Save to Desktop.

<img width="1410" height="701" alt="image" src="https://github.com/user-attachments/assets/4d2690aa-fc00-4e83-9127-08de32141348" />

**Step 3:** Open Registry Explorer and load the exported `SOFTWARE` hive.

**Step 4:** Navigate to `CurrentVersion`:

```
ROOT\Microsoft\Windows NT\CurrentVersion
```

<img width="1547" height="875" alt="image" src="https://github.com/user-attachments/assets/2bc826d5-9b9d-40b2-b8bd-f01c6d94e1e0" />

**Step 5:** Inspect the right panel and find the build information:

<img width="695" height="370" alt="image" src="https://github.com/user-attachments/assets/33bf5e22-c36f-43cf-804c-4f2a72ab0fd2" />

Result for Question 1: `Win10-19043`

---

### Question 2: Find the Secret Document and Password

Searching for documents:

Back in FTK Imager, inspecting user directories for user `k137`:

Only `AppData` and `Downloads` are present:

<img width="627" height="105" alt="image" src="https://github.com/user-attachments/assets/b15b8eba-ff5d-422f-a412-d0dc469c8cd1" />

Navigating into AppData to locate browser history:

<img width="810" height="583" alt="image" src="https://github.com/user-attachments/assets/756d82c8-e3d0-4710-b652-568e3627ae38" />

Exporting History -> Desktop, and opening with DB Browser for SQLite:

<img width="1370" height="322" alt="image" src="https://github.com/user-attachments/assets/6fc85b68-d2b9-4929-b8ad-8ba52f73e591" />

The user downloaded WinRAR and a suspicious executable named `uwu`.
{% endraw %}
