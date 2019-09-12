<template>
  <div>
    <search-filter
      v-for="(filterCategory, i) in categories"
      :key="i"
      v-model="allFiltersSelected"
      :title="filterCategory.name"
      :list-filters="filterCategory.filters"
      @change="onChange"
    />
  </div>
</template>

<script>
import SearchFilter from './SearchFilter.vue'

export default {
  components: {
    SearchFilter
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allFiltersSelected: []
    }
  },
  mounted () {
    this.allFiltersSelected = JSON.parse(JSON.stringify(this.value))
  },
  methods: {
    onChange (e) {
      this.allFiltersSelected = JSON.parse(JSON.stringify(this.allFiltersSelected))
      this.$emit('input', this.allFiltersSelected)
    }
  }
}
</script>
