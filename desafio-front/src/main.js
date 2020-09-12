import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueLoading from 'vuejs-loading-plugin'
import Notifications from 'vue-notification'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueLoading, {
  text: 'Carregando...',
  background: 'rgba(255,255,255, 0.3)', // set custom background
})

Vue.use(Notifications)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
