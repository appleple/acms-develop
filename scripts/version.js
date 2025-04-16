import fs from 'fs';
import path from 'path';

// ファイルパスの設定
const README_PATH = path.join(process.cwd(), 'themes/develop/README.md');
const PACKAGE_PATH = path.join(process.cwd(), 'themes/develop/package.json');

// バージョン番号を抽出する正規表現
const VERSION_REGEX = /Ver\.(\d+\.\d+\.\d+)/;

// ファイルを読み込む関数
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    process.exit(1);
  }
}

// ファイルを書き込む関数
function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    process.exit(1);
  }
}

// バージョン番号を更新する関数
function updateVersion() {
  // package.jsonからバージョン番号を取得
  const packageContent = readFile(PACKAGE_PATH);
  const packageJson = JSON.parse(packageContent);
  const version = packageJson.version;
  console.log(`Found version ${version} in package.json`);

  // README.mdを読み込んで更新
  const readmeContent = readFile(README_PATH);
  const currentVersionMatch = readmeContent.match(VERSION_REGEX);

  if (!currentVersionMatch) {
    console.error('Version number not found in README.md');
    process.exit(1);
  }

  const currentVersion = currentVersionMatch[1];
  if (currentVersion !== version) {
    // バージョン番号を更新
    const updatedContent = readmeContent.replace(VERSION_REGEX, `Ver.${version}`);
    writeFile(README_PATH, updatedContent);
    console.log(`Updated README.md version to ${version}`);
  } else {
    console.log('Versions are already in sync');
  }
}

// スクリプトを実行
updateVersion();
