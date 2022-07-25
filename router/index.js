import Vue from 'vue'
// import Home from '../views/Home.vue'

import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err=>err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        redirect:'/home',
        component: () => import('../src/views/Main.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../src/views/home'),
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../src/views/user')
            },
            {
                path: '/mall',
                name: 'mall',
                component: () => import('../src/views/mall')
            },
            {
                path: '/page1',
                name: 'page1',
                component: () => import('../src/views/other/page1.vue')
            },
            {
                path: '/page2',
                name: 'page2',
                component: () => import('../src/views/other/page2.vue')
            },
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router