<template>
    <v-bottom-navigation app
    v-model="bottomNav"
  >
    <v-btn @click="navigate(item.route)" v-for="item in items" :key="item">
      <span>{{item.title}}</span>
      <v-icon>{{item.icon}}</v-icon>
    </v-btn>
    
  </v-bottom-navigation>
</template>
<script>

export default {
  name: 'botnav',
  data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' ,route:{name: 'dashboard'}},
          { title: 'My Page', icon: 'mdi-image' ,route:{name: 'mypage'}},
          { title: 'Chat', icon: 'mdi-message' ,route:{name: 'induser'}},
          { title: 'Friends', icon: 'mdi-account-multiple' ,route:{name: 'friends'}},
          { title: 'Find Friends', icon: 'mdi-account-multiple-plus' ,route:{name: 'findfriends'}},
          { title: 'Settings', icon: 'mdi-settings' ,route:{name: 'settings'}},
        ],
      }
  },
  methods: {
    navigate(route) {
      this.$router.push(route)
    }
  }
}
</script>