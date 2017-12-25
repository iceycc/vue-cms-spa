<template>
  <section class="container">
    <div class="row">
      <div class="col-md-9">
        <h1 class="title">{{topic.title}}</h1>
        <p>发布于 几秒前 作者 lipengzhou 1 次浏览 来自 客户端测试</p>
        <p v-if="isLoginUser">
          <router-link :to="{name: 'topic-edit', params: {id: topic.id}}">编辑</router-link>
          <a @click.prevent="removeTopicById(topic.id)" href="#">删除</a>
        </p>
        <hr>
        <article class="markdown-body">
          {{ topic.content }}
        </article>
        <div class="panel panel-default" v-for="item in comments">
          <div class="panel-heading">
            <span>lipengzhou</span> commented
            <span>24 minutes ago</span>
            <span class="action">
            <a href=""><i class="glyphicon glyphicon-thumbs-up pull-right"></i></a>
            <a href=""><i class="glyphicon glyphicon-remove-circle pull-right"></i></a>
            <a href=""><i class="glyphicon glyphicon-remove-circle pull-right"></i></a>
          </span>
          </div>
          <div class="panel-body">{{ item.content }}</div>
        </div>
        <hr>
        <form @submit.prevent="createCommentHandler" style="margin-bottom: 20px;">
          <div class="form-group">
            <label for="exampleInputPassword1">添加回复</label>
            <textarea class="form-control" v-model.trim="commentContent" required rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-success">回复</button>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      topic: {
        title: '',
        content: ''
      },
      commentContent: '',
      isLoginUser: false,
      comments: []
    }
  },
  // 在导航之前获取数据，可以避免看到异步渲染慢有白块的问题。
  // 路由导航钩子
  // to 当前路由信息
  // from 从哪个组件导航过来的路由信息
  // next 导航完成，渲染组件
  //   next 方法有一个参数 vm 就是组件实例
  // async beforeRouteEnter(to, from, next) {
  //   next(vm => {})
  // },
  async created() {
    try {
      // 1. 根据话题 id 获取话题详情
      const { id } = this.$route.params
      const { data: topic } = await axios.get(`/api/topics/${id}`)
      this.topic = topic

      // 2. 根据话题 id 加载所有评论
      this.loadComments(id)

      // 3. 如果当前话题属于当前登陆用户，则显示：编辑、删除 链接，否则不显示
      const { data: sessionUser } = await axios.get('/api/session')
      this.isLoginUser = topic.user_id === sessionUser.id
    } catch (err) {
    }
  },
  methods: {
    // 话题作者删除话题
    async removeTopicById(id) {
      if (!window.confirm('Are you sure?')) {
        return
      }
      try {
        await axios.delete(`/api/topics/${id}`)
        this.$router.push('/')
      } catch (err) {
      }
    },
    // 创建评论
    async createCommentHandler() {
      try {
        await axios.get('/api/session')
        // 先校验是否已登录，如果没有登陆，则提示去登陆
        const {data} = await axios.post('/api/comments', {
          topic_id: this.topic.id,
          content: this.commentContent
        })
        this.comments.push(data)
        this.commentContent = ''
      } catch (err) {
        const { status } = err.response
        switch (status) {
          case 401:
            if (!window.confirm('请登陆')) {
              return
            }
            this.$router.push('/login')
            break
        }
      }
    },
    // 加载所有评论
    async loadComments(topicId) {
      const {data} = await axios.get(`/api/comments?topic_id=${topicId}`)
      this.comments = data
    }
  }
}
</script>
<style>
.markdown-body {
  margin-bottom: 100px;
}
</style>
