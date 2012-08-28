node-printer
============

A tool to print document or data. Based on "lp" binary.

## Quick Examples

```js
var printer = require ("./printer");
var options = {
    destination: "EPSON_SX510",
    verbose: true
};

printer.printText("package.json", options);
printer.printFile("package.json", options);
```