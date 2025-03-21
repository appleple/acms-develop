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

async function commitPackageJson(filepath, packageName) {
  try {
    await systemCmd(`git add ${filepath}`);
    const packageJson = JSON.parse(await fs.promises.readFile(filepath, 'utf8'));
    const message = packageName
      ? `chore(${packageName}): update version to ${packageJson.version}`
      : `chore: update version to ${packageJson.version}`;
    await systemCmd(`git commit -m "${message}" --no-verify`);
    console.log(`Committed changes for ${packageName || 'root'}`);
    return packageJson;
  } catch (error) {
    console.error(`Failed to commit ${packageName || 'root'}:`, error.message);
    throw error;
  }
}

async function main() {
  try {
    // ワークスペースのpackage.jsonをコミット
    const workspaces = await getWorkspaces();
    for (const workspace of workspaces) {
      const pattern = workspace.replace(/\/\*$/, '');
      const basePath = path.resolve(__dirname, '..', pattern);
      const dirs = await fs.promises.readdir(basePath);

      for (const dir of dirs) {
        const packagePath = path.resolve(basePath, dir, 'package.json');
        if (fs.existsSync(packagePath)) {
          const packageJson = await commitPackageJson(packagePath, dir);
          await createTag(packageJson, true);
        }
      }
    }

    console.log('✅ Version update completed');
  } catch (error) {
    console.error('Error during version update:', error);
    process.exit(1);
  }
}

main();
