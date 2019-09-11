<template>
  <div>
    <h3>{{ title }}</h3>
    <div
      v-for="(filter, i) in listFilters"
      :key="i"
    >
      <v-checkbox
        v-model="filtersSelected"
        :value="filter"
        :label="filter"
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
    },
    listFilters: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      filtersSelected: [],
      allFiltersSelected: [],
      limit: 3
    }
  },
  mounted () {
    this.allFiltersSelected = JSON.parse(JSON.stringify(this.value))
    this.filtersSelected = this.allFiltersSelected.filter(filter => (
      filter.category === this.title && this.listFilters.find(f => f === filter)
    ))
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
