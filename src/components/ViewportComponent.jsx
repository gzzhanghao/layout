import React from 'react'
import ReactDOM from 'react-dom'
import ViewportAction from '../actions/ViewportActions'

export default class ViewportComponent extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <section className="viewport">
        <div ref="container"></div>
      </section>
    )
  }

  componentDidMount() {
    ViewportAction.initContainer(ReactDOM.findDOMNode(this.refs.container))
    this.onFrame()
  }

  componentWillUnmount() {
    ViewportAction.destructContainer()
  }

  onFrame() {
    ViewportAction.emitFrame()
    requestAnimationFrame(this.onFrame.bind(this))
  }
}
