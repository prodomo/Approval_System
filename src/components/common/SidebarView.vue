<template>
    <aside class="main-sidebar">
        <section class="sidebar">
            <ul class="sidebar-menu" data-widget="tree">
                <li class="header"><a href="/mainPage">主選單</a></li>
                <li class="treeview" :class="{active: ($route.path.match(/\/approvalCreate(\/\d*?|.{0})/))}">
                    <router-link to="/approvalCreate">
                        <i class="fa fa-lock"></i>
                        <span>簽呈建檔</span>
                    </router-link>
                </li>
                <li class="treeview" :class="{active: ($route.path.match(/\/approvalQuery(\/\d*?|.{0})/))}">
                    <router-link to="/approvalQuery">
                        <i class="fa fa-lock"></i>
                        <span>簽呈查詢</span>
                    </router-link>
                </li>
                <li class="treeview" :class="{active: ($route.path.match(/\/announcementCreate(\/\d*?|.{0})/))}">
                    <router-link to="/announcementCreate">
                        <i class="fa fa-lock"></i>
                        <span>公告建檔</span>
                    </router-link>
                </li>
                <li class="treeview" :class="{active: ($route.path.match(/\/announcementQuery(\/\d*?|.{0})/))}">
                    <router-link to="/announcementQuery">
                        <i class="fa fa-lock"></i>
                        <span>公告查詢</span>
                    </router-link>
                </li>
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