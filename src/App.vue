<template>
  <div id="app">
    <navbar></navbar>
      <!-- <router-link to="/about">About</router-link> -->
      <!-- <router-link to="/theja">Theja</router-link> -->
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
};
</script>

<style scoped>
#id{
  background-color: aqua !important;
}
</style>
