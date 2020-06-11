import Cookies from 'js-cookie';

const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus')
            ? !!+Cookies.get('sidebarStatus')
            : true,
        withoutAnimation: false
    },
    device: 'desktop',
    size: Cookies.get('size') || 'medium',
    tableWidth: ''
};

const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = false;
        if (state.sidebar.opened) {
            //打开
            state.tableWidth = 'width:calc(100vw - 250px)';
            Cookies.set('sidebarStatus', 1);
        } else {
            state.tableWidth = 'width:calc(100vw - 94px)';
            Cookies.set('sidebarStatus', 0);
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 0);
        state.sidebar.opened = false;
        state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device;
        console.log('123');
    },
    SET_SIZE: (state, size) => {
        state.size = size;
        Cookies.set('size', size);
    }
};

const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR');
    },
    closeSideBar({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    toggleDevice({ commit }, device) {
        commit('TOGGLE_DEVICE', device);
    },
    setSize({ commit }, size) {
        commit('SET_SIZE', size);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
