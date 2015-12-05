import LayerActions from 'actions/LayerActions'

export default function Toolbar(props) {
  return (
    <section className="toolbar">
      <b>Toolbar</b>
      <ul className="tool-list">
        {props.tools.map((tool, index) => (
          <li className="tool-item" key={index}>
            <button className="tool-item" onClick={() => onClick(index)}>
              {tool.get('name')}
            </button>
          </li>
        )).valueSeq()}
      </ul>
    </section>
  )

  function onClick(index) {
    LayerActions.createLayer(index)
  }
}
