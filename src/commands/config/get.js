import config from 'config'
import chalk from 'chalk'

export const command = 'config get <key>'
export const description = 'Gets a config value'

export const types = {
  string: ['key']
}

export function action (args) {
  if (!config.has(args.key)) {
    this.log(chalk.red(`Configuration property "${args.key}" is not defined`))
    return
  }

  this.log(config.get(args.key))
}
