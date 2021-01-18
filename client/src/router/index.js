import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../components/Project.vue'
import Item from '../components/Item.vue'
import Login from '../components/Login.vue'
import store from '../store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
    meta: { requiresAuth: true }
  },
  {
    path: '/item',
    name: 'Item',
    component: Item,
    meta: { requiresAuth: true }
  },
  {
    path: '/createproject',
    name: 'CreateProject',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/CreateProject.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/createroom',
    name: 'CreateRoom',
    component: () => import('../components/CreateRoom.vue'),
    meta: { requiresAuth: true }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let routerAuthCheck = store.getters["SESSION/getLoggedIn"];
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!routerAuthCheck) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})



export default router
