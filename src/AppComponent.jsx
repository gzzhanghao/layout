import React from 'react'
import {List, Map, fromJS} from 'immutable'
import EventEmitter from 'events'

import ToolbarStore from './stores/ToolbarStore'
import LayerStore from './stores/LayerStore'
import PropertyStore from './stores/PropertyStore'

import ToolbarPanel from './components/ToolbarPanel'
import LayerPanel from './components/LayerPanel'
import PropertyPanel from './components/PropertyPanel'
import ViewportComponent from './components/ViewportComponent'

export default class AppComponent extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      toolbar: ToolbarStore.getState(),
      layer: LayerStore.getState(),
      property: PropertyStore.getState()
    }

    ToolbarStore.onChange(() => this.setState({ toolbar: ToolbarStore.getState() }))
    LayerStore.onChange(() => this.setState({ layer: LayerStore.getState() }))
    PropertyStore.onChange(() => this.setState({ property: PropertyStore.getState() }))
  }

  render() {
    return (
      <div className="app">
        <ToolbarPanel state={this.state.toolbar}/>
        <LayerPanel state={this.state.layer}/>
        <PropertyPanel state={this.state.property}/>
        <ViewportComponent />
      </div>
    )
  }
}
