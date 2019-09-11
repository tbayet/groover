import axios from 'axios'

const getPokemonInfos = async (pokemonName, categories) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  const pokemon = { pokemonName }
  categories.forEach((category) => {
    pokemon[category] = data[category]
  })
  return pokemon
}

const getAllPokemon = async (limit, offset, categories) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
  const allPokemons = await Promise.all(data.results.map(async (pokemon) => {
    const res = await getPokemonInfos(pokemon.name, categories)
    return res
  }))
  return allPokemons
}

export default getAllPokemon
