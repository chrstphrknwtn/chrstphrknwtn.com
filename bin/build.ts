import { build } from 'esbuild'
import { write } from 'bun'

import config from 'config'
import router from 'lib/router'
import renderPage from 'lib/render-page'

async function main() {
  const entryPoints = Object.keys(router.routes).map(
    route => router.routes[route]
  )

  const result = await build({
    entryPoints,
    bundle: true,
    write: false,
    outdir: config.distDir,
    platform: 'node',
    external: ['react', 'react-dom', '*.woff2']
  })

  const pageBundles = result.outputFiles.filter(outputFile =>
    outputFile.path.endsWith('.js')
  )

  for (const pageBundle of pageBundles) {
    const pageCss = result.outputFiles.find(
      outputFile => outputFile.path === pageBundle.path.replace('.js', '.css')
    )
    const html = renderPage({
      bundleSrc: pageBundle.text,
      cssSrc: pageCss?.contents,
      minify: true
    })

    write(pageBundle.path.replace('.js', '.html'), html)
  }
}

main()
