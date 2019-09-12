const getPokemonInfos = async (axiosGet, pokemonName, categories) => {
  const data = await axiosGet(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  const pokemon = { pokemonName }
  categories.forEach((category) => {
    pokemon[category] = data[category]
  })
  return pokemon
}

const getAllPokemon = async (axiosGet, limit, offset, categories) => {
  const data = await axiosGet(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
  const allPokemons = await Promise.all(data.results.map(async (pokemon) => {
    const res = await getPokemonInfos(axiosGet, pokemon.name, categories)
    return res
  }))
  return allPokemons
}

export default getAllPokemon
