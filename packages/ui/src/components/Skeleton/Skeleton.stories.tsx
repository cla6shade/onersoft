import type { Meta, StoryObj } from '@storybook/react-vite';
import demo from '../../stories/demo.module.css';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Status/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Loading placeholder. Three variants — `block` for arbitrary boxes (images, cards), `text` for line-height-aware bars, `circle` for avatars/icons. A subtle shimmer animates left-to-right; under `prefers-reduced-motion` it falls back to a static tint. Use to maintain layout stability while data resolves.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Block: Story = {
  render: () => (
    <div className={demo.constrainSm}>
      <Skeleton height={120} />
    </div>
  ),
};

export const Text: Story = {
  render: () => (
    <div className={demo.fieldColumn}>
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="75%" />
    </div>
  ),
};

export const Circle: Story = {
  render: () => <Skeleton variant="circle" width={48} />,
};

export const Composed: Story = {
  render: () => (
    <div className={demo.constrainSm}>
      <div className={demo.fieldRowLg} style={{ alignItems: 'center' }}>
        <Skeleton variant="circle" width={40} />
        <div className={demo.fieldColumn} style={{ flex: 1, gap: 'var(--ds-space-2)' }}>
          <Skeleton variant="text" width="55%" />
          <Skeleton variant="text" width="35%" />
        </div>
      </div>
    </div>
  ),
};
