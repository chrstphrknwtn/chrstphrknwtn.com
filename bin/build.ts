import { cp } from 'node:fs'
import { relative } from 'node:path'
import { write } from 'bun'

import config from 'config'
import router from 'lib/router'
import renderPage from 'lib/render-page'

async function main() {
  const entryPoints = Object.keys(router.routes)
    .filter(r => !r.includes('components'))
    .map(route => router.routes[route])

  for (const entryPoint of entryPoints) {
    const html = await renderPage(entryPoint, true)
    const distPath = entryPoint
      .replace(config.pagesDir, config.distDir)
      .replace('tsx', 'html')
    write(distPath, html)
    console.log('Page Rendered:', relative(config.distDir, distPath))
  }

  cp(config.publicDir, config.distDir, { recursive: true }, () => {
    console.log('Public files copied')
  })
}

main()
