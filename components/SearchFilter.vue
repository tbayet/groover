<template>
  <div>
    <h3>{{ title }}</h3>
    <div
      v-for="(filter, i) in filters"
      :key="i"
    >
      <v-checkbox
        v-model="filter.active"
        :label="filter.name"
        class="searchfilter_checkbox"
      ></v-checkbox>
      <span class="searchfilter_nbResults">(35)</span>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      filters: [],
      limit: 3
    }
  },
  mounted () {
    this.filters = JSON.parse(JSON.stringify(this.value))
  }
}
</script>

<style scoped>
.searchfilter_checkbox {
  display: inline-flex;
  height: 30px;
  padding: 0;
  margin: 0;
}
.searchfilter_nbResults {
  float: right;
}
</style>
