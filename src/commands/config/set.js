import fs from 'fs-extra'
import set from 'lodash.set'

import { CONFIG_PATH } from '../../constants'

export const command = 'config set <key> <value>'
export const description = 'Sets a config value'

export const types = {
  string: ['key', 'value']
}

export async function action (args) {
  let config = {}

  if (await fs.pathExists(CONFIG_PATH)) {
    config = await fs.readJson(CONFIG_PATH)
  }

  set(config, args.key, args.value)

  await fs.writeJson(CONFIG_PATH, config, {spaces: 2})
}
