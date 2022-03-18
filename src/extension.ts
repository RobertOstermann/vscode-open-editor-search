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
		let currentEditor = vscode.window.activeTextEditor;

		do {
			editors.add(activeEditor.document.fileName);
			await vscode.commands.executeCommand("workbench.action.nextEditor");
			activeEditor = vscode.window.activeTextEditor;
			if (!currentEditor) currentEditor = activeEditor;
		} while (activeEditor.document.fileName !== currentEditor.document.fileName);

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
			label: label.match(/^.*\\(.*)\..*$/)[1],
			description: label,
			alwaysShow: Configuration.fuzzySearch()
		}));

		// Filter text is changed.
		if (Configuration.fuzzySearch()) {
			quickPick.onDidChangeValue(selection => {
				const fuzzysortItems = fuzzysort.go(selection, options);
				quickPick.items = fuzzysortItems.map(item => ({
					label: item.target.match(/^.*\\(.*)\..*$/)[1],
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
				const fileName = selection[0].description;
				// vscode.commands.executeCommand("workbench.action.quickOpen", "FirstEditor.txt");
				let activeEditor = vscode.window.activeTextEditor;
				while (activeEditor.document.fileName !== fileName) {
					await vscode.commands.executeCommand("workbench.action.nextEditor");
					activeEditor = vscode.window.activeTextEditor;
				}
			}
			quickPick.hide();
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	});

	context.subscriptions.push(command);
}

