<template>
  <v-card
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{userin.name}}</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
      ><img
                    alt="Avatar"
                    src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
                  ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text @click="addfriend">Add Friend</v-btn>
      <v-btn text>View Profile</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FriendsService from '../services/FriendsService'
export default {
  name: 'Addfriend',
  props:
  [
    'user'
  ],
  data: function() {
  var data = {
    userin: this.user,
    // other object attributes
  }

  return data;
},
  methods: {
    async addfriend() {
      const friend={
          friend1:this.$store.state.auth.user.id,
          friend1name:this.$store.state.auth.user.name,
          friend2:this.userin.id,
          friend2name:this.userin.name,
        }
        // console.log(a)
      await FriendsService.addfriend(friend)
      
    }
  }
};
</script>
