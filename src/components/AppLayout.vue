<template>
    <div>
        <div v-if="!pageLoading" class="admin-layout">
            <header-view></header-view>
            <sidebar-view></sidebar-view>
            <div class="content-wrapper">
                <router-view></router-view>
            </div>
        </div>
        <clip-loader :loading="pageLoading" class="loading" color="gray" size="30px"></clip-loader>
    </div>
</template>

<script>
    import HeaderView from "@/components/common/HeaderView";
    import SidebarView from "@/components/common/SidebarView";
    import {mapState} from 'vuex';
    import ClipLoader from "vue-spinner/src/ClipLoader";

    export default {
        components: {
            ClipLoader,
            HeaderView,
            SidebarView
        },
        name: "app-layout",
        computed: {
            ...mapState({
                userId: state => state.user.user.id,
                pageLoading: state => state.pageLoading
            })
        },
        created() {
            document.body.className = 'skin-blue sidebar-mini wysihtml5-supported';
        },
        mounted() {
            const that = this;
            setInterval(() => {
                that.resizeContentHeight();
            }, 100);
        },
        methods: {
            resizeContentHeight() {
                const $contentWrapper = document.getElementsByClassName('content-wrapper')[0];
                if($contentWrapper)
                    $contentWrapper.style.minHeight = (window.innerHeight - 52) + 'px';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .admin-layout {
        position: relative;
        background-color: #222d32;

        .main-header .logo {
            height: 52px;
        }
    }

    .content-wrapper {
        max-width: 100%;
    }
</style>