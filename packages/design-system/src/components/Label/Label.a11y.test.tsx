import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { runAxe } from '../../test/axe'
import { Label } from './Label'
import { Checkbox } from '../Checkbox'

describe('Label a11y', () => {
  it('has no axe violations when bound to a control', async () => {
    const { container } = render(
      <div>
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter">Subscribe to the newsletter</Label>
      </div>,
    )
    const results = await runAxe(container)
    expect(results.violations).toEqual([])
  })
})
