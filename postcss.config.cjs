/* See this issue regarding custom media queries:
 * https://github.com/withastro/astro/issues/2731
 */
const autoprefixer = require('autoprefixer')
const postcssGlobalData = require('@csstools/postcss-global-data')
const postcssCustomMedia = require('postcss-custom-media')
const postcssNesting = require('postcss-nesting')

module.exports = {
  plugins: [
    autoprefixer(),
    postcssGlobalData({
      files: ['./src/styles/custom-media-queries.css']
    }),
    postcssCustomMedia(),
    postcssNesting({
      edition: '2024-02'
    })
  ]
}
