const fs = require('fs');
const inferLicense = require('./infer-license');
const sourceFile = process.argv[2];


if(!sourceFile) {
  console.error('Please provide the name of a file to read');
  process.exit();
}

fs.readFile(sourceFile, function(err, contents) {
  if(err) {
    console.error('Error reading ' + sourceFile);
    console.error(err.toString());
    process.exit();
  }

  console.log("License: " + (inferLicense.inferLicense(contents) || 'UNKNOWN'));
})

