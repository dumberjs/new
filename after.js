const which = require('npm-which')(process.cwd());

function isAvailable(bin) {
  try {
    return which.sync(bin);
  } catch (e) {
    return false;
  }
}

module.exports = async function({
  unattended, prompts, run
}) {
  if (unattended) return;

  const choices = [
    {value: 'npm i', title: 'Yes, use npm'}
  ];

  if (isAvailable('yarn')) {
    choices.unshift({value: 'yarn', title: 'Yes, use yarn'});
  }

  if (isAvailable('pnpm')) {
    choices.unshift({value: 'pnpm i', title: 'Yes, use pnpm'});
  }

  choices.unshift({title: 'No'});

  const result = await prompts.select({
    message: 'Do you want to install dependencies?',
    choices
  });

  if (result) {
    await run(result);
  }
};
