import VueRouter from 'vue-router'
import Home from './components/home/Home.vue'
import HomeList from './components/home/List.vue'
import Login from './components/user/Login.vue'
import Register from './components/user/Register.vue'

import TopicNew from './components/topic/New.vue'
import TopicDetail from './components/topic/Detail.vue'
import TopicEdit from './components/topic/Edit.vue'

import Setting from './components/settings/Setting.vue'
import SessingProfile from './components/settings/Profile.vue'
import SessingAdmin from './components/settings/Admin.vue'

export default new VueRouter({
  routes: [
    {
      // 当访问 / 渲染 Home 的时候,如果发现它有子路由，则会把 children 中的 path 为 '' 空字符串的路由作为默认的 router-view 出口组件
      path: '/',
      component: Home,
      children: [
        // 当渲染 /a 的时候，它会先渲染它的父亲 Home 然后 HomeList 渲染到 Home 的 router-view 里面
        {
          path: '',
          component: HomeList
        },
        {
          path: '/topic/new',
          component: TopicNew
        },
        {
          name: 'topic-detail',
          path: '/topic/detail/:id',
          component: TopicDetail
        },
        {
          name: 'topic-edit',
          path: '/topic/edit/:id',
          component: TopicEdit
        },
        {
          path: '/settings',
          component: Setting,
          children: [
            {
              path: '/settings/profile',
              component: SessingProfile
            },
            {
              path: '/settings/admin',
              component: SessingAdmin
            }
          ]
        },
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
  ]
})
