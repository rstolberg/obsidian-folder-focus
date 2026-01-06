import {
	App,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
	TFolder,
	Notice,
	TextComponent,
} from "obsidian";

interface FolderShortcut {
	id: string;
	name: string;
	path: string;
}

interface FolderFocusSettings {
	shortcuts: FolderShortcut[];
}

const DEFAULT_SETTINGS: FolderFocusSettings = {
	shortcuts: [],
};

export default class FolderFocusPlugin extends Plugin {
	settings: FolderFocusSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		// Register commands for each shortcut
		this.registerShortcutCommands();

		this.addSettingTab(new FolderFocusSettingTab(this.app, this));
	}

	registerShortcutCommands() {
		// Clear existing commands by reloading (Obsidian handles this on plugin reload)
		for (const shortcut of this.settings.shortcuts) {
			this.addCommand({
				id: `open-folder-${shortcut.id}`,
				name: `Open first file in: ${shortcut.name}`,
				callback: () => this.openFirstFileInFolder(shortcut.path),
			});
		}
	}

	async openFirstFileInFolder(folderPath: string) {
		const folder = this.app.vault.getAbstractFileByPath(folderPath);

		if (!folder) {
			new Notice(`Folder not found: ${folderPath}`);
			return;
		}

		if (!(folder instanceof TFolder)) {
			new Notice(`Path is not a folder: ${folderPath}`);
			return;
		}

		// Get all files in the folder (not subfolders)
		const files = folder.children.filter(
			(child): child is TFile => child instanceof TFile
		);

		if (files.length === 0) {
			new Notice(`No files found in folder: ${folderPath}`);
			return;
		}

		// Sort files alphabetically by name (matching Obsidian's default sort)
		files.sort((a, b) => a.name.localeCompare(b.name));

		const firstFile = files[0];

		// Open the file in a new leaf or existing leaf
		const leaf = this.app.workspace.getLeaf(false);
		await leaf.openFile(firstFile);

		// Focus the leaf
		this.app.workspace.setActiveLeaf(leaf, { focus: true });
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class FolderFocusSettingTab extends PluginSettingTab {
	plugin: FolderFocusPlugin;

	constructor(app: App, plugin: FolderFocusPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "Folder Focus Settings" });

		containerEl.createEl("p", {
			text: "Add folder shortcuts below. Each shortcut creates a command you can bind to a hotkey.",
		});

		// Add new shortcut button
		new Setting(containerEl)
			.setName("Add folder shortcut")
			.setDesc("Create a new folder shortcut command")
			.addButton((button) =>
				button.setButtonText("Add").onClick(async () => {
					const id = `shortcut-${Date.now()}`;
					this.plugin.settings.shortcuts.push({
						id,
						name: "New Folder",
						path: "",
					});
					await this.plugin.saveSettings();
					this.display();
				})
			);

		containerEl.createEl("hr");

		// Display existing shortcuts
		for (let i = 0; i < this.plugin.settings.shortcuts.length; i++) {
			const shortcut = this.plugin.settings.shortcuts[i];

			const shortcutContainer = containerEl.createDiv({
				cls: "folder-focus-shortcut",
			});

			new Setting(shortcutContainer)
				.setName("Shortcut name")
				.setDesc("Display name for the command")
				.addText((text) =>
					text
						.setPlaceholder("e.g., Current Tasks")
						.setValue(shortcut.name)
						.onChange(async (value) => {
							shortcut.name = value;
							await this.plugin.saveSettings();
						})
				);

			new Setting(shortcutContainer)
				.setName("Folder path")
				.setDesc(
					"Path relative to vault root (e.g., 'Current' or 'Projects/Coding')"
				)
				.addText((text) =>
					text
						.setPlaceholder("e.g., Projects/Active")
						.setValue(shortcut.path)
						.onChange(async (value) => {
							shortcut.path = value;
							await this.plugin.saveSettings();
						})
				);

			new Setting(shortcutContainer)
				.addButton((button) =>
					button
						.setButtonText("Delete")
						.setWarning()
						.onClick(async () => {
							this.plugin.settings.shortcuts.splice(i, 1);
							await this.plugin.saveSettings();
							this.display();
						})
				)
				.addButton((button) =>
					button.setButtonText("Test").onClick(() => {
						this.plugin.openFirstFileInFolder(shortcut.path);
					})
				);

			shortcutContainer.createEl("hr");
		}

		if (this.plugin.settings.shortcuts.length > 0) {
			containerEl.createEl("p", {
				text: "Note: After adding or modifying shortcuts, reload the plugin (or Obsidian) to update the commands list. You can then assign hotkeys in Settings → Hotkeys.",
				cls: "setting-item-description",
			});
		}
	}
}
