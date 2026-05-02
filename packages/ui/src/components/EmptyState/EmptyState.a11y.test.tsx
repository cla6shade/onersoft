import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';

describe('EmptyState a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <EmptyState>
        <EmptyState.Title>No messages</EmptyState.Title>
        <EmptyState.Description>You will see new messages here.</EmptyState.Description>
        <EmptyState.Actions>
          <Button>Compose</Button>
        </EmptyState.Actions>
      </EmptyState>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
