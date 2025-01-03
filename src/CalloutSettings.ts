import { PluginSettingTab, App, Setting } from "obsidian";
import CalloutList from "./main";

export interface CalloutListSettings {
	calloutTypeFilter: string;
	includePathFilter: string;
	excludePathFilter: string;
}

export const DEFAULT_SETTINGS: CalloutListSettings = {
	calloutTypeFilter: 'todo',
	includePathFilter: '',
	excludePathFilter: ''
}

export class CalloutSettingsTab extends PluginSettingTab {
	plugin: CalloutList;

	constructor(app: App, plugin: CalloutList) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();
		containerEl.createEl('h3', { text: 'Callout List Settings' });

		new Setting(containerEl)
			.setName('Filter by callout type')
			.setDesc('Shows only callouts of the selected type. Leave empty for all, or comma-separated for multiple types')
			.addText(text => text
				.setPlaceholder('Enter the callout type as text')
				.setValue(this.plugin.settings.calloutTypeFilter)
				.onChange(async (value) => {
					this.plugin.settings.calloutTypeFilter = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
		.setName('Include paths')
		.setDesc('Leave empty for whole vault, or a semi-colon separated list of paths to include')
		.addText(text => text
			.setPlaceholder('Add include paths')
			.setValue(this.plugin.settings.includePathFilter)
			.onChange(async (value) => {
				this.plugin.settings.includePathFilter = value;
				await this.plugin.saveSettings();
			}));

		new Setting(containerEl)
		.setName('Exclude paths')
		.setDesc('A semi-colon separated list of paths to exclude')
		.addText(text => text
			.setPlaceholder('Add exclude paths')
			.setValue(this.plugin.settings.excludePathFilter)
			.onChange(async (value) => {
				this.plugin.settings.excludePathFilter = value;
				await this.plugin.saveSettings();
			}));
	}
}
