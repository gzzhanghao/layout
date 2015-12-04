import Text from '../fields/Text'

export default  {
  name: 'Content',
  key: 'content',
  available: 'text',
  fields: {
    content: Text({ multiLine: true })
  },
  apply(config, { prop }) {
    prop.innerHTML = config.content
  }
}
