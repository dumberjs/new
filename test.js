// This test is not required by "makes" at all.
// It's to ensure all the skeletons here do (kind of) work.
// The whole test suite takes long long time to finish,
// it's not automatically triggered by "npm version patch".
// Have to run "npm test" manually before a release.

import {spawn, spawnSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import del from 'del';
import test from 'ava';
import puppeteer from 'puppeteer';

function killProc(proc) {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ["/pid", proc.pid, '/f', '/t']);
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
    proc.on('exit', code => {
      if (code) {
        reject(new Error('process exit code: ' + code));
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
  await page.screenshot({path: filePath});
  await browser.close();
}

const skeletons = [
  'aurelia babel css jest cypress',
  'aurelia babel css jasmine cypress',
  'aurelia babel css tape cypress',
  'aurelia babel css ava cypress',
  'aurelia babel less jest cypress',
  'aurelia babel less jasmine cypress',
  'aurelia babel less tape cypress',
  'aurelia babel less ava cypress',
  'aurelia babel sass jest cypress',
  'aurelia babel sass jasmine cypress',
  'aurelia babel sass tape cypress',
  'aurelia babel sass ava cypress',

  'aurelia typescript css jest cypress',
  'aurelia typescript css jasmine cypress',
  'aurelia typescript css tape cypress',
  'aurelia typescript css ava cypress',
  'aurelia typescript less jest cypress',
  'aurelia typescript less jasmine cypress',
  'aurelia typescript less tape cypress',
  'aurelia typescript less ava cypress',
  'aurelia typescript sass jest cypress',
  'aurelia typescript sass jasmine cypress',
  'aurelia typescript sass tape cypress',
  'aurelia typescript sass ava cypress',
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

    console.log('-npm i');
    await run('npm i');

    console.log('-npm test');
    await run('npm test');

    console.log('-npx gulp build');
    await run('npx gulp build', null,
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

    console.log('-npx gulp');
    await run(`npx gulp`,
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
          console.log('-npx cypress run');
          await run(`npx cypress run`);
          kill();
        } catch (e) {
          kill();
          throw e;
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
