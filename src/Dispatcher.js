var callbacks = []

var Dispatcher = {

  dispatch(type, data) {
    callbacks.forEach(callback => callback(type, data))
  },

  register(callback) {
    callbacks.push(callback)
  }
}

export default Dispatcher
