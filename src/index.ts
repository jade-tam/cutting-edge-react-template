import * as p from '@clack/prompts';
import kleur from 'kleur';
import { spawnSync } from 'node:child_process';
import { cp, rename, readFile, writeFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function exists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath: string): Promise<Record<string, unknown>> {
  return JSON.parse(await readFile(filePath, 'utf-8'));
}

async function writeJson(filePath: string, data: unknown): Promise<void> {
  await writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

const validManagers = ['pnpm', 'npm', 'yarn', 'bun'] as const;
type PackageManager = (typeof validManagers)[number];

const pmFlagIndex = process.argv.indexOf('--pm');
const argPkgManager = pmFlagIndex !== -1 ? process.argv[pmFlagIndex + 1] : undefined;
if (argPkgManager !== undefined && !validManagers.includes(argPkgManager as PackageManager)) {
  console.error(`Invalid --pm value "${argPkgManager}". Must be one of: ${validManagers.join(', ')}`);
  process.exit(1);
}

async function main() {
  const argProjectName = process.argv[2];

  console.log();
  p.intro(kleur.bgCyan().black(' create-cutting-edge-react-app '));

  // Project name
  let projectName: string;
  if (argProjectName) {
    projectName = argProjectName;
  } else {
    const result = await p.text({
      message: 'What is your project name?',
      placeholder: 'my-app',
      validate(value) {
        if (!value.trim()) return 'Project name is required';
        if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
          return 'Only letters, numbers, hyphens, and underscores are allowed';
        }
      },
    });
    if (p.isCancel(result)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }
    projectName = result;
  }

  // Package manager
  let pkgManager: PackageManager;
  if (argPkgManager) {
    pkgManager = argPkgManager as PackageManager;
  } else {
    const selected = await p.select<PackageManager>({
      message: 'Which package manager would you like to use?',
      options: [
        { value: 'pnpm', label: 'pnpm', hint: 'recommended' },
        { value: 'npm', label: 'npm' },
        { value: 'yarn', label: 'yarn' },
        { value: 'bun', label: 'bun' },
      ],
    });
    if (p.isCancel(selected)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }
    pkgManager = selected;
  }

  // Resolve target directory
  const targetDir = path.resolve(process.cwd(), projectName);

  if (await exists(targetDir)) {
    const entries = await readdir(targetDir);
    if (entries.length > 0) {
      p.cancel(`Directory "${projectName}" already exists and is not empty.`);
      process.exit(1);
    }
  }

  // Copy template
  const templateDir = path.resolve(__dirname, '../templates/cutting-edge-react');

  const copySpinner = p.spinner();
  copySpinner.start('Copying template files...');
  await cp(templateDir, targetDir, { recursive: true });
  copySpinner.stop('Template files copied.');

  // Rename npm-incompatible files back to their real names
  await rename(
    path.join(targetDir, '_gitignore'),
    path.join(targetDir, '.gitignore')
  );
  await rename(
    path.join(targetDir, '_package.json'),
    path.join(targetDir, 'package.json')
  );
  await rename(
    path.join(targetDir, '_vscode'),
    path.join(targetDir, '.vscode')
  );

  // Inject project name
  const pkgPath = path.join(targetDir, 'package.json');
  const pkg = await readJson(pkgPath);
  pkg.name = projectName;
  await writeJson(pkgPath, pkg);

  // Install dependencies
  const installSpinner = p.spinner();
  installSpinner.start(`Installing dependencies with ${pkgManager}...`);
  const result = spawnSync(pkgManager, ['install'], {
    cwd: targetDir,
    stdio: 'pipe',
    shell: true,
  });
  if (result.status !== 0) {
    installSpinner.stop(
      kleur.yellow(`Dependency installation failed. Run \`${pkgManager} install\` manually.`)
    );
  } else {
    installSpinner.stop('Dependencies installed.');
  }

  // Done
  p.outro(kleur.green('Your project is ready!'));

  console.log('\nNext steps:\n');
  console.log(kleur.cyan(`  cd ${projectName}`));
  console.log(kleur.cyan(`  ${pkgManager} run dev`));
  console.log();
  console.log(
    kleur.dim(
      '  Note: Paraglide i18n files are auto-generated on the first dev/build run.'
    )
  );
  console.log();
}

main().catch((err) => {
  console.error(kleur.red('Error:'), err.message);
  process.exit(1);
});
