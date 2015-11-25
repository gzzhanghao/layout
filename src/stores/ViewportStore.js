import {fromJS} from 'immutable'
import Store from './Store'

class ViewportStore extends Store {

  constructor() {
    super(fromJS({
      virtualRoot: null
    }))
  }

  dispatch(type, data) {
    switch (type) {
      case ViewportConstants.INIT_VIRTUAL_ROOT:
        this.setState(this.state.set('virtualRoot', data.get('virtualRoot')))
        break
      case ViewportConstants.DESTRUCT_VIRTUAL_ROOT:
        this.setState(this.state.set('virtualRoot', null))
        break
    }
  }
}

export default new ViewportStore
