import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { NavigationMenu } from '.';

describe('NavigationMenu a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#docs">Docs</NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#api">API</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
