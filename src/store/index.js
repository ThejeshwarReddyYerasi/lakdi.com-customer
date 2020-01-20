import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    category:''
  },
  getters:{
    getCategory: state => {
      return state.category;
    }
  },
  mutations: {
    UPDATE_CATEGORY: (state,payload) => {
      state.category = payload;
    }
  },
  actions: {
    updateCategory(context,payload){
      context.commit('UPDATE_CATEGORY',payload);
    }
  },
  modules: {
  }
})
