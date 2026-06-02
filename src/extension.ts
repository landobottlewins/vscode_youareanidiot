import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    console.log('The audio chaos extension is now active!');

    // Get the absolute path to the audio file inside your extension folder
    // Change 'idiot.mp3' if your file has a different name or extension
    const audioPath = path.join(context.extensionPath, 'idiot.mp3');

    const terminalListener = vscode.window.onDidEndTerminalShellExecution(event => {
        // If the code crashes (non-zero exit code)
        if (event.exitCode !== undefined && event.exitCode !== 0) {
            
            // Command to play the audio silently in the background.
            // 'mpv --no-video' works great for mp3s. 
            // If you use a .wav file, you can just use 'aplay "${audioPath}"'
            // If you prefer PulseAudio/PipeWire natively, use 'paplay "${audioPath}"'
            const command = `mpv --no-video "${audioPath}"`;

            exec(command, (error) => {
                if (error) {
                    console.error(`Failed to play audio: ${error.message}`);
                }
            });
        }
    });

    context.subscriptions.push(terminalListener);
}

export function deactivate() {}