import LayerActions from '../../actions/LayerActions'

export default function PropPositionComponent(props) {

  let states = props.state.toJS()
  let state = states[0] || {}
  let placeholder = {}
  let formalize = defaults.bind(null, '')

  for (let i = states.length - 1; i > 0; i--) {
    if (formalize((states[i] || {}).color) !== formalize(state.color)) {
      state.color = ''
      placeholder.color = '(Multiple values)'
      break
    }
  }

  return (
    <fieldset className="prop prop-position">
      <legend>Background</legend>
      <div className="field">
        <label htmlFor="prop-pos-color">Color</label>
        <input type="text"
               id="prop-pos-color"
               value={state.color}
               placeholder={placeholder.color}
               onKeyDown={event => onKeyDown(event)}
               onChange={event => onChange(event.target.value)}/>
      </div>
    </fieldset>
  )

  function onKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      document.activeElement.blur()
    }
  }
  
  function onChange(value) {
    LayerActions.updateProperties('background', { color: value })
  }

  function defaults(defaultValue, value) {
    if (typeof value === 'undefined' || value === null) {
      return defaultValue
    }
    return value
  }
}
