import Dispatcher from 'Dispatcher'

export default class Store {

  constructor(initialState) {
    this.callbacks = []
    this.state = initialState
    this.dispatchKey = Dispatcher.register(this.dispatch.bind(this))
  }

  setState(state) {
    this.state = state
    this.hasChanged()
  }

  onChange(callback) {
    this.callbacks.push(callback)
  }

  hasChanged() {
    this.callbacks.forEach(callback => callback())
  }

  getState() {
    return this.state
  }
}
