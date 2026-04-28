import { DEFAULT_THEME_STORAGE_KEY } from './ThemeProvider'

/**
 * Inline script string that resolves the user's theme preference and writes
 * `data-theme` onto <html> before paint, preventing FOUC during SSR.
 *
 * Usage (Next.js App Router, in app/layout.tsx):
 *   <head>
 *     <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
 *   </head>
 */
export function getThemeInitScript(storageKey: string = DEFAULT_THEME_STORAGE_KEY): string {
  const key = JSON.stringify(storageKey)
  return `(function(){try{var k=${key};var p=localStorage.getItem(k)||'system';var r=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;document.documentElement.dataset.theme=r;}catch(e){}})();`
}
