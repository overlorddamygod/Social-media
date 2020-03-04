<template>
<div>
    <div class="chat-box" ref="msgContainer">
            <ul>
            <!-- {{messages}} -->
            <div v-for="message in messages" :key="message" class="box" v-bind:class="{ right: message.sender===$store.state.auth.user.id }">
              <li v-bind:class="{ right: message.sender==='' }">{{message.message}}</li>
            </div>
            </ul>
  
          </div>
          <!-- {{messages}} -->

          <div class="chat-input">

            <v-text-field
        class="mt-3 mob-bar"
            v-model="message"
            placeholder="Send a message"
            outlined="true"
            flat="true"
                      @keypress.enter.prevent="sendmsg"

          >
           </v-text-field>
          <VEmojiPicker class="emojiPicker" v-if="showEmojiPicker" @select="selectEmoji" />
          <v-btn
          
          class="mb-4 mx-1 emoButton"
          @click="showEmojiPicker=!showEmojiPicker"
          >
          <v-icon>mdi-emoticon</v-icon></v-btn>

         
          
          <v-btn
          dark
          class="mb-4 mx-1"
          @click="sendmsg"
          >

          
          <v-icon>mdi-send</v-icon>
                  </v-btn>
                      <!-- {{getMessages(this.dat.id)}} -->
          </div>
          </div>
</template>

<script>
import FriendsService from '@/services/FriendsService'
import VEmojiPicker from 'v-emoji-picker';


export default {
  data:()=> ({
    showEmojiPicker:false,
    // messages:[],
    message:'',
  }),
  components: {
    VEmojiPicker
  },
  props:
  [
    'messages',
    'dat',
  ],
  mounted(){
    // this.$socket.client.emit('chat-connection', );
  },
  watch:{
    dat: function() {
      this.getMessages(this.dat.id)
    }
  },
 methods: {
   selectEmoji(emoji) {     
      this.message+=emoji.data
    },
    sendmsg(){
      if (this.message != "") {
      this.$socket.client.emit('sendmessage', 
      {
      sender:this.$store.state.auth.user.id,
      receiver:this.dat.friendid,
      friendid:this.dat.id,
      message:this.message
    });
    this.messages=[...this.messages,{
      sender:this.$store.state.auth.user.id,
      receiver:this.dat.friendid,
      friendid:this.dat.id,
      message:this.message
    }]
    this.message=""
    this.scrollToBottom();
      }
    },
    scrollToBottom() {
      this.$nextTick(function() {
        var container = this.$refs.msgContainer;
        container.scrollTop = container.scrollHeight + 120;
    });
    },
    async getMessages(friendid) {
      try {
        const response = await FriendsService.getMessages(friendid)
        this.messages = response.data
        this.scrollToBottom();
      } catch (error) {
        // this.error = error.response.data.error
      }
    }
  },
  sockets: {
    message(data) {
      // console.log(data);
      if (data.sender===this.$route.query.id){
      this.messages=[...this.messages,data]
      this.scrollToBottom();
      }
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

.box {
  display:flex;
  // position:relative;
  // margin:0;
  // padding:0;
}
.right {
  justify-content:flex-end;
}
li {
  display:flex;
  padding:0.5rem;
  width:inherit;
  margin:2px 0;
  border-radius:4px;
  background:#53C2D8;
  // position:absolute;
  
  // overflow: auto;

  // justify-content:flex-end;
}

.emojiPicker {
  position:absolute;
  // height:30vh;
  transform:translate(38%,-60%);
  z-index:10;
}
</style>

