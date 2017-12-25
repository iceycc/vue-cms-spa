<template>
  <section class="container">
    <div class="row">
      <div class="col-md-5">
        <form @submit.prevent="editHandler">
          <div class="form-group">
            <label for="exampleInputEmail1">选择板块</label>
            <select class="form-control">
              <option>分享</option>
              <option>问答</option>
              <option>招聘</option>
              <option>客户端测试</option>
            </select>
          </div>
          <div class="form-group">
            <label for="title">标题</label>
            <input class="form-control" id="title" placeholder="Email" v-model="formData.title" required>
          </div>
          <div class="form-group">
            <label for="content">内容</label>
            <textarea class="form-control" id="content" rows="3" v-model="formData.content" required></textarea>
          </div>
          <button type="submit" class="btn btn-success">点击保存</button>
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
      formData: {
        title: '',
        content: ''
      }
    }
  },
  created() {
    const {id} = this.$route.params
    this.loadTopicById(id)
  },
  methods: {
    async loadTopicById (id) {
      const {data: topic} = await axios.get(`/api/topics/${id}`)
      this.formData = topic
    },
    async editHandler () {
      try {
        const {id, title, content} = this.formData
        const res = await axios.patch(`/api/topics/${id}`, {
          title,
          content
        })
        this.$router.back()
      } catch (err) {
        window.alert('修改失败，请稍后重试！')
      }
    }
  }
}
</script>
<style>
</style>
