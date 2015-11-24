import LayerComponent from './LayerItem'
import LayerList from './LayerList'

export default function LayerPanel(props) {
  var state = props.state;
  return (
    <section className="layer-panel">
      <b>Layers</b>
      <LayerList layers={state.get('layers')}/>
    </section>
  )
}
