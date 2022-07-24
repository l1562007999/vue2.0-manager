import Vue from 'vue'
// import Home from '../views/Home.vue'

import VueRouter from 'vue-router'

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
            }
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router