import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { runAxe } from '../../test/axe'
import { Select } from '.'

describe('Select a11y', () => {
  it('has no axe violations when open', async () => {
    render(
      <Select.Root defaultValue="balanced" defaultOpen>
        <Select.Trigger aria-label="Profile">
          <Select.Value placeholder="Select profile..." />
        </Select.Trigger>
        <Select.Portal>
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
      </Select.Root>,
    )
    const results = await runAxe(screen.getByRole('listbox'))
    expect(results.violations).toEqual([])
  })
})
