<docs>
  ## 入口文件.
  > 尽量从App.vue里开发.而不是直接从 html里开发
</docs>

<template lang="pug">
  div
    <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
    components: {
     
    },
    data() {
      return {
  
      }
    },
  
    mounted() {
  
    },
    computed: {
  
    },
    methods: {
     
    }
  }
</script>

<style lang="scss">
  @import './styles/variable';
  body {
    font-size: $font-size-normal;
  }
</style>

<style>
  /*reset*/
  * {
    margin: 0;
    padding: 0;
  }
  em {
    font-style: normal;
  }
  
  ul,
  li {
    list-style: none;
  }
</style>
