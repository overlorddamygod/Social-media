<template>
<div>
    <v-navigation-drawer app >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            New Social Media
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mt-2"></v-divider>

      <v-list
        dense
        nav
        class="mt-11"
      >
        <v-list-item class="mt-2"
          v-for="item in items"
          :key="item.title"
          link
          @click="navigate(item.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>

export default {
  name: 'sidebar',
  data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' ,route:{name: 'dashboard'}},
          { title: 'My Page', icon: 'mdi-image' ,route:{name: 'mypage'}},
          { title: 'Chat', icon: 'mdi-help-box' ,route:{name: 'chat'}},
          { title: 'Friends', icon: 'mdi-help-box' ,route:{name: 'friends'}},
          { title: 'Settings', icon: 'mdi-help-box' ,route:{name: 'settings'}},
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
