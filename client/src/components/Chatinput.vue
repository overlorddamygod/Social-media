<template>
  <div class="write">
        <v-icon class="icon">mdi-attachment</v-icon>
        <input type="text" placeholder="Send a message..."  @keypress.enter.prevent="sendmsg" v-model="message"/>
        
        <div class="emo"><v-icon @click="showEmoji=!showEmoji" class="icon">mdi-emoticon</v-icon>
        <VEmojiPicker v-if="showEmoji" class="emojiPicker" @select="selectEmoji" /></div>
        
        <v-icon class="icon" @click="sendmsg">mdi-send</v-icon>
    </div>
</template>

<script>
import VEmojiPicker from 'v-emoji-picker';

export default {
  name: 'Chatinput',
  data: () => ({
    showEmoji:false,
    message:''
  }),
  components: {
    VEmojiPicker
  },
  props:[
      // 'message'
      'dat'
  ],
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
      this.$emit('addMessage', {
        sender:this.$store.state.auth.user.id,
        receiver:this.dat.friendid,
        friendid:this.dat.id,
        message:this.message
      })
      this.message=""
      this.scrollToBottom();
    }
    },
  }
};
</script>

<style lang="scss" scoped>
    // * {
    //        --white: #fff;
    // --black: #000;
    // --bg: #f8f8f8;
    // --grey: #999;
    // --dark: #1a1a1a;
    // --light: ;
    // --wrapper: 1000px;
    // --blue: #00b0ff;
    // }
    .emo {
        position:relative;
    }
    .emojiPicker {
        position:absolute;
        height:280px;
        transform: translate(-90%,-105%);
    }
    input {
        flex:1;
        height: 42px;
        padding: 0 15px;
        border: 1px solid #e6e6e6;
        background-color: #eceff1;
        border-radius: 21px;
        &:focus {
            outline: none;
        }
    }
    .write {
        display:flex;
        padding-left: 8px;
        border: 1px solid #e6e6e6;
        background-color: #eceff1;
        width:100%;
        border-radius: 5px;
    }
    .icon {
        padding:0.6rem;
        cursor: pointer;
    }
</style>

