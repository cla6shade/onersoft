import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavigationMenu } from '.'

const meta: Meta = {
  title: 'Navigation/NavigationMenu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '마케팅 사이트·도큐먼트 헤더의 풍부한 드롭다운 네비게이션 패턴. 호버/포커스로 펼쳐지며 같은 viewport 안에서 메뉴 간 전환이 부드럽게 애니메이션됩니다. 모바일 햄버거를 위한 패턴은 아닙니다 — 그쪽은 Dialog/Sheet가 맞습니다. Built on Radix NavigationMenu.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>제품</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div
              style={{
                padding: 'var(--ds-space-4)',
                minWidth: '24rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--ds-space-3)',
              }}
            >
              <NavigationMenu.Link href="#cloud">
                <strong>Cloud</strong>
                <div
                  style={{
                    color: 'var(--ds-color-fg-muted)',
                    fontSize: 'var(--ds-text-xs)',
                  }}
                >
                  관리형 호스팅
                </div>
              </NavigationMenu.Link>
              <NavigationMenu.Link href="#edge">
                <strong>Edge</strong>
                <div
                  style={{
                    color: 'var(--ds-color-fg-muted)',
                    fontSize: 'var(--ds-text-xs)',
                  }}
                >
                  글로벌 분산
                </div>
              </NavigationMenu.Link>
              <NavigationMenu.Link href="#self">
                <strong>Self-hosted</strong>
                <div
                  style={{
                    color: 'var(--ds-color-fg-muted)',
                    fontSize: 'var(--ds-text-xs)',
                  }}
                >
                  온프레미스
                </div>
              </NavigationMenu.Link>
              <NavigationMenu.Link href="#api">
                <strong>API</strong>
                <div
                  style={{
                    color: 'var(--ds-color-fg-muted)',
                    fontSize: 'var(--ds-text-xs)',
                  }}
                >
                  REST + GraphQL
                </div>
              </NavigationMenu.Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>리소스</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div
              style={{
                padding: 'var(--ds-space-4)',
                minWidth: '16rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ds-space-2)',
              }}
            >
              <NavigationMenu.Link href="#docs">문서</NavigationMenu.Link>
              <NavigationMenu.Link href="#guides">가이드</NavigationMenu.Link>
              <NavigationMenu.Link href="#blog">블로그</NavigationMenu.Link>
              <NavigationMenu.Link href="#changelog">변경 사항</NavigationMenu.Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link href="#pricing">가격</NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link href="#contact">문의</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  ),
}
