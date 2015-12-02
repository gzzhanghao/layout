import {fromJS} from 'immutable'
import Store from './Store'

class ToolbarStore extends Store {

  constructor() {
    super(fromJS({
      tools: {
        rectangle: { name: 'Rectangle', element: 'div', properties: { layout: { width: 300, height: 300 }, border: { color: '"black"', width: 1 } } },
        image: { name: 'Image', element: 'img', properties: { layout: { width: 300, height: 300 } } },
        text: { name: 'Text', element: 'div', properties: { content: { text: '"Lorem ipsum..."' } } }
      }
    }))
  }

  getTool(key) {
    return this.state.getIn(['tools', key])
  }

  dispatch(type, data) {
    // @todo
  }
}

export default new ToolbarStore
