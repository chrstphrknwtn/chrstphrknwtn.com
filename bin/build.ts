import { basename, join } from 'node:path'
import { FileSystemRouter } from 'bun'
import { renderToStaticMarkup } from 'react-dom/server'
import config from 'config'

const router = new FileSystemRouter({
  style: 'nextjs',
  dir: config.pagesPath
})

Object.values(router.routes)
  .map(route => route)
  .forEach(async route => {
    const { default: Component } = await import(route)
    const staticMarkup = renderToStaticMarkup(Component())
    await Bun.write(
      route.replace(config.pagesPath, config.distPath).replace('.tsx', '.html'),
      staticMarkup
    )
  })

const publicFiles = new Bun.Glob(config.publicPath + '/*.*')
for await (const file of publicFiles.scan('.')) {
  Bun.write(join(config.distPath, basename(file)), Bun.file(file))
}
