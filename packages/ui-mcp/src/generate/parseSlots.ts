import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Collect every `data-slot="..."` value rendered anywhere under a component's
 * directory. Slots are the stable, hash-free styling contract, so consumers
 * and tests target them directly.
 */
export function parseSlots(componentDir: string): string[] {
  const slots = new Set<string>();
  const attr = /data-slot=["']([\w-]+)["']/g;

  const sourceFiles = readdirSync(componentDir).filter(
    (file) => file.endsWith('.tsx') && !file.includes('.test.') && !file.includes('.stories.'),
  );

  for (const file of sourceFiles) {
    const source = readFileSync(join(componentDir, file), 'utf8');
    for (const match of source.matchAll(attr)) {
      slots.add(match[1]);
    }
  }

  return [...slots].sort();
}
