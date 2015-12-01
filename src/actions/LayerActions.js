import Dispatcher from '../Dispatcher'
import ViewportStore from '../stores/ViewportStore'
import LayerUtils from '../utils/LayerUtils'
import LayerStore from '../stores/LayerStore'
import LayerConstants from '../constants/LayerConstants'

var LayerActions = {

  createLayer(options) {
    LayerUtils.createLayer(
      ViewportStore.getState().get('virtualRoot'),
      LayerStore.getSelectedPath(),
      options.get('element')
    )
    Dispatcher.dispatch(LayerConstants.CREATE_LAYER, { type: options.get('name'), element: options.get('element') })
  },

  createGroup() {
    Dispatcher.dispatch(LayerConstants.CREATE_GROUP)
  },

  moveLayers(toIndex) {
    Dispatcher.dispatch(LayerConstants.MOVE_LAYERS, { toIndex })
  },

  removeLayers() {
    Dispatcher.dispatch(LayerConstants.REMOVE_LAYERS)
  },

  updateProperties(name, properties) {
    Dispatcher.dispatch(LayerConstants.UPDATE_PROPERTIES, { name, properties })
    LayerUtils.update(LayerStore.getState().get('layers'))
  },

  addSelection(index) {
    Dispatcher.dispatch(LayerConstants.ADD_SELECTION, { index })
  },

  setSelection(index) {
    Dispatcher.dispatch(LayerConstants.SET_SELECTION, { index })
  },

  removeSelection(index) {
    Dispatcher.dispatch(LayerConstants.REMOVE_SELECTION, { index })
  },

  clearSelection() {
    Dispatcher.dispatch(LayerConstants.CLEAR_SELECTION)
  }
}

export default LayerActions
