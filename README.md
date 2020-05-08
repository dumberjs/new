# ["makes"](https://github.com/makesjs/makes) skeleton for creating app using dumber bundler

![CI](https://github.com/dumberjs/new/workflows/CI/badge.svg) ![E2E-Linux](https://github.com/dumberjs/new/workflows/E2E-Linux/badge.svg) ![E2E-Windows](https://github.com/dumberjs/new/workflows/E2E-Windows/badge.svg) ![E2E-macOS](https://github.com/dumberjs/new/workflows/E2E-macOS/badge.svg)

To generate app, run
```sh
npx makes dumberjs
# or
npx makes dumberjs project-name
```

## Unit tests

Unit tests for various "makes" files.

```bash
npm test
```

## E2E Test

E2E tests for skeletons.

GitHub Actions runs a subset of them for every PR or push to master.

```bash
# Do not run following directly. There are too many skeletons.
npm run test:e2e
```

Always target a subset of skeletons, use env variable `TARGET_FEATURES`.

```bash
# only test skeletons using aurelia and typescript features.
npx cross-env TARGET_FEATURES=aurelia,typescript npm run test:e2e
```

## Local development

If you forked this repo, you can try your skeleton with:

```bash
# Try your master branch if your forked name is "new"
npx makes your_GitHub_name
# Try some branch or commit or tag
npx makes your_GitHub_name/forked_repo_name#some-branch
```

## License

MIT.