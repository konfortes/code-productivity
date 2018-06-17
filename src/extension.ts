'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "code-productivity" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let toLatLng = vscode.commands.registerCommand('extension.toLatLngObj', () => {
        // The code you place here will be executed every time your command is executed

        editSelection((editor, editBuilder, selection) => {
            let coordsStr: String = editor.document.getText(selection);
            let coordsArr: Array<String> = coordsStr.replace(" ", "").split(',');
            let coordsObj = { lat: coordsArr[0], lng: coordsArr[1] };
            editBuilder.replace(selection, JSON.stringify(coordsObj));
        });

    });

    let wrapWithTryCatch = vscode.commands.registerCommand('extension.wrapWithTryCatch', () => {
        editSelection((editor, editBuilder, selection) => {
            let text: String = editor.document.getText(selection);

            editBuilder.replace(selection, `try{\n  ${text}\n} catch(ex){\n}`);
        });
    });

    function editSelection(editFn: (editor: vscode.TextEditor, editBuilder: vscode.TextEditorEdit, selection: vscode.Selection) => void) {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("could not find an open editor");
            return;
        }

        editor.edit(editBuilder => {
            let selection: vscode.Selection = editor.selection;
            if (!selection) {
                vscode.window.showWarningMessage("no text selected");
                return;
            }

            editFn(editor, editBuilder, selection);
        });
    }

    context.subscriptions.push(toLatLng);
    context.subscriptions.push(wrapWithTryCatch);
}

// this method is called when your extension is deactivated
export function deactivate() {
}