import {Map, List, fromJS} from 'immutable'
import Store from './Store'
import LayerConstants from '../constants/LayerConstants'

class LayerStore extends Store {

  constructor() {
    super(fromJS({
      activeLayers: [[0]],
      layers: [
        { id: 0, type: 'Rectangle' },
        { id: 1, type: 'Group', children: [
          { id: 2, type: 'Image' },
          { id: 3, type: 'Text', name: 'Helloworld' }
        ] }
      ]
    }))
    this.layerId = 4
  }

  getActiveLayers() {
    return this.state.get('activeLayers').map(path => this.getLayer(path))
  }

  getLayer(path) {
    return this.state.getIn(this.getFullPath(path).unshift('layers'))
  }

  getFullPath(path) {
    return path.interpose('children')
  }

  createLayer(options) {
    let layer = Map({ id: this.layerId++, type: options.type })
    let activeLayerPath = this.state.get('activeLayers').last()
    let activeLayer = this.getLayer(activeLayerPath)
    let layers = this.state.get('layers')
    if (activeLayer.has('children')) {
      layers = layers.updateIn(this.getFullPath(activeLayerPath).push('children'), children => children.unshift(layer))
      activeLayerPath = activeLayerPath.push(0)
    } else {
      let index = activeLayerPath.last()
      layers = layers.updateIn(this.getFullPath(activeLayerPath).pop(), children => children.splice(index, 0, layer))
    }
    this.setState(this.state.merge({ layers, activeLayers: List([activeLayerPath]) }))
  }

  selectLayer(path, multi) {
    let activeLayers = this.state.get('activeLayers')
    if (!multi) {
      activeLayers = List()
    }
    path = List(path.slice().reverse())
    let newActiveLayers = activeLayers.filter(activePath => !path.equals(activePath))
    if (newActiveLayers.size < activeLayers.size && newActiveLayers.size > 0) {
      this.setState(this.state.set('activeLayers', newActiveLayers))
    } else {
      this.setState(this.state.set('activeLayers', activeLayers.push(path)))
    }
  }

  removeLayers() {
    // @todo
  }

  dispatch(type, data) {
    switch (type) {
      case LayerConstants.REMOVE_LAYERS:
        this.removeLayers()
        break
      case LayerConstants.SELECT_LAYER:
        this.selectLayer(data.path, data.multi)
        break
      case LayerConstants.CREATE_LAYER:
        this.createLayer(data)
        break
    }
  }
}

export default new LayerStore
