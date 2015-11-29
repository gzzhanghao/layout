import {List} from 'immutable'
import LayerActions from '../actions/LayerActions'

export default function PropertyPanel(props) {
  let selectedLayers = props.selectedLayers
  let properties = props.properties

  if (!selectedLayers.size) {
    properties = List()
  }

  properties = properties.filter(property => {
    let available = property.get('available')
    for (let i = selectedLayers.size - 1; i >= 0; i--) {
      if (!available.test(selectedLayers.getIn([i, 'type']))) {
        return false
      }
    }
    return true
  })

  return (
    <div className="props-panel">
      <b>Properties</b>
      <ul className="prop-list">
        {properties.map(prop => {
          let PropView = prop.get('panel')
          let key = prop.get('key')
          return (
            <li className="prop-item" key={prop.get('name')}>
              <PropView state={selectedLayers.map(layer => layer.getIn(['properties', key]))}
                        onChange={LayerActions.updateProperties.bind(LayerActions, key)} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
