import {Map, List, fromJS} from 'immutable'
import Store from './Store'
import PropertyStore from '../stores/PropertyStore'
import LayerConstants from '../constants/LayerConstants'

const GROUP_PROTOTYPE = fromJS({ element: 'div', type: ['box', 'group'], name: 'Unnamed Group', properties: {}, hasChildren: true })

class LayerStore extends Store {

  constructor() {
    super(fromJS({ selectedLayers: [], layers: [] }))
  }

  getLayers() {
    return this.state.get('layers')
  }

  getLayerAt(index) {
    return this.state.getIn(['layers', index])
  }

  getPathAt(index) {
    let layers = this.state.get('layers')
    let currentLevel = layers.getIn([index, 'level'])
    let path = new Array(currentLevel + 1).fill(0)
    for (let i = index - 1; i >= 0; i--) {
      let level = layers.getIn([i, 'level'])
      if (level === currentLevel) {
        path[level]++
      } else if (level < currentLevel) {
        currentLevel--
      }
    }
    return List(path)
  }

  getSelectedIndexes() {
    return this.state.get('selectedLayers')
  }

  getSelectedPaths() {
    return this.state.get('selectedLayers').sort().map(this.getPathAt.bind(this))
  }

  getSelectedLayers() {
    let layers = this.state.get('layers')
    return this.state.get('selectedLayers').sort().map(layers.get.bind(layers))
  }

  createLayer(options) {

    let index = 0
    let level = 0

    let firstLayerIndex = this.state.get('selectedLayers').sort().first()
    let layers = this.state.get('layers')

    if (typeof firstLayerIndex !== 'undefined') {

      let firstLayer = layers.get(firstLayerIndex)

      index = firstLayerIndex
      level = firstLayer.get('level')

      if (firstLayer.get('hasChildren')) {
        level += 1
        index += 1
      }
    }

    layers = layers.splice(index, 0, Map(options).set('level', level))
    this.setState(this.state.merge({ layers, selectedLayers: List([index]) }))
  }

  createGroup() {

    let firstLayerIndex = this.state.get('selectedLayers').sort().first()

    let baseLevel = 1
    if (typeof firstLayerIndex !== 'undefined') {
      baseLevel = this.state.getIn(['layers', firstLayerIndex, 'level']) + 1
    }

    let group = GROUP_PROTOTYPE.set('level', baseLevel - 1)

    let children = this.removeLayers().map(layer => (
      layer.update('level', level => level + baseLevel)
    ))

    firstLayerIndex = firstLayerIndex || 0

    let layers = this.state.get('layers')
    layers = layers.slice(0, firstLayerIndex).concat([group], children, layers.slice(firstLayerIndex))

    this.setState(this.state.merge({ layers, selectedLayers: List([firstLayerIndex]) }))
  }

  moveLayers(path) {
    // @todo
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
      removedLayers = layers.splice(index, i - index).map(layer => (
        layer.update('level', level => level - baseLevel)
      )).concat(removedLayers)
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

  updateProperty(property, field, value) {
    let available = PropertyStore.getProperty(property).get('available')
    this.setState(this.state.update('layers', layers => (
      layers.withMutations(layers => {
        this.state.get('selectedLayers').forEach(index => {
          if (layers.getIn([index, 'type']).contains(available)) {
            layers.update(index, layer => layer.setIn(['properties', property, field], value))
          }
        })
      })
    )))
  }

  addSelection(index) {
    if (typeof index === 'number') {
      index = [index]
    }
    this.setState(this.state.update('selectedLayers', selectedLayers => (
      selectedLayers.withMutations(selectedLayers => {
        index.forEach(index => {
          if (!selectedLayers.contains(index)) {
            selectedLayers.push(index)
          }
        })
      })
    )))
  }

  setSelection(index) {
    if (typeof index === 'number') {
      index = [index]
    }
    this.setState(this.state.set('selectedLayers', List(index)))
  }

  clearSelection() {
    this.setState(this.state.set('selectedLayers', List()))
  }

  removeSelection(index) {
    if (typeof index === 'number') {
      index = [index]
    }
    this.setState(this.state.update('selectedLayers', selectedLayers => (
      selectedLayers.filter(idx => index.indexOf(idx) < 0)
    )))
  }

  dispatch(type, data) {
    switch (type) {
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
        this.updateProperty(data.property, data.field, data.value)
        break
      case LayerConstants.ADD_SELECTION:
        this.addSelection(data.index)
        break
      case LayerConstants.SET_SELECTION:
        this.setSelection(data.index)
        break
      case LayerConstants.CLEAR_SELECTION:
        this.clearSelection()
        break
      case LayerConstants.REMOVE_SELECTION:
        this.removeSelection(data.index)
        break
    }
  }
}

export default new LayerStore
