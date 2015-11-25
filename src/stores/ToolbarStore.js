import {fromJS} from 'immutable'
import Store from './Store'

class ToolbarStore extends Store {

  constructor() {
    super(fromJS({
      tools: [
        { name: 'Rectangle', element: 'div' },
        { name: 'Image', element: 'img' },
        { name: 'Text', element: 'div' }
      ]
    }))
  }

  dispatch(type, data) {
    // @todo
  }
}

export default new ToolbarStore
