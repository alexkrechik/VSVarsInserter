# VSVarsInserter README

Replace 'return' block for js module with up-to-date list of module vars

## Features

1) This plugin will get all the variables names, which are listed between 'module.exports' and 'return' lines
2) After this plugin will replace module 'return' block with list ov vars like:
```javascript
return {

        var1: var1,
        var2: var2,
        var3: var3

	}
```

## Installation

1) Download extension folder
2) Copy it to the vscode extension folder (ex. '~/.vscode/extensions/' for Mac)

## Howto run
Use 'Varsinserting into return block' command

## Examples

Plugin will replase 'return' block of:
```javascript
var before = 1;

module.exports = function() {
    var a = 1;
    // let b = 2;
    //var c = 3;
    function d(){}
    
    //aaaa
    var e = 3;
    var f = 3;
    let ggg = 3;

    return {
    
    }
};
```

    into
```javascript
return {

		a : a,

		e : e,
		f : f,
		ggg : ggg,

	}
```

## Release Notes

### 0.1.0

Initial release of plugin