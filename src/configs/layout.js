import Size from '../fields/Size'

export default {
  name: 'Layout',
  key: 'layout',
  available: 'box',
  fields: {
    top: Size({ defaultValue: 0, transform: value => parseFloat(value) || 0, units: ['px'] }),
    left: Size({ defaultValue: 0, transform: value => parseFloat(value) || 0, units: ['px'] }),
    width: Size({ transform: value => parseFloat(value), units: ['px'] }),
    height: Size({ transform: value => parseFloat(value), units: ['px'] })
  }
}
