import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // 从sessionstorage中获取token
import getPageTitle from '@/utils/get-page-title'
import { isURL } from '@/utils/validate'
import Layout from '@/layout'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

//开发环境不使用懒加载，生产环境下使用
const _import = require('./_import_' + process.env.NODE_ENV);

router.beforeEach((to, from, next) => {
    //进度条开始
    NProgress.start()
    //设置页面标题
    document.title = getPageTitle(to.meta.title)
    const hasToken = getToken();
    if (getToken()) {
        //有token
        if (to.path === '/login') {
            //去login页面，放行
            next();
            NProgress.done();
        } else {
            if (store.getters.addRouters.length === 0) {
                //如果动态添加路由为空，添加路由，等到渲染完成放行
                store.dispatch('user/getInfo').then(() => {
                    store.dispatch('menu/GenerateRouters').then(() => {
                        router.addRoutes(store.getters.addRouters)
                        next({ ...to, replace: true })
                    }).catch(error => {
                        console.log(error)
                        console.log('错误被爷捉住了')
                    })
                }).catch(error => {
                    console.log(error)
                    console.log('错误被爷捉住了')
                })
                NProgress.done();
            } else {
                //已添加动态路由，直接放行
                next();
                NProgress.done();
            }
        }
    } else {
        if (to.path === '/login') {
            //没有token去login，放行
            next();
            NProgress.done();
        } else {
            //没有token，不去login，跳转到login
            next('/login');
            NProgress.done();
        }
    }
})

router.afterEach(() => {
    //进度条结束
    NProgress.done()
})

//将后台数据拼接成路由数组
export function generaMenu(routers, data) {
    data.forEach((item) => {
        if (!isURL(item.url)) {
            let menu = {
                path: '/' + item.url,
                component: item.list ? Layout : _import(`modules/${item.url.replace(new RegExp('-', 'g'), '/')}`),
                hidden: true,
                children: [],
                name: item.url,
                meta: { title: item.name, icon: item.icon, id: item.menuId }
            }
            if (item.list) {
                generaMenu(menu.children, item.list)
            }
            routers.push(menu)
            // console.log(routers)
        } else {
            let menu = {
                path: item.url,
                component: Layout,
                hidden: true,
                name: item.url,
                meta: { title: item.name, icon: item.icon, id: item.menuId }
            }
            if (item.list) {
                generaMenu(menu.children, item.list)
            }
            routers.push(menu)
        }
    })
}
