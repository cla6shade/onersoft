import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { AlertDialog } from '.';

const meta: Meta = {
  title: 'Primitives/AlertDialog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Interrupts the user with content that demands a deliberate response. Reach for it for destructive or irreversible actions (delete, leave without saving) — for everything else use `Dialog`. Built on Radix AlertDialog. Always pair `Action` and `Cancel`; do not allow dismissal by clicking the overlay.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Destructive: Story = {
  render: () => (
    <AlertDialog.Root defaultOpen>
      <AlertDialog.Trigger asChild>
        <Button variant="secondary">Delete project</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Delete this project?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. All associated data will be permanently removed.
          </AlertDialog.Description>
          <AlertDialog.Footer>
            <AlertDialog.Cancel asChild>
              <Button variant="ghost">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button>Delete</Button>
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  ),
};
