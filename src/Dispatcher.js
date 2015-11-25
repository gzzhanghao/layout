var callbacks = []
var promises = []

var Dispatcher = {

  dispatch(type, data) {
    var promise = Promise.resolve()
    promises = callbacks.map(callback => new Promise(resolve => {
      callback()
      resolve()
    }))
    for (let i = promises.length - 1; i >= 0; i--) {
      promise.then(promises[i])
    }
  },

  register(callback) {
    return callbacks.push(callback) - 1
  },

  waitFor(key) {
    Promise.resolve().then(promises[i])
  }
}

export default Dispatcher
