<template>
    <header class="main-header">
        <router-link to="/approvalCreate" class="logo">
            <span class="logo-mini"></span>
            <span class="logo-lg">員工專區</span>
        </router-link>
        <nav class="navbar navbar-static-top">
            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown user-menu hidden-xs">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <span>{{ userName }}</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" @click="logout">登出</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
    import {mapState} from 'vuex';
    import axios from 'axios';

    export default {
        name: "header-view",
        localStorage: {
            access_token: ''
        },
        computed: {
            ...mapState({
                userName: state => state.user.user.Name
            })
        },
        methods: {
            async logout() {
                axios.defaults.headers.common['Authorization'] = null;
                this.$localStorage.remove('access_token');
                this.$store.commit('UPDATE_USER', null);
                this.$toast.success({
                    title: '成功訊息',
                    message: '登出成功'
                });
                this.$router.push('/login');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main-header .logo{
        height: 52px;
    }
    .dropdown{
        cursor: pointer;
    }
</style>