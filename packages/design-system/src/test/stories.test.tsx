import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { composeStories } from '@storybook/react-vite'
import type { Meta, StoryObj } from '@storybook/react-vite'

type StoryModule = {
  default: Meta
  [name: string]: Meta | StoryObj
}

const storyModules = import.meta.glob<StoryModule>(
  '../components/**/*.stories.tsx',
  { eager: true },
)

for (const [path, mod] of Object.entries(storyModules)) {
  const title = mod.default?.title ?? path
  const composed = composeStories(mod)
  const entries = Object.entries(composed)

  if (entries.length === 0) continue

  describe(title, () => {
    for (const [name, Story] of entries) {
      test(name, async () => {
        const result = render(<Story />)

        if (typeof Story.play === 'function') {
          await Story.play({ canvasElement: result.container as HTMLElement })
        }

        expect(result.container).toBeTruthy()
        expect(result.container.firstChild).toBeTruthy()
      })
    }
  })
}
