import { cp } from 'node:fs'
import { write } from 'bun'

import config from 'config'
import router from 'lib/router'
import getMarkup from 'lib/get-markup'

async function main() {
  const entryPoints = Object.keys(router.routes)
    .filter(r => !r.includes('components'))
    .map(route => router.routes[route])

  for (const entryPoint of entryPoints) {
    const html = await getMarkup(entryPoint, true)
    const distPath = entryPoint
      .replace(config.pagesDir, config.distDir)
      .replace('tsx', 'html')
    write(distPath, html)
  }

  cp(config.publicPath, config.distDir, { recursive: true }, () => {
    console.log('Public files copied')
  })
}

main()
