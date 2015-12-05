import {Map, List} from 'immutable'
import Dispatcher from 'Dispatcher'
import ViewportStore from 'stores/ViewportStore'
import LayerUtils from 'utils/LayerUtils'
import LayerStore from 'stores/LayerStore'
import ToolbarStore from 'stores/ToolbarStore'
import PropertyStore from 'stores/PropertyStore'
import LayerConstants from 'constants/LayerConstants'

var LayerActions = {

  createLayer(toolIndex) {
    let tool = ToolbarStore.getTool(toolIndex)
    let element = tool.get('element')

    let selectedIndex = LayerStore.getSelectedIndexes().sort().first()
    let selectedPath = List([0])

    if (typeof selectedIndex !== 'undefined') {
      selectedPath = LayerStore.getPathAt(selectedIndex)
      if (LayerStore.getLayerAt(selectedIndex).get('hasChildren')) {
        selectedPath = selectedPath.push(0)
      }
    }

    LayerUtils.createLayer(
      ViewportStore.getVirtualRoot(),
      selectedPath, element
    )

    Dispatcher.dispatch(LayerConstants.CREATE_LAYER, {
      name: `Unnamed ${tool.get('name')}`,
      type: tool.get('type'), element
    })
  },

  createGroup() {
    let path = LayerStore.getSelectedPaths().first()
    if (typeof path === 'undefined') {
      path = List([0])
    }
    LayerUtils.createGroup(
      ViewportStore.getVirtualRoot(),
      path, LayerStore.getSelectedPaths()
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

  updateProperty(property, field, value, realValue) {
    let selectedLayers = LayerStore.getSelectedLayers()
    let available = PropertyStore.getProperty(property).get('available')

    LayerUtils.updateProperty(
      ViewportStore.getVirtualRoot(),
      LayerStore.getSelectedPaths().filter((path, index) => (
        selectedLayers.getIn([index, 'type']).contains(available)
      )),
      property, field, realValue
    )

    Dispatcher.dispatch(LayerConstants.UPDATE_PROPERTIES, { property, field, value })
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
