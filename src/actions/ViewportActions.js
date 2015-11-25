import {Map} from 'immutable'
import Dispatcher from '../Dispatcher'
import ViewportConstants from '../constants/ViewportConstants'

var ViewportActions = {
  emitFrame() {
    Dispatcher.dispatch(ViewportConstants.EMIT_FRAME)
    // @todo trigger update event
  },
  initContainer(container) {
    // @todo create virtual root
    var virtualRoot = document.createElement('virtual-root')
    virtualRoot.innerText = 'place virtual root here'
    container.appendChild(virtualRoot)

    Dispatcher.dispatch(ViewportConstants.INIT_VIRTUAL_ROOT, Map({ virtualRoot }))
  },
  destructContainer() {
    Dispatcher.dispatch(ViewportConstants.DESTRUCT_VIRTUAL_ROOT)
  }
}

export default ViewportActions
