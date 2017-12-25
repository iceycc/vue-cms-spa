<template>
  <div class="main">
    <div class="header">
      <a href="#/">
      <img src="../../assets/img/logo3.png" alt="">
    </a>
      <h1>用户注册</h1>
    </div>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">邮箱</label>
        <input type="email" v-model="formData.email" @blur="checkEmail" @input="checkEmail" required class="form-control" placeholder="Email">
        <p class="error-message" v-show="emailMessage">邮箱已存在</p>
      </div>
      <div class="form-group">
        <label for="nickname">昵称</label>
        <input class="form-control" v-model="formData.nickname" @input="checkNickname" @blur="checkNickname" required minlength="2" maxlength="21" id="nickname" name="nickname" placeholder="Nickname">
        <p class="error-message" v-show="nicknameMessage">昵称已存在</p>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" v-model="formData.password" required minlength="6" maxlength="18" class="form-control" id="password" name="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-success btn-block">注册</button>
    </form>
    <div class="message">
      <p>已有账号? <a href="/login">点击登录</a>.</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
        nickname: ''
      },
      emailMessage: false,
      nicknameMessage: false
    }
  },
  methods: {
    registerHandler: _.debounce(async function () {
      // 绝对路径不经过 dev-server 直接去请求 http://localhost:3000/users'
      // 所以我们必须要先把请求告诉 dev-server 然后它会按照你设定好的规则去代理转发
      // 不是所有请求都要走代理的，所以我们这里设定了一个规则：
      //    当请求路径是以 /api 开头的时候，则我帮你代理到 http://localhost:3000 目标服务器
      if (await this.checkEmail()) {
        return
      }
      if (await this.checkNickname()) {
        return
      }
      const ret = await axios.post('/api/users', this.formData)
      this.$router.push('/')
    }, 500),

    checkEmail: _.debounce(async function () {
      const { data } = await axios.get(`/api/users?email=${this.formData.email}`)
      // 如果邮箱不存在
      const exists = data[0] ? true : false
      this.emailMessage = exists
      // 这个是 async 函数，在其它的 async 函数中也可以调用
      // 如果在其它 async 函数中调用它，则需要使用 await 来拿这个 return 返回值
      return exists
    }, 500),
    checkNickname: _.debounce(async function () {
      const { data } = await axios.get(`/api/users?nickname=${this.formData.nickname}`)
      // 如果昵称不存在
      const exists = data[0] ? true : false
      this.nicknameMessage = exists
      return exists
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

form .error-message {
  color: #f00;
}
</style>
<!-- 
  一个函数：
  当你在短时间内调用了它，它只调用一次
 -->
