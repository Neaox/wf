import Vorpal from 'vorpal'
import { exec } from 'child_process'
import chalk from 'chalk'

import { version, name } from '../package.json'

import commands from './commands'

require('pretty-error').start()

let vorpal = Vorpal()

exec(`npm view ${name} version`, { timeout: 1000 }, (err, remoteVersion, stfErr) => {
  if (err) {
    return
  }

  // remove trailing newline
  remoteVersion = remoteVersion.trim()

  if (remoteVersion > version) {
    let message = chalk.yellow.underline(`Newer version of ${name} (${remoteVersion}) is available!\n`) +
      chalk.white(`Run: npm install ${name}@latest -g`)
    vorpal.log(message)
  }
})

vorpal
  .use(commands)
  .parse(process.argv)

export default vorpal
