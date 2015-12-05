import {fromJS} from 'immutable'
import Store from './Store'
import ViewportConstants from 'constants/ViewportConstants'

class ViewportStore extends Store {

  constructor() {
    super(fromJS({ virtualRoot: null }))
  }

  getVirtualRoot() {
    return this.state.get('virtualRoot')
  }

  dispatch(type, data) {
    switch (type) {
      case ViewportConstants.INIT_VIRTUAL_ROOT:
        this.setState(this.state.set('virtualRoot', data.virtualRoot))
        break
      case ViewportConstants.DESTRUCT_VIRTUAL_ROOT:
        this.setState(this.state.set('virtualRoot', null))
        break
    }
  }
}

export default new ViewportStore
