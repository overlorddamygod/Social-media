<template>
  <Chatbox :friends="friends"></Chatbox>
</template>

<script>
import {mapState} from 'vuex'
import FriendsService from '@/services/FriendsService'
import Chatbox from '@/components/Chatbox.vue'
// import Chatname from '@/components/Chatname.vue'

export default {
  computed: {
    ...mapState('auth',['user'])
  },
  name: 'bar',
  components : {
    Chatbox,
  },
  data: () => ({
    messages:[],
    message:'',
    friends:[],
    dat:''
  }),
  mounted() {
    this.getallfriends()
    // this.$socket.client.emit('chat-connection', {
    //       user: this.$store.state.auth.user
    // });
    


  },
  methods: {
    async getallfriends () {
      try {
        const response = await FriendsService.getfriends(this.$store.state.auth.user.id)
        this.friends=response.data.friends
        this.go();
      } catch (error) {
        // this.error = error.response.data.error
      }
  },
    go() {        
        console.log(this.friends);
        
        this.$router.push({query: { id: this.friends[0].id }})

    }
  },  
  sockets: {
    //  sendmessage(message) {
    //       this.messages.push(message);
    //         var messageBox = this.$refs.msgContainer;
    //         messageBox.scrollTop = messageBox.scrollHeight;
    //   },
    //   connect() {
    //     // this.messages=['b']
    //   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


*, *:before, *:after {
    box-sizing: border-box;
}

:root {
    --white: #fff;
    --black: #000;
    --bg: #f8f8f8;
    --grey: #999;
    --dark: #1a1a1a;
    --light: #e6e6e6;
    --wrapper: 1000px;
    --blue: #00b0ff;
}
@mixin font-bold {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 600;
}
@mixin font {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 400;
}
@mixin placeholder {
    &::-webkit-input-placeholder {
        @content;
    }
    &:-moz-placeholder {
        @content;
    }
    &::-moz-placeholder {
        @content;
    }
    &:-ms-input-placeholder {
        @content;
    }
}

@keyframes slideFromLeft {
    0% {
        margin-left: -200px;
        opacity: 0;
    }
    100% {
        margin-left: 0;
        opacity: 1;
    }
}
@-webkit-keyframes slideFromLeft {
    0% {
        margin-left: -200px;
        opacity: 0;
    }
    100% {
        margin-left: 0;
        opacity: 1;
    }
}
@keyframes slideFromRight {
    0% {
        margin-right: -200px;
        opacity: 0;
    }
    100% {
        margin-right: 0;
        opacity: 1;
    }
}
@-webkit-keyframes slideFromRight {
    0% {
        margin-right: -200px;
        opacity: 0;
    }
    100% {
        margin-right: 0;
        opacity: 1;
    }
}
</style>

