import Size from '../fields/Size'
import Select from '../fields/Select'
import Color from '../fields/Color'

export default  {
  name: 'Border',
  key: 'border',
  available: 'box',
  fields: {
    style: Select({ options: [
      { value: "none", preview: { borderStyle: 'none' } },
      { value: "solid", preview: { borderStyle: 'solid' } },
      { value: "dotted", preview: { borderStyle: 'dotted' } },
      { value: "dashed", preview: { borderStyle: 'dashed' } },
      { value: "double", preview: { borderStyle: 'double' } }
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
