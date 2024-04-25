import c from 'chalk'

interface Options {
  tag?: string
}

const PAD_LENGTH = 12
const PAD_CHAR = ' '

const log = {
  info: (message: string, { tag = 'Info' }: Options = {}) => {
    console.log(c.blue('→'), c.grey(tag.padEnd(PAD_LENGTH, PAD_CHAR)), message)
  },
  warn: (message: string, { tag = 'Warning' }: Options = {}) => {
    console.log(
      c.yellow('△'),
      c.grey(tag.padEnd(PAD_LENGTH, PAD_CHAR)),
      message
    )
  },
  error: (message: string, { tag = 'Error' }: Options = {}) => {
    console.log(c.red('×'), c.grey(tag.padEnd(PAD_LENGTH, PAD_CHAR)), message)
  },
  success: (message: string, { tag = 'Success' }: Options = {}) => {
    console.log(c.green('✓'), c.grey(tag.padEnd(PAD_LENGTH, PAD_CHAR)), message)
  },
  muted: (message: string) => {
    console.log(c.grey(message))
  }
}

export default log
