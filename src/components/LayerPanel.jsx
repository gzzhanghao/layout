import React from 'react'
import {List, Range} from 'immutable'
import classNames from 'classnames'
import LayerActions from '../actions/LayerActions'

import '../style/layer.less'

export default class LayerPanel extends React.Component {

  render() {
    let layers = this.props.layers
    let selectedLayers = this.props.selectedLayers
    return (
      <section className="layer-panel">
        <b>Layers</b>
        <button onClick={LayerActions.removeLayers} disabled={!selectedLayers.size}>Remove</button>
        <button onClick={LayerActions.createGroup}>Create Group</button>
        <ol className="layer-list">
          {layers.map((layer, index) => {
            let selected = selectedLayers.contains(index)
            return (
              <li key={index}
                  className={classNames('layer-item', { selected })}
                  style={{ paddingLeft: `${20 * layer.get('level')}px` }}
                  onMouseDown={event => this.onMouseDown(index, selected, event)}
                  onClick={event => this.onClick(index, event)}>
                {layer.get('type')}
              </li>
            )
          })}
        </ol>
      </section>
    )
  }

  onMouseDown(index, selected, event) {
    let multi = event.ctrlKey
    let range = event.shiftKey
    this.volatileLayer = null
    if (range) {
      let start = this.props.selectedLayers.last()
      let rangeSelection = Range(index, start)
      if (!multi) {
        LayerActions.setSelection(rangeSelection.toList().push(start))
      } else {
        LayerActions.addSelection(rangeSelection)
      }
      return
    }
    if (!selected) {
      if (!multi) {
        LayerActions.setSelection(index)
      } else {
        LayerActions.addSelection(index)
      }
      return
    }
    this.volatileLayer = index
  }

  onClick(index, event) {
    let multi = event.ctrlKey
    if (this.volatileLayer !== index) {
      return
    }
    if (multi) {
      LayerActions.removeSelection(index)
    } else {
      LayerActions.setSelection(index)
    }
  }
}
