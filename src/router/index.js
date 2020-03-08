import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Users from '../views/Home/Users.vue'
import Roles from '../views/Home/Roles.vue'
import Auth from '../views/Home/Auth.vue'
import Goods from '../views/Home/Goods.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/users',
        component:Users
      },
      {
        path:'/roles',
        component:Roles
      },
      {
        path:'/auth',
        component:Auth
      },
      {
        path:'/goods',
        component:Goods
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next()
    const localTokenId = window.sessionStorage.getItem('tokenid')
    if(!localTokenId) return next('/login') 
    next()  
})

export default router
