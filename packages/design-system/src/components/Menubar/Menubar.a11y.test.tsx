import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Menubar } from '.';

describe('Menubar a11y', () => {
  it('has no axe violations with one menu open', async () => {
    render(
      <Menubar.Root defaultValue="view">
        <Menubar.Menu value="file">
          <Menubar.Trigger>File</Menubar.Trigger>
        </Menubar.Menu>
        <Menubar.Menu value="view">
          <Menubar.Trigger>View</Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content>
              <Menubar.Label>Layout</Menubar.Label>
              <Menubar.Item>Sidebar</Menubar.Item>
              <Menubar.Item>Fullscreen</Menubar.Item>
              <Menubar.Separator />
              <Menubar.Item>Zoom in</Menubar.Item>
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar.Root>,
    );
    const results = await runAxe(document.body);
    expect(results.violations).toEqual([]);
  });
});
