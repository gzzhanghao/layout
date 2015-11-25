import ToolItem from './ToolItem'

export default function ToolbarPanel(props) {
  var state = props.state
  return (
    <section className="toolbar">
      <b>Toolbar</b>
      <ul className="tool-list">
        {state.get('tools').map(tool => (
          <li className="tool-item" key={tool.get('name')}>
            <ToolItem tool={tool}/>
          </li>
        ))}
      </ul>
    </section>
  )
}
