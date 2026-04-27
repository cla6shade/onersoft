import { describe, it, expect, afterEach } from 'vitest'
import { act, render, screen, waitFor } from '@testing-library/react'
import { Toaster } from './Toaster'
import { toast } from './store'

describe('Toaster', () => {
  afterEach(async () => {
    await act(async () => {
      toast.dismissAll()
    })
  })

  it('renders multiple toasts including title, description, and action slots', async () => {
    render(<Toaster />)

    await act(async () => {
      toast('저장됨', { description: '기본.' })
      toast.success('저장됨', {
        description: '변경 사항이 적용되었습니다.',
        action: { label: '실행 취소', onClick: () => {} },
      })
      toast.info('새 업데이트가 있습니다.')
    })

    await waitFor(() => {
      expect(screen.getAllByText(/저장됨|새 업데이트/).length).toBeGreaterThan(0)
    })
    expect(screen.getByText('변경 사항이 적용되었습니다.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '실행 취소' })).toBeInTheDocument()
  })
})
