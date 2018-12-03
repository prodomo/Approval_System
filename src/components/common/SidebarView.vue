<template>
    <aside class="main-sidebar">
        <section class="sidebar">
            <ul class="sidebar-menu" data-widget="tree">
                <li class="header">主選單</li>
                <li class="treeview" :class="{active: ($route.path.match(/\/approvalCreate(\/\d*?|.{0})/))}">
                    <router-link to="/approvalCreate">
                        <i class="fa fa-lock"></i>
                        <span>公文系統</span>
                    </router-link>
                </li>
                <!-- <li v-if="permissions.contains('role-manage')" class="treeview" :class="{active: ($route.path.match(/\/roles(\/\d*?|.{0})/))}">
                    <router-link to="/roles">
                        <i class="fa fa-building-o"></i>
                        <span>角色模板管理</span>
                    </router-link>
                </li>
                <li v-if="permissions.contains('user-role-setting')" class="treeview" :class="{active: ($route.path.match(/\/userRoles(\/\d*?|.{0})/))}">
                    <router-link to="/userRoles">
                        <i class="fa fa-user"></i>
                        <span>職員角色設定</span>
                    </router-link>
                </li>
                <li v-if="permissions.contains('transfer-role-setting')" class="treeview" :class="{active: ($route.path.match(/\/transferRoleEvents(\/\d*?|.{0})/))}">
                    <router-link to="/transferRoleEvents">
                        <i class="fa fa-user"></i>
                        <span>角色轉換設定</span>
                    </router-link>
                </li>
                <li v-if="permissions.contains('user-agent-setting')" class="treeview" :class="{active: ($route.path.match(/\/userAgents(\/\d*?|.{0})/))}">
                    <router-link to="/userAgents">
                        <i class="fa fa-user"></i>
                        <span>代理人設定</span>
                    </router-link> -->
                <!-- </li> -->
            </ul>
        </section>
    </aside>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import $ from 'jquery';

    export default {
        name: "sidebar-view",
        computed: {
            ...mapState({
                role: state => state.user.user.role,
                userId: state => state.user.user.id
            }),
            ...mapGetters(['permissions'])
        },
        // mounted() {
        //     const trees = $('[data-widget="tree"]');
        //     trees.tree();
        // }
    }
</script>