export default function ToolItem(props) {
  return (
    <div className="tool">
      {props.tool.get('name')}
    </div>
  )
}
