---
layout: post
title: "Tryhackme: Windows Fundamentals 2"
tags: [note, study]
---
{% raw %}
# Windows-Fundamentals-2

task 1 

This module continues windows fundamentals 1

main content -> learn more tools available in windows such as: system configuration, uac settings, computer management, system information, resource monitor, command prompt, registry editor

To do lab -> press start machine

task 2

In this task, you learn about system configuration and advanced system settings

system configuration is also known as msconfig

msconfig is a tool used to troubleshoot errors related to the Windows startup process

To make it easier to understand, when Windows boots up, has a service error, or suspects that something is causing the computer to boot abnormally, you can use msconfig to check.

how to open msconfig

```text
win + r -> msconfig -> enter
```

or

```text
start menu -> search system configuration
```

Note that if you want to open msconfig, you need local administrator rights

In msconfig there are 5 main tabs

```text
general
boot
services
startup
tools
```

The general tab is used to choose how windows loads at startup

normal startup -> boot normally, fully load drivers and services

diagnostic startup -> only loads basic drivers and services, used to check for errors

selective startup -> allows choosing which components will be loaded when booting

The boot tab is used to adjust the operating system's boot options

For example, you can adjust safe boot, boot log or timeout

In forensics, the boot tab can help check if the machine has abnormal boot options

The services tab lists the services available on the system

Service is a type of program that runs in the background in Windows

service may be running or stopped

In forensics, the services tab is very important because malware can create services to run again after restarting the computer

If you see a strange service, a strange manufacturer, or a service located on an unusual path, you need to check more carefully

The startup tab is used to view programs that run automatically when the user logs in

But this lab machine is a windows server so the startup tab usually doesn't appear like windows 10 or windows 11

With windows server, to see the startup user-level, use the command

```text
win + r -> shell:startup
```

The startup folder will display shortcuts or files that are configured to run automatically when the user logs in

In forensics, the startup folder is also a place to look because malware can place shortcuts here to run automatically every time a user logs in

The tools tab contains many system tools available in windows

Each tool will have a short description to know what the tool is used for

When selecting a tool, the selected command section will display the command used to open that tool

You can click launch to run the tool or copy the command to run with run / cmd

advanced system settings is where to adjust advanced system settings

how to open

```text
start menu -> search view advanced system settings
```

In advanced system settings there are important items such as performance and startup and recovery

performance is used to adjust settings related to windows performance

In performance there is a page file section

page file is virtual memory that windows uses when RAM is full

When RAM is not enough, Windows can use part of the drive as virtual memory to avoid program crashes

page file can indicate information such as

```text
The drive contains the page file
initial size
maximum size
Does Windows manage the size itself?
```

In forensics, the page file can be useful because it sometimes contains traces of data that was once in RAM

For example, there may be remaining text strings, commands, file paths, or data related to a process that was previously run

startup and recovery are used to adjust windows behavior when the system has serious errors

For example, when the device has a blue screen of death

Windows can create a crash dump to save information at the time the system crashed

Crash dump helps admins or analysts analyze the cause of errors

Common types of crash dumps include:

```text
automatic memory dump
kernel memory dump
small memory dump
complete memory dump
none
```

In forensics, crash dumps can contain information about processes, drivers or system errors at the time of the crash

If your computer is crashed by malware or a malicious driver is causing errors, a crash dump can help find clues

summarize task 2

msconfig -> used to troubleshoot startup errors

general -> select boot windows type

boot -> adjust boot options

services -> soi service runs in the background

startup -> see app automatically run when logging in

tools -> see command to open windows tools

advanced system settings -> view performance, page file and crash dump

In forensics, this task helps you check strange services, unusual startups, virtual memory and crash dumps to find signs of system interference.

answer the question

```text
question 1

what is the name of the service that lists systems internals as the manufacturer?

how to find

Open msconfig -> services tab -> find the manufacturer column with systems internals -> get the service name in the service column
```

<img width="1905" height="1023" alt="image" src="https://github.com/user-attachments/assets/f7b4badb-0f15-479b-bd42-d7fc4a223a35" />

answer

```
psshutdown
```

```text
question 2

whom is the windows license registered to?

how to find

Open msconfig -> tools tab -> select about windows -> click launch -> see the registered to line
```
<img width="1894" height="1030" alt="image" src="https://github.com/user-attachments/assets/0ad0b364-795e-4cde-803c-9319667f566d" />

answer

```
windows user
```


```text
question 3

what is the command for windows troubleshooting?

how to find

Open msconfig -> tools tab -> select windows troubleshooting -> look at selected command section

```
<img width="1903" height="1028" alt="image" src="https://github.com/user-attachments/assets/0d97a21b-59fd-4e97-ae1a-a1b6a6815d41" />

answer
```
c:\windows\system32\control.exe /name microsoft.troubleshooting
```

```text
question 4

what command will open the control panel?

how to find

Open msconfig -> tools tab -> select system properties -> look at selected command section
```

<img width="1910" height="1012" alt="image" src="https://github.com/user-attachments/assets/eb53da1f-5b9d-42f3-955c-ae82abbefb7e" />

answer

```
control.exe
```

task 3

In this task, you learn how to change uac settings in windows

uac is user account control

uac is used to warn when an app or user wants to change things at the system level

For example, installing software, editing important settings, or running programs that require admin rights

speak more clearly

uac is like windows askback layer

it does not allow the app to naturally run with high permissions immediately

If the program needs admin rights -> windows will display a confirmation panel

The purpose of uac is to reduce the risk of malware arbitrarily modifying the system

In this task, uac settings can be opened via system configuration -> tools

In the uac settings window there will be a slider

This slider has 4 security levels

level 1

always notify

This is the highest level

Windows will notify each time the app or the user wants to change the system

The screen will be darkened using secure desktop

This level is safer but can be a bit annoying because it asks too many questions

level 2

notify for apps

Windows indicates when an app tries to make changes to the system

If the user changes the windows settings themselves, there is usually no notification

This is the windows default level

This level balances security and convenience

level 3

notify without dimming

Same as notify for apps level

but the screen is not dimmed

This level is a bit less secure because it does not use a secure desktop

level 4

never notify

Windows will not warn when an app or user changes the system

This level is not recommended

because if the malware can run, it can more easily change the system without the user being warned

In forensics, uac settings is also worth noting

If you see that uac is turned off or set to never notify -> it may be a sign that the device has weak security configuration or has been modified by malware to easily gain permissions / run dangerous commands.

So when investigating a Windows machine, you can check the uac to see if the system has the admin rights warning layer turned on or not.

answer the question

```text
question

what is the command to open user account control settings?

This question asks for the .exe file used to open the user account control settings window

The title says to only get the .exe file name, not the full path

so there is no need to write the full path

```
<img width="1919" height="977" alt="image" src="https://github.com/user-attachments/assets/07401c87-46d2-41cf-b67e-b83bcc7dc350" />

answer

```
UserAccountControlSettings.exe
```

task 4

In this task, I learn about computer management on Windows

computer management is a tool that gathers many system management utilities into one window

<img width="1050" height="964" alt="image" src="https://github.com/user-attachments/assets/2f684e64-34f1-4111-ab69-d2102caa4035" />


Instead of opening each individual tool, you can use computer management to view many important parts such as task scheduler, event viewer, shared folders, local users and groups, performance, device manager, disk management and services.

Computer management has 3 main groups

```text
system tools
storage
services and applications
```

<img width="1246" height="900" alt="image" src="https://github.com/user-attachments/assets/8f97d978-55fa-4dd5-b3d2-b1378eec2ec5" />


system tools is a group used to view and manage system components

In system tools there is task scheduler

<img width="1225" height="890" alt="image" src="https://github.com/user-attachments/assets/1b085e25-05b3-418a-ac9c-6991a1204149" />


task scheduler is used to create and manage automated tasks

A task can run a program, script or command under certain conditions

For example, the task can run when the user logs in, when the computer boots, or on a fixed schedule every day

trong forensics, task schedule qtrong

because malware can create scheduled tasks to rerun automatically after restart or after user login

When looking at the task scheduler, you need to pay attention

```text
task name
task status
trigger
last run time
last run result
actions
command is run
```

trigger indicates when the task runs

actions indicate what program or command the task will run

If you see an action running powershell, cmd, a strange exe file or a script in a strange folder, you need to investigate further

In the lab image, the task scheduler library displays the tasks available on the machine

The npcapwatchdog task is asked in the lab because it is a scheduled task with a specific runtime configuration

If you want to know when a task runs, you must look at the triggers column

Event viewer is a tool used to view event logs on Windows

Event log is like a trace of system activity

It logs events such as program errors, successful logins, failed logins, service errors, driver errors or security activities.

<img width="1233" height="888" alt="image" src="https://github.com/user-attachments/assets/62408580-eb31-4bff-a28a-3f726ff80908" />


<img width="742" height="304" alt="image" src="https://github.com/user-attachments/assets/ed0e18bc-5ed7-4c94-86fb-2cd220745044" />


Common types of events include:

```text
error
warning
information
success audit
failure audit
```

error -> fatal error

warning -> warning, may not be an immediate error but there is a risk

information -> information works normally

success audit -> successful security action, for example successful login

failure audit -> failed security action, for example incorrect login

In windows logs there are common logs such as

```text
application
security
system
```

<img width="737" height="439" alt="image" src="https://github.com/user-attachments/assets/0e3a8681-ab9d-4d21-8c94-337e0fad5439" />


application -> application log

security -> login log, audit, resource access

system -> log of system components, drivers, services

In for, the event viewer helps reconstruct the timeline and know what happened on the machine

For example, you can check for unusual logins, broken services, running tasks, or any software causing errors

shared folders is used to view folders being shared on the computer

In shared folders there are items such as shares, sessions and open files

shares -> list of shared folders

sessions -> which user is connecting to the share

open files -> which files are being opened by other users through sharing

In Windows there are default shares such as

```text
admin$
c$
ipc$
```

shared folders

`$` after the share name -> hidden share

hidden share -> does not appear when browsing the network normally, but knowing the path + having permissions can still access


<img width="1234" height="878" alt="image" src="https://github.com/user-attachments/assets/6d2bad99-b6cf-41b0-8441-2e283b588d91" />


in for -> look for strange shares, share sensitive folders

local users and groups

Manage local users + groups

same as `lusrmgr.msc`

in for -> look for strange users, newly created users, users added to administrators

performance


<img width="1216" height="861" alt="image" src="https://github.com/user-attachments/assets/b0720020-aad0-4c1d-98a0-e3128cc41e1d" />


Has performance monitor, perfmon


<img width="1226" height="875" alt="image" src="https://github.com/user-attachments/assets/b4203dc4-3562-4670-b1ec-ddc4fbbb1b5b" />


View cpu, ram, disk, network in realtime or log

Used when the computer is slow / suspect the process is consuming resources

device manager

<img width="1245" height="911" alt="image" src="https://github.com/user-attachments/assets/95bba4c2-43f6-4f7e-a1eb-d05ca98ca3b8" />


See hardware + drivers

in for -> look for strange drivers, strange devices, unusual network adapters

storage

Drive related

disk management -> xem disk, partition, file system, drive letter

<img width="1282" height="909" alt="image" src="https://github.com/user-attachments/assets/fdc86c5f-96b4-4a7a-bd0c-f246bc0d694c" />


in for -> look at strange partitions, secondary drives, strange drives

services and applications

contains services + wmi control

services -> see services running in the background

<img width="1229" height="880" alt="image" src="https://github.com/user-attachments/assets/ae0f05d1-1a68-464e-a085-07f7de6f906c" />


```text
automatic -> runs automatically when booting
manual -> runs only when called
disabled -> not allowed to run
```

<img width="1226" height="889" alt="image" src="https://github.com/user-attachments/assets/d33fa6ab-e87e-43d8-9167-7b2007ae65f4" />


In for , services is a very important place to look

Because malware often creates new services for persistence

If the service has a strange path, strange name, runs from temp/appdata/downloads or the startup type is automatic, you need to check carefully.

wmi control is used to configure windows management instrumentation

wmi allows managing windows using script or powershell, both locally and remotely

In forensics, wmi is also noteworthy because attackers can take advantage of wmi to run commands or create persistence

```text
question 1

what is the command to open computer management

This question asks for the .msc file used to open computer management
```

<img width="873" height="257" alt="image" src="https://github.com/user-attachments/assets/b82259d4-426b-4837-a548-78144da05c26" />


answer
```
compmgmt.msc
```

```text
question 2

when is the npcapwatchdog scheduled task set to run at

Ask when the npcapwatchdog task is set to run

In the lab, npcapwatchdog has a trigger that runs when the system boots

```

<img width="1909" height="1018" alt="image" src="https://github.com/user-attachments/assets/3c03bf8e-abf2-4790-a56e-b9b5e196c856" />

answer
```
at system startup
```

```text
question 3

what is the name of the hidden folder that is shared

This question asks for the name of the hidden shared folder

If you want to find it, go to computer management -> shared folders -> shares

folder hidden share trong lab 

```

<img width="1910" height="953" alt="image" src="https://github.com/user-attachments/assets/6a62992d-ba5f-42a3-ac65-21d7ead3706c" />

```

answer

sh4r3dF0ld3r
```

task 5

system information = `msinfo32`

Used to view general information of the device

how to open

```text
win + r -> msinfo32
```

or

```text
msconfig -> tools -> system information
```

<img width="691" height="486" alt="image" src="https://github.com/user-attachments/assets/7b7d65ab-b76a-4da7-85cb-a03f301101ad" />

<img width="665" height="470" alt="image" src="https://github.com/user-attachments/assets/71cc01de-4ab0-4478-b2a5-97b3886ef384" />

msinfo32 has 3 main groups

```text
hardware resources
components
software environment
```
<img width="1787" height="901" alt="image" src="https://github.com/user-attachments/assets/dfd84f0a-bb2c-4b17-b439-47e3aade7abf" />


system summary

See general information of the machine

<img width="1783" height="919" alt="image" src="https://github.com/user-attachments/assets/282f595c-72cb-433a-9f52-1297ee630fc8" />

For example

```text
os name
version
system name
processor
bios
ram
```

hardware resources

See hardware resources


<img width="1765" height="895" alt="image" src="https://github.com/user-attachments/assets/c4795c90-f228-4166-949a-e72c569e48fc" />


For example

```text
memory
irq
dma
i/o
```

This part is a bit in-depth, often used when troubleshooting hardware

components

view devices/hardware on the machine


<img width="1785" height="913" alt="image" src="https://github.com/user-attachments/assets/80c3816e-d85a-4c56-924c-baa5a0370f8e" />


For example

```text
display
sound device
keyboard
network adapter
storage
usb
problem devices
```

forensics -> scan for strange devices, strange network cards, strange drivers

software environment

see windows software environment

<img width="1846" height="1013" alt="image" src="https://github.com/user-attachments/assets/339fa5d4-8ed7-4e95-bd64-c557417f842d" />


For example

```text
system drivers
environment variables
network connections
running tasks
loaded modules
services
startup programs
```

forensics -> examine unusual tasks, services, startups, modules, environment variables



```text
question 1

what is the command to open system information?
```
<img width="930" height="473" alt="image" src="https://github.com/user-attachments/assets/008bb339-c2ae-498b-8d48-7a8cfcb5c525" />

```
answer

msinfo32.exe
```
```
question 2

what is listed under system name?

This question asks for the machine name being displayed in system information

system name = hostname of the windows machine

enter `system summary`

find the line `system name`

```
<img width="1895" height="956" alt="image" src="https://github.com/user-attachments/assets/18b2c65f-69c7-42da-9068-75d43b3176f5" />

```
answer

thm-winfun2
```
```
question 3

under environment variables, what is the value for comspec?

This question asks for the value of the comsspec environment variable

go to the software environment

select environment variables

find comspec variable
```

<img width="1915" height="960" alt="image" src="https://github.com/user-attachments/assets/10fb2353-a844-41e1-a024-92fb72075322" />

```

answer


%SystemRoot%\system32\cmd.exe

```
task 6

resource monitor = `resmon`

Used to view system resources for each process

can see

```text
cpu
memory
disk
network
```

Different from task manager in that the response is more detailed

It shows which process is using cpu, ram, disk, network

overview

Shows an overview of the 4 main sections

```text
cpu
disk
network
memory
```

cpu

See which process is using the CPU

can see

```text
image
pid
description
status
threads
cpu
average cpu
```

forensics -> examines strange processes, processes eating CPU abnormally, processes are suspended

memory

See how RAM is being used

can see

```text
hard faults/sec
commit
working set
shareable
private
```

forensics -> examine the process that is eating ram abnormally or that a suspicious process is running in the background

disk

See which process is reading/writing files on the drive

can see

```text
file path
read b/sec
write b/sec
total b/sec
response time
```

forensics -> very useful to know which files the process is touching

For example, if a strange process is recorded in log, temp, appdata or system32, you need to continue checking

network

See which processes are using the network

can see

```text
send
receive
local address
local port
remote address
remote port
listening ports
```

forensics -> examine strange connection, strange ip, strange port, process listening to port

resmon can also be filtered by process

tick on process -> disk/network/memory tabs will filter by that process

Used when you want to specifically investigate a suspect process

summary

resmon -> see details of cpu, ram, disk, network by process

cpu -> process uses cpu

memory -> process uses ram

disk -> which file the process reads/writes

network -> where does the process connect to?

forensics -> strange process scanning, unusual recorded files, strange network connection, open port

answer the question

```text
question

what is the command to open resource monitor?

This question asks for the .exe file used to open the resource monitor

resource monitor has a command name of resmon

```
<img width="905" height="240" alt="image" src="https://github.com/user-attachments/assets/0d9f55cd-df43-4584-82a6-fdcc8b59a0ba" />

answer
```
resmon.exe
```

task 7

command prompt = `cmd`

cmd is where to enter commands to work with windows

Before the gui interface, the command line was the primary way to interact with the operating system

Nowadays windows mainly uses gui, but cmd is still very useful for viewing system information and troubleshooting

how to open cmd

```text
win + r -> cmd
```

or

```text
start menu -> search command prompt
```

some basic commands

`hostname`

Used to view the machine name

```text
hostname
```

<img width="1580" height="785" alt="image" src="https://github.com/user-attachments/assets/ce35a846-a4b9-403a-925f-607dae27b9f1" />



`whoami`


<img width="1163" height="565" alt="image" src="https://github.com/user-attachments/assets/c957e081-9d6b-4b79-8f38-d796e6e7b034" />


Used to view the currently logged in user

```text
whoami
```

for-> know which user the command is running under

`ipconfig`

Used to view the device's network configuration

View ip address, subnet mask, gateway, dns

```text
ipconfig
```

If you want to see more details, use it

```text
ipconfig /alld
```

forensics -> scan ip, mac address, dns, dhcp, network card

`/?`

Used to view command help

For example, I want to see instructions for ipconfig

```text
ipconfig /?
```

`cls`

Used to clear cmd screen

```text
cls
```

`netstat`

Used to view network statistics and current TCP/IP connections

```text
netstat
```

can add parameters like `-a`, `-b`, `-e`

forensics -> scan for strange network connections, open ports, connecting processes

`net`

Used to manage network resources, users, groups, shares, sessions

If you type `net`, it will show sub-commands that can be used

```text
net
```

With the command `net`, if you want to see help, do not use `/?`

but use

```text
net help
```

For example, see net user's help

```text
net help user
```

Some common sub-commands

```text
net user
net localgroup
net share
net session
net use
```

forensics -> examine users, groups, shares, sessions, network connections

summary

cmd -> enter command to get windows information

hostname -> hostname

whoami -> current user

ipconfig -> network information

ipconfig /all -> detailed network information

netstat -> network connection

net -> manage user/group/share/session

answer the question

```text
question 1

in system configuration, what is the full command for internet protocol configuration?

This question asks for the full command of the internet protocol configuration tool in system configuration

Because the task is talking about tools in msconfig, you have to open msconfig -> tools

Select internet protocol configuration


```

<img width="938" height="750" alt="image" src="https://github.com/user-attachments/assets/5fa2ce0c-36a6-4a77-9b95-33cc5c779130" />


answer

```
c:\windows\system32\cmd.exe /k %windir%\system32\ipconfig.exe
```

```text
question 2

for the ipconfig command, how do you show detailed information?

This question asks which parameters to use to display detailed information of ipconfig

If you want to see the full version, use /all

```

<img width="859" height="222" alt="image" src="https://github.com/user-attachments/assets/add17bdc-efd5-4c99-8f22-12b6d51d0f71" />


answer

```
ipconfig /all
```

task 8

registry editor is a tool used to open windows registry

Windows registry is where the configuration of windows, users, apps and hardware is stored

how to open from run

```text
win + r -> regedit.exe
```

or open in

```text
msconfig -> tools -> registry editor
```

note

registry for advanced users

Incorrectly editing the registry can cause windows or apps to crash

In this task, you only need to know that registry editor is a tool to view/edit the registry

answer the question

```text
question

what is the command to open the registry editor?

This question asks for the name of the .exe file used to open the registry editor

At first I thought it was regedit.exe but it wasn't enough

According to the answer box format, there are 8 characters before .exe, so choose regedt32.exe

answer

regedt32.exe
```



{% endraw %}