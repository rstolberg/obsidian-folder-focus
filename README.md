# Folder Focus

An Obsidian plugin that opens and focuses the first file in a specified folder. Inspired by David Allen's Getting Things Done philosophy of an inbox, where everything inside of your inbox is to be worked on, completed, and put elsewhere. Folder focus gives you the ability to bind this process to a hotkey and speed up your workflow.

## Example Workflow

Add a `folder shortcut.`
<img width="1493" height="296" alt="image" src="https://github.com/user-attachments/assets/871a06b4-326b-4c6e-acbd-882f655afffa" />


Designate a `folder.` Here I've chosen 'Current'
<img width="1541" height="822" alt="image" src="https://github.com/user-attachments/assets/966d4cbc-2015-408e-bf6c-bcf9ef6cbef0" />


Assign a `hotkey.`
<img width="1437" height="301" alt="image" src="https://github.com/user-attachments/assets/8766a570-a12a-4372-b69b-f254864a718c" />


Run command and process note in desired folder, moving note to desired directory when complete. `Repeat.`
<img width="1597" height="1215" alt="image" src="https://github.com/user-attachments/assets/b4313cf7-c0f2-4395-bd4a-f738c26486c5" />




## Features

- Create folder shortcuts that become commands
- Each shortcut can be bound to a hotkey
- Opens the first file (alphabetically sorted) in the specified folder
- Test button to verify your folder paths work

## Usage

1. Go to Settings → Folder Focus
2. Click "Add" to create a new folder shortcut
3. Enter a name (shown in the command palette) and the folder path
4. Reload Obsidian or the plugin
5. Find your command in the command palette: "Folder Focus: Open first file in: [Name]"
6. Optionally, assign a hotkey in Settings → Hotkeys

## Folder Paths

Paths are relative to your vault root:
- `Current` - a folder called "Current" at the root
- `Projects/Coding` - a folder called "Coding" inside "Projects"
- `Notes/Daily` - a folder called "Daily" inside "Notes"
