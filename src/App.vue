<template>
  <div id="app">
    <h1>Get your Comark here!</h1>
    <router-link to="/editor/default">go to editor</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  import editor from "./components/editor.vue"
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    "editor": editor
  }
}
</script>

<style>

</style>
