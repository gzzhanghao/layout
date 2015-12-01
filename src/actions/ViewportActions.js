import Dispatcher from '../Dispatcher'
import LayerUtils from '../utils/LayerUtils'
import ViewportConstants from '../constants/ViewportConstants'

let e = VElement.e

var ViewportActions = {

  initContainer(container) {
    let virtualRoot = LayerUtils.getRoot()
    virtualRoot.appendTo(container)
    Dispatcher.dispatch(ViewportConstants.INIT_VIRTUAL_ROOT, { virtualRoot })
  },

  destructContainer() {
    Dispatcher.dispatch(ViewportConstants.DESTRUCT_VIRTUAL_ROOT)
  }
}

export default ViewportActions
