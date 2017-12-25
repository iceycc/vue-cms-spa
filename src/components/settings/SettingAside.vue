<template>
<div class="col-md-3 list-group">
  <a href="" class="list-group-item disabled">用户设置</a>
  <router-link class="list-group-item" to="/settings/profile" active-class="active">基本信息</router-link>
  <router-link class="list-group-item" to="/settings/admin" active-class="active">账户设置</router-link>
</div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
</style>
