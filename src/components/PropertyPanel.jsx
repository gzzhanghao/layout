export default function PropertyPanel(props) {
  return (
    <div className="props-panel">
      <b>Properties</b>
      <ul className="prop-list">
        {props.properties.map(prop => {
          let PropView = prop.get('panel')
          return (
            <li className="prop-item" key={prop.get('name')}>
              <PropView state={prop} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
