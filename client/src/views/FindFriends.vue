<template>
  <div class="about">
    <v-row class="px-10 mt-4">
    <addfriend v-for="user in users" :key="user.id" :user="user" class="mx-2 my-2"/>
    </v-row>
  </div>
</template>

<script>
import addfriend from '../components/Addfriend'
import FriendsService from '@/services/FriendsService'

export default {
  name: 'Friends',
  components: {
    addfriend
  },
  data() {
    return {
      users:[]
    }
  },
  mounted() {
    this.getallusers()
  },
  methods: {
    async getallusers () {
      try {
        const response = await FriendsService.findfriends(this.$store.state.auth.user.id)
        this.users=response.data.findfriends
      } catch (error) {
        // this.error = error.response.data.error
      }
  }
  }
};
</script>