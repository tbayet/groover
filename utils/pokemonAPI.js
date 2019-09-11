const getPokemonInfos = async (ssr, axiosGet, pokemonName, categories) => {
  let data = await axiosGet(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  data = ssr ? data : data.data
  const pokemon = { pokemonName }
  categories.forEach((category) => {
    pokemon[category] = data[category]
  })
  return pokemon
}

const getAllPokemon = async (ssr, axiosGet, limit, offset, categories) => {
  let data = await axiosGet(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
  data = ssr ? data : data.data
  const allPokemons = await Promise.all(data.results.map(async (pokemon) => {
    const res = await getPokemonInfos(ssr, axiosGet, pokemon.name, categories)
    return res
  }))
  return allPokemons
}

export default getAllPokemon
