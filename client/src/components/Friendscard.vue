<template>
  <v-card
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{friend.friendname}}</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>
{{a}}
      <v-list-item-avatar
        tile
        size="80"
      ><img
                    alt="Avatar"
                    src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
                  ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions >
      <v-btn text @click="removefriend">Remove Friend</v-btn>
      <v-btn text @click="viewprofile">View Profile</v-btn>
    </v-card-actions>
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
  </v-card>
</template>

<script>
import FriendsService from '../services/FriendsService'
export default {
  name: 'Friendscard',
  props:
  [
    'friend'
  ],
  data: function() {
  var data = {
    friendin: this.friend,

    // other object attributes
  }

  return data;
},
  methods: {
    async removefriend() {
      try {
        FriendsService.removefriend(this.friendin.friendid)
        this.$emit('reloading',this.friend)
      }
      catch(err) {
        console.log(err)
      }
    },
    viewprofile() {
      this.$router.push({ name: 'profile',query: { id: this.friendin.friendid } })
    }
  }
};
</script>
