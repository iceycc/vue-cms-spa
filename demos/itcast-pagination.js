Vue.component('itcast-pagination', {
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    propCurrentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // 备份为局部变量
      currentPage: this.propCurrentPage
    }
  },
  computed: {
    // 计算总页码
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    pageChange(page) {
      if (page <= 0) {
        page = 1
      }
      if (page > this.totalPage) {
        page = this.totalPage
      }
      this.currentPage = page
      // 这里处理完毕 currentPage 之后，通知父组件，让父组件调用自己的方法

      // Events up 向上通知，父组件订阅了 current-change 事件
      this.$emit('current-change', page)
    }
  },
  template: `
<nav aria-label="Page navigation">
  <ul class="pagination">
    <li>
      <a @click.prevent="pageChange(currentPage - 1)" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li :class="{active: currentPage === n}" @click="pageChange(n)" v-for="n in totalPage"><a href="#">{{ n }}</a></li>
    <li>
      <a @click.prevent="pageChange(currentPage + 1)" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
`
})
