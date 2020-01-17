<template>
<v-card 
    class="mx-auto pa-10 my-auto"
    outlined
  >
<v-form
      ref="form"
    >
    <v-alert type="success" v-if="$route.query.success">
      {{$route.query.success}}
    </v-alert>
    <v-alert type="error" v-if="error">
      {{error}}
    </v-alert>
      <v-text-field
        v-model="email"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        required
        type="password"
      ></v-text-field>

        <v-btn
          v-if="loading"
          dark
          class="cyan"
          @click="login"
          loading>
          Login
        </v-btn>
        <v-btn
          v-else
          dark
          class="cyan"
          @click="login"
          >
          Login
        </v-btn>
        <Strong class="mx-10">Or</Strong>
        <v-btn
          dark
          class="cyan"
          @click="retoreg">
          Signup
        </v-btn>

    </v-form>
</v-card>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      loading:false
    }
  },
  created(){
    this.check()
  },
  methods: {
    async login () {
      try {
        this.loading=true
        await this.sleep(1000)
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('auth/setToken', response.data.token)
        this.$store.dispatch('auth/setUser', response.data.user)
        this.$router.push({
          name: 'mypage'
        })
      } catch (error) {
        this.error = error.response.data.error
        this.loading=false
      }
      
    },
    check() {
      if (this.$store.state.auth.isUserLoggedIn) {
        this.$router.push({
        name: 'dashboard'
      })
      }
    },
    retoreg() {
      this.$router.push({
        name: 'register'
      })
    },
    sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }
  },
  }
</script>

<style scoped>
</style>
