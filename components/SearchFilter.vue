<template>
  <div class="searchfilter_container">
    <h3>{{ title }}</h3>
    <div
      v-for="(filter, i) in listFilters.slice(0, limit)"
      :key="i"
    >
      <v-checkbox
        v-model="filtersSelected"
        :value="filter.filter"
        :label="filter.filter.substr(0, 12)"
        class="searchfilter_checkbox"
        @change="onChange(filter)"
      />
      <span class="searchfilter_nbResults">({{ filter.count }})</span>
    </div>
    <v-btn text small @click="limit = limit === 8 ? -1 : 8 ">
      {{ limit === 8 ? '+ See more' : '- See less' }}
    </v-btn>
    <v-divider />
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
      limit: 8
    }
  },
  computed: {
  },
  mounted () {
    this.filtersSelected = this.value.filter(filter => (
      filter.category === this.title && this.listFilters.find(f => f === filter.name)
    ))
  },
  methods: {
    onChange (changed) {
      const index = this.value.findIndex(f => f.category === this.title && f.filter === changed.filter)
      const newValue = JSON.parse(JSON.stringify(this.value))
      if (index !== -1) {
        newValue.splice(index, 1)
      } else {
        newValue.push({ category: this.title, filter: changed.filter })
      }
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    }
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
.searchfilter_container {
  margin-top: 30px;
}
.searchfilter_nbResults {
  float: right;
}
</style>
