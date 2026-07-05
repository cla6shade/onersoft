import { Node, type ObjectLiteralExpression, type SourceFile } from 'ts-morph';
import type { Example } from '../types.js';

export interface StoryData {
  title?: string;
  description?: string;
  examples: Example[];
}

/** Unwrap a string literal property value, dropping quotes. */
function getStringProp(obj: ObjectLiteralExpression, name: string): string | undefined {
  const prop = obj.getProperty(name);
  if (!prop || !Node.isPropertyAssignment(prop)) return undefined;
  const init = prop.getInitializer();
  return init && Node.isStringLiteral(init) ? init.getLiteralValue() : undefined;
}

/** Return the object-literal initializer of a property, if it is one. */
function getObjectProp(
  obj: ObjectLiteralExpression,
  name: string,
): ObjectLiteralExpression | undefined {
  const prop = obj.getProperty(name);
  if (!prop || !Node.isPropertyAssignment(prop)) return undefined;
  const init = prop.getInitializer();
  return init && Node.isObjectLiteralExpression(init) ? init : undefined;
}

/**
 * Read Storybook CSF: the default-exported `meta` (title + docs prose) and the
 * named `StoryObj` exports (args / render bodies) that serve as usage examples.
 */
export function parseStories(sourceFile: SourceFile): StoryData {
  const meta = sourceFile.getVariableDeclaration('meta');
  const metaObj = meta?.getInitializer();

  let title: string | undefined;
  let description: string | undefined;

  if (metaObj && Node.isObjectLiteralExpression(metaObj)) {
    title = getStringProp(metaObj, 'title');
    // parameters.docs.description.component
    const docs = getObjectProp(getObjectProp(metaObj, 'parameters') ?? metaObj, 'docs');
    const desc = docs && getObjectProp(docs, 'description');
    description = desc && getStringProp(desc, 'component');
  }

  const storyDecls = sourceFile
    .getVariableDeclarations()
    .filter((decl) => decl.isExported() && decl.getName() !== 'meta');

  const examples: Example[] = storyDecls.map((decl) => {
    const init = decl.getInitializer();
    if (!init || !Node.isObjectLiteralExpression(init)) {
      return { name: decl.getName() };
    }

    const args = init.getProperty('args');
    const render = init.getProperty('render');
    return {
      name: decl.getName(),
      args: args && Node.isPropertyAssignment(args) ? args.getInitializer()?.getText() : undefined,
      render:
        render && Node.isPropertyAssignment(render)
          ? render.getInitializer()?.getText()
          : undefined,
    };
  });

  return { title, description, examples };
}
