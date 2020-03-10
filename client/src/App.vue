<template><div>
  <v-app v-if="isUserLoggedIn">
    <v-snackbar
      v-model="snackbar"
      multi-line=true
      left=true
      bottom=true
    >
      {{ text }}
      <v-btn
        color="red"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
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
  data:()=> ({
    chatSound: new Audio(require('./sounds/chat.mp3')),
    notificationSound: new Audio(require('./sounds/notification.mp3')),
    snackbar: false,
    text: '',
  }),
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
                this.chatSound.play()
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
    },
    addedfriendnotification(friend) {    
      this.notificationSound.play()  
      this.snackbar=true
      this.text=`${friend.friend1name} added you as a friend`      
    },
    removefriendnotification(friend) {      
      this.notificationSound.play()  
      this.snackbar=true
      this.text=`${friend.friend1name} removed you as a friend`      
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