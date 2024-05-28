import { join } from 'path'
import config from 'config'
import router from 'lib/router'
import renderPage from 'lib/render-page'

const server = Bun.serve({
  async fetch(request: Request) {
    const match = router.match(request)

    if (match) {
      const html = await renderPage(match.filePath)
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      })
    }

    // Serve anything in `src/public`
    const { pathname } = new URL(request.url)
    const file = Bun.file(join(config.publicDir, pathname))
    if (await file.exists()) {
      return new Response(file)
    }

    return new Response(await renderPage('src/pages/404.tsx'), {
      status: 404,
      headers: { 'Content-Type': 'text/html' }
    })
  },
  port: 4343
})

console.log('Ready on', server.url.href)
