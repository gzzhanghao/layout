import {fromJS} from 'immutable'
import Store from './Store'

class LayerStore extends Store {

  constructor() {
    super(fromJS({
      layers: [
        { id: '0', type: 'Rectangle', children: [] },
        { id: '1', type: 'Rectangle', children: [
          { id: '1.1', type: 'Image', children: [] },
          { id: '1.2', type: 'Text', name: 'Helloworld', children: [] }
        ] }
      ]
    }))
  }

  dispatch(type, data) {
    // @todo
  }
}

export default new LayerStore
