import type { Meta, StoryObj } from '@storybook/react-vite'
import demo from '../../stories/demo.module.css'
import { Avatar } from '.'

const meta: Meta = {
  title: 'Primitives/Avatar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Image element representing a person or entity, with a graceful fallback (typically initials) when the image is missing or fails to load. Use `delayMs` on `Fallback` to avoid a flash of fallback while the image loads. Built on Radix Avatar.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className={demo.demoStack}>
      <Avatar.Root>
        <Avatar.Image
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?w=128&h=128&fit=crop"
          alt="User"
        />
        <Avatar.Fallback delayMs={300}>HM</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Image src="" alt="" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
    </div>
  ),
}
