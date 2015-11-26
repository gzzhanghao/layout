import LayerComponent from './layer/LayerItem'
import LayerList from './layer/LayerList'
import LayerActions from '../actions/LayerActions'

require('../style/layer.less')

export default function LayerPanel(props) {
  return (
    <section className="layer-panel">
      <b>Layers</b>
      <button onClick={LayerActions.removeLayers} disabled={!props.activeLayers.size}>Remove</button>
      <LayerList layers={props.layers} activeLayers={props.activeLayers} onSelect={LayerActions.selectLayer}/>
    </section>
  )
}
