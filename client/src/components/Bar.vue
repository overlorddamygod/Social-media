
    <template>
    <v-app-bar
      app
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
    <v-text-field
        class="mt-7"
            v-model="model"
            :label="label"
            :hint="hint"
            placeholder="Search People..."
            :shaped="shaped"
            outlined="true"
            :rounded="rounded"
            :solo="solo"
            :single-line="singleLine"
            :filled="filled"
            :clearable="clearable"
            :persistent-hint="persistentHint"
            :loading="loading"
            flat="true"
            :counter="counterEn ? counter : false"
            :dense="dense"
            append-icon="mdi-magnify"
          ></v-text-field>

    
      <v-btn icon class="ml-4">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn color="white" elevation=0 large>
      <v-avatar
                  size="36px"
                >
                  <img
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  >
                
                </v-avatar>
                <strong class="ml-2">{{user.name || LOL}}</strong>
                            </v-btn>
                <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                v-on="on"
              >
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>


            <v-list>
                
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-title><v-btn @click="item.logout">{{ item.title }}</v-btn></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title><v-btn @click="logout">Logout</v-btn></v-list-item-title>
              </v-list-item>
              
            </v-list>
            
          </v-menu>

    
    </v-app-bar>
    
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState('auth',['user'])
  },
  name: 'bar',
  data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
      ],
      users:{}
    }),
  methods: {
    logout () {
      this.$store.dispatch('auth/setToken', null)
      this.$store.dispatch('auth/setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
