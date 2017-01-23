# Infer License

Sometimes, you need to know what license a module is provided under.

While many modules report their license via the `package.json` file (for NPM modules), some
do not.

Instead, the license is embedded in the README or in a LICENSE file.

This is fine for humans, but not so great for computers.

This module can infer the appropriate license when fed the contents
of a relevant file and return the appropriate SPDX identifier.

In addition, it can scan a file for links to licenses at spdx.org and opensource.org.
At the moment, these are not checked to confirm that they are valid SPDX ids or that
the links actually lead to a license.

## Example

```
const infer = require('infer-license');

fs.readFile('LICENSE.md', function (err, contents) {
    console.log(infer.inferLicense(contents)); // 'MIT'
});
```

```
const infer = require('infer-license');

fs.findLicenseLinks('LICENSE.md', function (err, contents) {
    console.log(infer.inferLicense(contents)); // 'BSD-3-Clause'
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

The `findLicenseLinks` function will return the inferred SPDF identifier (where it can). If links
to multiple licenses are found, it will be in the form of `(X OR Y OR Z)`.

There are a set of `is<Type>` functions that will return a truthy value if the provided text conforms
with the license of type `<Type>`.
