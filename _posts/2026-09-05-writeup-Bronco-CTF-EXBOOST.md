---
layout: post
title: "Bronco CTF: EX-BOOST"
tags: [writeup, ctf]
---
{% raw %}
## Challenge: EX-BOOST
## Author: blunderous_wonders
## Category: Forensics
---

First, download the 3 challenge images:

<img width="732" height="326" alt="image" src="https://github.com/user-attachments/assets/ecdf4a75-52f3-43d6-aacf-5a49240ed7ea" />

The challenge description hinted at RGB colors and energy heat bars. I decided to run the 3 image files through `zsteg` to analyze individual color planes:

On `Tiger.png`:

<img width="164" height="146" alt="image" src="https://github.com/user-attachments/assets/ff3f59d2-9009-42d8-b2fc-450c9b971803" />

In the Red channel, the hidden string is `F33L`:

<img width="865" height="380" alt="image" src="https://github.com/user-attachments/assets/5f77c16f-a3aa-4813-8856-f9f3ef306872" />

On `snake.png`:

<img width="111" height="96" alt="image" src="https://github.com/user-attachments/assets/72fdee6a-e820-4de4-aef1-726778804855" />

In the Green channel, the hidden characters are `TH3`:

<img width="717" height="366" alt="image" src="https://github.com/user-attachments/assets/73a62a47-7912-46ff-83cb-3c9693f9c083" />

On `Crane.png`:

<img width="154" height="136" alt="image" src="https://github.com/user-attachments/assets/b6657fa7-374b-4b1a-b5ba-19ef03e3123e" />

In the Blue channel, the hidden characters are `H34T`:

<img width="965" height="516" alt="image" src="https://github.com/user-attachments/assets/6065f357-2223-4228-bfb3-6bf196c43352" />

Combining the three parts in RGB order yields: `F33LTH3H34T`.

## Flag: `bronco{F33LTH3H34T}`

--- 

### Retrospective & Lessons Learned

Reading the solution above, one might wonder: *"Wait, you just upload it to zsteg and get the flag immediately — why even write a writeup for such an easy challenge?"*

Honestly, I wrote this entry to document a painful trap I set for myself.

For this challenge alone, I wasted an entire evening simply because of the sentence: *"But what's with the heat bar amount on each style? Are they trying to tell me something?"*

That single question laid an irresistible psychological trap. I convinced myself that some sophisticated steganographic encoding was hidden in the heat bar. I spent hours manually counting individual pixels along the bars, applying all sorts of mathematical transformations to the values, and ending up completely stuck in frustration.

The bitter truth: the challenge was straightforward. It was so simple that I blinded myself, overlooking the obvious *"RGB trifecta"* phrase in plain sight. I skipped the most elementary stegano triage step — inspecting color planes — and rushed straight down a rabbit hole crafted entirely by my own overthinking.

The moment I ran `zsteg` and saw the flag appear immediately, I felt no satisfaction — only deep self-reproach. Why was I so reckless? Why dismiss the fundamentals in pursuit of needlessly complex theories? In CTF, what defeats us is often not the difficulty of the problem, but our own ego overcomplicating things.

Documenting this serves as a wake-up call. Technical skills can always be honed, but losing basic problem-solving discipline will always lead to self-inflicted rabbit holes. Losing an entire evening to overthinking hurts, but time waits for no one — stay grounded and stick to the basics first.

{% endraw %}
