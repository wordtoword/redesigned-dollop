<template>
    <div>
      <h1 class="title">{{ response.details.subject }}</h1>
      <div class="post" v-html="response.details.contents"></div>
    </div>
</template>

<script>
export default {
    async asyncData ({ $axios, params, app }) {
        if(app.i18n.locale === 'ja'){
            try {
                const response = await $axios.$get(process.env.BASE_URL + '/rcms-api/1/content/announcements/' + { "topics_id": 13 })
                console.log(response);
                return { response }
                }catch (e) {
                    console.log(e.message)
                    }
        }
        else{
            try {
                const response = await $axios.$get(process.env.BASE_URL + '/rcms-api/1/content/announcements/' + { "topics_id": 13 } + '?lang=ja')
                console.log(response);
                return { response }
                }catch (e) {
                    console.log(e.message)
                    }
        }
    },
}
</script>