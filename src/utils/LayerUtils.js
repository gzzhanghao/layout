import assign from 'object-assign'
import {Map} from 'immutable'
import VElement from 'velement'

let e = VElement.e

assign(VElement.properties, {

  border(config, { style }) {
    if (isFinite(config.width) && !Number.isNaN(parseFloat(config.width))) {
      style.borderWidth = config.width + 'px'
    }
    if (config.style) {
      style.borderStyle = config.style
    }
    if (config.color) {
      style.borderColor = config.color
    }
  },

  background(config, { style }) {
    if (config.color) {
      style.backgroundColor = config.color
    } else if (config.image) {
      style.backgroundImage = config.image
    }
  },

  source(config, { prop }) {
    prop.src = config.source
  }
})

function getParentOf(path, fromRoot) {
  return path.slice(0, -1).reduce((parent, index) => parent.state.children[index], fromRoot)
}

function stringify(obj) {
  var fns = []
  var placeholder = Date.now() + '____PLACEHOLDER____' + (Math.random() * Number.MAX_SAFE_INTEGER | 0)
  var json = JSON.stringify(obj, (key, value) => {
    if (typeof value === 'function' || typeof value === 'string') {
      fns.push(value)
      return placeholder
    }
    return value
  })
  return json.replace(new RegExp('"' + placeholder + '"', 'g'), () => fns.shift() || '""')
}

function wrap(properties) {
  return new Function('$', `return ${stringify(properties)}`)
}

function wrapProperties(properties) {
  let layout = {}
  if (properties.has('layout')) {
    layout = properties.get('layout').toJS()
  }
  Object.keys(layout).forEach(key => {
    layout[key] = wrap(layout[key])
  })

  return { layout, props: wrap(properties.remove('layout').toJS()) }
}

let symProps = Symbol('props')

let LayerUtils = {

  createVirtualRoot() {
    return new VElement(e('div', { width: 768 }, { className: 'root' }))
  },

  createLayer(virtualRoot, path, type, properties) {
    let { layout, props } = wrapProperties(properties)
    let opts = e(type, layout, props)
    let child = new VElement(opts)

    child[symProps] = properties

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

  createGroup(virtualRoot, selectedPaths) {
    let opts = e('div')
    let group = new VElement(opts)

    group[symProps] = Map()

    group.state.children = this.removeLayers(virtualRoot, selectedPaths)
    group.opts.children = group.state.children.map(child => child.opts)
    group.state.children.forEach(child => {
      group.element.appendChild(child.element)
    })

    let path = selectedPaths.first()
    let parent = getParentOf(path, virtualRoot)
    let index = path.last()
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

  updateProperties(virtualRoot, selectedPaths, name, properties) {
    selectedPaths.forEach(path => {
      let node = getParentOf(path, virtualRoot).state.children[path.last()]
      try {
        assign(node.opts, wrapProperties(node[symProps] = node[symProps].mergeIn([name], properties)))
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
