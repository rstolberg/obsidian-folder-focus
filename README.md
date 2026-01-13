# Folder Focus

An Obsidian plugin that opens and focuses the first file in a specified folder. Inspired by David Allen's Getting Things Done philosophy of an inbox, where everything inside of your inbox is to be worked on, completed, and put elsewhere. Folder focus gives you the ability to bind this process to a hotkey and speed up your workflow.


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
