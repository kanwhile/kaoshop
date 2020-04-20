import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/apexcharts'
import './plugins/moment'
import './plugins/numeral'
import App from './App.vue'
import router from './router'
import store from './vuex'

import './styles.scss'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
