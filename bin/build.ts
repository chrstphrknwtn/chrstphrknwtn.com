import { unlink } from 'node:fs'
import { basename, join } from 'node:path'
import { FileSystemRouter } from 'bun'
import { renderToStaticMarkup } from 'react-dom/server'
import config from 'config'

const router = new FileSystemRouter({
  style: 'nextjs',
  dir: config.pagesPath
})

const build = await Bun.build({
  entrypoints: Object.values(router.routes).map(route => route),
  outdir: config.distPath
})

// Convert bundle pages to HTML
build.outputs.forEach(async artifact => {
  const { default: Component } = await import(artifact.path)
  const staticMarkup = renderToStaticMarkup(Component())
  await Bun.write(join(artifact.path.replace('.js', '.html')), staticMarkup)
  unlink(artifact.path, err => {
    if (err) console.error(err)
  })
})

const publicFiles = new Bun.Glob(config.publicPath + '/*.*')
for await (const file of publicFiles.scan('.')) {
  Bun.write(join(config.distPath, basename(file)), Bun.file(file))
}
