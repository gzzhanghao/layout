import LayerItem from './LayerItem'

export default function LayerList(props) {
  return (
    <ol className="layer-children">
      {props.layers.map(child => (
        <li className="layer-child" key={child.get('id')}>
          <LayerItem layer={child}/>
        </li>
      ))}
    </ol>
  )
}