// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "windows-path-assist" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'windows-path-assist.formatPath',
			() => {
				const editor = vscode.window.activeTextEditor;
				if (!editor){
					vscode.window.showInformationMessage('no editor found');
					return;
				}

				const selection = editor.document.getText(editor.selection);
				// vscode.window.showInformationMessage(`your text selection : ${selection}`);

				// split selected string with \ as separator
				var array = selection.split("\\");
				// console.log(array);

				// remove empty elements from array (arises where path already has \\ but splits wrt \ so creats an empty element)
				var filteredarr = array.filter(function (el) {
					return el !== "";
				});
				// console.log(filteredarr);

				// concatenate the path together
				var path:string = "";
				// delete filteredarr[0];
				for (let x of filteredarr){
					console.log(x);
					if (path === ""){
						path = path.concat(x.toString());
					} else {
						path = path.concat("\\\\" + x.toString());
					}
				}
				// console.log(path);

				// replace the path in the editor
				// const finalpath = "output formatted path here";
				editor.edit((select) => {
					select.replace(editor.selection, path);
				})

				// show information message
				vscode.window.showInformationMessage('formatted path successfully');
			}
		)
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
