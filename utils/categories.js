const categoriesList = {
  types: {
    name: 'Types',
    get: pokemon => pokemon.types.map(({ type }) => type.name)
  },
  abilities: {
    name: 'Abilities',
    get: pokemon => pokemon.abilities.map(({ ability }) => ability.name)
  }
}

export default categoriesList
