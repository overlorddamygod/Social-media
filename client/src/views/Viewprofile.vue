<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar
    >
    <v-card
    class="mx-auto mt-4"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{user.name}}</v-list-item-title>
        <v-list-item-subtitle>Joined at {{user.createdAt}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>
  <v-card
    class="mx-auto pa-2 mt-4"
    outlined
    width="500px"
  >




      <v-textarea
          label="Create Post"
          v-model="content"
          auto-grow
          outlined
          rows="1"
          v-if="isLoading"
          row-height="15"
          loading
        ></v-textarea>
        <v-textarea
          label="Create Post"
          v-model="content"
          auto-grow
          outlined
          rows="1"
          v-else
          row-height="15"
        ></v-textarea>
        <v-btn
          dark
          class="cyan"
          @click="post">
          Post
        </v-btn>
          </v-card>
    <v-row class="px-10">
    <post v-for="post in posts" :key="post.id" :post="post"/>
    </v-row>
    
  </div>
</template>
<script>
import PostService from '@/services/PostService'
import UserService from '@/services/UserService'
import post from '../components/Post'
export default {
  components: {
    post
  },
  mounted() {
    this.getpost1()
    this.getu()
    this.interval = setInterval( ()=> {
      this.getpost1();
    }, 60000); 
  },
  data() {
    return {
      user: [],
      posts:[],
      error:{},
      interval:null,
      content:"",
      isLoading:false,
      snackbar: false,
      text: '',
      timeout: 2000,
    }
  },
  methods :{
    async getpost () {
      try {
        let id=this.$route.query.id
        const response = await PostService.getp(id)
        this.isLoading=false
        this.content=""
        this.posts=response.data.posts
        this.posts.sort(function(x, y){
    return y.createdAt - x.createdAt;
})
        this.text="Successfully Posted"
        this.snackbar=true
      } catch (error) {
        this.error = error.response.data.error
      }
      
    },
    async getpost1 () {
      try {
        let id=this.$route.query.id
        const response = await PostService.getp(id)
        this.isLoading=false
        this.content=""
        this.posts=response.data.posts
        this.posts.sort(function(x, y){
    return y.createdAt - x.createdAt;
})
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async post () {
      try {
        this.isLoading=true
        await PostService.postpost({
          UserId:this.$route.query.id,
          photoUrl:'https://specials-images.forbesimg.com/imageserve/5c76b4b84bbe6f24ad99c370/416x416.jpg?background=000000&cropX1=0&cropX2=4000&cropY1=0&cropY2=4000',
          content: this.content
        })
        // await sleep.sleep(2)
        // setTimeout(this.getpost(), 3);
        await this.sleep(1300)
        this.getpost()
      } catch (error) {
        this.error = error.response.data.error
      }
  },
  sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  },
  async getu() {
    try {
      const response=await UserService.getusers(this.$route.query.id)
      this.user=response.data.user
    }catch (err) {
      console.log("a")
    }
  }
  },
  beforeDestroy: function(){
clearInterval(this.interval);
}
}
</script>

<style scoped>
</style>
