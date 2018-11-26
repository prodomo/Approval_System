import moment from "moment";
import axios from "axios";
import store from "@/vuex/store";
import Vue from "vue";

const mixinLib = {
    datetime(datetime) {
        return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
    },
    async validate(scope) {
        let isPass = false;
        try {
            if(typeof scope === 'undefined')
                isPass = await this.$validator.validateAll();
            else
                isPass = await this.$validator.validateAll(scope);
            const that = this;
            this.$nextTick(async() => {
                const items = that.$validator.errors.items;
                if(items.length === 0)
                    return;

                let $container = $('html, body');
                const $scrollTo = $(`[name="${items[0].field}"]`);
                $container.animate({
                    scrollTop: $scrollTo.offset().top - 247
                }, 500, () => {
                    $scrollTo.focus();
                });
            });
        } catch(e) {
        }
        return isPass;
    },
    async syncUser() {
        try {
            let res = await axios.get('/api/User');
            res = res.data;
            if(res.Status == 0) {
                const data = res.Data.Row;
                store.commit('UPDATE_USER', data);
            } else {
                store.commit('UPDATE_USER', null);
            }
        } catch(err) {
            store.commit('UPDATE_USER', null);
        }
    },
    async guestRedirectHome(status) {
        if(status == 401 || status == 422) {
            this.$toast.error({
                title: '錯誤訊息',
                message: '請重新登入'
            });
            this.$router.push('/');
        } else if(status == 403) {
            this.$toast.error({
                title: '錯誤訊息',
                message: '您無權限操作'
            });
            this.$router.push('/');
        } else if(status == 423) {
            this.$toast.error({
                title: '錯誤訊息',
                message: '嘗試太多次，請稍後再試！'
            });
        } else {
            this.$toast.error({
                title: '錯誤訊息',
                message: '連線異常，請通知系統管理員'
            });
        }
    }
};

const mixin = {
    methods: mixinLib
};

Vue.mixin(mixin);

export default mixinLib;