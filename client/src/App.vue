<template><div>
  <v-app v-if="isUserLoggedIn">
    <sidebar/>
    <bar/> 
    <v-content>
    <router-view>
    </router-view>
    </v-content>
  </v-app>
  <v-app v-else>
    <router-view>
    </router-view>
  </v-app>
  </div>
</template>

<script>
import sidebar from './components/Sidebar';
import bar from './components/Bar';
import {mapState} from 'vuex'

export default {
  name: 'App',
  computed : {
    ...mapState('auth',['isUserLoggedIn'])
  },
  components: {
    sidebar,
    bar
  },
};
</script>
