<template>
    <div>
      <h1>{{ response.details.ext_1}}</h1>
      <p>{{ response.details.ext_2}}</p>
  
    <button type="button" @click="logout">
    Logout
    </button>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    middleware: 'auth',
    async asyncData({$axios}) {
      try {
        console.log($axios.defaults.baseURL);
        const response = await $axios.$get('/rcms-api/3/service_top/3')
        return { response }
      } catch (e) {
        console.log(e.message)
      }
    },
    methods: {
      ...mapActions(['logout'])
    }
  }
  </script>