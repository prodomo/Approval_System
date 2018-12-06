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
        mounted() {
            const trees = $('[data-widget="tree"]');
            trees.tree();
        }
    }
</script>