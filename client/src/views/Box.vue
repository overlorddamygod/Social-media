<template>
<div>
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
          </div>
</template>

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

