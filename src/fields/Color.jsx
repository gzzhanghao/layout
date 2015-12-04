import assign from 'object-assign'

export default function Color(config) {

  config = config || {}

  let fields = [
    { key: 'r', name: 'Red', options: { max: 255 } },
    { key: 'g', name: 'Green', options: { max: 255 } },
    { key: 'b', name: 'Blue', options: { max: 255 } },
    { key: 'a', name: 'alpha', options: { max: 1, step: 0.01 } }
  ]

  return props => {

    let value = {}

    if (props.value) {
      assign(value, props.value)
    } else if (config.defaultValue) {
      assign(value, config.defaultValue)
    }

    return (
      <div className="field field-size">
        {fields.map(field => (
          <div className="field-section" key={field.key}>
            <label className="section-name" htmlFor={`field-color-${field.key}`}>
              {field.name} ({value[field.key]})
            </label>
            <input id={`field-color-${field.key}`} className="field-value" value={value[field.key]} type="range" onChange={event => onChange(field.key, event.target.value)} {...field.options}/>
          </div>
        ))}
        <button className="field-value" onClick={() => onChange('a', 0)}>Transparent</button>
      </div>
    )

    function onChange(type, val) {
      value[type] = parseFloat(val)
      let realVal = value
      if (config.transform) {
        realVal = config.transform(value)
      } else if (value.a === 0) {
        realVal = ''
      } else {
        realVal = JSON.stringify(`rgba(${fields.map(field => value[field.key]).join(',')})`)
      }
      props.onChange(value, realVal)
    }
  }
}
