import {Map} from 'immutable'
import capitalize from 'lodash.capitalize'
import LayerActions from '../../actions/LayerActions'

export default function ContentPanel(props) {

  let properties = ['text', 'html']
  let states = props.state.toJS()
  let state = states[0] || {}
  let placeholder = {}
  let formalize = defaults.bind(null, '')

  properties.forEach(prop => {
    for (let i = states.length - 1; i > 0; i--) {
      if (formalize((states[i] || {})[prop]) !== formalize(state[prop])) {
        state[prop] = ''
        placeholder[prop] = '(Multiple values)'
        break
      }
    }
  })

  return (
    <fieldset className="prop prop-position">
      <legend>Content</legend>
      {properties.map(prop => (
        <div className="field" key={prop}>
          <label htmlFor={`prop-pos-${prop}`}>{capitalize(prop)}</label>
          <input type="text"
                 id={`prop-pos-${prop}`}
                 value={state[prop]}
                 placeholder={placeholder[prop]}
                 onKeyDown={event => onKeyDown(event)}
                 onChange={event => onChange(prop, event.target.value)}/>
        </div>
      ))}
    </fieldset>
  )

  function onKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      document.activeElement.blur()
    }
  }

  function onChange(type, value) {
    LayerActions.updateProperties('content', { [type]: value })
  }

  function defaults(defaultValue, value) {
    if (typeof value === 'undefined' || value === null) {
      return defaultValue
    }
    return value
  }
}
