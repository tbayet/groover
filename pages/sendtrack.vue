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
        <search-filters v-if="filterCategories.length" v-model="allFiltersSelected" :categories="filterCategories" />
        <div></div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import getAllPokemon from '../utils/pokemonAPI.js'
import categories from '../utils/categories.json'
import SearchFilters from '../components/SearchFilters.vue'

export default {
  async asyncData (context) {
    const allPokemons = await getAllPokemon(25, 0, categories)
    return { allPokemons }
  },
  components: {
    SearchFilters
  },
  data () {
    return {
      allPokemons: [],
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
      ],
      filterCategories: []
    }
  },
  methods: {
    getFilters (allPokemons) {
      const filtersFunctions = {
        abilities: (categoryAbilities, pokemon) => {
          pokemon.abilities.forEach(({ ability }) => {
            if (!categoryAbilities.filters.includes(ability.name)) {
              categoryAbilities.filters.push(ability.name)
            }
          })
        },
        types: (categoryTypes, pokemon) => {
          pokemon.types.forEach(({ type }) => {
            if (!categoryTypes.filters.includes(type.name)) {
              categoryTypes.filters.push(type.name)
            }
          })
        }
      }
      this.filterCategories = categories.map(c => ({ name: c, filters: [] }))
      allPokemons.forEach((pokemon) => {
        this.filterCategories.forEach((category) => {
          filtersFunctions[category.name](category, pokemon)
        })
      })
      console.log(this.filterCategories)
    }
  },
  mounted () {
    getAllPokemon(151 - 25, 25, categories).then((restOfAllPokemons) => {
      this.allPokemons = this.allPokemons.concat(restOfAllPokemons)
      console.log(this.allPokemons)
      this.getFilters(this.allPokemons)
    })
  }
}
</script>
