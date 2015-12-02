import {List} from 'immutable'
import Dispatcher from '../Dispatcher'
import ViewportStore from '../stores/ViewportStore'
import LayerUtils from '../utils/LayerUtils'
import LayerStore from '../stores/LayerStore'
import ToolbarStore from '../stores/ToolbarStore'
import LayerConstants from '../constants/LayerConstants'

var LayerActions = {

  createLayer(key) {
    let options = ToolbarStore.getTool(key)
    let element = options.get('element')
    let properties = options.get('properties')

    let index = LayerStore.getSelectedIndexes().sort().first()
    let path = List([0])

    if (typeof index !== 'undefined') {
      path = LayerStore.getPathAt(index)
      if (LayerStore.getLayerAt(index).get('hasChildren')) {
        path = path.push(0)
      }
    }

    LayerUtils.createLayer(
      ViewportStore.getVirtualRoot(),
      path, element, properties
    )

    Dispatcher.dispatch(LayerConstants.CREATE_LAYER, {
      type: key, element, properties,
      name: `Unnamed ${options.get('name')}`
    })
  },

  createGroup() {
    LayerUtils.createGroup(
      ViewportStore.getVirtualRoot(),
      LayerStore.getSelectedPaths()
    )
    Dispatcher.dispatch(LayerConstants.CREATE_GROUP)
  },

  moveLayers(toIndex) {
    LayerUtils.moveLayers(
      ViewportStore.getVirtualRoot(),
      LayerStore.getSelectedPaths(),
      LayerStore.getPathAt(toIndex)
    )
    Dispatcher.dispatch(LayerConstants.MOVE_LAYERS, { toIndex })
  },

  removeLayers() {
    LayerUtils.removeLayers(
      ViewportStore.getVirtualRoot(),
      LayerStore.getSelectedPaths()
    )
    Dispatcher.dispatch(LayerConstants.REMOVE_LAYERS)
  },

  updateProperties(name, properties) {
    LayerUtils.updateProperties(
      ViewportStore.getVirtualRoot(),
      LayerStore.getSelectedPaths(),
      name, properties
    )
    Dispatcher.dispatch(LayerConstants.UPDATE_PROPERTIES, { name, properties })
  },

  addSelection(index) {
    Dispatcher.dispatch(LayerConstants.ADD_SELECTION, { index })
  },
  removeSelection(index) {
    Dispatcher.dispatch(LayerConstants.REMOVE_SELECTION, { index })
  },

  setSelection(index) {
    Dispatcher.dispatch(LayerConstants.SET_SELECTION, { index })
  },

  clearSelection() {
    Dispatcher.dispatch(LayerConstants.CLEAR_SELECTION)
  }
}

export default LayerActions
