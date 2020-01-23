import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Settings from '../views/Settings.vue'
import Chat from '../views/Chat.vue'
import Friends from '../views/Friends.vue'
import FindFriends from '../views/FindFriends.vue'
import Mypage from '../views/Mypage.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: Mypage
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/friends',
    name: 'friends',
    component: Friends
  },
  {
    path: '/findfriends',
    name: 'findfriends',
    component: FindFriends
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  // }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
