import Dispatcher from '../Dispatcher'
import LayerStore from '../stores/LayerStore'
import LayerConstants from '../constants/LayerConstants'

var LayerActions = {

  createLayer(options) {
    Dispatcher.dispatch(LayerConstants.CREATE_LAYER, { type: options.get('name') })
  },

  removeLayers() {
    Dispatcher.dispatch(LayerConstants.REMOVE_LAYERS)
  },

  selectLayer(path, multi) {
    Dispatcher.dispatch(LayerConstants.SELECT_LAYER, { path, multi })
  }
}

export default LayerActions
