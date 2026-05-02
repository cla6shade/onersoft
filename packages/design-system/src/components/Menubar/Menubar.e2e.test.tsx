import { describe } from 'vitest';
import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Menubar } from '.';

describe('Menubar e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Menubar,
    renderFor: ({ className, wrapper }) => (
      <Menubar.Root className={className} defaultValue="view">
        <Menubar.Menu value="file">
          <Menubar.Trigger>File</Menubar.Trigger>
        </Menubar.Menu>
        <Menubar.Menu value="view">
          <Menubar.Trigger>View</Menubar.Trigger>
          <Menubar.Portal container={wrapper}>
            <Menubar.Content>
              <Menubar.Label>Layout</Menubar.Label>
              <Menubar.Item>Sidebar</Menubar.Item>
              <Menubar.Item>Fullscreen</Menubar.Item>
              <Menubar.Separator />
              <Menubar.Item>Zoom in</Menubar.Item>
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar.Root>
    ),
  });
});
