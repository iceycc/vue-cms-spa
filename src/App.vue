<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
import AppHeader from './components/common/Header.vue'
import AppFooter from './components/common/Footer.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
