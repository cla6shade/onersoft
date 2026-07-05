import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { findComponent, manifest } from './manifest.js';
import type { Token } from './types.js';

/** Wrap a plain-text payload in the MCP tool-result shape. */
function text(body: string) {
  return { content: [{ type: 'text' as const, text: body }] };
}

function formatTokens(tokens: Token[]): string {
  return tokens.map((t) => `  ${t.name}: ${t.value};`).join('\n');
}

export function registerTools(server: McpServer): void {
  server.registerTool(
    'list_components',
    {
      title: 'List components',
      description:
        'List every @onersoft/ui component with its Storybook title and a one-line description.',
      inputSchema: {},
    },
    async () => {
      const lines = manifest.components.map((c) => {
        const desc = (c.description ?? '').split('. ')[0];
        return `- ${c.name}${c.title ? ` (${c.title})` : ''}${desc ? ` — ${desc}` : ''}`;
      });
      return text(
        `${manifest.components.length} components (ui@${manifest.uiVersion}):\n\n${lines.join('\n')}`,
      );
    },
  );

  server.registerTool(
    'get_component_props',
    {
      title: 'Get component props',
      description:
        'Get the exported prop types, variant unions, and stable data-slot values for a component. Use these instead of guessing props or targeting hashed class names.',
      inputSchema: { name: z.string().describe('Component name, e.g. "Button"') },
    },
    async ({ name }) => {
      const c = findComponent(name);
      if (!c) {
        return text(
          `Unknown component "${name}". Run list_components to see the ${manifest.components.length} available names.`,
        );
      }

      const parts: string[] = [`# ${c.name}${c.title ? ` — ${c.title}` : ''}`];
      if (c.description) parts.push(c.description);

      parts.push(`## Props\n${c.props.map((p) => p.text).join('\n\n')}`);

      // Include any shared primitive types the props reference (ControlSize…).
      const referenced = manifest.sharedTypes.filter((t) =>
        c.props.some((p) => p.text.includes(t.name)),
      );
      if (referenced.length) {
        parts.push(`## Referenced types\n${referenced.map((t) => t.text).join('\n\n')}`);
      }

      const slotList = c.slots.length ? c.slots.map((s) => `- ${s}`).join('\n') : '(none)';
      parts.push(`## data-slot values (stable styling API)\n${slotList}`);

      return text(parts.join('\n\n'));
    },
  );

  server.registerTool(
    'get_component_example',
    {
      title: 'Get component examples',
      description:
        'Get usage examples for a component, derived from its Storybook stories (args and render bodies).',
      inputSchema: { name: z.string().describe('Component name, e.g. "Button"') },
    },
    async ({ name }) => {
      const c = findComponent(name);
      if (!c) {
        return text(`Unknown component "${name}". Run list_components to see the available names.`);
      }
      if (!c.examples.length) {
        return text(`No stories found for ${c.name}.`);
      }

      const blocks = c.examples.map((e) => {
        if (e.render) return `### ${e.name}\n\`\`\`tsx\n${e.render}\n\`\`\``;
        if (e.args) return `### ${e.name}\nProps: \`${e.args}\``;
        return `### ${e.name}\n(default args)`;
      });
      return text(`# ${c.name} examples\n\n${blocks.join('\n\n')}`);
    },
  );

  server.registerTool(
    'get_theme',
    {
      title: 'Get design tokens',
      description:
        'Get the design tokens (--ds-* and --color-*) for the dark (default) and light themes. Customize UI by overriding these tokens — never hardcode colors, spacing, or radii.',
      inputSchema: {
        filter: z
          .enum(['color', 'space', 'text', 'radius', 'shadow', 'motion', 'z', 'brand', 'other'])
          .optional()
          .describe('Restrict to one token group'),
      },
    },
    async ({ filter }) => {
      const pick = (tokens: Token[]) =>
        filter ? tokens.filter((t) => t.group === filter) : tokens;
      const dark = pick(manifest.tokens.dark);
      const light = pick(manifest.tokens.light);

      const body = [
        `# Design tokens${filter ? ` (group: ${filter})` : ''}`,
        `## :root — dark (default)\n${formatTokens(dark) || '  (none)'}`,
        `## :root[data-theme='light'] — overrides\n${formatTokens(light) || '  (none)'}`,
      ].join('\n\n');
      return text(body);
    },
  );

  server.registerTool(
    'get_conventions',
    {
      title: 'Get design-system conventions',
      description:
        'Get the design-system invariants and forbidden patterns (token-first, cascade layer, data-slot contract, theming, design tone). Read before generating any UI.',
      inputSchema: {},
    },
    async () => text(manifest.conventions),
  );
}
