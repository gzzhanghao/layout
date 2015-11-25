import LayerActions from '../actions/LayerActions'

export default function Toolbar(props) {
  return (
    <section className="toolbar">
      <b>Toolbar</b>
      <ul className="tool-list">
        {props.tools.map(tool => (
          <li className="tool-item" key={tool.get('name')}>
            <button className="tool-item" onClick={() => LayerActions.createLayer(tool)}>
              {tool.get('name')}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
