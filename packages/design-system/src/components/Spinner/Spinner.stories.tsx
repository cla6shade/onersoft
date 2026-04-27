import type { Meta, StoryObj } from '@storybook/react-vite'
import demo from '../../stories/demo.module.css'
import { Spinner } from './Spinner'
import { Button } from '../Button'

const meta: Meta<typeof Spinner> = {
  title: 'Status/Spinner',
  component: Spinner,
  args: { size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Indeterminate loading indicator. SVG-based, inherits `currentColor`, sizes match control heights. Defaults to `role="status"` with an accessible label of "Loading"; pass `label=""` to mark as decorative when an adjacent text element already announces state (e.g. inside a button labeled "Saving…").',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Sizes: Story = {
  render: () => (
    <div className={demo.demoStack}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
}

export const InsideButton: Story = {
  render: () => (
    <div className={demo.demoStack}>
      <Button disabled>
        <Spinner size="sm" label="" /> 저장 중…
      </Button>
      <Button variant="secondary" disabled>
        <Spinner size="sm" label="" /> 불러오는 중
      </Button>
    </div>
  ),
}

export const InheritsColor: Story = {
  render: () => (
    <div className={demo.demoStack}>
      <span style={{ color: 'var(--ds-color-fg-default)' }}>
        <Spinner />
      </span>
      <span style={{ color: 'var(--ds-color-accent)' }}>
        <Spinner />
      </span>
      <span style={{ color: 'var(--ds-color-danger)' }}>
        <Spinner />
      </span>
    </div>
  ),
}
