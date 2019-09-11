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
import axios from 'axios'
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
      // allPokemons: [],
      allFiltersSelected: [],
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
      ]
    }
  },
  computed: {
    ...mapState({
      pokemons: state => state.pokemons.list,
      filters: state => state.filters.list
    })
  },
  async asyncData ({ $axios }) {
    const allPokemons = await getAllPokemon(true, $axios.$get, 25, 0, Object.keys(categoriesList))
    return { allPokemons }
  },
  mounted () {
    this.setPokemons(this.pokemons)
    this.setFilters(this.getFilters(this.allPokemons))
    getAllPokemon(false, axios.get, 151 - 25, 25, Object.keys(categoriesList)).then((restOfAllPokemons) => {
      this.setPokemons(this.allPokemons.concat(restOfAllPokemons))
      this.setFilters(this.getFilters(this.pokemons))
    })
  },
  methods: {
    ...mapMutations({
      setPokemons: 'pokemons/set',
      setFilters: 'filters/set'
    }),
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
