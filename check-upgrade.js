// check deps version in all skeleton package.json files
const fs = require('fs');
const glob = require('glob');
const ncu = require('npm-check-updates');
const files = glob.sync('*/package.json');

let p = Promise.resolve();
for (let file of files) {
  p = p.then(() => checkFile(file));
}

async function checkFile(file) {
  console.log('\n' + file);
  const data = fs.readFileSync(file, 'utf8');

  const deps = {};
  for (const m of data.matchAll(/^\s*"([^"]+)":\s*"([^\w][^"]+)",?\s*$/gm)) {
    if (m[2].match(/\d+\./)) deps[m[1]] = m[2];
  }

  const upgrade = await ncu.run({packageData: JSON.stringify({dependencies: deps})});
  console.log(upgrade);
}
