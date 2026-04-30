import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Textarea } from './Textarea';
import { Label } from '../Label';

describe('Textarea a11y', () => {
  it('has no axe violations when paired with a Label', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" rows={4} placeholder="Tell us about yourself" />
      </div>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
