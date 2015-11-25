var callbacks = []
var promises

var Dispatcher = {

  dispatch(type, data) {
    if (!type) {
      throw new TypeError('Dispatch type must be present')
    }
    var promise = Promise.resolve()
    promises = callbacks.map(callback => new Promise(resolve => {
      callback(type, data)
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
    Promise.resolve().then(promises[key])
  }
}

export default Dispatcher
