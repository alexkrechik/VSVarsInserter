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
            edit.replace(range, returnBlock + '\n};');
        });
    }

    private __getNewReturnBlock(vars: String[]) {
        let block = ['\treturn {'];
        vars.forEach((v) => {
            if (v === '') {
                block.push('');
            } else {
                block.push('\t\t' + v + ' : ' + v + ',');
            }
        })
        block.push('\t}');
        return block.join('\n');
    }

    private __getReturnBlockRange() {
        var text = window.activeTextEditor.document.getText().split(/\n/);
        var startLine = text.findIndex((el) => {return el.match(/return.*\{/) !== null});
        var startChar = 0;
        var startPosition = new Position(startLine, startChar);
        var lastLine = text.length;
        var lastChar = text[text.length - 1].length;
        var lastPosition = new Position(lastLine, lastChar);
        return new Range(startPosition, lastPosition);
    }

    private __getReturnVars() {
        let returnVars = [];
        let text = window.activeTextEditor.document.getText().split(/[\s\n]*module.exports.*\{/)[1];
        text.split(/\n/).forEach((line) => {
            if((line.match(/^\s*(var|let)(\s+|=)/)) && !(line.match(/^\s*\/\/.*/))) {
                let variable = line.replace(/^\s*(var|let)(\s+|=)/, '').match(/^[^(\s+|=)]+/)[0];
                returnVars.push(variable);
            } else if(line.match(/^\s*$/) && returnVars[returnVars.length-1] !== '') {
                returnVars.push('');
            }
        })
        return returnVars;
    }

}
