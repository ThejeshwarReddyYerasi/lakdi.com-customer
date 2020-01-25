<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>
<script>

import navbar from './components/Navbar'
// import {auth } from "./firebaseConfig";
export default {
  name: 'App',

  components: {
    navbar,
  },

  data: () => ({
    //
  }),
  created(){
    if(localStorage.getItem('user-token')===null){
      window.console.log("appfalse")
    }else{
      window.console.log("apptrue")
    }
    }
};
</script>

<style scoped>
#id{
  background-color: aqua !important;
}
</style>
