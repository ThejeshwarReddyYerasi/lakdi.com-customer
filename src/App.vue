<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>
<script>

import navbar from './components/Navbar'

export default {
  name: 'App',

  components: {
    navbar,
  },

  data: () => ({
    //
  }),
  created(){
    fetch('/backend/spring-cloud-eureka-client-search/search/searchQuery/red',{
      method: 'GET'
    })
  }
};
</script>

<style scoped>
#id{
  background-color: aqua !important;
}
</style>
