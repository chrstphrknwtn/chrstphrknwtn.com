import { dirname, join } from 'node:path'
import { file } from 'bun'
import { build } from 'esbuild'
import { createContext, Script } from 'vm'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import browserslist from 'browserslist'
import { transform, Features, browserslistToTargets } from 'lightningcss'
import config from 'config'

type cssTransformArgs = {
  css: Uint8Array
  minify?: boolean
}

type renderPageArgs = {
  entryPoint: string
  bundleSrc: string
  cssSrc?: Uint8Array
  minify?: boolean
}

function insertBefore(string: string, substring: string, content: string) {
  return string.replace(substring, `${content}${substring}`)
}

function cssTransform({ css, minify = false }: cssTransformArgs): string {
  const transformedCss = transform({
    filename: '',
    code: css,
    include: Features.Nesting,
    minify,
    targets: browserslistToTargets(browserslist('since 2021')),
    drafts: {
      customMedia: true
    }
  })

  return transformedCss.code.toString()
}

function renderBundleInVm(code: string): string {
  const context = createContext({
    process,
    require,
    console,
    React,
    ReactDOMServer,
    module: {},
    exports: {}
  })

  const script = new Script(code)
  script.runInContext(context)

  const ReactComponent = context.module.exports.default
  const html = ReactDOMServer.renderToString(ReactComponent())

  return `<!DOCTYPE html>${html}`
}

async function bundleDomScript(
  entryPoint: string,
  minify = false
): Promise<string | null> {
  const domScriptPath = join(dirname(entryPoint), 'dom.ts')
  const domScriptFile = file(domScriptPath)

  if (await domScriptFile.exists()) {
    const result = await build({
      entryPoints: [domScriptPath],
      bundle: true,
      write: false,
      format: 'esm',
      minify,
      outdir: config.distDir,
      platform: 'browser'
    })

    if (result.errors.length === 0) {
      return result.outputFiles[0].text
    }
    console.error(result.errors)
    throw Error()
  }

  return null
}

async function renderHtml({
  entryPoint,
  bundleSrc,
  cssSrc,
  minify = false
}: renderPageArgs): Promise<string> {
  const html = renderBundleInVm(bundleSrc)
  const css = cssSrc ? cssTransform({ css: cssSrc, minify }) : null
  // DOM script dependency injection
  const domScript = await bundleDomScript(entryPoint, minify)

  const markupWithCss = css
    ? insertBefore(html, '</head>', `<style>${css}</style>`)
    : html
  const markupWithDomJs = domScript
    ? insertBefore(
        markupWithCss,
        '</body>',
        `<script type="module">${domScript}</script>`
      )
    : markupWithCss

  return markupWithDomJs
}

async function getMarkup(entryPoint: string, minify = false) {
  const result = await build({
    entryPoints: [entryPoint],
    bundle: true,
    write: false,
    outdir: config.distDir,
    platform: 'node',
    external: ['react', 'react-dom', '*.woff2']
  })

  return renderHtml({
    entryPoint,
    bundleSrc: result.outputFiles[0].text,
    cssSrc: result.outputFiles[1].contents,
    minify
  })
}

export default getMarkup
