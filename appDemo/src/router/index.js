import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/login/login'
import index from '../view/index/index'
import customerService from '../view/customerService/customerService.vue'
import complaintMessage from '../view/complaintMessage/complaintMessage.vue'
import me from '../view/me/me.vue'
import homePage from '../view/homePage/homePage'

Vue.use(Router)
const router = new Router({
        // mode: 'history',
        routes: [
            {
                path:'/',
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                },
                redirect:'/gui/index'
            },
            {
                path: '/gui/login',
                name: 'login',
                component: Login,
            },
            {
                path:'/gui/index',
                component: index,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                },
                children:[
                    {
                        path:'/gui/customerService',
                        component: customerService,
                        meta: {
                            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        },
                    },
                    {
                        path:'/gui/homePage',
                        component: homePage,
                        meta: {
                            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        },
                    },
                    {
                        path:'/gui/complaintMessage',
                        component:complaintMessage,
                        meta: {
                            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        },
                    },
                    {
                        path:'/gui/customerService',
                        component:customerService,
                        meta: {
                            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        },
                    },
                    {
                        path:'/gui/me',
                        component:me,
                        meta: {
                            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        },
                    },
                ]
            }, 
        ]
    })
    router.beforeEach((to, from, next) => {
        if (to.matched.some(r => r.meta.requireAuth)) { // 判断该路由是否需要登录权限
            if (sessionStorage.token) { // 通过vuex state获取当前的token是否存在            
                next();
            } else {
                next({
                    path: '/gui/login',
                    query: {
                        redirect: to.fullPath
                    } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        } else {
            next();
        }
    })
export default router