import { Plugin, WorkspaceLeaf } from 'obsidian';
import { CalloutView, VIEW_TYPE_CALLOUT } from './CalloutView';
import { CalloutSettingsTab, CalloutListSettings, DEFAULT_SETTINGS } from './CalloutSettings';

export default class CalloutList extends Plugin {
	settings: CalloutListSettings;

	async onload() {
		await this.loadSettings();

		// Callout list is a view of its own
		this.registerView(
			VIEW_TYPE_CALLOUT,
			(leaf) => new CalloutView(leaf, this)
		);

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('rows-3', 'Callout List', (evt: MouseEvent) => {
			this.activateView();
		});

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-callout-list',
			name: 'Open callout list',
			callback: () => {
				this.activateView();
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new CalloutSettingsTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_CALLOUT);

		if (leaves.length > 0) {
		  // A leaf with our view already exists, use that
		  leaf = leaves[0];
		} else {
		  // Our view could not be found in the workspace, create a new leaf
		  // in the right sidebar for it
		  leaf = workspace.getLeaf(true);
		  await leaf.setViewState({ type: VIEW_TYPE_CALLOUT, active: true });
		}

		// "Reveal" the leaf in case it is in a collapsed sidebar
		workspace.revealLeaf(leaf);
	  }
}
