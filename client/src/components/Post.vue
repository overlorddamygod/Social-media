<template>
  <v-card
    max-width="344"
    class="mt-10 card"
  >
    <v-list-item>
      <v-list-item-avatar><img
                    alt="Avatar"
                    src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
                  ></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{add(post.UserId)}}{{userinfo.name}}</v-list-item-title>
        <v-list-item-subtitle>{{format(post.createdAt)}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
    <h4>{{post.content}}  </h4>
      </v-card-text>
    <v-img
      :src="post.photoUrl"
      height="200"
      class="image"
    ></v-img>


    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Read
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Bookmark
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <strong>1.2k</strong>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import * as timeago from 'timeago.js';


export default {
  name:"post",
  props: [
    'post',
    ],
  data() {
    return {
      userinfo: {},
      userid:'',
      turn:1
    }
  },
  methods : {
      async getname(id) {
        try {
          const info = (await AuthenticationService.getinfo(id)).data.user
          this.userinfo=info
        }
        catch {
          console.log("Server Error")
        }
      },
      add(id) {
        if(this.turn===1)  {
          this.getname(id)
          this.turn=0
        }
      },
      format(time) {
          return timeago.format(time);
      }
  }
}
</script>

<style scoped>
.card {
  margin-left: 24px;
}
.image {
  height:250px;
  
}
@media screen and (max-width:768px){
  .card {
    margin:0  !important;
    
    /* padding:0 !important; */
    max-width:100vw !important;
  }
}

</style>