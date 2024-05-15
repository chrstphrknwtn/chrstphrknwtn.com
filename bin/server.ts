import { join } from 'path'
import config from 'config'
import router from 'lib/router'
import getMarkup from 'lib/get-markup'

const server = Bun.serve({
  async fetch(request: Request) {
    const match = router.match(request)

    if (match) {
      const html = await getMarkup(match.filePath)
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      })
    }

    // Serve anything in `src/public`
    const { pathname } = new URL(request.url)
    const file = Bun.file(join(config.publicPath, pathname))
    if (await file.exists()) {
      return new Response(file)
    }

    return new Response('Ooops', { status: 404 })
  },
  port: 4343
})

console.log('Ready on', server.url.href)
