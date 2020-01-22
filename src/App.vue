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
};
</script>

<style scoped>
#id{
  background-color: aqua !important;
}
</style>
