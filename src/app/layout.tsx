import type { Metadata } from 'next'
import Link from 'next/link'
import '@/css/site.css'

import styles from './layout.module.css'

export const metadata: Metadata = {
  title: 'Christopher Newton',
  robots: 'noindex, noarchive'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.rootLayout}>
          <header className={styles.header}>
            <Link href="/">Christopher Newton</Link>
            <span>Design Engineer</span>
          </header>

          {children}
        </div>
      </body>
    </html>
  )
}
