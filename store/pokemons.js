export const state = () => ({
  list: []
})

export const mutations = {
  set (state, pokemons) {
    state.list = pokemons
  }
}
