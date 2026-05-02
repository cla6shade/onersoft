import { describe } from 'vitest';
import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Popover } from '.';
import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';

describe('Popover e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Popover,
    renderFor: ({ className, wrapper }) => (
      <Popover.Root defaultOpen>
        <Popover.Trigger asChild>
          <Button variant="secondary">Open</Button>
        </Popover.Trigger>
        <Popover.Portal container={wrapper}>
          <Popover.Content className={className} aria-label="Edit display name">
            <Label htmlFor="display-name">Display name</Label>
            <Input id="display-name" defaultValue="Pedro" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    ),
  });
});
