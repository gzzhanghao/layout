import Symbol from 'es6-symbol'

var Constants = {

  create(keys) {
    var result = {}
    keys.forEach(key => {
      result[key] = Symbol(key)
      result[key + '_COMPLETE'] = Symbol(key + '_COMPLETE')
      result[key + '_FAILED'] = Symbol(key + '_FAILED')
    })
    return result
  }
}

export default Constants
