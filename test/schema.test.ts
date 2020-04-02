import convict from 'convict'
import { getJsonSchema } from '../src/convict-json-schema'

describe('schema', () => {
  const schema = {
    something: {
      env: 'SOMETHING',
      default: 'abc',
      format: String,
    },
  }

  const config = convict(schema)

  it('detect config', () => {
    const res = getJsonSchema(config)

    // todo
    expect(res).toBeFalsy()
  })
})
