/**
 * Imperative toast store. Lives at module scope so non-React code (route
 * handlers, event listeners, RHF onSubmit, etc.) can call `toast()` from
 * anywhere without touching React context.
 *
 * The `<Toaster>` component subscribes via useSyncExternalStore and
 * renders one Radix Toast per active entry.
 */

export type ToastIntent = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface ToastEntry {
  id: string;
  intent: ToastIntent;
  title?: string;
  description?: string;
  /** Auto-dismiss ms. `Infinity` keeps it open until dismissed manually. */
  duration: number;
  /** Optional action button label + handler. */
  action?: { label: string; onClick: () => void };
}

export interface ToastOptions {
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
  /** Reuse a previous id to update an existing toast in place. */
  id?: string;
}

let entries: ToastEntry[] = [];
const listeners = new Set<() => void>();
let counter = 0;

function emit() {
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): readonly ToastEntry[] {
  return entries;
}

export function getServerSnapshot(): readonly ToastEntry[] {
  return entries;
}

function add(intent: ToastIntent, title: string, options: ToastOptions = {}): string {
  const id = options.id ?? `t${++counter}`;
  const entry: ToastEntry = {
    id,
    intent,
    title,
    description: options.description,
    duration: options.duration ?? 5000,
    action: options.action,
  };
  /* If id already exists, replace in place so callers can update a toast
   * (e.g. "Saving…" → "Saved"). */
  const existingIndex = entries.findIndex((e) => e.id === id);
  entries =
    existingIndex >= 0
      ? entries.map((e, i) => (i === existingIndex ? entry : e))
      : [...entries, entry];
  emit();
  return id;
}

function dismiss(id: string) {
  const next = entries.filter((e) => e.id !== id);
  if (next.length === entries.length) return;
  entries = next;
  emit();
}

function dismissAll() {
  if (entries.length === 0) return;
  entries = [];
  emit();
}

interface ToastFn {
  (title: string, options?: ToastOptions): string;
  success: (title: string, options?: ToastOptions) => string;
  warning: (title: string, options?: ToastOptions) => string;
  error: (title: string, options?: ToastOptions) => string;
  info: (title: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const fn = ((title: string, options?: ToastOptions) => add('neutral', title, options)) as ToastFn;
fn.success = (title, options) => add('success', title, options);
fn.warning = (title, options) => add('warning', title, options);
fn.error = (title, options) => add('danger', title, options);
fn.info = (title, options) => add('info', title, options);
fn.dismiss = dismiss;
fn.dismissAll = dismissAll;

export const toast = fn;
