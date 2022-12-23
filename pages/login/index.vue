<template>
  <form @submit.prevent="login">
    <p v-if="loginStatus !== null" :style="{ color: resultMessageColor }">
      {{ resultMessage }}
    </p>

      <input v-model="sitekey" name="sitekey" type="sitekey" placeholder="sitekey">
      <input v-model="email" name="email" type="email" placeholder="email">
      <input
          v-model="password"
          name="password"
          type="password"
          placeholder="password"
      >
      <button type="submit">
          Login
      </button>

      <div>
          <nuxt-link to="/announcements/">
              To News list
          </nuxt-link>
      </div>
      <div>
          <nuxt-link to="/owners-page/">
              To Subscribers page
          </nuxt-link>
      </div>
  </form>
</template>

<script>
export default {
  data () {
      return {
          sitekey: '',
          email: '',
          password: '',
          loginStatus: null,
          resultMessage: null
      }
  },
  computed: {
      resultMessageColor () {
          switch (this.loginStatus) {
          case 'success':
              return 'green'
          case 'failure':
              return 'red'
          default:
              return ''
          }
      }
  },
  methods: {
      async login () {
          try {
              const payload = {
                  sitekey: this.sitekey,
                  loginInfo: {
                      email: this.email,
                      password: this.password
                  }
              }
              await this.$store.dispatch('login', payload)
              this.loginStatus = 'success'
              this.resultMessage = 'Login successful'
          } catch (e) {
              this.loginStatus = 'failure'
              this.resultMessage = 'Login failed'
          }
      }
  }
}
</script>