const state = () => ({
  isLoading: false,
  snackbars: [],
})

const actions = {
  setSnackbar({ commit }, snackbar) {
    snackbar.showing = true
    snackbar.color = snackbar.color || 'success'
    snackbar.timeout = snackbar.timeout || 5000
    commit('addSnackbar', snackbar)
  },
  hideSnackbar({ commit }, index) {
    commit('hideSnackbar', index)
  },
}

const mutations = {
  addSnackbar(state, snackbar) {
    state.snackbar = snackbar
    state.snackbars = state.snackbars.concat(snackbar)
  },
  hideSnackbar(state, index) {
    state.snackbars[index].showing = false
  },
}

export default {
  state,
  // getters,
  actions,
  mutations,
}
