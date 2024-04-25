import path from 'path'
import { spawnSync } from 'child_process'

import chokidar from 'chokidar'
import connectLivereload from 'connect-livereload'
import express from 'express'
import dependencyTree from 'dependency-tree'
import { globSync } from 'glob'
import livereload from 'livereload'
import portfinder from 'portfinder'

import postcss from '../lib/postcss-middleware'
import log from '../lib/log'
import resolve from '../lib/resolve'
import config from '../config'

/*
 * Simple Module graph
 *
 */
const moduleGraph = {}

function buildModuleGraph() {
  const modules = globSync(path.join(config.srcPath, '**/*.{ts,tsx,css}'))

  modules.forEach(modulePath => {
    const dependencies = dependencyTree.toList({
      filename: modulePath,
      directory: config.srcPath
    })
    moduleGraph[modulePath] = dependencies.filter(dep => dep !== modulePath)
  })
}

function findDependents(modulePath: string) {
  return Object.keys(moduleGraph).filter(
    key =>
      Array.isArray(moduleGraph[key]) && moduleGraph[key].includes(modulePath)
  )
}

/*
 * Render using child process to ensure changes in source modules are reflected
 *
 */
function spawnRenderWorker(modulePath: string) {
  const { logPath } = resolve(modulePath)

  const result = spawnSync('npm', ['run', 'render', '--', modulePath], {
    encoding: 'utf8'
  })

  if (result.status === 0) {
    log.success(logPath, { tag: 'Rendered' })
    if (result.stderr) {
      log.warn(result.stderr)
    }
  } else {
    log.error(logPath, { tag: 'Render Failed' })
    log.error(result.stdout)
  }
}

/*
 * Watch
 *
 */
const watchPattern = path.join(config.srcPath, '**/*.{ts,tsx,css,js}')
const watcher = chokidar.watch(watchPattern)

watcher.on('change', async filePath => {
  log.info(path.relative(config.srcPath, filePath), { tag: 'Changed' })

  // If change is page, render it
  if (filePath.startsWith(config.pagesPath)) {
    spawnRenderWorker(filePath)
  } else {
    // Changed file is a component, so render any pages that import it.
    findDependents(filePath)
      .filter(dep => dep.startsWith(config.pagesPath))
      .forEach(filePath => {
        spawnRenderWorker(filePath)
      })
  }
})

watcher.on('ready', () => {
  log.info('Building Module Graph')
  buildModuleGraph()

  watcher.on('add', filePath => {
    log.success(path.relative(config.srcPath, filePath), { tag: 'Added' })
    log.info('Rebuilding Module Graph')
    buildModuleGraph()
  })

  watcher.on('unlink', filePath => {
    log.warn(path.relative(config.srcPath, filePath), { tag: 'Removed' })
    log.info('Rebuilding Module Graph')
    buildModuleGraph()
  })
})

/*
 * Serve rendered pages
 *
 */
const app = express()

const liveReloadServer = livereload.createServer()
liveReloadServer.watch(config.distPath)

app.use(connectLivereload())
app.use(postcss)
app.use(express.static(config.distPath))
app.use(express.static(config.publicPath))

portfinder.basePort = 3000
portfinder.getPort((err, port) => {
  if (err) {
    log.error(`Unable to find a free port ${err}`)
    return
  }

  const server = app.listen(port, () => {
    log.success(`http://localhost:${port}`, {
      tag: 'Dev Server'
    })
  })

  server.on('error', serverError => {
    log.error(serverError.message, { tag: 'Dev Server' })
  })
})
