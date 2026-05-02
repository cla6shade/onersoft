import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { ToggleGroup } from '.';

describe('ToggleGroup e2e', () => {
  runComponentMatrix({
    ...componentMatrix.ToggleGroup,
    renderFor: ({ className }) => (
      <ToggleGroup.Root
        type="single"
        defaultValue="grid"
        aria-label="View mode"
        className={className}
      >
        <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
        <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      </ToggleGroup.Root>
    ),
  });
});
