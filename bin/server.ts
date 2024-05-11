import { join } from 'path'
import { build } from 'esbuild'
import config from 'config'
import router from 'lib/router'
import renderPage from 'lib/render-page'

async function getMarkup(entryPoint: string) {
  const result = await build({
    entryPoints: [entryPoint],
    bundle: true,
    write: false,
    outdir: config.distDir,
    platform: 'node',
    external: ['react', 'react-dom', '*.woff2']
  })

  return renderPage({
    bundleSrc: result.outputFiles[0].text,
    cssSrc: result.outputFiles[1].contents
  })
}

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
