import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import demo from '../../stories/demo.module.css'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary interactive control. Three variants — `primary` for the main action on a surface, `secondary` for non-primary actions, `ghost` for tertiary or icon-only triggers. Pass `asChild` to compose with another element (e.g. a router `Link`) so styling and accessibility are preserved without nesting.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Button' })
    await expect(button).toBeEnabled()
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Secondary: Story = { args: { variant: 'secondary' } }

export const Ghost: Story = { args: { variant: 'ghost' } }

export const Disabled: Story = {
  args: { disabled: true, onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Button' })
    await expect(button).toBeDisabled()
    await userEvent.click(button)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className={demo.demoGrid3}>
      {(['primary', 'secondary', 'ghost'] as const).map((variant) =>
        (['sm', 'md', 'lg'] as const).map((size) => (
          <Button key={`${variant}-${size}`} variant={variant} size={size}>
            {variant} / {size}
          </Button>
        )),
      )}
    </div>
  ),
}

export const AsChildLink: Story = {
  args: {
    asChild: true,
    children: <a href="#home">Navigate</a>,
  },
}
