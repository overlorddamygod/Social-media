<template>
  <v-card
    max-width="344"
    class="ml-6 mt-10"
  >
    <v-list-item>
      <v-list-item-avatar><img
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  ></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{user.name}}</v-list-item-title>
        <v-list-item-subtitle>{{user.createdAt}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      :src="post.photoUrl"
      height="194"
    ></v-img>

    <v-card-text>
{{post.content}}    </v-card-text>

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
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:"post",
  props: [
    'post'
  ],
  computed: {
      ...mapState('auth',['user'])
  },
  methods : {
      
  }
}
</script>

<style scoped>
</style>