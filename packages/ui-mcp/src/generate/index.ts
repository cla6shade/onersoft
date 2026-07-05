import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Project } from 'ts-morph';
import type { ComponentEntry, Manifest, TypeDecl } from '../types.js';
import { CONVENTIONS } from './conventions.js';
import { parseComponentTypes } from './parseComponents.js';
import { parseSlots } from './parseSlots.js';
import { parseStories } from './parseStories.js';
import { parseTokens } from './parseTokens.js';

const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
// @onersoft/ui lives alongside this package in the monorepo. Generation only
// ever runs in-repo (source is required), so a workspace-relative path is fine.
const uiRoot = resolve(pkgRoot, '../ui');
const uiSrc = join(uiRoot, 'src');
const componentsDir = join(uiSrc, 'components');

function readUiVersion(): string {
  const pkg = JSON.parse(readFileSync(join(uiRoot, 'package.json'), 'utf8'));
  return pkg.version ?? '0.0.0';
}

/** Shared primitive types (ControlSize, CompactSize…) referenced by props. */
function parseSharedTypes(project: Project): TypeDecl[] {
  const file = project.addSourceFileAtPath(join(uiSrc, 'types.ts'));
  return file
    .getTypeAliases()
    .filter((a) => a.isExported())
    .map((a) => ({ name: a.getName(), kind: 'type', text: a.getText() }));
}

function buildComponent(project: Project, name: string): ComponentEntry {
  const dir = join(componentsDir, name);
  const mainFile = join(dir, `${name}.tsx`);
  const storyFile = join(dir, `${name}.stories.tsx`);

  const props = existsSync(mainFile)
    ? parseComponentTypes(project.addSourceFileAtPath(mainFile))
    : [];

  const slots = parseSlots(dir);

  const story = existsSync(storyFile)
    ? parseStories(project.addSourceFileAtPath(storyFile))
    : { title: undefined, description: undefined, examples: [] };

  return {
    name,
    title: story.title,
    description: story.description,
    props,
    slots,
    examples: story.examples,
  };
}

function main(): void {
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    compilerOptions: { allowJs: false, jsx: 4 /* ReactJSX */ },
  });

  const componentNames = readdirSync(componentsDir)
    .filter((entry) => statSync(join(componentsDir, entry)).isDirectory())
    .sort();

  const manifest: Manifest = {
    uiVersion: readUiVersion(),
    sharedTypes: parseSharedTypes(project),
    components: componentNames.map((name) => buildComponent(project, name)),
    tokens: parseTokens(join(uiSrc, 'styles', 'tokens.css')),
    conventions: CONVENTIONS,
  };

  const out = join(pkgRoot, 'manifest.generated.json');
  writeFileSync(out, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const tokenCount = manifest.tokens.dark.length + manifest.tokens.light.length;
  console.error(
    `[ui-mcp] generated manifest: ${manifest.components.length} components, ${tokenCount} tokens (ui@${manifest.uiVersion})`,
  );
}

main();
