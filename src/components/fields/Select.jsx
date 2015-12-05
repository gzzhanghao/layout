export default function Select(config) {

  config = config || {}

  let options = config.options

  return props => {

    let value = ''
    if (props.value) {
      value = props.value
    }

    return (
      <div className="field field-size">
        <select className="field-value" onChange={onChange} value={value}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.name || option.value}
            </option>
          ))}
        </select>
      </div>
    )

    function onChange(event) {
      let value = event.target.value
      let realVal = value
      if (config.transform) {
        realVal = config.transform(realVal)
      } else {
        realVal = JSON.stringify(realVal)
      }
      props.onChange(value, realVal)
    }
  }
}
