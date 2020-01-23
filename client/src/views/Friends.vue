<template>
  <div class="about">
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
    </v-snackbar>
    <v-row class="px-10 mt-4">
    <friendscard v-for="friend in friends" :key="friend.id" :friend="friend" @reloading="reload" class="mx-2 my-2"/>
    </v-row>
  </div>
</template>

<script>
import friendscard from '../components/Friendscard'
import FriendsService from '@/services/FriendsService'

export default {
  name: 'Friends',
  components: {
    friendscard
  },
  data() {
    return {
      friends:[],
      snackbar: false,
    text: '',
    timeout: 2000,
    }
  },
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
  reload(friend) {
    this.friends=this.friends.filter(fr=>fr.id != friend.id)
    this.text=friend.friendname+" removed from friends list."
    this.snackbar=true
    // this.getallfriends()
  }
  }
};
</script>