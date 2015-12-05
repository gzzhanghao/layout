import Dispatcher from 'Dispatcher'
import PropertyStore from 'stores/PropertyStore'
import PropertyUtils from 'utils/PropertyUtils'

var PropertyActions = {
  initProperties(properties) {
    PropertyUtils.initProperties(properties)
  }
}

export default PropertyActions
