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
    <addfriend v-for="user in users" :key="user.id" :user="user" @reloading="reload" class="mx-2 my-2"/>
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
      users:[],
      snackbar: false,
    text: '',
    timeout: 2000,
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
  },
  reload(user) {
    this.users=this.users.filter(fr=>fr.id != user.id)
    this.text=user.name+" added to the friends list."
    this.snackbar=true
    // this.getallfriends()
  }
  }
};
</script>