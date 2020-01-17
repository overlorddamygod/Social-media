import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'

import vuetify from './plugins/vuetify';
// import vuetify from './plugins/vuetify'
// import Panel from '@/components/globals/Panel'

// Vue.component('panel', Panel)



Vue.config.productionTip = false
// Vue.use(Vuetify)
sync(store, router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
