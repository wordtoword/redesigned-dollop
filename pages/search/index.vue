
<template>
  <div>
    <div class="search-form">
      <p>
        <label for="subject">Title</label>
        <input v-model="searchInput.subject" type="text">
      </p>
      <p>
        <label for="inst_ymdhi">Created at</label>
        <input v-model="searchInput.inst_ymdhi.from" type="date"> 
        ~
        <input v-model="searchInput.inst_ymdhi.to" type="date"> 
      </p>
      <p>
        <label for="ext_1">Text</label>
        <input v-model="searchInput.ext_1" type="text">
      </p>
      <p>
        <label for="ext_2">Select</label>
        <select v-model="searchInput.ext_2">
          <option value="">Not selected</option>
          <option value="01">option1</option>
          <option value="02">option2</option>
          <option value="03">option3</option>
        </select>
      </p>
      <p>
        <label for="ext_3">Checkbox</label>
        <input v-model="searchInput.ext_3" type="checkbox" value="01">option1
        <input v-model="searchInput.ext_3" type="checkbox" value="02">option2
        <input v-model="searchInput.ext_3" type="checkbox" value="03">option3
      </p>  
      <button type="button" @click="search">Search</button>
    </div>
    <div v-if="Object.keys(searchResult).length > 0" class="search-result">
      <template v-if="(searchResult.errors || []).length === 0">
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Created at</th>
            <th>Text</th>
            <th>Select</th>
            <th>Checkbox</th>
          </tr>
          <tr v-for="content in searchResult.list" :key="content.topics_id">
            <td>{{ content.topics_id }}</td>
            <td>{{ content.subject }}</td>
            <td>{{ content.inst_ymdhi }}</td>
            <td>{{ content.ext_1 }}</td>
            <td>{{ content.ext_2 }}</td>
            <td>{{ content.ext_3 }}</td>
          </tr>
        </table>
      </template>
      <template v-else>
        {{ searchResult.errors }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: {
        subject: '',
        inst_ymdhi: {
          from: '',
          to: '',
        },
        ext_1: '',
        ext_2: '',
        ext_3: []
      },
      searchResult: {},
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    // Send request to the endpoint and store the fetch result in 'searchResult'.
    async search() {
      let searchResult;
      try {
        // Replace the endpoint URL below with your own.
        const response = await this.$axios.get("/rcms-api/1/content", {
          params: {
            filter: this.buildFilterQuery()
          }
        })
        searchResult = response?.data || {};
      } catch(errorResponse) {
        console.log(errorResponse);
        searchResult = { errors: errorResponse?.data?.errors || ['Unexpected error'] };
      }
      this.searchResult = searchResult;
    },
    // Generate filter query
    buildFilterQuery() {
      const filterQuery = Object.entries(this.searchInput).reduce((queries, [col, value]) => {
        switch (col) {
          // Date: Select range
          case 'inst_ymdhi':
            if (value.from !== '') {
              queries.push(`${col} >= "${value.from}"`);
            }
            if (value.to !== '') {
              queries.push(`${col} <= "${value.to}"`);
            }
            break;
          // Text: Partial match
          case 'subject':
          case 'ext_1':
            if (value !== '') {
              queries.push(`${col} contains "${value}"`);
            }
            break;
          // Select: Full match
          case 'ext_2':
            if (value !== '') {
              queries.push(`${col} = "${value}"`);
            }
            break;
          // Checkbox : Partial match
          case 'ext_3':
            if (value.length > 0) {
              queries.push('(' + value.map(v => `${col} contains "${v}"`).join(' OR ') + ')');
            }
            break;
          default:
            break;
        }
        return queries;
      }, []).join(' AND ');

      return filterQuery;
    }
  }
}
</script>

<style scoped>
.search-form {
  border: 1px solid;
  padding: 10px;
}
.search-form label {
  display: block;
  float: left;
  width: 100px;
}
.search-result {
  width: 100%;
  margin-top: 20px;
}
.search-result table, th, td {
  border: solid 1px;
  border-collapse: collapse;
}
.search-result th, td {
  padding: 5px;
}
.search-result table {
  width: 100%;
}
</style>