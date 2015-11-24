import {fromJS} from 'immutable'
import Store from './Store'
import PropPositionPanel from '../components/PropPositionPanel'

class PropertyStore extends Store {

  constructor() {
    super(fromJS({
      properties: [
        { name: 'Position', panel: PropPositionPanel }
      ]
    }))
  }

  dispatch(type, data) {
    // @todo
  }
}

export default new PropertyStore
