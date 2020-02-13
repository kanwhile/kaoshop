import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
// import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/sales',
          name: 'sales',
          component: () => import(/* webpackChunkName: "demo" */ './views/Sales.vue')
        },
        {
          path: '/product',
          name: 'product',
          component: () => import(/* webpackChunkName: "about" */ './views/Product.vue')
        },
      ]
    },
    
  ]
})
