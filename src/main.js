import Vue from 'vue'
import {Loading} from 'element-ui'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(Loading.directive)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
