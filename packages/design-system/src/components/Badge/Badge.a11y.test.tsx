import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Badge } from './Badge';

describe('Badge a11y', () => {
  it('has no axe violations across variants', async () => {
    const { container } = render(
      <>
        <Badge>Neutral</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
      </>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
