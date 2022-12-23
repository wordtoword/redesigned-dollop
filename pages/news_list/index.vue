<template>
    <div>
      <p>List of Articles{{ this.$route.query.page }}</p>
      <div v-for="n in response.list" :key="n.slug">
        <nuxt-link :to="`/news_list/${n.topics_id}`">
          {{ n.ymd }} {{ n.subject }}
        </nuxt-link>
     </div>

+    <Pagenator v-bind="{ ...response.pageInfo }" />
   </div>
 </template>
  
    </div>
  </template>
  
  <script>
  export default {
    async asyncData({ $axios, route }) {
      return {
        response: await $axios.$get('/rcms-api/5/content/news', {
          params: {
            pageID: route.query.page || 1,
          },
        }),
      };
    },
  };
  </script>