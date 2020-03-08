<template><div>
  <v-app v-if="isUserLoggedIn">
    <sidebar/>
    <bar/> 
    <botnav class="botnav"/>
    <v-content>
      
    <router-view class="view">
    </router-view>
    </v-content>
  </v-app>
  <v-app v-else>
    
    <router-view class="view">
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
  created() {
    },
  mounted() {
    
    // this.$socket.client.emit('chat-connection', {
    //       user: this.$store.state.auth.user
    // });
  },
  sockets: {
    message(data) {
        let c = true
        let i =0
        if (data.receiver ===this.$store.state.auth.user.id) {
                var interval =setInterval(() => {
                    i+=1
                    if (c) document.title= `${data.sendername} sent a message`
                    if (!c) document.title= "Zumpy"
                    if (i===8) {
                        clearInterval(interval  )
                    }
                    c=!c
                },1000)
        }
    }
  }
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
  .view {
    /* max-height:90vh; */
    /* padding-bottom:10rem; */
  }
}
</style>