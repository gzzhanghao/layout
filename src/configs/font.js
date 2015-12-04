import Size from '../fields/Size'
import Text from '../fields/Text'
import Color from '../fields/Color'

export default  {
  name: 'Font',
  key: 'font',
  available: 'text',
  fields: {
    font: Text(),
    size: Size({ defaultValue: 1, defaultUnit: 'em' }),
    color: Color({ defaultValue: { r: 0, g: 0, b: 0, a: 1 } })
  },
  apply(config, { style }) {
    if (config.font) {
      style.fontFamily = config.font
    }
    if (config.size) {
      style.fontSize = config.size
    }
    if (config.color) {
      style.color = config.color
    }
  }
}
