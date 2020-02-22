const state = {
  products: [],
}

const getters = {}

const actions = {
  setProduct: ({ commit }, payload) => {
    commit('SET_PRODUCT_NAME', payload)
  },
  removeProduct: ({ commit }, payload) => {
    commit('REMOVE_PRODUCT', payload)
  },
  setQuality: ({ commit }, payload) => {
    commit('SET_PRODUCT_QUALITY', payload)
  }
}

const mutations = {
  SET_PRODUCT_NAME(state, payload) {
    payload.quality = 1;
    state.products.push(payload);
  },
  REMOVE_PRODUCT(state, payload) {
    state.products.splice(
      state.products.findIndex(v => v.id === payload.id),1
    );
  },
  SET_PRODUCT_QUALITY(state,payload){
    state.products[payload.index].quality = payload.value;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}