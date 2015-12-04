import assign from 'object-assign'
import {Map} from 'immutable'
import VElement from 'velement'
import PropertyStore from '../stores/PropertyStore'

const e = VElement.e
const MAX_RAND_INT = 1 << 20

function getParentOf(path, fromRoot) {
  return path.slice(0, -1).reduce((parent, index) => parent.state.children[index], fromRoot)
}

function stringify(obj) {
  var fns = []
  var placeholder = Date.now() + '____PLACEHOLDER____' + (Math.random() * MAX_RAND_INT | 0)
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'function' || typeof value === 'string') {
      fns.push(value)
      return placeholder
    }
    return value
  }).replace(new RegExp('"' + placeholder + '"', 'g'), () => fns.shift() || '""')
}

function transformProps(properties) {
  return new Function('$', `return ${stringify(properties)}`)
}

function parseProps(properties) {
  let layout = {}
  if (properties.has('layout')) {
    layout = properties.get('layout').toJS()
  }
  Object.keys(layout).forEach(key => {
    layout[key] = transformProps(layout[key])
  })

  return { layout, props: transformProps(properties.remove('layout')) }
}

let symProps = Symbol('props')

let LayerUtils = {

  createVirtualRoot() {
    return new VElement(e('div', { width: 320, height: 640 }))
  },

  createLayer(virtualRoot, path, type) {
    let opts = e(type, {}, {})
    let child = new VElement(opts)

    child[symProps] = Map()

    let parent = getParentOf(path, virtualRoot)
    let children = parent.state.children

    let index = path.last()

    if (children.length > index) {
      parent.element.insertBefore(child.element, children[index].element)
    } else {
      parent.element.appendChild(child.element)
    }

    parent.opts.children.splice(index, 0, opts)
    children.splice(index, 0, child)

    virtualRoot.update()
  },

  createGroup(virtualRoot, path, selectedPaths) {
    let opts = e('div')
    let group = new VElement(opts)

    group[symProps] = Map()

    group.state.children = this.removeLayers(virtualRoot, selectedPaths)
    group.opts.children = group.state.children.map(child => child.opts)
    group.state.children.forEach(child => {
      group.element.appendChild(child.element)
    })

    let index = path.last()
    let parent = getParentOf(path, virtualRoot)
    let children = parent.state.children

    if (children.length > index) {
      parent.element.insertBefore(group.element, children[index].element)
    } else {
      parent.element.appendChild(group.element)
    }

    parent.opts.children.splice(index, 0, opts)
    children.splice(index, 0, group)

    virtualRoot.update()
  },

  moveLayers(virtualRoot, selectedPaths, toPath) {
    // @todo
  },

  removeLayers(virtualRoot, selectedPaths) {
    let removedLayers = selectedPaths.reverse().toArray().map(path => {
      let parent = getParentOf(path, virtualRoot)
      let index = path.last()
      let children = parent.state.children
      parent.element.removeChild(children[index].element)
      parent.opts.children.splice(index, 1)
      return children.splice(index, 1)[0]
    }).reverse()
    virtualRoot.update()
    return removedLayers
  },

  updateProperty(virtualRoot, selectedPaths, property, field, value) {
    selectedPaths.forEach(path => {
      let node = getParentOf(path, virtualRoot).state.children[path.last()]
      node[symProps] = node[symProps].setIn([property, field], value)
      try {
        assign(node.opts, parseProps(node[symProps]))
      } catch (e) {
        // @todo Handle it
        console.warn(e.stack)
      }
    })
    try {
      virtualRoot.update()
    } catch (e) {
      // @todo Handle it
      console.warn(e.stack)
    }
  }
}

export default LayerUtils
