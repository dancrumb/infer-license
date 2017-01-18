# Infer License

Sometimes, you need to know what license a module is provided under.

While many modules report their license via the `package.json` file (for NPM modules), some
do not.

Instead, the license is embedded in the README or in a LICENSE file.

This is fine for humans, but not so greate for computers.

This module can infer the appropriate license when fed the contents
of a relevant file and return the appropriate SPDX identifier.

## Example

```
const infer = require('infer-license');

fs.readFile('LICENSE.md', function (err, contents) {
    console.log(infer.inferLicense(contents)); // 'MIT'
});
```
## Dependencies
None!


## Testing
Currently, this tool uses SPDX license files and, for each one, confirms that

- The license is correctly identified, i.e. it is identifed with the correct identifier
- The license is definitively identified, i.e. it is not identified with an incorrect identifier

## Support

Currently, this tool can identify the following licenses

- MIT
- BSD
- ISC
- LGPL
- Apache
- Ecplise (EPL)
- WTF

## API

The `inferLicense` function will return the inferred SPDF identifier (where it can).
There are a set of `isXXX` functions that will return a truthy value if the provided text conforms
with the license of type `XXX`.
