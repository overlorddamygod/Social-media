<template>
  <div class="about">
    <v-row class="r">
      <v-col cols="3">
        <v-card
    class="ml-4 mb-3 px-3 chatname"
    v-for="friend in friends"
    :key="friend.id"
    @click="go(friend.id)"
  >
        <v-list-item-title class="py-3">{{friend.friendname}}</v-list-item-title>
  </v-card>

      </v-col>
        <v-divider
      class="mx-2"
      vertical
    ></v-divider>
      <v-col class="chat">
        <router-view name="helper">
    </router-view>
          
        </v-col>
          <v-divider
      class="mx-2"
      vertical
    ></v-divider>
    
    <v-col cols="3">

    </v-col>
          </v-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import FriendsService from '@/services/FriendsService'

export default {
  computed: {
    ...mapState('auth',['user'])
  },
  name: 'bar',
  data: () => ({
    messages:[],
    message:'',
    friends:[]
  }),
  mounted() {
    this.getallfriends()
  },
  methods: {
    async getallfriends () {
      try {
        const response = await FriendsService.getfriends(this.$store.state.auth.user.id)
        this.friends=response.data.friends
      } catch (error) {
        // this.error = error.response.data.error
      }
  },
    sendmsg() {
      this.$socket.client.emit('sendmessage', this.message);
      this.message=""
    },
    go(id) {
      this.$router.push({ name: 'induser',query: { id: id } })
    }
  },  
  sockets: {
     sendmessage(message) {
          this.messages.push(message);
            var messageBox = this.$refs.msgContainer;
            messageBox.scrollTop = messageBox.scrollHeight;
      },
      connect() {
        // this.messages=['b']
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  padding:0;
  margin:0;
}
.chatname {
  cursor: pointer;
}
.chatname:hover{
  background-color:rgba(0, 0, 0,0.1);
}
.chat {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 0.1fr;
  grid-template-areas: "." ".";
}
.r{
  height:90vh;
}
.chat-box {
  height:78vh;
  overflow: scroll;
}
.about {
  overflow:hidden;
}
.chat-input {
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.chat-input .send{
  cursor:pointer;
}
</style>

