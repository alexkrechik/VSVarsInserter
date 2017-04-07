# VSVarsInserter README

Replace 'return' block for js module with up-to-date list of module vars

## Howto run
Use 'Varsinserting into return block' command

## Features

1) This extension will get all the variables names, which are listed between 'module.exports' and 'return' lines
2) After this extension will replace module 'return' block with list ov vars like:
```javascript
return {

        var1: var1,
        var2: var2,
        var3: var3

	}
```

## Examples

Extension will replase 'return' block of:
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
}
```

    into
```javascript
return {

		a: a,

		e: e,
		f: f,
		ggg: ggg,

	}
```

## Release Notes

### 0.2.3
Fixed Error with unnecessary space after var name in return block

### 0.2.2
Fixed error with several 'return' words

### 0.2.1
Added text container start by start 'export default'

### 0.2.0
Fix all the bugs found using 0.1.0 plugin on real projects.

### 0.1.0
Initial release of plugin