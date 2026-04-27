import { afterEach, describe, expect, it, vi } from 'vitest'
import { getSnapshot, getServerSnapshot, subscribe, toast } from './store'

afterEach(() => {
  toast.dismissAll()
})

describe('toast store', () => {
  it('appends entries via the default callable, returning a generated id', () => {
    const id = toast('Saved')
    const snap = getSnapshot()
    expect(snap).toHaveLength(1)
    expect(snap[0]).toMatchObject({ id, intent: 'neutral', title: 'Saved', duration: 5000 })
  })

  it('routes intent helpers (success / warning / error / info) to the right intent', () => {
    toast.success('s', { duration: 1 })
    toast.warning('w')
    toast.error('e')
    toast.info('i')
    expect(getSnapshot().map((e) => e.intent)).toEqual([
      'success',
      'warning',
      'danger',
      'info',
    ])
  })

  it('replaces an existing entry in place when reusing an id (update flow)', () => {
    const id = toast('Saving…')
    toast.success('Saved', { id })
    const snap = getSnapshot()
    expect(snap).toHaveLength(1)
    expect(snap[0]).toMatchObject({ id, intent: 'success', title: 'Saved' })
  })

  it('forwards description and action through ToastOptions', () => {
    const onClick = vi.fn()
    toast('Uploaded', {
      description: 'profile.png',
      action: { label: 'Undo', onClick },
    })
    const entry = getSnapshot()[0]
    expect(entry.description).toBe('profile.png')
    entry.action?.onClick()
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('dismiss removes a single entry; no-op when id is unknown', () => {
    const id = toast('A')
    toast('B')
    const before = getSnapshot()
    toast.dismiss('does-not-exist')
    expect(getSnapshot()).toBe(before) // unchanged reference
    toast.dismiss(id)
    expect(getSnapshot().map((e) => e.title)).toEqual(['B'])
  })

  it('dismissAll clears the queue; no-op when already empty', () => {
    toast.dismissAll() // already empty
    toast('A')
    toast('B')
    toast.dismissAll()
    expect(getSnapshot()).toEqual([])
  })

  it('subscribe notifies on mutations and unsubscribes cleanly', () => {
    const listener = vi.fn()
    const unsubscribe = subscribe(listener)
    toast('first')
    expect(listener).toHaveBeenCalledTimes(1)
    unsubscribe()
    toast('second')
    expect(listener).toHaveBeenCalledTimes(1) // no further calls
  })

  it('getServerSnapshot mirrors the client snapshot for SSR hydration', () => {
    toast('hydrate me')
    expect(getServerSnapshot()).toBe(getSnapshot())
  })
})
