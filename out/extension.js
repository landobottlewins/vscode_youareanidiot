"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
function activate(context) {
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
            (0, child_process_1.exec)(command, (error) => {
                if (error) {
                    console.error(`Failed to play audio: ${error.message}`);
                }
            });
        }
    });
    context.subscriptions.push(terminalListener);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map