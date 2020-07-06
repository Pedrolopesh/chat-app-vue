import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/public/Home.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/Home'
    },

    {
      path: '/Public',
      component: () => import('../views/viewsPublic.vue'),

      children: [
        {
          path: '/Home',
          name: 'Home',
          component: Home
        },
        {
          path: '/About',
          name: 'About',
          component: function () {
            return import(/* webpackChunkName: "about" */ '../views/public/About.vue')
          }
        },
        {
          path: '/Login',
          name: 'Login',
          component:() => import('../views/public/Login.vue') 
        },
        {
          path: '/Signup',
          name: 'Signup',
          component:() => import('../views/public/Signup.vue') 
        }
      ]
    },

    {
      path: '/Private',
      component: () => import('../views/viewPrivate.vue'),

      children: [
        {
          path: '/DashBoard',
          name: 'DashBoard',
          component: () => import('../views/private/DashBoard.vue') 
        },
        {
          path: '/UserPreferences',
          name: 'UserPreferences',
          component: () => import('../views/private/UserPreferences.vue') 
        },
        {
          path: '/ChatList',
          name: 'ChatList',
          component: () => import('../views/private/ChatList.vue') 
        },
        {
          path: '/RequestList',
          name: 'RequestList',
          component: () => import('../views/private/RequestList.vue') 
        },

      ]
    }

]

const router = new VueRouter({
  routes
})

export default router
