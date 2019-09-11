<template>
  <div>
    <search-filter
      v-for="(filterCategory, i) in filterCategories"
      :key="i"
      :title="filterCategory.name"
      v-model="filterCategory.filters"
    />
  </div>
</template>

<script>
import SearchFilter from './SearchFilter.vue'

export default {
  props: {
    value: Array
  },
  data () {
    return {
      filterCategories: []
    }
  },
  mounted () {
    console.log(this.value)
    this.filterCategories = JSON.parse(JSON.stringify(this.value))
  },
  components: {
    SearchFilter
  }
}
</script>
<style>
</style>
