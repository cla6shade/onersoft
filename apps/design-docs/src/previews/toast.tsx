'use client'

import { Button, Toaster, toast } from '@onersoft/design-system'

export function ToastTriggers() {
  return (
    <>
      <Button onClick={() => toast('저장됨', { description: '변경 사항이 적용되었습니다.' })}>
        Default
      </Button>
      <Button variant="secondary" onClick={() => toast.success('업로드 완료')}>
        Success
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast.error('네트워크 오류', { description: '잠시 후 다시 시도해주세요.' })
        }
      >
        Error
      </Button>
    </>
  )
}

export function ToastMount() {
  return <Toaster />
}
