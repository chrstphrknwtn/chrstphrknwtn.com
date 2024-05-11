import { FileSystemRouter } from 'bun'
import config from 'config'

const router = new FileSystemRouter({
  style: 'nextjs',
  dir: config.pagesDir,
  fileExtensions: ['.tsx']
})

export default router
