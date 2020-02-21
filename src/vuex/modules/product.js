const state = {
    currentCounter: 0
  }
  
  const getters = { }
  
  const actions = {
    increaseCounter: ({ commit, state }, payload) => {
        console.log(state,payload)
      commit('INCREASE_CURRENT_COUNTER')
    }
  }
  
  const mutations = {
    INCREASE_CURRENT_COUNTER (state, payload) {
        console.log(state,payload)
      state.currentCounter++
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }