import { describe } from 'vitest';
import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Select } from '.';

describe('Select e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Select,
    renderFor: ({ className, wrapper }) => (
      <Select.Root defaultValue="balanced" defaultOpen>
        <Select.Trigger className={className} aria-label="Profile">
          <Select.Value placeholder="Select profile..." />
        </Select.Trigger>
        <Select.Portal container={wrapper}>
          <Select.Content>
            <Select.Viewport>
              <Select.Group>
                <Select.Label>Performance</Select.Label>
                <Select.Item value="efficient">Efficient</Select.Item>
                <Select.Item value="balanced">Balanced</Select.Item>
                <Select.Item value="performance">Performance</Select.Item>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    ),
  });
});
