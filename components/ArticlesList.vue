<template>
  <div>
    <v-layout justify-center row>
      <v-progress-circular
        v-if="loading"
        :size="70"
        :width="7"
        color="green"
        indeterminate
      />
      <v-flex xs8>
        <v-text-field
          v-model="searchText"
          outlined
          label="Search"
          append-icon="mdi-magnify"
        />
      </v-flex>
      <v-flex xs4>
        <v-select
          v-model="sortSelected"
          :items="Object.keys(sortFunctions)"
          label="Sort by"
          outlined
        />
      </v-flex>
      <v-flex
        v-for="(pokemon, i) in sortFunctions[sortSelected](searchPokemons(pokemons))"
        :key="i"
        xs12
        md6
        lg4
      >
        <v-card
          flat
          outlined
        >
          <v-img
            :key="pokemon.pokemonName"
            height="200px"
            :src="`https://loremflickr.com/120/80?random=${pokemon.pokemonName}`"
          />
          <v-card-title class="align-end fill-height">
            {{ pokemon.pokemonName }}
          </v-card-title>
          <v-card-text>
            <v-chip
              v-for="(formattedContent, j) in formatCardContent(pokemon)"
              :key="j"
            >
              {{ formattedContent }}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn outlined>
              Add to list
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import categoriesList from '../utils/categories.js'

export default {
  props: {
    allPokemons: {
      type: Array,
      required: true
    },
    filters: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      searchText: '',
      sortSelected: 'relevant',
      sortFunctions: {
        'relevant': (pokemons) => {
          return pokemons.sort((a, b) => {
            return this.filters.reduce((acc, filter) => {
              return acc +
              categoriesList[filter.category].get(a).reduce((acc, pokemonFilter) => (filter.name === pokemonFilter ? acc + 1 : acc), 0) -
              categoriesList[filter.category].get(b).reduce((acc, pokemonFilter) => (filter.name === pokemonFilter ? acc + 1 : acc), 0)
            }, 0)
          })
        },
        'A => Z': pokemons => pokemons.sort((a, b) => b.pokemonName < a.pokemonName ? 1 : b.pokemonName > a.pokemonName ? -1 : 0),
        'Z => A': pokemons => pokemons.sort((a, b) => a.pokemonName < b.pokemonName ? 1 : a.pokemonName > b.pokemonName ? -1 : 0)
      }
    }
  },
  computed: {
    pokemons () {
      return this.filterPokemons(this.allPokemons, this.filters)
    }
  },
  methods: {
    searchPokemons (pokemons) {
      return pokemons.filter(pokemon => pokemon.pokemonName.includes(this.searchText))
    },
    formatCardContent (pokemon) {
      return Object.keys(categoriesList).filter(key => key in pokemon).reduce((acc, key) => (acc.concat(categoriesList[key].get(pokemon))), [])
    },
    filterPokemons (allPokemons, filters) {
      let res
      if (filters.length === 0) {
        res = allPokemons
      } else {
        res = allPokemons.filter(pokemon => (
          filters.find(filter => (
            categoriesList[filter.category].get(pokemon).reduce((acc, pokemonFilter) => (filter.name === pokemonFilter ? acc + 1 : 0), 0)
          ))
        ))
      }
      this.loading = false
      return res
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
.searchfilter_nbResults {
  float: right;
}
</style>
