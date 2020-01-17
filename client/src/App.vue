<template><div>
  <v-app v-if="isUserLoggedIn">
    <sidebar/>
    <bar/> 
    <botnav class="botnav"/>
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
import botnav from './components/Botnav'

export default {
  name: 'App',
  computed : {
    ...mapState('auth',['isUserLoggedIn'])
  },
  components: {
    sidebar,
    bar,
    botnav
  },
};
</script>

<style  scoped>
.botnav {
  display: none;  
}

@media only screen and (max-width:768px) {
  .botnav {
    display: flex;
  }
}
</style>