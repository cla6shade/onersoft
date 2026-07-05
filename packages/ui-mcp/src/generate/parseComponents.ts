import type { SourceFile } from 'ts-morph';
import type { TypeDecl } from '../types.js';

/**
 * Extract exported prop interfaces and variant type aliases from a component's
 * main source file, preserving their source text so agents see the exact
 * public API (e.g. `variant?: ButtonVariant`).
 */
export function parseComponentTypes(sourceFile: SourceFile): TypeDecl[] {
  const decls: TypeDecl[] = [];

  for (const iface of sourceFile.getInterfaces()) {
    if (iface.isExported()) {
      decls.push({ name: iface.getName(), kind: 'interface', text: iface.getText() });
    }
  }

  for (const alias of sourceFile.getTypeAliases()) {
    if (alias.isExported()) {
      decls.push({ name: alias.getName(), kind: 'type', text: alias.getText() });
    }
  }

  return decls;
}
