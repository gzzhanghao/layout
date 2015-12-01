import {fromJS} from 'immutable'
import Store from './Store'

import PositionPanel from '../components/properties/PositionPanel'
import BackgroundPanel from '../components/properties/BackgroundPanel'

class PropertyStore extends Store {

  constructor() {
    super(fromJS({
      properties: [
        { name: 'Position', key: 'layout', panel: PositionPanel, available: /.+/ },
        { name: 'Background', key: 'background', panel: BackgroundPanel, available: /.+/ }
      ]
    }))
  }

  dispatch(type, data) {
    // @todo
  }
}

export default new PropertyStore
