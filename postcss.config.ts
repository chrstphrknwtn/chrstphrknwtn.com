import path from 'path'
import autoprefixer from 'autoprefixer'
import cssGlobalData from '@csstools/postcss-global-data'
import cssCustomMedia from 'postcss-custom-media'
import cssNesting from 'postcss-nesting'

import config from './config'

export default {
  plugins: [
    autoprefixer(),
    cssGlobalData({
      files: [path.join(config.srcPath, 'custom-media-queries.css')]
    }),
    cssCustomMedia(),
    cssNesting({
      edition: '2024-02'
    })
  ]
}
