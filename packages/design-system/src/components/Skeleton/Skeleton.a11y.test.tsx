import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Skeleton } from './Skeleton';

describe('Skeleton a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Skeleton height={120} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="circle" width={48} />
      </div>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
