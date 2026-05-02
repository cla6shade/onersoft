import { describe } from 'vitest';
import { render } from '@testing-library/react';
import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Tooltip } from '.';
import { Button } from '../Button';

describe('Tooltip e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Tooltip,
    renderFor: ({ className, wrapper }) => (
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger asChild>
            <Button variant="secondary">Hover me</Button>
          </Tooltip.Trigger>
          <Tooltip.Portal container={wrapper}>
            <Tooltip.Content side="top" className={className}>
              Keyboard shortcut: ⌘K
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    ),
  });
});
