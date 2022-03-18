import * as vscode from "vscode";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function activate(context: vscode.ExtensionContext) {
	const command = vscode.commands.registerCommand("open-editor-search.EditorSearch", async () => {
		// Create a quick pick window.
		const quickPick = vscode.window.createQuickPick();
		quickPick.placeholder = "Select Editor";

		quickPick.ignoreFocusOut = true;

		// Open Editors are the quick pick items
		const editors = vscode.window.visibleTextEditors;
		const options = [];
		editors.map(editor => {
			options.push(editor.document.fileName);
		});
		quickPick.items = options.map(label => ({ label }));

		// Filter text is changed.
		quickPick.onDidChangeValue(() => {
			// FIXME: Fuzzy Search Here
		});

		// Editor is selected.
		quickPick.onDidChangeSelection(selection => {
			if (selection[0]) {
				let activeEditor;
				editors.map(editor => {
					if (editor.document.fileName === selection[0].label) {
						activeEditor = editor;
					}
				});
				vscode.window.showInformationMessage(`${selection[0].label}`);
			}
			quickPick.hide();
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	});

	context.subscriptions.push(command);
}

