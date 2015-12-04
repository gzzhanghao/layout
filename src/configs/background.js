import Color from '../fields/Color'

export default  {
  name: 'Background',
  key: 'background',
  available: 'box',
  fields: {
    color: Color({ defaultValue: { r: 0, g: 0, b: 0, a: 0 } })
  },
  apply(config, { style }) {
    if (config.color) {
      style.backgroundColor = config.color
    }
  }
}
