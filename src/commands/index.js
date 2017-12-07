import set from 'lodash.set'

const commandLoader = require.context('.', true, /\.js$/)

function bindCommand (command, vorpal) {
  if (typeof command.action === 'function') {
    const vorpalCommand = vorpal.command(command.command)

    vorpalCommand
      .description(command.description)

    command.options &&
      Array.isArray(command.options) &&
      command.options.forEach(option => vorpalCommand.option.apply(vorpalCommand, option))

    command.aliases &&
      Array.isArray(command.aliases) &&
      command.aliases.forEach(vorpalCommand.alias)

    command.types &&
     typeof command.types === 'object' &&
      vorpalCommand.types(command.types)

    if (command.hidden === true) {
      vorpalCommand.hidden()
    }

    if (typeof command.parse === 'function') {
      vorpalCommand.parse(command.parse)
    }

    if (typeof command.validate === 'function') {
      vorpalCommand.validate(command.validate)
    }

    command.autocomplete &&
      vorpalCommand.autocomplete(command.autocomplete)

    vorpalCommand
      .action(command.action)
  }

  if (command.subCommands) {
    Object.values(command.subCommands).forEach((subCommand) => bindCommand(subCommand, vorpal))
  }
}

export default function bindCommands (vorpal, options) {
  const commandPaths = commandLoader.keys()
  const commands = commandPaths
    .filter(commandPath => commandPath.slice(1) !== __filename)
    .reduce((commands, commandPath) => {
      let segments = commandPath.slice(2).replace(/\.[^/.]+$/, '').replace(/\./g, '_').split('/')
      const command = Object.assign({}, commandLoader(commandPath))

      if (command.command == null) {
        command.command = segments.join(' ')
      }

      if (segments.length > 1) {
        segments = [segments[0], 'subCommands'].concat(segments.slice(1))
      }

      return set(commands, segments.join('.'), command)
    }, {})

  Object.values(commands).forEach(command => bindCommand(command, vorpal))
}
