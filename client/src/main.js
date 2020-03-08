import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Vuetify from 'vuetify'
import {
  sync
} from 'vuex-router-sync'

import vuetify from './plugins/vuetify';
// import vuetify from './plugins/vuetify'
// import Panel from '@/components/globals/Panel'

// Vue.component('panel', Panel)
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socket = io(window.location.hostname==="localhost"? `http://localhost:3000/`:`https://young-temple-53403.herokuapp.com/`);
// const socket = io('http://localhost:3000/');

Vue.use(VueSocketIOExt, socket);


Vue.config.productionTip = false
// Vue.use(Vuetify)
// Vue.forceUpdate();

sync(store, router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')