import VElement from 'velement'

let PropertyUtils = {
  initProperties(properties) {
    properties.forEach(property => {
      if (property.has('apply')) {
        VElement.properties[property.get('key')] = property.get('apply')
      }
    })
  }
}

export default PropertyUtils
