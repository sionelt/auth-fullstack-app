import Vue from 'vue'
import bootstrapVue from 'bootstrap-vue'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/services/googleApi.service'

Vue.use(bootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
