import {Map, List, fromJS} from 'immutable'
import Store from './Store'
import LayerConstants from '../constants/LayerConstants'

class LayerStore extends Store {

  constructor() {
    super(fromJS({
      selectedLayers: [],
      layers: []
    }))
  }

  getSelectedPath() {
    let path = []
    let layers = this.state.get('layers')
    let target = Math.min(layers.size - 1, this.state.get('selectedLayers').sort().first() || 0)
    for (let i = 0; i <= target; i++) {
      let level = layers.getIn([i, 'level'])
      path[level] = i - (path[level - 1] || 0)
    }
    return List(path)
  }

  getSelectedLayers() {
    let layers = this.state.get('layers')
    return this.state.get('selectedLayers').map(index => layers.get(index))
  }

  createLayer(options) {
    let layers = this.state.get('layers')
    let selectedLayerIndex = this.state.get('selectedLayers').sort().first()

    let index = 0
    let level = 0

    if (typeof selectedLayerIndex !== 'undefined') {
      let selectedLayer = layers.get(selectedLayerIndex)
      index = selectedLayerIndex
      level = selectedLayer.get('level')
      if (selectedLayer.get('hasChildren')) {
        level += 1
        index += 1
      }
    }
    this.setState(this.state.merge({
      layers: layers.splice(index, 0, Map({ level, type: options.type, element: options.element, properties: Map() })),
      selectedLayers: List([index])
    }))
  }

  addSelection(index) {
    if (typeof index === 'number') {
      let selectedLayers = this.state.get('selectedLayers')
      if (!selectedLayers.contains(index)) {
        this.setState(this.state.set('selectedLayers', selectedLayers.push(index)))
      }
      return
    }
    this.setState(this.state.update('selectedLayers', selectedLayers =>
      selectedLayers.withMutations(selectedLayers => {
        index.forEach(index => {
          if (!selectedLayers.contains(index)) {
            selectedLayers.push(index)
          }
        })
      })
    ))
  }

  setSelection(index) {
    if (typeof index === 'number') {
      index = List([index])
    }
    this.setState(this.state.set('selectedLayers', index))
  }

  clearSelection() {
    this.setState(this.state.set('selectedLayers', List()))
  }

  removeSelection(index) {
    if (typeof index === 'number') {
      this.setState(this.state.update('selectedLayers', selectedLayers => selectedLayers.remove(selectedLayers.indexOf(index))))
      return
    }
    this.setState(this.state.update('selectedLayers', selectedLayers => {
      index.forEach(index => {
        selectedLayers = selectedLayers.remove(selectedLayers.indexOf(index))
      })
    }))
  }

  removeLayers() {
    let selectedLayers = this.state.get('selectedLayers').sort((a, b) => b - a)
    let selectedLayerIndex = selectedLayers.last()
    let layers = this.state.get('layers').toArray()
    let layersSize = layers.length
    let removedLayers = []

    selectedLayers.forEach(index => {
      let layer = layers[index]
      let baseLevel = layer.get('level')
      let i = index + 1
      while (i < layersSize && layers[i].get('level') > baseLevel) i += 1
      removedLayers = layers.splice(index, i - index).map(layer =>
          layer.update('level', level => level - baseLevel)
      ).concat(removedLayers)
      layersSize = layers.length
    })

    selectedLayers = List()
    if (layersSize > selectedLayerIndex) {
      selectedLayers = List([selectedLayerIndex])
    } else if (layersSize) {
      selectedLayers = List([layersSize - 1])
    }
    this.setState(this.state.merge({ layers: List(layers), selectedLayers }))

    return List(removedLayers)
  }

  moveLayers(path) {
    // @todo
  }

  createGroup() {
    let selectedLayerIndex = this.state.get('selectedLayers').sort((a, b) => b - a).last()
    if (typeof selectedLayerIndex === 'undefined') {
      this.setState(this.state.merge({
        layers: this.state.get('layers').unshift(Map({
          level: 0, type: 'Group', properties: Map(), hasChildren: true
        })),
        selectedLayers: List([0])
      }))
      return
    }
    let baseLevel = this.state.getIn(['layers', selectedLayerIndex, 'level']) + 1
    let children = this.removeLayers().map(layer =>
      layer.update('level', level => level + baseLevel)
    ).unshift(Map({
      level: baseLevel - 1, type: 'Group', properties: Map(), hasChildren: true
    }))
    let layers = this.state.get('layers')
    this.setState(this.state.merge({
      layers: layers.slice(0, selectedLayerIndex).concat(children, layers.slice(selectedLayerIndex)),
      selectedLayers: List([selectedLayerIndex])
    }))
  }

  updateProperties(name, properties) {
    let layers = this.state.get('layers')

    this.state.get('selectedLayers').forEach(index => {
      layers = layers.updateIn([index, 'properties', name], state => (state || Map()).merge(properties))
    })

    this.setState(this.state.set('layers', layers))
  }

  dispatch(type, data) {
    switch (type) {
      case LayerConstants.ADD_SELECTION:
        this.addSelection(data.index)
        break
      case LayerConstants.SET_SELECTION:
        this.setSelection(data.index)
        break
      case LayerConstants.REMOVE_SELECTION:
        this.removeSelection(data.index)
        break
      case LayerConstants.CLEAR_SELECTION:
        this.clearSelection()
        break
      case LayerConstants.CREATE_LAYER:
        this.createLayer(data)
        break
      case LayerConstants.CREATE_GROUP:
        this.createGroup()
        break
      case LayerConstants.MOVE_LAYERS:
        this.moveLayers(data.path)
        break
      case LayerConstants.REMOVE_LAYERS:
        this.removeLayers()
        break
      case LayerConstants.UPDATE_PROPERTIES:
        this.updateProperties(data.name, data.properties)
        break
    }
  }
}

export default new LayerStore
