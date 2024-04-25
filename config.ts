import path from 'path'

const rootPath = __dirname

export default {
  rootPath,
  srcPath: path.join(rootPath, 'src'),
  pagesPath: path.join(rootPath, 'src', 'pages'),
  publicPath: path.join(rootPath, 'src', 'public'),
  distPath: path.join(rootPath, 'dist')
}
