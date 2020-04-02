import type { Config, Schema } from 'convict'

const isConfig = <T>(arg: Config<T> | Schema<T>): arg is Config<T> => 'toSchema' in arg

export const getJsonSchema = <T>(arg: Config<T> | Schema<T>) => {
  const schema = isConfig(arg) ? arg.getSchema() : arg

  return schema
}
