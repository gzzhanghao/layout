import React from 'react'
import ReactDOM from 'react-dom'
import ViewportAction from '../actions/ViewportActions'

import '../style/viewport.less'

export default class ViewportComponent extends React.Component {

  render() {
    return (
      <section className="viewport">
        <div ref="container"></div>
      </section>
    )
  }

  componentDidMount() {
    ViewportAction.initContainer(ReactDOM.findDOMNode(this.refs.container))
  }

  componentWillUnmount() {
    ViewportAction.destructContainer()
  }
}
