<template>
  <div>
    <p>News list page{{ this.$route.params.page }}</p>
    <div v-for="n in response.list" :key="n.slug">
      <nuxt-link :to="'/news/' + n.slug">{{ n.ymd }} {{ n.subject }}</nuxt-link>
    </div>
    <ul style="list-style: none; display: flex">
      <li v-if="response.pageInfo.pageNo === 1">Previous</li>
      <li v-else><nuxt-link :to="'/news/list/' + (response.pageInfo.pageNo -1)">Previous</nuxt-link></li>
      <li v-for="i in response.pageInfo.totalPageCnt" :key="i">
        <nuxt-link :to="'/news/list/' + i">{{i}}</nuxt-link>
      </li>
      <li v-if="response.pageInfo.pageNo === response.pageInfo.totalPageCnt">Next</li>
      <li v-else><nuxt-link :to="'/news/list/' + (response.pageInfo.pageNo +1)">Next</nuxt-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      response: {
        list: [],
        pageInfo: {}
      },
    }
  },
  async mounted() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      console.log('aaaaaaaaaa');
      try {
        this.response = await this.$axios.$get(
          process.env.BASE_URL + '/rcms-api/1/news',
          {
            params: {
              pageID: this.$route.params.page,
            },
          }
        )
      } catch (e) {
        console.log(e.message)
      }
    },
  }
}
</script>