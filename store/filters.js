export const state = () => ({
  list: []
})

export const mutations = {
  set (state, filters) {
    state.list = filters
  }
}
