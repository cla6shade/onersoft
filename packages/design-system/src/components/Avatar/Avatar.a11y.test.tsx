import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Avatar } from '.';

describe('Avatar a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <Avatar.Root>
        <Avatar.Image src="" alt="User avatar" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
