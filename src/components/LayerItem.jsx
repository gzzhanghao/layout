import LayerList from './LayerList'

require('../style/LayerComponent.less')

export default function LayerItem(props) {
  return (
    <section className="layer">
      <span className="type">{props.layer.get('type')}</span>
      <span className="name">{props.layer.get('name') || props.layer.get('type')}</span>
      <LayerList layers={props.layer.get('children')}/>
    </section>
  )
}
