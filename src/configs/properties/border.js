import Size from 'components/fields/Size'
import Select from 'components/fields/Select'
import Color from 'components/fields/Color'

export default  {
  name: 'Border',
  key: 'border',
  available: 'box',
  fields: {
    style: Select({ options: [
      { value: "none" },
      { value: "solid" },
      { value: "dotted" },
      { value: "dashed" },
      { value: "double" }
    ] }),
    width: Size({ defaultValue: 3, defaultUnit: 'px', xUnits: ['%'] }),
    color: Color({ defaultValue: { r: 0, g: 0, b: 0, a: 1 } })
  },
  apply(config, { style }) {
    if (config.style) {
      style.borderStyle = config.style
    }
    if (config.width) {
      style.borderWidth = config.width
    }
    if (config.color) {
      style.borderColor = config.color
    }
  }
}
