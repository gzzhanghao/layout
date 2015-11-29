import React from 'react'
import {List, Map, fromJS} from 'immutable'
import EventEmitter from 'events'

import ToolbarStore from './stores/ToolbarStore'
import LayerStore from './stores/LayerStore'
import PropertyStore from './stores/PropertyStore'

import Toolbar from './components/Toolbar'
import LayerPanel from './components/LayerPanel'
import PropertyPanel from './components/PropertyPanel'
import ViewportComponent from './components/ViewportComponent'

export default class AppComponent extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      tools: ToolbarStore.getState().get('tools'),
      properties: PropertyStore.getState().get('properties'),
      layers: LayerStore.getState().get('layers'),
      selectedLayerIndexes: LayerStore.getState().get('selectedLayers'),
      selectedLayers: LayerStore.getSelectedLayers()
    }

    ToolbarStore.onChange(() => this.setState({
      tools: ToolbarStore.getState().get('tools')
    }))

    LayerStore.onChange(() => this.setState({
      layers: LayerStore.getState().get('layers'),
      selectedLayerIndexes: LayerStore.getState().get('selectedLayers'),
      selectedLayers: LayerStore.getSelectedLayers()
    }))

    PropertyStore.onChange(() => this.setState({
      properties: PropertyStore.getState().get('properties')
    }))
  }

  render() {
    return (
      <div className="app">
        <Toolbar tools={this.state.tools}/>
        <LayerPanel layers={this.state.layers} selectedLayers={this.state.selectedLayerIndexes}/>
        <PropertyPanel properties={this.state.properties} selectedLayers={this.state.selectedLayers}/>
        <ViewportComponent />
      </div>
    )
  }
}
