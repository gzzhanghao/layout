import Size from 'components/fields/Size'
import Text from 'components/fields/Text'
import Color from 'components/fields/Color'
import Select from 'components/fields/Select'

export default  {
  name: 'Font',
  key: 'font',
  available: 'text',
  fields: {
    font: Text(),
    weight: Select({ options: [
      { value: "normal" },
      { value: "bold" }
    ] }),
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
    if (config.weight) {
      style.fontWeight = config.weight
    }
    if (config.color) {
      style.color = config.color
    }
  }
}
