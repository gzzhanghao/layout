import {Map, List} from 'immutable'
import LayerActions from 'actions/LayerActions'

const MULTI_VALUE = {}

export default function PropertyPanel(props) {

  let availableLayers = {}

  let properties = props.properties.filter(property => {
    let propKey = property.get('key')
    let validType = property.get('available')
    let available = false
    props.selectedLayers.forEach(layer => {
      if (layer.get('type').contains(validType)) {
        (availableLayers[propKey] = availableLayers[propKey] || []).push(layer)
        available = true
      }
    })
    return available
  })

  let values = {}

  properties.forEach(property => {
    let propKey = property.get('key')
    values[propKey] = property.get('fields').map((field, fieldName) => (
      availableLayers[propKey].slice(1).reduce((value, layer) => {
        if (value !== layer.getIn(['properties', propKey, fieldName])) {
          return MULTI_VALUE
        }
        return value
      }, availableLayers[propKey][0].getIn(['properties', propKey, fieldName]))
    ))
  })

  return (
    <div className="panel props-panel">
      <b>Properties</b>
      <ul className="prop-list">
        {properties.map(property => {
          let propKey = property.get('key')
          return (
            <li className="prop-item" key={propKey}>
              <fieldset className="prop-fields">
                <legend className="prop-legend">
                  {property.get('name')}
                </legend>
                <ul className="field-list">
                  {property.get('fields').map((Field, fieldKey) => {
                    let value = values[propKey].get(fieldKey)
                    let multi = value === MULTI_VALUE
                    if (multi) {
                      value = null
                    }
                    return (
                      <li className="field-item" key={fieldKey}>
                        <span className="field-name">{fieldKey}</span>
                        <Field value={value} isMulti={multi}
                               onChange={onChange.bind(null, propKey, fieldKey)}/>
                        <textarea className="field-value" value={value || ''} placeholder="Dynamic value..."
                               onChange={event => onChange(propKey, fieldKey, event.target.value, event.target.value)}></textarea>
                      </li>
                    )
                  }).valueSeq()}
                </ul>
              </fieldset>
            </li>
          )
        })}
      </ul>
    </div>
  )

  function onChange(propKey, fieldKey, value, realVal) {
    LayerActions.updateProperty(propKey, fieldKey, value, realVal)
  }

  function onToggle(propKey, fieldKey) {

  }
}
