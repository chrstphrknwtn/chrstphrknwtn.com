import { createContext, Script } from 'vm'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import browserslist from 'browserslist'
import { transform, Features, browserslistToTargets } from 'lightningcss'

type cssTransformArgs = {
  css: Uint8Array
  minify?: boolean
}

type renderPageArgs = {
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

function renderPage({
  bundleSrc,
  cssSrc,
  minify = false
}: renderPageArgs): string {
  const html = renderBundleInVm(bundleSrc)
  const css = cssSrc ? cssTransform({ css: cssSrc, minify }) : null

  return css ? insertBefore(html, '</head>', `<style>${css}</style>`) : html
}

export default renderPage
