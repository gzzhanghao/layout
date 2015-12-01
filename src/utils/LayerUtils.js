import {Map} from 'immutable'
import VElement from 'velement'

let e = VElement.e

let virtualRoot = new VElement(e('div', {}, { className: 'root' }))

function build(layer) {

  let properties = layer.get('properties') || Map()
  let layout = properties.get('layout') || Map()
  let children = layer.get('children')

  return `e(
    ${JSON.stringify(layer.get('type'))}, {
      ${layout.map((val, key) => (
        `${key}: function($) { return ${normalize(val)} }`
      )).join(',')}
    },
    function($) {
      return {
        ${properties.remove('layout').map((props, name) => (
          `${JSON.stringify(name)}: {
            ${props.map((val, key) => `${JSON.stringify(key)}: ${normalize(val)}`).join(',')}
          }`
        )).join(',')}
      }
    },
    ${!children ? 'null' : `[
      ${children.map(build).join(',')}
    ]`},
    ${JSON.stringify(layer.get('key') || null)},
    ${JSON.stringify(layer.get('namespace') || null)}
  )`
}

function normalize(val) {
  //try {
  //  new Function('', val)
  //} catch (e) {
  //  return `${JSON.stringify(val)}`
  //}
  return val
}

let LayerUtils = {

  createLayer(virtualRoot, targetIndex, type) {
    let parent = virtualRoot
    targetIndex.slice(0, -1).forEach(index => {
      parent = parent.state.children[index]
    })
    let index = targetIndex.last()
    let child = new VElement(e(type))
    if (parent.state.children.length > index) {
      parent.element.insertBefore(child.element, parent.element.children[index])
    } else {
      parent.element.appendChild(child.element)
    }
    parent.state.children.splice(index, 0, child)
  },

  getRoot() {
    return virtualRoot
  },

  update(layers) {
    try {
      virtualRoot.update(this.getOptions(layers))
    } catch (e) {
      console.warn('Error when updating', e.stack)
    }
  },

  getOptions(layers) {
    return new Function('e', `return ${build(Map({ name: 'div', children: layers }))}`).call(null, e)
  }
}

export default LayerUtils
