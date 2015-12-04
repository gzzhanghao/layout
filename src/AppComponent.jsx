import React from 'react'
import {List, Map, fromJS} from 'immutable'
import assign from 'object-assign'
import EventEmitter from 'events'

import ToolbarStore from './stores/ToolbarStore'
import LayerStore from './stores/LayerStore'
import PropertyStore from './stores/PropertyStore'

import Toolbar from './components/Toolbar'
import LayerPanel from './components/LayerPanel'
import PropertyPanel from './components/PropertyPanel'
import ViewportComponent from './components/ViewportComponent'

import PropertyActions from './actions/PropertyActions'

export default class AppComponent extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {}

    this.watch(ToolbarStore, store => ({
      tools: store.getTools()
    }))

    this.watch(LayerStore, store => ({
      layers: store.getLayers(),
      selectedIndexes: store.getSelectedIndexes(),
      selectedLayers: store.getSelectedLayers()
    }))

    this.watch(PropertyStore, store => ({
      properties: store.getProperties()
    }))

    PropertyActions.initProperties(PropertyStore.getProperties())
  }

  render() {
    return (
      <div className="app">
        <Toolbar tools={this.state.tools}/>
        <aside className="panels">
          <PropertyPanel properties={this.state.properties} selectedLayers={this.state.selectedLayers}/>
          <LayerPanel layers={this.state.layers} selectedLayers={this.state.selectedIndexes}/>
        </aside>
        <ViewportComponent />
      </div>
    )
  }

  watch(store, properties) {
    assign(this.state, properties(store))
    store.onChange(() => this.setState(properties(store)))
  }
}
