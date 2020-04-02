import path from 'path'
import meow from 'meow'
import { importFile } from './import-file'

export const run = async () => {
  const cli = meow(
    `
      Usage:
          $ convict-json-schema [options] OUTPUT

      Example:
          $ convict-json-schema --source ./config.json ./config.schema.json
          $ convict-json-schema --source ./src/config.ts ./config.schema.json

      Options:
          -h, --help         print usage information
          -v, --version      show version info and exit
          -s, --source       json or js/ts file with exported convict config or schema

      Github: https://github.com/vadistic/convict-json-schema
  `,

    {
      autoVersion: false,
      autoHelp: false,
      hardRejection: false,
      flags: {
        help: { type: 'boolean', alias: 'h' },
        version: { type: 'boolean', alias: 'v' },
        source: {
          type: 'string',
          alias: 's',
        },
        output: {
          type: 'string',
          alias: 'o',
        },
      },
    },
  )

  const handleErrors = (errors?: string[]) => {
    if (errors?.length) {
      console.error('Encountered some issues: \n')

      errors.forEach((err) => {
        err.split('\n').map((str, i) => {
          if (i === 0) {
            console.error('    => ' + str + '\n')
          } else {
            console.error('       ' + str + '\n')
          }
        })
      })

      console.log('HELP:')

      cli.showHelp()

      process.exit(0)
    }
  }

  if (cli.flags.version) {
    cli.showVersion()
    return
  }

  if (cli.flags.help) {
    cli.showHelp()
    return
  }

  const inputErr = []

  if (!cli.flags.source) {
    inputErr.push(
      '"--source" flag is missing! \n' +
        'Specify json with convict schema. \n' +
        'Or js/ts file with exported convict config or schema',
    )
  }

  if (!cli.input[0]) {
    inputErr.push('OUTPUT is missing! \nSpecify place to save generated JSON schema')
  }

  const extname = path.extname(cli.input[0])
  const extnames = ['.ts', '.js', '.json']

  if (!extnames.includes(extname)) {
    inputErr.push(
      'Unsupported file extension! \n' +
        `${extname} of ${cli.input[0]} source is not in ${extnames.join()} \n`,
    )
  }

  handleErrors(inputErr)

  const { file, errors: readErr } = await importFile(cli.input[0])

  handleErrors(readErr)

  console.log(file)
}
