import {spawn, spawnSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import del from 'del';
import test from 'ava';

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
    env.CI = 'true';
    env.NODE_ENV = 'development';
    const proc = spawn(cmd, args, {env});
    proc.on('close', resolve).on('error', reject);
    proc.stdout.on('data', data => {
      if (dataCB) {
        dataCB(data, () => {
          killProc(proc);
          resolve()
        });
      }
    });
    proc.stderr.on('data', data => {
      if (errorCB) {
        errorCB(data, () => {
          killProc(proc);
          resolve();
        });
      }
    })
  });
}

[
  // 'aurelia babel css jest',
  // 'aurelia babel css jasmine',
  // 'aurelia babel css tape',
  // 'aurelia babel css ava',
  // 'aurelia babel less jest',
  // 'aurelia babel less jasmine',
  // 'aurelia babel less tape',
  // 'aurelia babel less ava',
  // 'aurelia babel sass jest',
  // 'aurelia babel sass jasmine',
  // 'aurelia babel sass tape',
  // 'aurelia babel sass ava',

  // 'aurelia typescript css jest',
  // 'aurelia typescript css jasmine',
  'aurelia typescript css tape',
  // 'aurelia typescript css ava',
  // 'aurelia typescript less jest',
  // 'aurelia typescript less jasmine',
  // 'aurelia typescript less tape',
  // 'aurelia typescript less ava',
  // 'aurelia typescript sass jest',
  // 'aurelia typescript sass jasmine',
  // 'aurelia typescript sass tape',
  // 'aurelia typescript sass ava',
].forEach(_f => {
  const features = _f.split(' ');
  const appName = features.join('-');
  const appFolder = path.join(folder, appName);

  test.serial(_f, async t => {
    console.log('App: ' + appName);
    process.chdir(folder);

    const makeCmd = `npx makes ${dir} ${appName} -s ${features.join(',')}`;
    console.log('-' + makeCmd);
    await run(makeCmd);
    process.chdir(appFolder);

    console.log('-npm i');
    await run('npm i');

    console.log('-npm test');
    await run('npm test', null,
      (data, kill) => {
        process.stderr.write(data);
        if (data.toString().includes('failed')) {
          t.fail('npm test failed: ' + data.toString());
        }
      }
    );

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
    await run('npx gulp',
      (data, kill) => {
        const m = data.toString().match(/Application Available At: (\S+)/);
        if (!m) return;
        const url = m[1];
        t.pass('Dev app booted at ' + url);
        kill();
      },
      (data, kill) => {
        t.fail('gulp run failed: ' + data.toString());
        kill();
      }
    );

    // console.log('-remove ' + appName);
    // process.chdir(folder);
    // await del(appFolder);
  });
});
