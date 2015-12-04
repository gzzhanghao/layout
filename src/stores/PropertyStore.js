import {fromJS} from 'immutable'
import Store from './Store'

import properties from '../configs/properties'

class PropertyStore extends Store {

  constructor() {
    super(fromJS({ properties }))
  }

  getProperties() {
    return this.state.get('properties')
  }

  getProperty(key) {
    return this.state.get('properties').find(property => property.get('key') === key)
  }

  dispatch(type, data) {
    // @todo
  }
}

export default new PropertyStore
