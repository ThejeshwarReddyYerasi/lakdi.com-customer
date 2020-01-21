import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    category:'',
    productListForSearch: ''
  },
  getters:{
    getCategory: state => {
      return state.category;
    },
    getSearch: state => {
      return state.productListForSearch;
    }

  },
  mutations: {
    UPDATE_CATEGORY: (state,payload) => {
      state.category = payload;
    },
    SEARCH: (state,payload) => {
      //get request 
      state.productListForSearch = payload;
    }
  },
  actions: {
    updateCategory(context,payload){
      context.commit('UPDATE_CATEGORY',payload);
    },
    search(context,payload){
      context.commit('SEARCH',payload);
    }
  },
  modules: {
  }
})
