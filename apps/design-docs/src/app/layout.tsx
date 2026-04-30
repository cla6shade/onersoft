import { RootProvider } from 'fumadocs-ui/provider/next'
import { Inter } from 'next/font/google'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import './global.css'

const inter = Inter({
  subsets: ['latin'],
})

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          theme={{ attribute: ['class', 'data-theme'] }}
          search={{ options: { type: 'static', api: `${basePath}/api/search` } }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
