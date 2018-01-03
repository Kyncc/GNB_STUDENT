import Vue from 'vue'
import fundebug from 'fundebug-javascript'

function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'
  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
}

fundebug.apikey = 'b0b8aefa300896690b85ca7bdc4054ea05024bb4e2b1b2637c80e911a5daaede'
fundebug.appversion = '3.7.0'
fundebug.silentResource = true

Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData
  fundebug.notifyError(err, {
    metaData: {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  })
}
