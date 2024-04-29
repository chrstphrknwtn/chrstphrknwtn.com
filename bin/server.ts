import path from 'node:path'
import { FileSystemRouter } from 'bun'
import { renderToStaticMarkup } from 'react-dom/server'
import config from 'config'

const router = new FileSystemRouter({
  style: 'nextjs',
  dir: config.pagesPath
})

Bun.serve({
  async fetch(request: Request) {
    const match = router.match(request)
    if (match) {
      const PageComponent = await import(match.filePath)
      const markup = renderToStaticMarkup(PageComponent.default())
      return new Response(markup, {
        headers: { 'Content-Type': 'text/html' }
      })
    }

    // For now, serve CSS and anything else we can find
    const { pathname } = new URL(request.url)
    const file = Bun.file(path.join(config.publicPath, pathname))
    if (await file.exists()) {
      return new Response(file)
    }

    // All is lost
    return new Response('Ooops', { status: 404 })
  }
})
