'use client';

import { NavigationMenu } from '@onersoft/ui';

export function NavigationMenuDefault() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div style={{ padding: 16, minWidth: 280, display: 'grid', gap: 8 }}>
              <NavigationMenu.Link href="#cloud">
                <strong>Cloud</strong>
                <div style={{ color: 'var(--ds-color-fg-muted)' }}>Managed hosting</div>
              </NavigationMenu.Link>
              <NavigationMenu.Link href="#observe">
                <strong>Observe</strong>
                <div style={{ color: 'var(--ds-color-fg-muted)' }}>
                  Distributed tracing and logs
                </div>
              </NavigationMenu.Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#docs">Docs</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}
