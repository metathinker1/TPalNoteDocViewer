import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  data: {
    directory: 'temp directory'
  },
  render: h => h(App)
}).$mount('#app')
