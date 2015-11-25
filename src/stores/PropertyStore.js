import {fromJS} from 'immutable'
import Store from './Store'
import PositionPanel from '../components/properties/PositionPanel'

class PropertyStore extends Store {

  constructor() {
    super(fromJS({
      properties: [
        { name: 'Position', panel: PositionPanel }
      ]
    }))
  }

  dispatch(type, data) {
    // @todo
  }
}

export default new PropertyStore
