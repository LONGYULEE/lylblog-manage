import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

//开发环境不使用懒加载，生产环境下使用
const _import = require('./_import_' + process.env.NODE_ENV);

//不需要权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
export const constantRoutes = [
    { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } },
    { path: '/', redirect: '/login' },
    {
        path: '/home',
        component: Layout,
        name: 'home',
        redirect: { name: 'dashboard' },
        meta: { title: '主入口整体布局' },
        children: [
            { path: '/dashboard', component: _import('dashboard'), name: 'dashboard', meta: { title: '系统首页' } },
            { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404' } }
        ]
    }
]

export const asyncRoutes = []

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 创建一个船新的router对象，解决router.addRouters()退出时没有清理
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
