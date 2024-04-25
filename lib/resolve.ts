import path from 'path'
import config from '../config'

export interface ResolvedModulePaths {
  renderDir?: string
  renderPath?: string
  logPath: string
}

export default function (modulePath: string): ResolvedModulePaths {
  const parsedPath = path.parse(path.resolve(modulePath))

  const renderDir = path.join(
    config.distPath,
    path.relative(
      config.rootPath,
      path.relative(config.pagesPath, parsedPath.dir)
    )
  )

  const renderPath = path.join(renderDir, `${parsedPath.name}.html`)
  const logPath = path.relative(config.rootPath, renderPath)

  return {
    renderDir,
    renderPath,
    logPath
  }
}
