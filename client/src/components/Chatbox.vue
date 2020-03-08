<template>
    <div class="box" style="height:90vh;">
    <div class="left">
        <div class="top">
            <input type="text" placeholder="Search" />
            <a href="javascript:;" class="search"></a>
        </div>
        <div class="people">
            <div v-for="friend in friends" :key="friend.id" class="person" @click="showmessage(friend)" :class="{active:friend.active}">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" alt="" />
                <span class="name">{{friend.friendname}}</span>
                <span class="time">2:09 PM</span>
                <span class="preview">I was wondering... {{friend.active}}</span>
            </div>
        </div>
    </div>
    <div class="right">
        <div class="top"><span>To: <span class="name">{{friendname}}</span></span>
        </div>
        <div class="chat" ref="msgContainer">
            <div class="conversation-start">
                <span>Today, 5:38 PM</span>
            </div>
            <Chatbubble class="active-chat" v-for="message in messages" :key="message.id" :msg="message.message" :sentbyme="Sentbyme(message.sender)"></Chatbubble>
        </div>
        <Chatinput :dat="dat" @addMessage="addmessage"></Chatinput>
    </div>
</div>
</template>

<script>
import Chatinput from './Chatinput.vue'
import Chatbubble from './Chatbubble.vue'
import FriendsService from '../services/FriendsService'

// import Chatname from './Chatname.vue'
export default {
  name: 'Chatbox',
  props:[
      'friends'
  ],
  data:()=> ({
    friendname:'',
    messages:'',
    dat:''
  }),
  components : {
    Chatinput,
    Chatbubble,
    // Chatname
  },
  mounted() {
    this.getMessages(this.$route.query.id)
  },
  methods: {
    showmessage(friend) {
        this.$router.push({query: { id: friend.friendid }})
        this.friendname=friend.friendname
        this.dat=friend
        this.getMessages(friend.id)
    },
    async getMessages(friendid) {
      try {
        const response = await FriendsService.getMessages(friendid)
        this.messages = response.data
        this.scrollToBottom();
      } catch (error) {
        // this.error = error.response.data.error
      }
    },
    scrollToBottom() {
      this.$nextTick(function() {
        var container = this.$refs.msgContainer;
        container.scrollTop = container.scrollHeight + 120;
    });
    },
    Sentbyme(id) {
        return id===this.$store.state.auth.user.id
    },
    addmessage(message) {
        this.messages=[...this.messages,message]
        this.scrollToBottom()
    },
    isActive(id) {        
        return id===this.$route.query.id
    }
  },
  sockets: {
    message(data) {
        // let c = true
        // let i =0
        // if (data.receiver ===this.$store.state.auth.user.id) {
        //         var interval =setInterval(() => {
        //             i+=1
        //             if (c) document.title= `${data.sendername} sent a message`
        //             if (!c) document.title= "Zumpy"
        //             if (i===8) {
        //                 clearInterval(interval  )
        //             }
        //             c=!c
        //         },1000)
        // }
        if (data.sender === this.$route.query.id || data.sender ===this.$store.state.auth.user.id) {
            
            this.messages=[...this.messages,data]        
            this.scrollToBottom();
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
    display:flex;
    max-width:100%;
}
* {
         --white: #fff;
    --black: #000;
    --bg: #f8f8f8;
    --grey: #999;
    --dark: #1a1a1a;
    --light: #e6e6e6;
    --wrapper: 1000px;
    --blue: #00b0ff;
    margin:0;
    padding:0;
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
    .right{
        display:flex;
        flex:1;
        flex-direction: column;
        height: 100%;
        .top {
            width: 100%;
            height: 47px;
            padding: 15px 29px;
            background-color: #eceff1;
            span {
                font-size: 15px;
                color: var(--grey);
                .name {
                    color: var(--dark);
                    @include font-bold;
                }
            }
        }
        .chat {
            position: relative;
            // display: none;
            // overflow: hidden;
            padding: 0 35px 92px;
            border-width: 1px 1px 1px 0;
            border-style: solid;
            border-color: var(--light);
            height: calc(100% - 48px);
            justify-content: flex-end;
            flex-direction: column;
            overflow: scroll;
            &.active-chat {
                display: block;
                display: flex;
                .bubble {
                    transition-timing-function: cubic-bezier(.4,-.04, 1, 1);
                    @for $i from 1 through 10 {
                        &:nth-of-type(#{$i}) {
                            animation-duration: .15s * $i;
                        }
                    }
                }
            }
        }
        
      
        .conversation-start {
            position: relative;
            width: 100%;
            margin-bottom: 27px;
            text-align: center;
            span {
                font-size: 14px;
                display: inline-block;
                color: var(--grey);
                &:before,&:after {
                    position: absolute;
                    top: 10px;
                    display: inline-block;
                    width: 30%;
                    height: 1px;
                    content: '';
                    background-color: var(--light);
                }
                &:before {
                    left: 0;
                }
                &:after {
                    right: 0;
                }
            }
        }
    }
    .left {
        display:flex;
        flex-direction: column;
        height: 100%;
        background-color: var(--white);
        .top {
            display: flex;
            height: 96px;
            padding: 29px;
            &:after {
                position: absolute;
                bottom: 0;
                left: 50%;
                display: block;
                width: 80%;
                height: 1px;
                content: '';
                background-color: var(--light);
                transform: translate(-50%, 0);
            }
        }
        input {
            flex:1;
            width:100%;
            height: 42px;
            padding: 0 15px;
            border: 1px solid var(--light);
            background-color: #eceff1;
            border-radius: 21px;
            @include font();
            &:focus {
                outline: none;
            }
        }
        a.search {
            width: 42px;
            height: 42px;
            margin-left: 10px;
            background-color: var(--blue);
            background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/name-type.png');
            background-repeat: no-repeat;
            background-position: top 12px left 14px;
            border-radius: 50%;
        }
    }
    // ul,li{
    //     list-style: none;
    // }
    ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
    .people {
            // border:1px solid red;
            // background-color: red;
    }

    // .people {
    //         margin-left: -1px;
    //         border-right: 1px solid var(--light);
    //         border-left: 1px solid var(--light);
    //         width: calc(100% + 2px);
        
    //     }
    .people {
            overflow: scroll;
            margin-left: -1px;
            border-right: 1px solid var(--light);
            border-left: 1px solid var(--light);
            width: calc(100% + 2px);
            .person {
                flex:1;
                position: relative;
                width: 100%;
                padding: 12px 10% 16px;
                cursor: pointer;
                background-color: var(--white);
                &:after {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    display: block;
                    width: 80%;
                    height: 1px;
                    content: '';
                    background-color: var(--light);
                    transform: translate(-50%, 0);
                }
                img {
                    float: left;
                    width: 40px;
                    height: 40px;
                    margin-right: 12px;
                    border-radius: 50%;
                }
                .name {
                    font-size: 14px;
                    line-height: 22px;
                    color: var(--dark);
                    @include font-bold;
                }
                .time {
                    font-size: 14px;
                    position: absolute;
                    top: 16px;
                    right: 10%;
                    padding: 0 0 5px 5px;
                    color: var(--grey);
                    background-color: var(--white);
                }
                .preview {
                    font-size: 14px;
                    display: inline-block;
                    overflow: hidden !important;
                    width: 70%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: var(--grey);
                }
                &.active,&:hover {
                    margin-top: -1px;
                    margin-left: -1px;
                    padding-top: 13px;
                    border: 0;
                    background-color: var(--blue);
                    width: calc(100% + 2px);
                    padding-left: calc(10% + 1px);
                    span {
                        color: var(--white);
                        background: transparent;
                    }
                    &:after {
                        display: none;
                    }
                }
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
