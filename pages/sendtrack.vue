<template>
  <v-layout justify-center row>
    <v-flex
      xs12
      md10
      lg10
    >
      <div class="contentContainer">
        <div class="searchFilters">
          <search-filters
            v-if="filters.length"
            v-model="allFiltersSelected"
            :categories="filters"
          />
        </div>
        <div class="articlesList">
          <articles-list
            v-if="pokemons.length"
            :all-pokemons="pokemons"
            :filters="allFiltersSelected"
          />
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import getAllPokemon from '../utils/pokemonAPI.js'
import categoriesList from '../utils/categories.js'
import SearchFilters from '../components/SearchFilters.vue'
import ArticlesList from '../components/ArticlesList.vue'

export default {
  components: {
    SearchFilters,
    ArticlesList
  },
  data () {
    return {
      /** Contains all selected filters
       * [{ category: <String>, filter: <String> }]
       */
      allFiltersSelected: []
    }
  },
  computed: {
    ...mapState({
      pokemons: state => state.pokemons.list,
      filters: state => state.filters.list
    })
  },
  // get the 25 firts pokemons on server-side
  async asyncData ({ $axios }) {
    const allPokemons = await getAllPokemon($axios.$get, 25, 0, Object.keys(categoriesList))
    return { allPokemons }
  },
  created () {
    this.setPokemons(this.allPokemons)
    this.setFilters(this.getFilters(this.allPokemons))
  },
  // get the rest of the 151 pokemons on client-side and merge it
  mounted () {
    getAllPokemon(this.$axios.$get, 151 - 25, 25, Object.keys(categoriesList)).then((restOfAllPokemons) => {
      this.setPokemons(this.allPokemons.concat(restOfAllPokemons))
      this.setFilters(this.getFilters(this.pokemons))
    })
  },
  methods: {
    ...mapMutations({
      setPokemons: 'pokemons/set',
      setFilters: 'filters/set'
    }),
    // Feed the filter categories from datas and count their respective population
    getFilters (allPokemons) {
      const filterCategories = Object.keys(categoriesList).map(c => ({ name: c, filters: [] }))
      allPokemons.forEach((pokemon) => {
        filterCategories.forEach((category) => {
          categoriesList[category.name].get(pokemon).forEach((filter) => {
            const filterExists = category.filters.find(f => f.filter === filter)
            if (!filterExists) {
              category.filters.push({ filter, count: 1 })
            } else {
              filterExists.count++
            }
          })
        })
      })
      return filterCategories
    }
  }
}
</script>

<style scoped>
.searchFilters {
  flex: 1 1 200px;
  width: 200px;
}
.articlesList {
  padding: 20px;
  padding-left: calc(20px + 10%);
  flex: 1 1 100%;
}
.contentContainer {
  display: flex;
  justify-content: center;
}
</style>
