<template>
<div class="header">
  <nav class="navbar navbar-default">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#/">
          <img width="90px" src="./logo3.png" alt="">
        </a>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <form class="navbar-form navbar-left">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
          </div>
        </form>
        <ul class="nav navbar-nav navbar-right">
          <template v-if="user">
            <a class="btn btn-default navbar-btn" href="#/topic/new">发起</a>
            <li @click.prevent="show = !show" class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img width="20" height="20" src="./avatar-max-img.png" alt=""> <span class="caret"></span></a>
              <ul class="dropdown-menu" :style="{display: show ? 'block' : 'none'}">
                <li class="dropdown-current-user">
                  当前登录用户: xxx
                </li>
                <li role="separator" class="divider"></li>
                <li><a href="#">个人主页</a></li>
                <li><a href="#/settings/profile">设置</a></li>
                <li><a @click.prevent="logoutHandler" href="#">退出</a></li>
              </ul>
            </li>
          </template>
          <template v-else>
            <a class="btn btn-primary navbar-btn" href="#/login">登录</a>
            <a class="btn btn-success navbar-btn" href="#/register">注册</a>
          </template>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
</div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    // 父组件只会被路由守卫给卡主的，但是子组件也会预加载
    // 子组件确实会受父组件的数据的影响，但是如果你在钩子中想要即时获取，那你拿到的只是 null
    // setTimeout(() => {
    //   console.log(this.user)
    // })
  },
  methods: {
    async logoutHandler () {
      try {
        await axios.delete('/api/session')
        this.$router.push('/login')
      } catch (err) {
        window.alert('退出失败')
      }
    }
  }
}
</script>

<style>
</style>
