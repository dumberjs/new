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
  unattended, prompts, run
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
    message: 'Do you want to install dependencies?',
    choices
  });

  if (result) {
    await run(result);
  }
};
