import Vue from 'vue';
import axios from 'axios';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VeeValidate);

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common.Authorization = token;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
