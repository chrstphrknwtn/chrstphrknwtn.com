import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default ({ children }: Props) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="robots" content="noindex, noarchive" />
      <title>Christopher Newton</title>
      <meta name="viewport" content="width=device-width" />
    </head>
    <body>{children}</body>
  </html>
)
