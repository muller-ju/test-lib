console.log('\nRunning pre-build tasks (build-pre.js):');

const fs = require('fs');
const path = require('path');

// Get version from principal package.json
const appVersion = require('../package.json').version;

// Lib project list to update automatically the package.json
const packageJsonProjectList = ['symphonie-front-lib'];

// Update package.json version for the list of project
packageJsonProjectList.forEach((libName) => {
  // Get Json object for the package.json slave
  const packageJson = require('../projects/' + libName + '/package.json');
  // Update version for the package.json slave
  packageJson.version = appVersion;

  // Update the package.json slave with the new value
  const packageJsonFilePath = path.join(__dirname + '/../projects/' + libName + '/package.json');
  fs.writeFile(packageJsonFilePath, JSON.stringify(packageJson, null, 2), (err) => {
    if (err) return console.log(err);
    console.log('Package json ' + libName + ' updated');
  });
});
