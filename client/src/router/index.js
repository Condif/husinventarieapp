import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import Item from '../components/Item.vue'
import Login from '../components/Login.vue'
import store from '../store/store'
import House from '../views/House.vue'
import Signup from '../components/Signup.vue'
import CreateHouse from '../components/CreateHouse.vue'

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
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/createhouse',
    name: 'CreateHouse',
    component: CreateHouse,
    meta: { requiresAuth: true }
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
    path: '/house',
    name: 'House',
    component: House,
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
  store.dispatch("SESSION/setLoggedInFromStorage")
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
