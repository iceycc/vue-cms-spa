<template>
<div class="main">
  <div class="header">
    <a href="#/">
      <img src="../../assets/img/logo3.png" alt="">
    </a>
    <h1>用户登录</h1>
  </div>
  <form @submit.prevent="loginHandler">
    <div class="form-group">
      <label for="exampleInputEmail1">邮箱</label>
      <input
        class="form-control"
        v-model="formData.email"
        required
        type="email"
        id="exampleInputEmail1" placeholder="Email" autofocus>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">密码</label>
      <a class="pull-right" href="">忘记密码？</a>
      <input
        class="form-control"
        v-model="formData.password"
        required
        type="password"
        id="exampleInputPassword1" placeholder="Password">
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox">记住我
      </label>
    </div>
    <p class="error-message" v-show="loginMessage">{{ loginMessage }}</p>
    <button type="submit" class="btn btn-success btn-block">登录</button>
  </form>
  <div class="message">
    <p>没有账号? <a href="/register">点击创建</a>.</p>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data () {
    return {
      formData: {
        email: '',
        password: ''
      },
      loginMessage: ''
    }
  },
  methods: {
    loginHandler: _.debounce(async function () {
      try {
        const formData = this.formData
        const res = await axios.post('/api/session', formData)
        this.loginMessage = ''
        this.$router.back()
      } catch (err) {
        // try 中的程序级错误和状态码错误 400 500 都会进入 catch
        const {status} = err.response
        switch(status) {
          case 404:
            this.loginMessage = '登陆失败，邮箱或密码错误'
            break
        }
      }
    }, 500)
  }
}
</script>

<style>
.main {
  width: 340px;
  margin: 0 auto;
  margin-top: 50px;
  color: #333;
}

.main .header {
  text-align: center;
}

.main .header h1 {
  font-size: 26px;
}

.main form {
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #d8dee2;
  border-radius: 5px;
  background-color: #fff;
}

.main .message {
  padding: 10px;
  padding-bottom: 0;
  border: 1px solid #d8dee2;
  border-radius: 5px;
}
</style>
