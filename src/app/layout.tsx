import type { Metadata } from 'next'
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
        <div className={styles.rootLayout}>{children}</div>
      </body>
    </html>
  )
}
