
    <template>
    <v-app-bar
      app
      color="white"
      height="70px"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
    <v-text-field
        class="mt-7 mob-bar"
            v-model="model"
            placeholder="Search People..."
            outlined="true"
            flat="true"
            append-icon="mdi-magnify"
          ></v-text-field>

      <div class="hide">
      <v-btn icon class="ml-4">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn color="white" elevation=0 large>
      <v-avatar
                  size="36px"
                >
                  <img
                    alt="Avatar"
                    src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
                  >
                
                </v-avatar>
                <strong class="ml-2" @click="viewprofile">{{user.name || LOL}}</strong>
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
      </div>
    
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
    },
    viewprofile() {        
      this.$router.push({ name: 'profile',query: { id: this.$store.state.auth.user.id } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hide {
  display: none;
}
@media screen and (min-width: 768px) {
  .hide {
    display: block;
  }
}
@media screen and (max-width: 768px) {
  .mob-bar {
    padding-top:0.2rem;
  }
}
</style>
