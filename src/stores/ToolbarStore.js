import {fromJS} from 'immutable'
import Store from './Store'

class ToolbarStore extends Store {

  constructor() {
    super(fromJS({
      tools: [
        { name: 'Rectangle' },
        { name: 'Image' },
        { name: 'Text' }
      ]
    }))
  }

  dispatch(type, data) {
    // @todo
  }
}

export default new ToolbarStore
