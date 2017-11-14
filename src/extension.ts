'use strict';

import {ExtensionContext, commands, window, Position, Range} from 'vscode';

export function activate(context: ExtensionContext) {
    let disposable = commands.registerCommand('extension.insertVars', () => {
        (new VarsInserter).insertVars();
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {
}

class VarsInserter {

    public insertVars() {
        let vars = this.__getReturnVars();
        let returnBlock = this.__getNewReturnBlock(vars);
        let range = this.__getReturnBlockRange();
        window.activeTextEditor.edit((edit) => {
            edit.replace(range, returnBlock + '\n};\n');
        });
    }

    private __getNewReturnBlock(vars: String[]) {
        let block: String[] = ['\treturn {'];
        vars.forEach((v) => {
            if (v === '') {
                block.push('');
            } else {
                block.push('\t\t' + v + ': ' + v + ',');
            }
        })
        //Remove last comma
        for (let i = block.length - 1; i > 0; i--) {
            if (block[i].match(/,$/)) {
                block[i] = block[i].replace(/,$/, '');
                break;
            }
        }
        block.push('\t};');
        return block.join('\n');
    }

    private __getReturnBlockRange() {
        let text = window.activeTextEditor.document.getText().split(/\n/);
        let startLine;
        for (let i = 0; i < text.length; i++) {
            if(text[i].match(/return.*\{/) !== null) {
                startLine = i;
            }
        }
        let startChar = 0;
        let startPosition = new Position(startLine, startChar);
        let lastLine = text.length;
        let lastChar = text[text.length - 1].length;
        let lastPosition = new Position(lastLine, lastChar);
        return new Range(startPosition, lastPosition);
    }

    private __getReturnVars() {
        let returnVars = [];
        let text = window.activeTextEditor.document.getText().split(/[\s\n]*module.exports.*\{|[\s\n]*export\s+default.*\{/)[1];
        text.split(/\n/).forEach((line) => {
            if((line.match(/^\s*(var|let|const)(\s+|=)/)) && !(line.match(/^\s*\/\/.*/))) {
                let variable = line.replace(/^\s*(var|let|const)(\s+|=)/, '').match(/^[^(\s+|=|;)]+/)[0];
                returnVars.push(variable);
            } else if(line.match(/^\s*$/) && returnVars[returnVars.length-1] !== '') {
                returnVars.push('');
            }
        })
        return returnVars;
    }

}
