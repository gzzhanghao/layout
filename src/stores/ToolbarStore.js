import {fromJS} from 'immutable'
import Store from './Store'

import tools from 'configs/tools'

class ToolbarStore extends Store {

  constructor() {
    super(fromJS({ tools }))
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
