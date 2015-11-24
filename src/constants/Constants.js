import Symbol from 'es6-symbol'

var Constants = {

  create(keys) {
    var result = {}
    keys.forEach(key => {
      result[key] = Symbol(key)
      result[key + '_DONE'] = Symbol(key + '_DONE')
      result[key + '_FAILED'] = Symbol(key + '_FAILED')
    })
    return result
  }
}
