<template>
  <div class="about">
    <v-row class="r">
      <v-col cols="3"></v-col>
      <v-col class="chat">
          <div class="chat-box" ref="msgContainer">
            <ul>
              <li v-for="message in messages" :key="message">{{message}}</li>
            </ul>
          </div>
          <div class="chat-input">
            <v-text-field
        class="mt-3 mob-bar"
            v-model="message"
            placeholder="Send a message"
            outlined="true"
            flat="true"
          ></v-text-field>
          <v-btn
          dark
          class="mb-4 mx-4"
          @click="sendmsg">
          <v-icon>mdi-send</v-icon>
        </v-btn>
          
          </div>
          
        </v-col>
    
    <v-col cols="3">

    </v-col>
          </v-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState('auth',['user'])
  },
  name: 'bar',
  data: () => ({
    messages:[],
    message:''
    }),
  methods: {
    sendmsg() {
      this.$socket.client.emit('sendmessage', this.message);
      this.message=""
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

