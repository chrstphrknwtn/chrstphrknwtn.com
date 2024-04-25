import { Request, Response, NextFunction } from 'express'
import fs from 'fs/promises'
import path from 'path'
import postcss from 'postcss'
import postcssConfig from '../postcss.config'
import log from '../lib/log'
import config from '../config'

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.path.endsWith('.css')) {
    try {
      const cssFilePath = path.join(config.publicPath, req.path)

      // Throw error if file is not in public directory
      await fs.access(path.join(config.publicPath, req.path))

      const file = await fs.readFile(cssFilePath)
      const result = await postcss(postcssConfig.plugins).process(
        file.toString(),
        { from: cssFilePath }
      )

      res.type('css')
      res.send(result.css)
    } catch (error) {
      log.error(error, { tag: 'PostCSS' })
      next(error)
    }
  } else {
    next()
  }
}
