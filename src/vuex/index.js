import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product'
import stockform from './modules/stockform'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    product,
    stockform
  },
  strict: debug
})