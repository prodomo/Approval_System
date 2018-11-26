// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import * as uiv from 'uiv';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import store from './vuex/store.js';
import axios from 'axios';
import VueLocalStorage from 'vue-localstorage';
import '@/lib/mixin';

Vue.config.productionTip = false;
Vue.use(uiv);
Vue.use(VeeValidate);
Vue.use(VueLocalStorage);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

const accessToken = Vue.localStorage.get('access_token');
axios.defaults.headers.common['Authorization'] = `bearer ${accessToken}`;

