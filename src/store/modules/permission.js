import { constantRoutes } from '@/router'

const state = {
    routes: [],
    // addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    // generateRoutes({ commit }) {
    //     return new Promise(resolve => {
    //         let accessedRoutes = store.getters.addRouters;
    //         commit('SET_ROUTES', accessedRoutes)
    //         resolve(accessedRoutes)
    //     })
    // }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
