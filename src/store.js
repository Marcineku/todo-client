/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const LOGIN_URL = 'auth/login';
const LOGOUT_URL = 'auth/logout';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    set_token(state, token) {
      state.token = token;
    },
    remove_token(state) {
      state.token = '';
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios
          .post(LOGIN_URL, user)
          .then((res) => {
            const { token_type } = res.data;
            const { access_token } = res.data;
            const token = `${token_type} ${access_token}`;
            localStorage.setItem('token', token);
            axios.defaults.headers.common.Authorization = token;
            commit('set_token', token);
            resolve(res);
          })
          .catch((err) => {
            console.error(err.response);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(LOGOUT_URL)
          .then((res) => {
            localStorage.removeItem('token');
            commit('remove_token');
            resolve(res);
          })
          .catch((err) => {
            console.error(err.response);
            reject(err);
          });
      });
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
  },
});
