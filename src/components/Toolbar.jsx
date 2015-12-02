import LayerActions from '../actions/LayerActions'

export default function Toolbar(props) {
  return (
    <section className="toolbar">
      <b>Toolbar</b>
      <ul className="tool-list">
        {props.tools.map((tool, key) => (
          <li className="tool-item" key={key}>
            <button className="tool-item" onClick={() => onClick(key)}>
              {tool.get('name')}
            </button>
          </li>
        )).valueSeq()}
      </ul>
    </section>
  )

  function onClick(key) {
~    LayerActions.createLayer(key)
  }
}
