import type { Meta, StoryObj } from '@storybook/react-vite';
import demo from '../../stories/demo.module.css';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  args: { children: 'Stable' },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Compact label for status, counts, or categorization. Five semantic variants (`neutral`, `accent`, `success`, `warning`, `danger`) and two sizes. Tabular numerals are enabled so badges holding counts (e.g. `12`, `99+`) align across rows.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Variants: Story = {
  render: () => (
    <div className={demo.demoFlexWrap}>
      <Badge>Neutral</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="danger">Deprecated</Badge>
    </div>
  ),
};
