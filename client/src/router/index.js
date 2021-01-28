import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import Item from '../components/Item.vue'
import Login from '../components/Login.vue'
import store from '../store/store'
import House from '../views/House.vue'
import Signup from '../components/Signup.vue'

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
    if(to.name === "Login" || to.name === "Signup") {
      next()
    }
    else {
      next({path: '/', query: { redirect: to.fullPath }}) // make sure to always call next()!
    }
  }
})




export default router
