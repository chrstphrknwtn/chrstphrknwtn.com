import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default ({ children }: Props) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="robots" content="noindex, noarchive" />
      <title>Christopher Newton · Design Engineer</title>
      <meta name="viewport" content="width=device-width" />
      <link rel="preconnect" href="https://rsms.me/" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </head>
    <body>{children}</body>
  </html>
)
