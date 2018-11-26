import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pageLoading: false
    },
    actions,
    getters,
    mutations,
    modules,
    strict: process.env.NODE_ENV !== 'production'
})
