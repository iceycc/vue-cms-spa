<template>
  <div>
    <app-header :user="user"></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from '../common/Header.vue'
import AppFooter from '../common/Footer.vue'
export default {
  // 路由 导航 钩子
  async beforeRouteEnter(to, from, next) {
    // 路由导航钩子不能在 Header 组件中去使用，因为 Header 组件没有路由
    // 所以这里更合理的是获取登陆状态给 Header 组件
    // 至于 Header 组件拿这个登陆状态要干嘛是它自己的事情
    // 这里利用组件传值的方式把数据传递给子组件
    try {
      const { data: sessionUser } = await axios.get('/api/session')
      next(vm => {
        vm.user = sessionUser
      })
    } catch (err) {
      next()
    }
  },
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      foo: 'bar',
      user: null
    }
  },
  methods: {
    async getSessionUser() {
      try {
        const { data: sessionUser } = await axios.get('/api/session')
        this.user = sessionUser
      } catch (err) {}
    }
  }
}
</script>
<style>
</style>
