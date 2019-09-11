<template>
  <div>
    <search-filter
      v-for="(filterCategory, i) in categories"
      :key="i"
      :title="filterCategory.name"
      v-model="allFiltersSelected"
      :listFilters="filterCategory.filters"
    />
  </div>
</template>

<script>
import SearchFilter from './SearchFilter.vue'

export default {
  props: {
    value: Array,
    categories: Array
  },
  data () {
    return {
      allFiltersSelected: []
    }
  },
  mounted () {
    console.log(this.value)
    this.allFiltersSelected = JSON.parse(JSON.stringify(this.value))
  },
  components: {
    SearchFilter
  }
}
</script>
<style>
</style>
