import "@/lib/prototype";
import Vue from 'vue';
import * as uiv from 'uiv';
import jQuery from 'jquery';
import 'admin-lte';
import '@/lib/css';
import CxltToastr from 'cxlt-vue2-toastr';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import VueLocalStorage from 'vue-localstorage';
import '@/lib/mixin';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueLocalStorage);
Vue.config.productionTip = false;
Vue.use(uiv);
Vue.use(CxltToastr, {
    position: 'top center',
    timeOut: 3000,
    showMethod: 'slideInUp',
    hideMethod: 'slideOutUp'
});
Vue.use(VeeValidate);

const accessToken = Vue.localStorage.get('access_token');
axios.defaults.headers.common['Authorization'] = `bearer ${accessToken}`;