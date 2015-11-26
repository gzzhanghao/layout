import Dispatcher from '../Dispatcher'
import LayerStore from '../stores/LayerStore'
import LayerConstants from '../constants/LayerConstants'

var LayerActions = {

  createLayer(options) {
    Dispatcher.dispatch(LayerConstants.CREATE_LAYER, { type: options.get('name') })
  },

  createGroup() {
    Dispatcher.dispatch(LayerConstants.CREATE_GROUP)
  },

  moveLayers(path) {
    Dispatcher.dispatch(LayerConstants.MOVE_LAYERS, { path })
  },

  removeLayers() {
    Dispatcher.dispatch(LayerConstants.REMOVE_LAYERS)
  },

  selectLayer(path, multi, range) {
    Dispatcher.dispatch(LayerConstants.SELECT_LAYER, { path, multi, range })
  }
}

export default LayerActions
