#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { manifest } from './manifest.js';
import { registerTools } from './tools.js';

const server = new McpServer({
  name: 'onersoft-ui',
  version: manifest.uiVersion,
});

registerTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);

// stdout is the MCP transport; log to stderr only.
console.error(
  `[onersoft-ui-mcp] serving ${manifest.components.length} components (ui@${manifest.uiVersion})`,
);
