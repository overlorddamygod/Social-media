<template>
  <div class="about">
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
      friends:[]
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
  reload() {
    this.getallfriends()
  }
  }
};
</script>