import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Button } from '../Button';
import { Progress } from '../Progress';
import { Badge } from '../Badge';

const meta: Meta<typeof Card> = {
  title: 'Surfaces/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Editorial container surface with `Header → Body → Footer` sections separated by hairline rules. Optional `Card.Eyebrow` sits above the title to give grouped content a section label rather than a generic title-and-supporting-line block. A CSS container is set on the root so internal padding adapts to the card's actual width — cards in narrow regions tighten automatically.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <div style={{ maxWidth: '20rem' }}>
      <Card>
        <Card.Header>
          <Card.Eyebrow>Monthly</Card.Eyebrow>
          <Card.Title>활성 사용자</Card.Title>
          <Card.Description>지난 30일 기준 · 직전 기간 대비 +8.4%</Card.Description>
        </Card.Header>
        <Card.Body>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 'var(--ds-space-2)',
              fontFeatureSettings: '"tnum" 1',
            }}
          >
            <strong
              style={{
                fontSize: 'var(--ds-text-3xl)',
                fontWeight: 'var(--ds-weight-semibold)',
                letterSpacing: 'var(--ds-tracking-tight)',
                lineHeight: 1,
              }}
            >
              12,847
            </strong>
            <span style={{ color: 'var(--ds-color-fg-muted)', fontSize: 'var(--ds-text-xs)' }}>
              users
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  ),
};

export const WithProgress: Story = {
  render: () => (
    <div style={{ maxWidth: '22rem' }}>
      <Card>
        <Card.Header>
          <Card.Eyebrow>Storage</Card.Eyebrow>
          <Card.Title>3.2 GB / 10 GB</Card.Title>
          <Card.Description>이번 결제 주기 사용량.</Card.Description>
        </Card.Header>
        <Card.Body>
          <Progress value={32} aria-label="Storage usage" />
          <ul
            style={{
              margin: 'var(--ds-space-3) 0 0',
              padding: 0,
              listStyle: 'none',
              display: 'grid',
              gap: 'var(--ds-space-1)',
              color: 'var(--ds-color-fg-muted)',
              fontSize: 'var(--ds-text-xs)',
              fontFeatureSettings: '"tnum" 1',
            }}
          >
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>이미지</span>
              <span>1.8 GB</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>문서</span>
              <span>0.9 GB</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>기타</span>
              <span>0.5 GB</span>
            </li>
          </ul>
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
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pair `interactive` with `asChild` on an anchor or button. Hover only darkens the border and lifts the card 1px — no glow, no shadow ramp.',
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: '22rem' }}>
      <Card interactive asChild>
        <a href="#dashboard" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
          <Card.Header>
            <Card.Eyebrow>Workspace</Card.Eyebrow>
            <Card.Title>대시보드 열기</Card.Title>
            <Card.Description>지표·세그먼트·알림 한 화면에서.</Card.Description>
          </Card.Header>
        </a>
      </Card>
    </div>
  ),
};

export const APIKey: Story = {
  render: () => (
    <div style={{ maxWidth: '22rem' }}>
      <Card>
        <Card.Header>
          <Card.Eyebrow>Credentials</Card.Eyebrow>
          <Card.Title style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-space-2)' }}>
            Production API Key
            <Badge variant="success">Active</Badge>
          </Card.Title>
          <Card.Description>마지막 사용: 3분 전 · sandbox 환경 미적용.</Card.Description>
        </Card.Header>
        <Card.Body>
          <code
            style={{
              display: 'block',
              padding: 'var(--ds-space-2) var(--ds-space-3)',
              background: 'var(--ds-color-bg-sunken)',
              border: 'var(--ds-border-width-thin) solid var(--ds-color-border-default)',
              borderRadius: 'var(--ds-radius-sm)',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: 'var(--ds-text-xs)',
              color: 'var(--ds-color-fg-default)',
              userSelect: 'all',
            }}
          >
            sk_live_••••••••••••a4f3
          </code>
        </Card.Body>
        <Card.Footer>
          <Button size="sm" variant="ghost">
            복사
          </Button>
          <Button size="sm" variant="secondary">
            회수
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ),
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Cards in a self-fitting grid. Each one varies in section count — header-only, header + body, full triplet — to show that hairline rules only render between sections that exist.',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
        gap: 'var(--ds-space-4)',
        maxWidth: '64rem',
      }}
    >
      <Card>
        <Card.Header>
          <Card.Eyebrow>01 · Build</Card.Eyebrow>
          <Card.Title>Vite 18 호환</Card.Title>
          <Card.Description>모듈 그래프 캐시를 재사용해 콜드 스타트 단축.</Card.Description>
        </Card.Header>
      </Card>

      <Card>
        <Card.Header>
          <Card.Eyebrow>02 · Runtime</Card.Eyebrow>
          <Card.Title>React 19 server actions</Card.Title>
        </Card.Header>
        <Card.Body>폼 제출 경로가 RSC를 통과해 hydration 비용 없이 도달합니다.</Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Eyebrow>03 · Ship</Card.Eyebrow>
          <Card.Title>Edge canary</Card.Title>
          <Card.Description>2.4% 트래픽 분기.</Card.Description>
        </Card.Header>
        <Card.Body>p95 latency 변화 없음 · error rate 0.01% 이내.</Card.Body>
        <Card.Footer>
          <Button size="sm" variant="ghost">
            로그
          </Button>
          <Button size="sm">전체 배포</Button>
        </Card.Footer>
      </Card>
    </div>
  ),
};

export const ContainerQueryDemo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '동일한 Card를 다른 폭의 컨테이너에 두면 패딩과 타이틀 크기가 자동으로 줄어듭니다 (≤ 22rem).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '32rem 18rem', gap: 'var(--ds-space-4)' }}>
      <Card>
        <Card.Header>
          <Card.Eyebrow>Wide</Card.Eyebrow>
          <Card.Title>32rem 컨테이너</Card.Title>
          <Card.Description>기본 패딩과 타이틀 크기 유지.</Card.Description>
        </Card.Header>
        <Card.Body>표준 레이아웃.</Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <Card.Eyebrow>Narrow</Card.Eyebrow>
          <Card.Title>18rem 컨테이너</Card.Title>
          <Card.Description>container query가 작동.</Card.Description>
        </Card.Header>
        <Card.Body>패딩 축소 + 타이틀 한 단계 작아짐.</Card.Body>
      </Card>
    </div>
  ),
};
