import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
  state: {
    productListForCategory:'',
    productListForSearch: '',
    categoryListObject:''
  },
  getters:{
  },
  mutations: {
    GET_PRODUCTS_OF_PARTICULAR_CATEGORY: (state,payload) => {
      axios.get(`http://10.177.69.50:8762/spring-cloud-eureka-client-product/product/getCategoryProducts/${payload}`)
      .then(function(response){
        window.console.log(response.data);
        state.productListForCategory  = response.data;
      })
      .catch(function(err){
        window.console.log(err);
      })
    },
    SEARCH: (state,payload) => {
      //get request 
      axios.get(`http://10.177.69.50:8762/spring-cloud-eureka-client-search/search/searchQuery/${payload}`)
      .then(function(response){
        state.productListForSearch = response.data;
      })
      .catch(function(err){
        window.console.log(err)
      })
    },
    GET_CATEGORIES: (state) => {
      // window.console.log("in state")
      axios.get('http://10.177.69.50:8762/spring-cloud-eureka-client-product/product/getCategories')
      .then(function(response){
        window.console.log(response.data);
        state.categoryListObject = response.data;
        // window.console.log(state.categoryListObject.data)
      }).catch(function(err){
        window.console.log(err);
      })
    }
  },
  actions: {
    getProductsOfParticularCategory(context,payload){
      context.commit('GET_PRODUCTS_OF_PARTICULAR_CATEGORY',payload);
    },
    search(context,payload){
      context.commit('SEARCH',payload);
    },
    getCategories(context){
      context.commit('GET_CATEGORIES');
    }
  },
  modules: {
  }
})
