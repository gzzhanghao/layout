import LayerItem from './LayerItem'

export default function LayerList(props) {
  return (
    <ol className="layer-children">
      {(props.layers || []).map((child, index) => (
        <li className="layer-child" key={child.get('id')}>
          <LayerItem layer={child}
                     activeLayers={props.activeLayers}
                     onSelect={(path, multi) => props.onSelect(path.concat(index), multi)}/>
        </li>
      ))}
    </ol>
  )
}