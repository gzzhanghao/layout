import {Map, List, fromJS} from 'immutable'
import Store from './Store'
import LayerConstants from '../constants/LayerConstants'

class LayerStore extends Store {

  constructor() {
    super(fromJS({
      activeLayers: [],
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

  getFirstActivePath() {
    return this.state.get('activeLayers').sort((a, b) => a.join('/') > b.join('/')).first()
  }

  getLastActivePath() {
    return this.state.get('activeLayers').last()
  }

  getActiveLayers() {
    let activeLayers = this.state.get('activeLayers')
    if (activeLayers) {
      return activeLayers.map(path => this.getLayer(path))
    }
    return List()
  }

  getLayer(path) {
    return this.state.getIn(this.getFullPath(path).unshift('layers'))
  }

  getFullPath(path) {
    return path.interpose('children')
  }

  createLayer(options) {
    let layer = Map({ id: this.layerId++, type: options.type })
    let layers = this.state.get('layers')
    let firstLayerPath = this.getFirstActivePath()
    if (!firstLayerPath) {
      layers = layers.unshift(layer)
      firstLayerPath = List([0])
    } else if (this.getLayer(firstLayerPath).has('children')) {
      layers = layers.updateIn(this.getFullPath(firstLayerPath).push('children'), children => children.unshift(layer))
      firstLayerPath = firstLayerPath.push(0)
    } else {
      let index = firstLayerPath.last()
      layers = layers.updateIn(this.getFullPath(firstLayerPath).pop(), children => children.splice(index, 0, layer))
    }
    this.setState(this.state.merge({ layers, activeLayers: List([firstLayerPath]) }))
  }

  selectLayer(path, multi, range) {
    let activeLayers = this.state.get('activeLayers')
    if (!multi) {
      activeLayers = List()
    }
    if (range) {
      // @todo
    }
    this.getLastActivePath()
    path = List(path.slice().reverse())
    let newActiveLayers = activeLayers.filter(activePath => !path.equals(activePath))
    if (newActiveLayers.size === activeLayers.size || newActiveLayers.size < 1) {
      newActiveLayers = newActiveLayers.push(path)
    }
    this.setState(this.state.set('activeLayers', newActiveLayers))
  }

  removeLayers() {
    let layers = this.state.get('layers')
    this.state.get('activeLayers').sort((a, b) => a.join('/') < b.join('/')).forEach(activeLayerPath => {
      if (activeLayerPath.size === 1) {
        layers = layers.remove(activeLayerPath.get(0))
        return
      }
      layers = layers.updateIn(
        this.getFullPath(activeLayerPath.pop()).push('children'),
        children => children.remove(activeLayerPath.last())
      )
    })
    this.setState(this.state.merge({ layers, activeLayers: List() }))
  }

  moveLayers(path) {
    // @todo
  }

  createGroup() {
    // @todo
  }

  dispatch(type, data) {
    switch (type) {
      case LayerConstants.REMOVE_LAYERS:
        this.removeLayers()
        break
      case LayerConstants.SELECT_LAYER:
        this.selectLayer(data.path, data.multi, data.range)
        break
      case LayerConstants.CREATE_LAYER:
        this.createLayer(data)
        break
      case LayerConstants.MOVE_LAYERS:
        this.moveLayers(data.path)
        break
      case LayerConstants.CREATE_GROUP:
        this.createGroup()
        break
    }
  }
}

export default new LayerStore
