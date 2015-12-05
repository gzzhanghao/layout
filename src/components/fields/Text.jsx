export default function Text(config) {

  config = config || {}

  return props => {

    let value = ''
    if (props.value) {
      value = props.value
    }

    let inputField
    if (config.multiLine) {
      inputField = <textarea className="field-value" value={value} onChange={onChange}></textarea>
    } else {
      inputField = <input className="field-value" value={value} onChange={onChange}/>
    }

    return (
      <div className="field field-size">
        {inputField}
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
