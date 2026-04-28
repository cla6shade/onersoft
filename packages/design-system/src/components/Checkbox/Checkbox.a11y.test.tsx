import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { runAxe } from '../../test/axe'
import { Checkbox } from './Checkbox'
import { Label } from '../Label'

describe('Checkbox a11y', () => {
  it('has no axe violations when paired with a Label', async () => {
    const { container } = render(
      <div>
        <Checkbox id="terms" defaultChecked />
        <Label htmlFor="terms">Accept terms of service</Label>
      </div>,
    )
    const results = await runAxe(container)
    expect(results.violations).toEqual([])
  })
})
