import fs from 'fs';
import path from 'path';
import { systemCmd } from './lib/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getWorkspaces() {
  const rootPackage = JSON.parse(await fs.promises.readFile(path.resolve(__dirname, '../package.json'), 'utf8'));
  return rootPackage.workspaces || [];
}

async function createTag(packageJson, isWorkspace = false) {
  const version = packageJson.version;
  const tagName = isWorkspace ? `${packageJson.name}@${version}` : `v${version}`;

  try {
    await systemCmd(`git tag ${tagName}`);
    console.log(`Created tag: ${tagName}`);
  } catch (error) {
    console.error(`Failed to create tag ${tagName}:`, error.message);
  }
}

async function stagePackageFiles(filepath) {
  const dirPath = path.dirname(filepath);
  const lockFile = path.join(dirPath, 'package-lock.json');

  await systemCmd(`git add ${filepath}`);
  if (fs.existsSync(lockFile)) {
    await systemCmd(`git add ${lockFile}`);
  }

  return JSON.parse(await fs.promises.readFile(filepath, 'utf8'));
}

async function commitWorkspaceChanges(workspacePackages) {
  try {
    const versions = workspacePackages.map((pkg) => `${pkg.name}@${pkg.version}`).join(', ');

    const message = `chore(workspace): update versions to ${versions}`;
    await systemCmd(`git commit -m "${message}" --no-verify`);
    console.log('Committed workspace changes');
  } catch (error) {
    console.error('Failed to commit workspace changes:', error.message);
    throw error;
  }
}

async function main() {
  try {
    // ワークスペースのpackage.jsonをステージングしてタグを作成
    const workspaces = await getWorkspaces();
    const workspacePackages = [];

    for (const workspace of workspaces) {
      const pattern = workspace.replace(/\/\*$/, '');
      const basePath = path.resolve(__dirname, '..', pattern);
      const dirs = await fs.promises.readdir(basePath);

      for (const dir of dirs) {
        const packagePath = path.resolve(basePath, dir, 'package.json');
        if (fs.existsSync(packagePath)) {
          const packageJson = await stagePackageFiles(packagePath);
          workspacePackages.push(packageJson);
          await createTag(packageJson, true);
        }
      }
    }

    await systemCmd(`git add -A`);
    await systemCmd(`git commit -m "chore(workspace): update versions" --no-verify`);
    await systemCmd(`git push --follow-tags`);

    console.log('✅ Version update completed');
  } catch (error) {
    console.error('Error during version update:', error);
    process.exit(1);
  }
}

main();
