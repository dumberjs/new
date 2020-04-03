# ["makes"](https://github.com/makesjs/makes) skeleton for creating app using dumber bundler

To generate app, run
```sh
npx makes dumberjs
# or
npx makes dumberjs project-name
```
Then follow the prompts.

## Notes on "makes"

`package.json` and `test.js` are not required by "makes" at all, they are to support testing to ensure all the skeletons here do (kind of) work.

"makes" uses `questions.js` (optional) and `transforms.js` (optional) to prompt user for questions and process the final app write-out.

## Test

    npm test

Or test subset of skeletons.

    env TARGET_FEATURES=aurelia,sass npm test
