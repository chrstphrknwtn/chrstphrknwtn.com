import fs from 'fs/promises'
import path from 'path'
import { globSync } from 'glob'
import postcss from 'postcss'
import postcssConfig from '../postcss.config'

import config from '../config'
import log from '../lib/log'

async function ensureDir(dirPath: string) {
  try {
    await fs.access(dirPath)
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(dirPath, { recursive: true })
    } else {
      throw err
    }
  }
}

async function copyAssets() {
  const files = globSync(path.join(config.publicPath, '**/*.{js,css}'))

  for (const fileSourcePath of files) {
    const relativePath = path.relative(config.publicPath, fileSourcePath)
    const destPath = path.join(config.distPath, relativePath)

    try {
      await ensureDir(path.dirname(destPath))

      if (path.extname(relativePath) === '.css') {
        const result = await postcss(postcssConfig.plugins).process(
          await fs.readFile(fileSourcePath, 'utf-8'),
          { from: fileSourcePath }
        )
        await fs.writeFile(destPath, result.css)
      } else {
        await fs.copyFile(fileSourcePath, destPath)
      }

      log.success(path.relative(config.srcPath, fileSourcePath), {
        tag: 'Copied'
      })
    } catch (error) {
      log.error(`Error processing ${fileSourcePath}: ${error}`)
    }
  }
}

copyAssets()
