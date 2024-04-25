import fs from 'fs/promises'
import path from 'path'
import { glob } from 'glob'
import { renderToStaticMarkup } from 'react-dom/server'

import log from '../lib/log'
import resolve from '../lib/resolve'
import config from '../config'

const modulePath = process.argv[2]

async function renderModule(modulePath: string, shouldLog: boolean = false) {
  const { renderDir, renderPath, logPath } = resolve(modulePath)

  try {
    const module = await import(path.resolve(modulePath))
    const rendered = renderToStaticMarkup(module.default())
    const html = `<!DOCTYPE html>${rendered}`

    await fs.mkdir(renderDir, { recursive: true })
    await fs.writeFile(renderPath, html)

    if (shouldLog) {
      log.success(logPath, { tag: 'Rendered' })
    }
  } catch (error) {
    log.error(logPath, { tag: 'Render Failed' })
    log.muted(error)
    process.exit(1)
  }
}

async function main() {
  if (modulePath) {
    try {
      await fs.access(modulePath, fs.constants.F_OK)
      await renderModule(modulePath, true)
    } catch (error) {
      log.error(error.message)
    }
  } else {
    try {
      const files = await glob(path.join(config.pagesPath, '**/*.tsx'))
      for (const file of files) {
        renderModule(file, true)
      }
    } catch (error) {
      log.error(error.message, { tag: 'Glob' })
    }
  }
}

main()
