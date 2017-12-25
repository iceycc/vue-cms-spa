<template>
<section class="container">
  <div class="row">
    <div class="col-md-5">
      <form @submit.prevent="postHandler">
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
          <input
            class="form-control"
            required
            v-model="formData.title"
            id="title">
        </div>
        <div class="form-group">
          <label for="content">内容</label>
          <textarea v-model="formData.content" required id="content" class="form-control" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      formData: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    // TODO：一个发布页面只能发布一次
    async postHandler () {
      try {
        const {data} = await axios.post('/api/topics', this.formData)
        this.$router.push(`/topic/detail/${data.id}`)
      } catch (err) {

      }
    }
  }
}
</script>

<style>
</style>
