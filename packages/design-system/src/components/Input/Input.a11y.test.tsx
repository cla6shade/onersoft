import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { runAxe } from '../../test/axe'
import { Input } from './Input'
import { Label } from '../Label'

describe('Input a11y', () => {
  it('has no axe violations when paired with a Label', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>,
    )
    const results = await runAxe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations in invalid + disabled states', async () => {
    const { container } = render(
      <div>
        <div>
          <Label htmlFor="invalid">Token</Label>
          <Input id="invalid" defaultValue="bad" invalid />
        </div>
        <div>
          <Label htmlFor="disabled">Username</Label>
          <Input id="disabled" defaultValue="ro" disabled />
        </div>
      </div>,
    )
    const results = await runAxe(container)
    expect(results.violations).toEqual([])
  })
})
