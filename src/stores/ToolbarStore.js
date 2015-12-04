import {fromJS} from 'immutable'
import Store from './Store'

class ToolbarStore extends Store {

  constructor() {
    super(fromJS({
      tools: {
        image: { name: 'Image', type: ['box', 'image'], element: 'img' },
        text: { name: 'Text', type: ['box', 'text'], element: 'div' },
        rect: { name: 'Rectangle', type: ['box'], element: 'div' }
      }
    }))
  }

  getTools() {
    return this.state.get('tools')
  }

  getTool(key) {
    return this.state.getIn(['tools', key])
  }

  dispatch(type, data) {
    // @todo
  }
}

export default new ToolbarStore
