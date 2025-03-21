import fs from 'fs-extra';
import { zipPromise } from './lib/index.js';
import { readFile } from 'fs/promises';
import path from 'path';

const zipDir = 'develop';
const srcDir = ['themes', 'bin'];

const ignores = [
  'themes/develop/node_modules',
  'themes/develop/.eslintcache',
  'themes/develop/.stylelintcache',
  'themes/develop/postcss.config.cjs',
];

async function main() {
  try {
    // developテーマ本体のパッケージバージョンを取得
    const pkg = JSON.parse(await readFile(new URL('../themes/develop/package.json', import.meta.url), 'utf8'));
    const version = pkg.version;

    // tmp ディレクトリ作成
    console.log('Create tmp directory.');
    fs.mkdirsSync(zipDir);

    // ファイルをコピー
    srcDir.forEach((dir) => {
      const copyFiles = fs.readdirSync(dir);
      copyFiles.forEach((file) => {
        fs.copySync(`${dir}/${file}`, `${zipDir}/${dir}/${file}`);
      });
    });

    // 不要ファイルを削除
    console.log('Remove unused files.');
    console.log(ignores);
    ignores.forEach((filePath) => {
      fs.removeSync(`${zipDir}/${filePath}`);
    });

    // build ディレクトリ作成
    fs.mkdirsSync('build');

    // zip 化
    await zipPromise(`${zipDir}/`, `./build/${zipDir}-${version}.zip`);
  } catch (err) {
    console.error(err);
  } finally {
    fs.removeSync(`${zipDir}`);
  }
}

main();
