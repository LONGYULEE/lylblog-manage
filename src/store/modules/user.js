import { login, logout, getUserInfo } from "@/api/user";
import { setToken, removeToken } from "@/utils/auth";
import http from "@/utils/request";

const state = {
  token: "",
  userId: "",
  username: "",
  avatar: ""
};

//mutations 只能操作同步的数据
//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
//Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type,type 相当于mutations中的一个属性) 和 一个 回调函数 (handler)。
//这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
const mutations = {
  //不能直接调用 mutation，调用 SET_TOKEN 时，使用 store.commit('SET_TOKEN');
  //state: 存储的数据
  //token: 除了 state 的额外参数，提交方式 store.commit('SET_TOKEN',token);
  //token: 载荷：大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERNAME: (state, username) => {
    state.username = username;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ID: (state, userId) => {
    state.userId = userId;
  }
};

//actions 操作异步的数据
const actions = {
  //user login
  login({ commit }, userInfo) {
    const { uuid, username, password, captcha } = userInfo;
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(response => {
          const { data } = response;
          //token写入vuex
          commit("SET_TOKEN", data.data);
          //token写入cookie
          setToken(data.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getInfo({ commit, state }) {
    return new Promise(resolve => {
      http
        .get("/admin/sys/user/info")
        .then(res => {
          if (res.data.code === 2000) {
            let { data } = res.data;
            commit("SET_ID", data.id);
            commit("SET_USERNAME", data.username);
            commit("SET_AVATAR", data.avatar);
            commit("SET_TOKEN", data.token);
            resolve(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          window.sessionStorage.clear();
          // 此处刷新页面，重置addRouters()方法添加的动态路由
          location.reload();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
