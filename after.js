const {execSync} = require('child_process');

function isAvailable(bin) {
  try {
    execSync(bin + ' -v')
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = async function({
  unattended, here, prompts, run, properties, features, notDefaultFeatures, ansiColors
}) {
  if (unattended) return;

  const choices = [
    {title: 'No'},
    {value: 'npm i', title: 'Yes, use npm'}
  ];

  if (isAvailable('yarn')) {
    choices.push({value: 'yarn', title: 'Yes, use yarn'});
  }

  if (isAvailable('pnpm')) {
    choices.push({value: 'pnpm i', title: 'Yes, use pnpm'});
  }

  const result = await prompts.select({
    message: 'Do you want to install npm dependencies now?',
    choices
  });

  if (result) {
    await run(result);
  }

  const c = ansiColors;
  console.log(`\nNext time, you can try create similar project in silent mode:`);
  console.log(c.inverse(` npx makes dumberjs ${properties.name}${here ? ' --here' : ''} -s ${notDefaultFeatures.length ? (notDefaultFeatures.join(',') + ' ') : ''}`));
};
