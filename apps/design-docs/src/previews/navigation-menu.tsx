'use client'

import { NavigationMenu } from '@onersoft/design-system'

export function NavigationMenuDefault() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>제품</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div style={{ padding: 16, minWidth: 280, display: 'grid', gap: 8 }}>
              <NavigationMenu.Link href="#cloud">
                <strong>Cloud</strong>
                <div style={{ color: 'var(--ds-color-text-muted)' }}>관리형 호스팅</div>
              </NavigationMenu.Link>
              <NavigationMenu.Link href="#observe">
                <strong>Observe</strong>
                <div style={{ color: 'var(--ds-color-text-muted)' }}>분산 추적과 로그</div>
              </NavigationMenu.Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#pricing">가격</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#docs">문서</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  )
}
