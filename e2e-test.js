// This test is not required by "makes" at all.
// It's to ensure all the skeletons here do (kind of) work.
// The whole test suite takes long long time to finish,
// it's not automatically triggered by "npm version patch".
// Have to run "npm test" manually before a release.

const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');
const del = require('del');
const test = require('ava');
const puppeteer = require('puppeteer');
const kill = require('tree-kill');
const {possibleFeatureSelections} = require('makes');
const questions = require('./questions');

async function wait() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}

const allSkeletons = possibleFeatureSelections(questions);

const isWin32 = process.platform === 'win32';
const dir = __dirname;

const folder = path.join(dir, 'test-skeletons');
console.log('-- cleanup ' + folder);
del.sync(folder);
fs.mkdirSync(folder);

// Somehow taskkill on windows would not send SIGTERM signal to proc,
// The proc killed by taskkill got null signal.
const win32Killed = new Set();
function killProc(proc) {
  if (isWin32) {
    win32Killed.add(proc.pid);
  }
  proc.stdin.pause();
  kill(proc.pid);
}


function run(command, cwd, dataCB, errorCB) {
  const [cmd, ...args] = command.split(' ');
  return new Promise((resolve, reject) => {
    const env = Object.create(process.env);
    // use CI to turn off automatic browser opening
    env.CI = 'true';
    // need to reset NODE_ENV back to development because this whole
    // test is running in NODE_ENV=test which will affect gulp build
    env.NODE_ENV = 'development';
    const proc = spawn(cmd, args, {env, cwd});
    proc.on('exit', (code, signal) => {
      if (code && signal !== 'SIGTERM' && !win32Killed.has(proc.pid)) {
        reject(new Error(cmd + ' ' + args.join(' ') + ' process exit code: ' + code + ' signal: ' + signal));
      } else {
        resolve();
      }
    });
    proc.on('error', reject);
    proc.stdout.on('data', data => {
      process.stdout.write(data);
      if (dataCB) {
        dataCB(data, () => {
          console.log(`-- kill "${command}"`);
          killProc(proc);
        });
      }
    });
    proc.stderr.on('data', data => {
      process.stderr.write(data);
      if (errorCB) {
        errorCB(data, () => {
          console.log(`-- kill "${command}"`);
          // process.stderr.write(data);
          killProc(proc);
        });
      }
    })
  });
}

async function takeScreenshot(url, filePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await new Promise(r => setTimeout(r, 6000));
  await page.screenshot({path: filePath});
  await browser.close();
}

const targetFeatures = (process.env.TARGET_FEATURES || '').toLowerCase().split(',').filter(p => p);
if (!targetFeatures.includes('playwright')) {
  targetFeatures.push('playwright');
}

const skeletons = allSkeletons.filter(features =>
  targetFeatures.length === 0 || targetFeatures.every(f => features.includes(f))
);

skeletons.forEach((features, i) => {
  const isPlugin = features.includes('plugin');
  const hasUnitTests = !features.includes('no-unit-tests');
  const appName = features.join('-');
  const appFolder = path.join(folder, appName);
  const title = `App: ${i + 1}/${skeletons.length} ${appName}`;

  test.serial(title, async t => {
    console.log(title);

    const makeCmd = `npx makes ${dir} ${appName} -s ${features.join(',')}`;
    console.log('-- ' + makeCmd);
    await run(makeCmd, folder);
    t.pass('made skeleton');

    console.log('-- npm i');
    await run('npm i', appFolder);
    t.pass('installed deps');

    if (hasUnitTests) {
      console.log('-- npm test');
      await run('npm test', appFolder);
      t.pass('finished unit tests');
    }

    console.log('-- npm run build:dev');
    await run('npm run build:dev', appFolder, null,
      (data, kill) => {
        t.fail('gulp build failed: ' + data.toString());
      }
    );
    t.pass('made dev build');

    const entryPath = path.join(
      appFolder,
      'dist',
      isPlugin ? 'index.js' : 'entry-bundle.js'
    );
    const entryStat = fs.statSync(entryPath);
    t.truthy(entryStat.isFile());

    console.log('-- npx gulp clean');
    await run('npx gulp clean', appFolder);
    t.throws(() => fs.statSync(entryPath), undefined, 'cleaned bundle files');

    console.log('-- npm start');
    await run(`npm start`, appFolder,
      async (data, kill) => {
        const m = data.toString().match(/Dev server is started at: (\S+)/);
        if (!m) return;
        const url = m[1];
        t.pass(m[0]);

        try {
          if (!process.env.GITHUB_ACTIONS) {
            console.log('-- take screenshot');
            await takeScreenshot(url, path.join(folder, appName + '.png'));
          }
          kill();
        } catch (e) {
          t.fail(e.message);
          kill();
        }
      }
    );

    if (features.includes('playwright')) {
      console.log('-- npx playwright test --project chromium');
      await run('npx playwright install --with-deps', appFolder);
      await run('npx playwright test --project chromium', appFolder);
    }

    await wait();
    console.log('-- remove folder ' + appName);
    await del(appFolder);
  });
});
