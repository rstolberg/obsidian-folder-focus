# Folder Focus

An Obsidian plugin that opens and focuses the first file in a specified folder.

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

## Installation

### Manual Installation

1. Download `main.js` and `manifest.json` from the releases
2. Create a folder called `folder-focus` in your vault's `.obsidian/plugins/` directory
3. Copy the files into that folder
4. Enable the plugin in Obsidian settings

### Build from Source

```bash
npm install
npm run build
```

Copy `main.js` and `manifest.json` to your vault's `.obsidian/plugins/folder-focus/` directory.
