import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Toast } from '.'

const meta: Meta = {
  title: 'Primitives/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Transient, non-blocking notification anchored to a viewport. Render `Toast.Provider` once near the app root and place `Toast.Viewport` where toasts should stack. Built on Radix Toast — handles focus management, swipe-to-dismiss, and screen reader announcements. Reach for `AlertDialog` instead when the message must be acknowledged.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Toast.Provider swipeDirection="right" duration={4000}>
        <Button
          onClick={() => {
            setOpen(false)
            setTimeout(() => setOpen(true), 50)
          }}
        >
          Show toast
        </Button>
        <Toast.Root open={open} onOpenChange={setOpen}>
          <Toast.Content>
            <Toast.Title>Saved successfully</Toast.Title>
            <Toast.Description>Your changes are now live.</Toast.Description>
          </Toast.Content>
          <Toast.Controls>
            <Toast.Close aria-label="Dismiss">×</Toast.Close>
          </Toast.Controls>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    )
  },
}
