import classNames from 'classnames'
import LayerList from './LayerList'

export default function LayerItem(props) {
  console.log(props.activeLayers.toJS(), props.activeLayers.contains(props.layer))
  return (
    <section className={classNames('layer', props.layer.get('className'), { active: props.activeLayers.contains(props.layer) })}>
      <header className="legend" onClick={event => props.onSelect([], event.ctrlKey)}>
        <span className="name">
          {props.layer.get('name') || `Unnamed ${props.layer.get('type')}`}
        </span>
      </header>
      <LayerList layers={props.layer.get('children')}
                 activeLayers={props.activeLayers}
                 onSelect={props.onSelect}/>
    </section>
  )
}
