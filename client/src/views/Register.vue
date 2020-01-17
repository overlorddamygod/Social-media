<template>
<v-card
    class="mx-auto pa-10 my-auto"
    outlined
  >
<v-form
      ref="form"
    >
      <v-text-field
        v-model="name"
        label="Name"
        required
      ></v-text-field>

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
        dark
        class="cyan"
        @click="register"
      >
        Register
      </v-btn>
      <Strong class="mx-10">Or</Strong>

      <v-btn
          dark
          class="cyan"
          @click="retolog">
          Login
        </v-btn>

    </v-form>
</v-card>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      name:'',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          name:this.name,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'home',
          query: { success:"Succesfully Created Account. Please Log In" } }
        )
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    retolog() {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
</style>
