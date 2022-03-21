import * as vscode from "vscode";

import Configuration from "./configuration";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function activate(context: vscode.ExtensionContext) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const fuzzysort = require("fuzzysort");

	const command = vscode.commands.registerCommand("open-editor-search.EditorSearch", async () => {
		// Find all editors
		const editors = new Set<string>();
		let activeEditor = vscode.window.activeTextEditor;

		const currentEditorName = activeEditor?.document ?? "PREVIEW";
		let activeEditorName = activeEditor?.document ?? "PREVIEW";
		do {
			if (activeEditor?.document) {
				editors.add(activeEditor.document.fileName);
			}
			await vscode.commands.executeCommand("workbench.action.nextEditor");
			activeEditor = vscode.window.activeTextEditor;
			activeEditorName = activeEditor?.document ?? "PREVIEW";
		} while (activeEditorName !== currentEditorName);

		// Create a quick pick window.
		const quickPick = vscode.window.createQuickPick();
		quickPick.placeholder = "Select Editor";

		quickPick.ignoreFocusOut = true;

		// Open Editors are the quick pick items
		const options: string[] = [];
		editors.forEach(fileName => {
			options.push(fileName);
		});
		quickPick.items = options.map(label => ({
			// eslint-disable-next-line no-useless-escape
			label: label.match(/^.*[\\\/](.*)\..*$/)[1],
			description: label,
			alwaysShow: Configuration.fuzzySearch()
		}));

		// Filter text is changed.
		if (Configuration.fuzzySearch()) {
			quickPick.onDidChangeValue(selection => {
				const fuzzysortItems = fuzzysort.go(selection, options);
				quickPick.items = fuzzysortItems.map(item => ({
					// eslint-disable-next-line no-useless-escape
					label: item.target.match(/^.*[\\\/](.*)\..*$/)[1],
					description: item.target,
					alwaysShow: true
				}));
				quickPick.items.filter(item => {
					item.label;
				});
			});
		}

		// Editor is selected.
		quickPick.onDidChangeSelection(async (selection) => {
			if (selection[0]) {
				const uri = vscode.Uri.file(selection[0].description);
				await vscode.commands.executeCommand("vscode.open", uri);
			}
			quickPick.hide();
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	});

	context.subscriptions.push(command);
}

