import { getMenuList, setMenuList, setPermission } from '@/utils/auth'
import { generaMenu } from '@/router/permission'
import http from '@/utils/request'

const state = {
    addRouters: []
}

const mutations = {
    'SET_ROUTERS': (state, routers) => {
        state.addRouters = routers;
    }

}

const actions = {
    GenerateRouters({ commit }) {
        return new Promise(resolve => {
            if (getMenuList()) {
                //获取缓存中的路由信息
                let menu = JSON.parse(getMenuList());
                //初始化路由时将首页添加进去
                let routers = [];
                let notFound = { path: '*', redirect: { name: '404' } }
                generaMenu(routers, menu);
                routers.push(notFound);
                commit('SET_ROUTERS', routers);
                resolve();
            } else {
                http.get('/admin/sys/menu/nav').then(res => {
                    if (res.data.code === 2000) {
                        let { data } = res.data;
                        //将接口数据添加到缓存中
                        setMenuList(JSON.stringify(data.menuList));
                        setPermission(JSON.stringify(data.permissions));
                        let routers = [];
                        generaMenu(routers, data.menuList);
                        let notFound = { path: '*', redirect: { name: '404' } }
                        routers.push(notFound);
                        commit('SET_ROUTERS', routers);
                        resolve();
                    } else {
                        resolve();
                    }
                })
            }
        })
    }
}




export default {
    namespaced: true,
    state,
    mutations,
    actions
}