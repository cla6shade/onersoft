import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';

describe('EmptyState e2e', () => {
  runComponentMatrix({
    ...componentMatrix.EmptyState,
    renderFor: ({ className }) => (
      <EmptyState className={className}>
        <EmptyState.Title>No messages</EmptyState.Title>
        <EmptyState.Description>You will see new messages here.</EmptyState.Description>
        <EmptyState.Actions>
          <Button>Compose</Button>
        </EmptyState.Actions>
      </EmptyState>
    ),
  });
});
