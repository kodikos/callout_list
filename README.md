# Obsidian Callout List Plugin

This plugin provides a page that lists callouts from markdown documents, with optional filtering.

## How to use

This plugin adds a button to the ribbon (a square divided into three), and a command `Open callout list`. These will open a page in the main view and list the callouts according to the plugin's filters, found in the settings.

For more information about callouts, refer to the [Obsidian documentation](https://help.obsidian.md/Editing+and+formatting/Callouts).

## Installation

Download the latest release zip and extract into the `.obsidian/plugins/` folder. Then it should appear under the community plugins area in the settings, where you can then enable it and change the settings.

## Known issues/limitations

The page is refreshed by it receiving focus. Though this does not always happen, particularly if you change the filters whilst the list is in view. All you need do is click on somewhere else, or switch to another tab, then back to the callout list and it will update.

Also, I have not tested this on the mobile version. I'm not using any APIs other than Obsidian's, so it should work okay.

## License of use

Released under the MIT license
