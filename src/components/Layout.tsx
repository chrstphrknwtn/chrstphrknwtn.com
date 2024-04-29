import { type ReactNode } from 'react'

export default ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Christopher Newton · Design Engineer</title>
      <meta
        name="description"
        content="Profile and recent work of Seattle-based designer and developer Christopher Newton."
      />
      <meta name="viewport" content="width=device-width" />
      <link rel="stylesheet" href="/global.css" />
    </head>
    <body>{children}</body>
  </html>
)
