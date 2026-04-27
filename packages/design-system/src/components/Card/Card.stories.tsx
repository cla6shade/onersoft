import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import { Button } from '../Button'
import { Progress } from '../Progress'
import { Badge } from '../Badge'

const meta: Meta<typeof Card> = {
  title: 'Surfaces/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Container surface for grouped content. Composes from `Card.Header` (Title + Description), `Card.Body`, and `Card.Footer`. Sets a CSS container so internal padding adapts to the card\'s actual width — a card in a sidebar tightens automatically without extra breakpoints. Set `interactive` (with `asChild` and an `<a>`/`<button>`) for navigable cards.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  render: () => (
    <div style={{ maxWidth: '20rem' }}>
      <Card>
        <Card.Header>
          <Card.Title>월간 활성 사용자</Card.Title>
          <Card.Description>지난 30일 기준</Card.Description>
        </Card.Header>
        <Card.Body>
          <strong style={{ fontSize: 'var(--ds-text-2xl)' }}>12,847</strong>
        </Card.Body>
      </Card>
    </div>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <div style={{ maxWidth: '22rem' }}>
      <Card>
        <Card.Header>
          <Card.Title>저장 공간</Card.Title>
          <Card.Description>3.2 GB / 10 GB</Card.Description>
        </Card.Header>
        <Card.Body>
          <Progress value={32} />
        </Card.Body>
        <Card.Footer>
          <Button size="sm" variant="ghost">
            관리
          </Button>
          <Button size="sm">업그레이드</Button>
        </Card.Footer>
      </Card>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <div style={{ maxWidth: '22rem' }}>
      <Card interactive asChild>
        <a href="#dashboard" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
          <Card.Header>
            <Card.Title>대시보드 열기</Card.Title>
            <Card.Description>분석 도구 전체 보기 →</Card.Description>
          </Card.Header>
        </a>
      </Card>
    </div>
  ),
}

export const ContainerQueryDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: '동일한 Card를 다른 폭의 컨테이너에 두면 패딩과 타이틀 크기가 자동으로 줄어듭니다 (≤ 22rem).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '32rem 18rem', gap: 'var(--ds-space-4)' }}>
      <Card>
        <Card.Header>
          <Card.Title>넓은 카드 (32rem)</Card.Title>
          <Card.Description>기본 패딩과 타이틀 크기 유지.</Card.Description>
        </Card.Header>
        <Card.Body>표준 레이아웃.</Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>좁은 카드 (18rem)</Card.Title>
          <Card.Description>container query가 작동.</Card.Description>
        </Card.Header>
        <Card.Body>패딩 축소 + 타이틀 한 단계 작아짐.</Card.Body>
      </Card>
    </div>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <div style={{ maxWidth: '22rem' }}>
      <Card>
        <Card.Header>
          <Card.Title style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-space-2)' }}>
            API 키 <Badge variant="success">Active</Badge>
          </Card.Title>
          <Card.Description>마지막 사용: 3분 전</Card.Description>
        </Card.Header>
        <Card.Body>sk_live_••••••••••••a4f3</Card.Body>
        <Card.Footer>
          <Button size="sm" variant="ghost">
            회수
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ),
}
