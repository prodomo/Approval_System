import "@/lib/prototype";
import Vue from 'vue';
import * as uiv from 'uiv';
// import 'admin-lte';
import '@/lib/css';
import CxltToastr from 'cxlt-vue2-toastr';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import VueLocalStorage from 'vue-localstorage';
import '@/lib/mixin';

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