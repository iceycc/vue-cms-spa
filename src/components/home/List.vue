<template>
  <section class="container topic-list">
    <ul class="media-list">
      <li class="media" v-for="topic in topics">
        <div class="media-left">
          <a href="#">
          <img width="40" height="40" class="media-object" src="../common/avatar-max-img.png" alt="...">
        </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">
            <router-link :to="{name: 'topic-detail', params: {id: topic.id}}">{{ topic.title }}</router-link>
          </h4>
          <p>sueysok 回复了问题 • 2 人关注 • 1 个回复 • 187 次浏览 • 2017-10-20 13:45</p>
        </div>
      </li>
    </ul>
    <div class="block">
      <!-- 
        size-change 当每页显示大小改变的时候触发的事件
        current-change 当前页码改变的时候触发的事件
        page-sizes 配置每页显示大小
        page-size 每页显示多少条
        total 总页码，该组件会自动根据总页码进行分页
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </section>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      topics: [],
      totalCount: 0
    }
  },
  created() {
    this.loadTopics(1, 5)
  },
  methods: {
    // TODO: 倒序列表
    async loadTopics(page, pageSize) {
      const { data } = await axios.get(`/api/topics?_page=${page}&_limit=${pageSize}`)
      this.topics = data.topics
      this.totalCount = data.count
    },
    handleCurrentChange (page) {
      this.loadTopics(page, 5)
    }
  }
}
</script>
<style>
</style>
