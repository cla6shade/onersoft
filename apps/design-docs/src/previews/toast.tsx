'use client';

import { Button, Toaster, toast } from '@onersoft/ui';

export function ToastTriggers() {
  return (
    <>
      <Button onClick={() => toast('Saved', { description: 'Your changes have been applied.' })}>
        Default
      </Button>
      <Button variant="secondary" onClick={() => toast.success('Upload complete')}>
        Success
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast.error('Network error', { description: 'Please try again in a moment.' })
        }
      >
        Error
      </Button>
    </>
  );
}

export function ToastMount() {
  return <Toaster />;
}
