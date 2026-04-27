import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Dialog } from '.'

const meta: Meta = {
  title: 'Primitives/Dialog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Modal window overlaid on the page. Use sparingly — inline or contextual UI usually beats a modal. Reach for `AlertDialog` instead when the user must confirm a destructive action. Built on Radix Dialog, with focus trapping, scroll locking, and Esc-to-close handled for you.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Dialog.Root defaultOpen>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Confirm action</Dialog.Title>
          <Dialog.Description>
            This dialog uses Radix primitives wrapped with design-system tokens.
          </Dialog.Description>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="ghost">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button>Confirm</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ),
}
