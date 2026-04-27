import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toaster } from './Toaster'
import { toast } from './store'
import { Button } from '../Button'

function Harness() {
  return (
    <>
      <Button onClick={() => toast('저장됨', { description: '기본.' })}>Default</Button>
      <Button
        onClick={() =>
          toast.success('저장됨', {
            description: '변경 사항이 적용되었습니다.',
            action: { label: '실행 취소', onClick: () => {} },
          })
        }
      >
        Success
      </Button>
      <Button onClick={() => toast.info('새 업데이트가 있습니다.')}>Info</Button>
      <Toaster />
    </>
  )
}

describe('Toaster', () => {
  afterEach(() => {
    toast.dismissAll()
  })

  it('renders multiple toasts including title, description, and action slots', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.click(screen.getByRole('button', { name: 'Default' }))
    await user.click(screen.getByRole('button', { name: 'Success' }))
    await user.click(screen.getByRole('button', { name: 'Info' }))

    await waitFor(() => {
      expect(screen.getAllByText(/저장됨|새 업데이트/).length).toBeGreaterThan(0)
    })
    expect(screen.getByText('변경 사항이 적용되었습니다.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '실행 취소' })).toBeInTheDocument()
  })
})
