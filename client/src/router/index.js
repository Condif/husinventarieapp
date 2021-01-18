import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../components/Project.vue'
import Item from '../components/Item.vue'
import Login from '../components/Login.vue'
import House from '../views/House.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/project',
    name: 'Project',
    component: Project
  },
  {
    path: '/item',
    name: 'Item',
    component: Item
  },
  {
    path: '/house',
    name: 'House',
    component: House
  },
  {
    path: '/createproject',
    name: 'CreateProject',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/CreateProject.vue')
  },
  {
    path: '/createroom',
    name: 'CreateRoom',
    component: () => import('../components/CreateRoom.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
