import type { Meta, StoryObj } from '@storybook/react-vite';
import demo from '../../stories/demo.module.css';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Linear progress indicator. Pass a `value` (0–`max`) for determinate progress, or `null` to show an indeterminate, animated track when total work cannot be predicted. Built on Radix Progress and exposes `role="progressbar"` plus the right ARIA value attributes for assistive tech.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Determinate: Story = {
  render: () => (
    <div className={demo.constrainSm}>
      <Progress value={62} />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className={demo.constrainSm}>
      <Progress value={null} />
    </div>
  ),
};
