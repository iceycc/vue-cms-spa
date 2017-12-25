<template>
<div class="container">
  <setting-aside></setting-aside>
  <router-view></router-view>
</div>
</template>

<script>
import SettingAside from './SettingAside.vue'

export default {
  components: {
    SettingAside
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>

