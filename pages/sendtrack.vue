<template>
  <v-layout
    row
  >
    <v-flex
      xs12
      md10
      lg8
    >
      <v-layout
        row
        justify-center
        align-center
      >
        <search-filters v-if="filterCategories.length" v-model="filterCategories" />
        <div></div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import SearchFilters from '../components/SearchFilters.vue'

export default {
  components: {
    SearchFilters
  },
  data () {
    return {
      filtersModel: [
        {
          active: false,
          name: 'Autres'
        },
        {
          active: false,
          name: 'Chanson'
        },
        {
          active: false,
          name: 'Electronic'
        },
        {
          active: false,
          name: 'Else'
        }
      ],
      filterCategories: [],
      filterCategoriesTMP: [
        {
          name: 'Type',
          request: 'type'
        },
        {
          name: 'Color',
          request: 'pokemon-color'
        }
      ]
    }
  },
  methods: {
    getFilters () {
      this.filterCategories = this.filterCategoriesTMP.map(category => ({ ...category, filters: [...this.filtersModel] }))
      console.log(this.filterCategories)
    }
  },
  mounted () {
    this.getFilters()
  }
}
</script>
