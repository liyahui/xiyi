<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {}
  }
</script>

<style>
  @import "~normalize.css";

  * {
    outline: none !important;
  }

  #app {
    min-width: 1000px;
  }

  .detail-drawer {
    width: auto !important;
  }
</style>
