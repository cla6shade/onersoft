import type { Meta, StoryObj } from '@storybook/react-vite';
import demo from '../../stories/demo.module.css';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Primitives/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Numeric range input with one or more thumbs. Pass a single-element array for a value, or two for a range. Always supply `aria-label` (or an associated heading) so screen readers can announce what is being adjusted. Built on Radix Slider with full keyboard support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Single: Story = {
  render: () => (
    <div className={demo.constrainSm}>
      <Slider defaultValue={[40]} min={0} max={100} step={1} aria-label="Volume" />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className={demo.constrainSm}>
      <Slider defaultValue={[20, 80]} min={0} max={100} step={1} aria-label="Price range" />
    </div>
  ),
};
