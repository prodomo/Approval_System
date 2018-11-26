<template>
    <div class="login-page">
        <div class="login-box">
            <div class="login-logo">權限管理系統</div>
            <div class="login-box-body">
                <p class="login-box-msg">填寫帳密，並點擊登入</p>
                <form novalidate @submit.prevent="login">
                    <div class="form-group has-feedback">
                        <input class="form-control" placeholder="請填寫工號" v-model="form.username" name="username" v-validate="'required'">
                        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </div>
                    <span v-show="errors.has('username:required')" class="help error">工號不能留空</span>
                    <div class="form-group has-feedback">
                        <input type="password" class="form-control" placeholder="請填寫密碼" v-model="form.password" name="password" v-validate="'required|min:1'">
                        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <span v-show="errors.has('password:required')" class="help error">密碼不能留空</span>
                    <span v-show="errors.has('password:min:1')" class="help error">密碼至少需填1個字</span>
                    <div class="row">
                        <div class="col-xs-8"></div>
                        <div class="col-xs-4">
                            <button type="submit" :disabled="sending" class="btn btn-primary btn-block btn-flat">
                                <span v-if="!sending">登入</span>
                                <clip-loader class="loading" v-if="sending" color="white" size="20px"></clip-loader>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapState} from 'vuex';
    import ClipLoader from "vue-spinner/src/ClipLoader";
    import $ from 'jquery';
    import qs from 'qs';

    export default {
        name: "login-page",
        components: {ClipLoader},
        localStorage: {
            access_token: ''
        },
        computed: {
            ...mapState({
                role: state => state.user.user.role,
                userId: state => state.user.user.id
            })
        },
        data() {
            return {
                form: {
                    grant_type: 'password',
                    client_id: 1,
                    client_secret: 'VVeBYBuuNvzDbKYK4eWWqZPmxxyYFMe3WnzZyGpqQg9R9ZWhtqKSD5fA3KGNdV7R',
                    username: null,
                    password: null
                },
                sending: false
            };
        },
        created() {
            $('html').css({
                background: '#d2d6de'
            })
        },
        methods: {
            async login() {
                try {
                    const isPass = await this.validate();
                    if(!isPass)
                        return;

                    this.sending = true;
                    let res = await axios.post('/oauth2/token', qs.stringify(this.form));
                    const data = res.data;
                    if(typeof data.access_token !== 'undefined') {
                        axios.defaults.headers.common['Authorization'] = `bearer ${data.access_token}`;
                        this.$localStorage.set('access_token', data.access_token);
                        await this.syncUser();
                        this.$router.push(`/permissionTypes`);
                    }
                } catch(err) {
                    if(err.response.status == 400) {
                        this.$toast.error({
                            title: '錯誤訊息',
                            message: '登入失敗'
                        });
                    }
                }
                this.sending = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home{
        font-weight: bold;
        color:       black;
    }
    .home:hover{
        text-decoration: none;
    }
    .is-danger{
        font-size: 15px;
    }
    .form-group{
        margin-top:    15px;
        margin-bottom: 5px;
    }
    [type="submit"]{
        margin-top: 15px;
    }
    .loading{
        margin-top: 5px;
    }
    .login-logo{
        font-size: 33px;
    }
</style>