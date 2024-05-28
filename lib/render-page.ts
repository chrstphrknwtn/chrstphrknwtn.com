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

/**
 * Renders a page to a hydratable HTML string.
 *
 * @param entryPoint The entry point of the page to render.
 * @param [minify=false] Flag indicating whether the output should be minified.
 * @returns A promise that resolves to the rendered HTML string.
 */
async function renderPage(
  entryPoint: string,
  minify: boolean = false
): Promise<string> {
  const result = await build({
    entryPoints: [entryPoint],
    bundle: true,
    write: false,
    outdir: config.distDir,
    platform: 'node',
    external: ['react', 'react-dom', '*.woff2', '*.png']
  })

  const pageBundle = {
    entryPoint,
    tsxSrc: result.outputFiles[0].text,
    cssSrc: result.outputFiles[1].contents,
    minify
  }

  // Render TSX page source to hydratable string
  let html = renderBundleInVm(pageBundle.tsxSrc)

  // Inject CSS
  const css = pageBundle.cssSrc
    ? cssTransform({ css: pageBundle.cssSrc, minify })
    : null
  html = css ? insertBefore(html, '</head>', `<style>${css}</style>`) : html

  // Inject DOM script if present
  const domScript = await bundleDomScript(entryPoint, minify)
  html = domScript
    ? insertBefore(html, '</body>', `<script>${domScript}</script>`)
    : html

  return html
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
      platform: 'browser',
      define: {
        'process.env.NODE_ENV': minify ? '"production"' : '""'
      },
      legalComments: 'none',
      external: ['*.png', '*.jpg']
    })

    if (result.errors.length === 0) {
      return result.outputFiles[0].text
    }
    console.error(result.errors)
    throw Error()
  }

  return null
}

export default renderPage
