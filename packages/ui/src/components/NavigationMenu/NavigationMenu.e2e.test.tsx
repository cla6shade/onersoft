import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { NavigationMenu } from '.';

describe('NavigationMenu e2e', () => {
  runComponentMatrix({
    ...componentMatrix.NavigationMenu,
    renderFor: ({ className }) => (
      <NavigationMenu.Root className={className}>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#docs">Docs</NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#api">API</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ),
  });
});
