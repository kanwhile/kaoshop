const state = {
  products: [],
}

const getters = {}

const actions = {
  setProduct: ({ commit }, payload) => {
    commit('SET_PRODUCT', payload)
  },
  removeAllProduct: ({commit},payload) => {
    commit('REMOVE_ALL_PRODUCT', payload)
  },
  removeProduct: ({ commit }, payload) => {
    commit('REMOVE_PRODUCT', payload)
  },
  setQuantity: ({ commit }, payload) => {
    commit('SET_PRODUCT_QUANTITY', payload)
  }
}

const mutations = {
  SET_PRODUCT(state, payload) {
    payload.quantity = 1;
    state.products.push(payload);
  },
  REMOVE_PRODUCT(state, payload) {
    state.products.splice(
      state.products.findIndex(v => v.id === payload.id),1
    );
  },
  REMOVE_ALL_PRODUCT(state){
    state.products = [];
  },
  SET_PRODUCT_QUANTITY(state,payload){
    console.log(payload.value);
    state.products[payload.index].quantity = payload.value;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}