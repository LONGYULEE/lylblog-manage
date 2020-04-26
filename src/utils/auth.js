// import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

// import Vue from 'vue'
// import VueCookie from 'vue-cookies'

// Vue.use(VueCookie)

const tokenKey = "token"

export function getToken() {
    return sessionStorage.getItem(tokenKey);
}

export function setToken(token) {
    return sessionStorage.setItem(tokenKey, token);
}

export function removeToken() {
    return sessionStorage.removeItem(tokenKey);
}

export function getMenuList() {
    return sessionStorage.getItem('menuList');
}

export function setMenuList(data) {
    return sessionStorage.setItem('menuList', data);
}

export function removeMenuList() {
    return sessionStorage.removeItem('menuList');
}

export function getPermission() {
    return sessionStorage.getItem('permission');
}

export function setPermission(data) {
    return sessionStorage.setItem('permission', data);
}

export function removePermission() {
    return sessionStorage.removeItem('permission');
}