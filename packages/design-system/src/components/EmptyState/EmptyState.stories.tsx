import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';
import { Card } from '../Card';

const meta: Meta<typeof EmptyState> = {
  title: 'Surfaces/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Convention for "no data" surfaces. Composes from `EmptyState.Media`, `Title`, `Description`, and `Actions`. Centered, generous vertical padding so the void feels intentional rather than broken. Pair with `Card` to bound the empty area within a section.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

const InboxIcon = (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7l9 5 9-5M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
  </svg>
);

const SearchIcon = (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const Basic: Story = {
  render: () => (
    <EmptyState>
      <EmptyState.Media>{InboxIcon}</EmptyState.Media>
      <EmptyState.Title>받은 메시지가 없습니다</EmptyState.Title>
      <EmptyState.Description>첫 메시지가 도착하면 여기에 표시됩니다.</EmptyState.Description>
    </EmptyState>
  ),
};

export const WithActions: Story = {
  render: () => (
    <EmptyState>
      <EmptyState.Media>{InboxIcon}</EmptyState.Media>
      <EmptyState.Title>받은 메시지가 없습니다</EmptyState.Title>
      <EmptyState.Description>
        첫 메시지가 도착하면 여기에 표시됩니다. 알림을 켜두면 즉시 받아볼 수 있습니다.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button variant="ghost">알림 설정</Button>
        <Button>메시지 작성</Button>
      </EmptyState.Actions>
    </EmptyState>
  ),
};

export const NoResults: Story = {
  parameters: {
    docs: {
      description: {
        story: '검색 결과 없음 패턴 — 입력값을 인용해 "허공이 아니라 의도된 0건"임을 보여줍니다.',
      },
    },
  },
  render: () => (
    <EmptyState>
      <EmptyState.Media>{SearchIcon}</EmptyState.Media>
      <EmptyState.Title>"design system"에 대한 결과가 없습니다</EmptyState.Title>
      <EmptyState.Description>다른 검색어를 시도하거나 필터를 제거해보세요.</EmptyState.Description>
      <EmptyState.Actions>
        <Button variant="ghost">필터 초기화</Button>
      </EmptyState.Actions>
    </EmptyState>
  ),
};

export const InsideCard: Story = {
  render: () => (
    <div style={{ maxWidth: '32rem' }}>
      <Card>
        <EmptyState>
          <EmptyState.Media>{InboxIcon}</EmptyState.Media>
          <EmptyState.Title>받은 메시지가 없습니다</EmptyState.Title>
          <EmptyState.Description>첫 메시지가 도착하면 여기에 표시됩니다.</EmptyState.Description>
          <EmptyState.Actions>
            <Button>메시지 작성</Button>
          </EmptyState.Actions>
        </EmptyState>
      </Card>
    </div>
  ),
};
