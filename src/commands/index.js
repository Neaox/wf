const commands = require.context('.', true, /\.js$/)

export default function bindCommands (vorpal) {
  commands.keys()
}
