export default function(config) {

  config = config || {}

  let units = config.units || ['px', 'em', 'rem', '%']
  let defaultValue = config.defaultValue

  if (config.xUnits) {
    units = units.filter(unit => config.xUnits.indexOf(unit) < 0)
  }

  let defaultUnit = config.defaultUnit
  if (defaultUnit) {
    let index = units.indexOf(defaultUnit)
    if (index >= 0) {
      units = units.slice(0, index).concat(units.slice(index + 1))
    }
    units = [defaultUnit].concat(units)
  }

  return props => {

    let value = ''
    let unit = config.defaultUnit || units[0]
    if (props.value) {
      value = props.value.value
      unit = props.value.unit
    }

    let placeholder = defaultValue
    if (props.isMulti) {
      placeholder = '(Multiple value)'
    }

    return (
      <div className="field field-size">
        <input className="field-value" type="number" value={value} placeholder={placeholder} onChange={onChangeValue}/>
        <select className="field-unit" value={unit} disabled={units.length <= 1} onChange={onChangeUnit}>
          {units.map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
    )

    function onChangeUnit(event) {
      let value = config.defaultValue || ''
      if (props.value) {
        value = props.value
      }
      emitChange(value, event.target.value)
    }

    function onChangeValue(event) {
      let unit = config.defaultUnit || units[0]
      if (props.value) {
        unit = props.value.unit
      }
      emitChange(event.target.value, unit)
    }

    function emitChange(value, unit) {
      let realVal
      if (config.transform) {
        realVal = config.transform(value, unit)
      } else {
        realVal = JSON.stringify(value + unit)
      }
      props.onChange({ value, unit }, realVal)
    }
  }
}
