import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// TODO: Figure out how to register external Vue component in App.vue rather than this global registration
import slVueTree from 'sl-vue-tree';
import 'sl-vue-tree/dist/sl-vue-tree-dark.css';
Vue.component('sl-vue-tree', slVueTree);

new Vue({
  data: {
    directory: 'temp directory'
  },
  render: h => h(App)
}).$mount('#app')
