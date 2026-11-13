---
layout: post
title: "Tryhackme: Windows Fundamentals 1"
tags: [note, study]
---
{% raw %}
# Lab-Windows-Fundamentals-1

In this section, I read the lab content and saw that Windows currently has many different versions, of which the popular versions are home and pro.

The question the lab asks is:

```
what encryption can you enable on pro that you can't enable in home?

```

Simply put, the lab is asking: what encryption features can be enabled on the pro version, but the home version cannot be fully enabled?

After looking at the differences between windows home and windows pro, I see that the features are:

```
bitlocker
```

In this task, I learn about windows desktop/gui, which is the interface that appears after logging in to windows. In the article, the main components such as desktop, start menu, search box, task view, taskbar, toolbars and notification area are mentioned.

with question:

```text
which selection will hide/disable the search box?
```

Initially, I relied on the taskbar settings and chose the answer:

```text
hidden
```

This answer is correct because if you want to hide the search box on the taskbar, select **hidden**.

Next, question:

```text
which selection will hide/disable the task view button?
```

At first I answered incorrectly by describing the action as:

```text
hide task view button
```

but the lab says it's wrong, because it needs the correct selection name in windows. Then I changed it to:

```text
show task view button
```

The reason is that the show task view button section is used to turn on/off the task view button. If you want to hide it, uncheck this section.

Finally, the question:

```text
besides clock and network, what other icon is visible in the notification area?
```

At first I thought the answer was:

```text
volume
```

Because in the article it is mentioned that the notification area can display the volume icon and network/wireless icon. But this answer doesn't match the format because it only has 6 words.
Then I checked the notification area interface on windows and realized that in addition to clock and network, there was also an action center. This is the area used to display system notifications and quickly access some Windows settings

So I changed the answer to:
```
action center
```
task 3

For this task, I just read the instructions and started the Windows virtual machine provided by the lab

task 4
In this task, you learn about file systems on Windows.

<img width="553" height="676" alt="image" src="https://github.com/user-attachments/assets/1f523e4f-b98a-455d-adeb-bef193712835" />


In the article, it is mentioned that ntfs is the default file system of modern Windows versions


This new standard is used to replace old standards such as fat16, fat32 or hpfs

ntfs brings many outstanding advantages, most typically supporting files larger than 4GB.

Additionally, it has a journaling feature for automatic error recovery

ntfs also allows for better security through setting permissions for each folder and file.

This standard also includes a feature called alternate data streams (ads). This is where malicious software (malware) often takes advantage to hide data.

question
```
what is the meaning of ntfs?
```
Simply put, the lab is asking: What does ntfs stand for?

After reading the first line of the document in the task, the lesson explained it very clearly

The original text is: "The file system used in modern versions of Windows is the New Technology File System or simply NTFS"

answer
```
new technology file system
```
task 5:

task 5

In this task, I learn about windows folders.

windows folder is usually located in:

```text
C:\Windows
```

This folder is used to store files of the Windows operating system.

but it is not required to always be located in drive C.

=> so windows uses environment variables to point to the correct windows directory location.

Environment variables are where system information is stored, for example:

```text
operating system path
number of CPUs
temporary folder location
```

The task also mentions the folder:

```text
System32
```

System32 is located inside the Windows folder.

This is a very important folder because it contains many core files of the operating system.

note:

```text
Wrongly delete files in System32 -> Windows may fail/not run
```

The question the lab asks is:

```text
what is the system variable for the windows folder?
```

Simply put:

```text
What is the system variable that represents the windows folder?
```

The article clearly states:

```text
the system environment variable for the Windows directory is %windir%
```

=> the answer is:

```text
%windir%
```


task 6

In this task, I learn about user accounts on Windows.

On Windows local there are usually 2 types of accounts:

```text
Administrator
Standard User
```

Administrator -> has high rights, can add users, delete users, edit groups, change system settings

Standard User -> lower rights, can only edit files/folders of that user, cannot change system level settings

When creating a new user, Windows will create a separate profile for the user

The user's profile is usually located in:

```text
C:\Users
```

For example, if the user is named Max, the profile will be:

```text
C:\Users\Max
```

In addition to Settings, you can view users using Local Users and Groups

opening way:

```text
Win + R
```

then enter:

```text
lusrmgr.msc
```

then Enter.

After opening `lusrmgr.msc`, I see 2 main items:

```text
Users
Groups
```

Users -> used to view the list of local accounts.

Groups -> used to view permission groups on the device.

Which group the user belongs to -> will inherit the rights of that group.

A user can be in many groups at the same time.

Question 1:

```text
What is the name of the other user account?
```

Simply put, ask: what is the name of another user on the machine?

How to find:

```text
Open lusrmgr.msc -> select Users -> see list of users
```

<img width="1919" height="1014" alt="image" src="https://github.com/user-attachments/assets/5c117773-2e01-4f55-b380-1e1b6826d167" />

In the Users list, I see that in addition to the default accounts, there are also users:

<img width="1918" height="1079" alt="image" src="https://github.com/user-attachments/assets/3997e7a9-4a34-4fc5-afdd-514fed13d612" />

```text
tryhackmebilly
```

=> answer:

```text
tryhackmebilly
```

Question 2:

```text
What groups is this user a member of?
```

Simply put, it means asking: which groups does this user belong to?

How to find:

```text
Open lusrmgr.msc -> Users -> double click tryhackmebilly -> Member Of tab
```

<img width="1900" height="1011" alt="image" src="https://github.com/user-attachments/assets/fc791aad-7aa8-4baa-be0b-bdc667c7954d" />


In the Member Of tab, groups that this user belongs to will be displayed.

=> answer:

```text
Remote Desktop Users,Users
```

Question 3:

```text
What built-in account is for guest access to the computer?
```

Simply put, ask: which built-in account is used for visitors to access the device?

How to find:

```text
Open lusrmgr.msc -> Users -> look at the Name column
```

<img width="1893" height="1019" alt="image" src="https://github.com/user-attachments/assets/f5770944-fa40-4d01-909d-fdd48cc8fa4b" />


In the list there are accounts:

```text
Guest
```

This is the default account used for guest access.


=> answer:


```text
Guest
```


Question 4:


```text
What is the account description?
```


Simply put, ask: what is the description of the Guest account?


How to find:


```text
Open lusrmgr.msc -> Users -> look at the Users line -> Description column
```


In the Guest line, the Description section reads:

 
```text
window$Fun1!
```


<img width="1885" height="1017" alt="image" src="https://github.com/user-attachments/assets/b320c2ff-14b1-4501-aebf-f708f5f58929" />



=> answer:

```text
window$Fun1!
```
task 7

In this task, you learn about User Account Control (UAC).

On Windows, many individual users often log in with a local administrator account.

administrator -> has rights to change the system.

But users don't always need to run with high rights.

For example:

```text
surf the web
open word
xem file
work normally
```

=> These tasks do not require high administrator rights.

If you always run high power -> more dangerous.

reason:

```text
Malware runs under user permissions
The user has admin rights -> malware can also easily affect the system
```

To reduce this risk, Microsoft created UAC.

UAC appeared in Windows Vista and continues to be present in later versions of Windows.

note:

```text
Default UAC does not apply to built-in local administrator accounts
```

How UAC works:

When a user belonging to the administrator group logs in to Windows, the initial session does not run with full privileges.

When the program needs higher permissions -> windows displays a UAC dialog box to ask for confirmation.

For example, when installing the program:

```text
double click the installation file
-> shows shield icon
-> UAC prompt appears
-> ask for confirmation/enter admin password
```

The shield icon on the program icon means:

```text
The program needs high permissions to run
```

If you do not enter a password or do not allow it -> the program will not be installed.

=> UAC helps reduce the possibility of malware arbitrarily changing the system.

The question the lab asks is:

```text
What does UAC mean?
```

Simply put:

```text
What does UAC stand for?
```

The article clearly states the full name is User Account Control.

=> answer:

```text
User Account Control
```


task 8

In this task, I learn about Settings and Control Panel on Windows.

These are the two main places used to change system configuration.

Settings -> newer interface, appearing since Windows 8.

Control Panel -> older interface, used to adjust many advanced settings.

For example:

```text
add printer
uninstall the program
View installed software
change network adapter
Adjust firewall
```

Settings is currently where users often open before wanting to change settings.

but some advanced items will still move to Control Panel.

For example:

```text
Settings
-> Network & Internet
-> Change adapter options
-> open the Control Panel window
```

If you don't know where the item you need to edit is -> use Start Menu to search.

search example:

```text
wallpaper
```

=> Windows will take you to the correct wallpaper change section in Settings.

Control Panel also has a Programs and Features section.

This section is used to view the software installed on the device.

can see:

```text
software name
publisher
version
```

In forensics, this section helps check if the computer has any strange software installed.

The question the lab asks is:

```text
In the Control Panel, change the view to Small icons. What is the last setting in the Control Panel view?
```

Simply put:

```text
Go to Control Panel -> change View by to Small icons -> see what the last item is?
```

making:

```text
Open Start Menu
-> search Control Panel
-> open Control Panel
-> right corner select View by: Small icons
-> scroll down / look at the last item
```

<img width="1889" height="954" alt="image" src="https://github.com/user-attachments/assets/7b345faf-af93-4d9c-a347-4ee237ae03b1" />

The last item in the lab is:

```text
Windows Defender Firewall
```

=> answer:

```text
Windows Defender Firewall
```

task 9

In this task, I learn about task manager on windows.

Task manager is used to view programs and processes running on the system.

In task manager you can see:

```text
open application
process is running
How much CPU is being used?
How much RAM are you using?
system performance
```

How to open task manager:

```text
right-click taskbar -> task manager
```

or use keyboard shortcuts:

```text
ctrl + shift + esc
```

When first opened, the task manager is displayed in simple view.

simple view -> only shows a little information.

If you want to see more details, click:

```text
more details
```

Then task manager will display more tabs and more information.

In forensics, task manager helps you quickly check strange processes running on the computer.

Examples can be seen:

```text
strange process
app is running in the background
Abnormal cpu/ram levels
program suspected of malware
```

The question the lab asks is:

```text
what is the keyboard shortcut to open task manager?
```

Simply put:

```text
What is the shortcut to open task manager?
```

answer:

```text
ctrl + shift + esc
```
<img width="900" height="335" alt="image" src="https://github.com/user-attachments/assets/d6bedd5b-64e2-44a2-88d4-7da498f45ad1" />




{% endraw %}