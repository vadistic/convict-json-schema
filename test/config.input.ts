import convict from 'convict'

const schema = {
  something: {
    env: 'SOMETHING',
    default: 'abc',
    format: String,
  },
}

export const config = convict(schema)
