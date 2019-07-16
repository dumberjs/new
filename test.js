// This test is not required by "makes" at all.
// It's to ensure all the skeletons here do (kind of) work.
// The whole test suite takes long long time to finish,
// it's not automatically triggered by "npm version patch".
// Have to run "npm test" manually before a release.

import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import del from 'del';
import test from 'ava';
import puppeteer from 'puppeteer';

// Somehow taskkill on windows would not send SIGTERM signal to proc,
// The proc killed by taskkill got null signal.
const win32Killed = new Set();
function killProc(proc) {
  if (process.platform === 'win32') {
    win32Killed.add(proc.pid);
    spawn.sync('taskkill', ["/pid", proc.pid, '/f', '/t']);
  } else {
    proc.stdin.pause();
    proc.kill();
  }
}

const dir = __dirname;

const folder = path.join(dir, 'test-skeletons');
del.sync(folder);
fs.mkdirSync(folder);

function run(command, dataCB, errorCB) {
  const [cmd, ...args] = command.split(' ');
  return new Promise((resolve, reject) => {
    const env = Object.create(process.env);
    // use CI to turn off automatic browser opening in tasks/run.js
    env.CI = 'true';
    // need to reset NODE_ENV back to development because this whole
    // test is running in NODE_ENV=test which will affect gulp build
    env.NODE_ENV = 'development';
    const proc = spawn(cmd, args, {env});
    proc.on('exit', (code, signal) => {
      if (code && signal !== 'SIGTERM' && !win32Killed.has(proc.pid)) {
        reject(new Error(cmd + ' ' + args.join(' ') + ' process exit code: ' + code + ' signal: ' + signal));
      } else {
        resolve();
      }
    });
    proc.on('error', reject);
    proc.stdout.on('data', data => {
      if (dataCB) {
        dataCB(data, () => {
          killProc(proc);
          // resolve()
        });
      }
    });
    proc.stderr.on('data', data => {
      process.stderr.write(data);
      if (errorCB) {
        errorCB(data, () => {
          killProc(proc);
          // resolve();
        });
      }
    })
  });
}

async function takeScreenshot(url, filePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: filePath});
  await browser.close();
}

const skeletons = [
  // 'aurelia babel css jest cypress',
  // 'aurelia babel css jasmine cypress',
  // 'aurelia babel css tape cypress',
  // 'aurelia babel css mocha cypress',
  // 'aurelia babel less jest cypress',
  // 'aurelia babel less jasmine cypress',
  'aurelia babel less tape cypress',
  // 'aurelia babel less mocha cypress',
  // 'aurelia babel sass jest cypress',
  // 'aurelia babel sass jasmine cypress',
  // 'aurelia babel sass tape cypress',
  // 'aurelia babel sass mocha cypress',

  // 'aurelia typescript css jest cypress',
  'aurelia typescript css jasmine cypress',
  // 'aurelia typescript css tape cypress',
  // 'aurelia typescript css mocha cypress',
  // 'aurelia typescript less jest cypress',
  // 'aurelia typescript less jasmine cypress',
  // 'aurelia typescript less tape cypress',
  // 'aurelia typescript less mocha cypress',
  // 'aurelia typescript sass jest cypress',
  // 'aurelia typescript sass jasmine cypress',
  // 'aurelia typescript sass tape cypress',
  'aurelia typescript sass mocha cypress',

  // 'react babel css jest cypress',
  // 'react babel css jasmine cypress',
  // 'react babel css tape cypress',
  // 'react babel css mocha cypress',
  // 'react babel less jest cypress',
  // 'react babel less jasmine cypress',
  'react babel less tape cypress',
  // 'react babel less mocha cypress',
  // 'react babel sass jest cypress',
  // 'react babel sass jasmine cypress',
  // 'react babel sass tape cypress',
  // 'react babel sass mocha cypress',

  // 'react typescript css jest cypress',
  // 'react typescript css jasmine cypress',
  // 'react typescript css tape cypress',
  'react typescript css mocha cypress',
  // 'react typescript less jest cypress',
  // 'react typescript less jasmine cypress',
  // 'react typescript less tape cypress',
  // 'react typescript less mocha cypress',
  // 'react typescript sass jest cypress',
  // 'react typescript sass jasmine cypress',
  // 'react typescript sass tape cypress',
  // 'react typescript sass mocha cypress',

  'vue babel css jest cypress',
  // 'vue babel css jasmine cypress',
  // 'vue babel css tape cypress',
  // 'vue babel css mocha cypress',
  // 'vue babel less jest cypress',
  // 'vue babel less jasmine cypress',
  // 'vue babel less tape cypress',
  // 'vue babel less mocha cypress',
  // 'vue babel sass jest cypress',
  // 'vue babel sass jasmine cypress',
  // 'vue babel sass tape cypress',
  // 'vue babel sass mocha cypress',

  // 'vue typescript css jest cypress',
  // 'vue typescript css jasmine cypress',
  // 'vue typescript css tape cypress',
  'vue typescript css mocha cypress',
  // 'vue typescript less jest cypress',
  // 'vue typescript less jasmine cypress',
  // 'vue typescript less tape cypress',
  // 'vue typescript less mocha cypress',
  // 'vue typescript sass jest cypress',
  // 'vue typescript sass jasmine cypress',
  // 'vue typescript sass tape cypress',
  // 'vue typescript sass mocha cypress',

  // 'vue sfc babel css jest cypress',
  // 'vue sfc babel css jasmine cypress',
  // 'vue sfc babel css tape cypress',
  // 'vue sfc babel css mocha cypress',
  // 'vue sfc babel less jest cypress',
  'vue sfc babel less jasmine cypress',
  // 'vue sfc babel less tape cypress',
  // 'vue sfc babel less mocha cypress',
  // 'vue sfc babel sass jest cypress',
  // 'vue sfc babel sass jasmine cypress',
  // 'vue sfc babel sass tape cypress',
  // 'vue sfc babel sass mocha cypress',

];

skeletons.forEach((_f, i) => {
  const features = _f.split(' ');
  const appName = features.join('-');
  const appFolder = path.join(folder, appName);
  const title = `App: ${i + 1}/${skeletons.length} ${appName}`;

  test.serial(title, async t => {
    console.log(title);
    process.chdir(folder);

    const makeCmd = `npx makes ${dir} ${appName} -s ${features.join(',')}`;
    console.log('-' + makeCmd);
    await run(makeCmd);
    process.chdir(appFolder);

    console.log('-yarn');
    await run('yarn');

    console.log('-npm test');
    await run('npm test');

    console.log('-npm run build:dev');
    await run('npm run build:dev', null,
      (data, kill) => {
        t.fail('gulp build failed: ' + data.toString());
      }
    );

    const entryPath = path.join(appFolder, 'dist', 'entry-bundle.js');
    const entryStat = fs.statSync(entryPath);
    t.truthy(entryStat.isFile());

    console.log('-npx gulp clean');
    await run('npx gulp clean');
    t.throws(() => fs.statSync(entryPath), null, 'cleaned bundle files');

    console.log('-npm start');
    await run(`npm start`,
      async (data, kill) => {
        const m = data.toString().match(/Application Available At: (\S+)/);
        if (!m) return;
        const url = m[1];
        const message = 'Dev app booted at ' + url;
        console.log(message);
        t.pass(message);

        try {
          console.log('-take screenshot');
          await takeScreenshot(url, path.join(folder, appName + '.png'));
          console.log('-npm run test:e2e');
          await run(`npm run test:e2e`);
          kill();
        } catch (e) {
          t.fail(e);
          kill();
        }
      },
      (data, kill) => {
        const str = data.toString();
        // ignore nodejs v12 [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated
        if (!str.includes('DeprecationWarning')) {
          t.fail('gulp run failed: ' + data.toString());
          kill();
        }
      }
    );

    console.log('-remove folder ' + appName);
    process.chdir(folder);
    await del(appFolder);
  });
});
