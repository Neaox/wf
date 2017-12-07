import childProcess from 'child_process'

import { CONFIG_PATH } from '../../constants'

export const description = 'Opens the config file for editing'

function getCommandLine () {
  switch (process.platform) {
    case 'darwin':
      return 'open'

    case 'win32':
    case 'win64':
      return 'start'

    default:
      return 'xdg-open'
  }
}

export function action (args) {
  childProcess.exec(`${getCommandLine()} "${CONFIG_PATH}"`)
}
