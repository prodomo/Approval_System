<template>
    <div>
        <system-header></system-header>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import ClipLoader from "vue-spinner/src/ClipLoader";
    import SystemHeader from '@/components/SystemHeader';

    export default {
        components:{SystemHeader},
        name: "app-layout",
        computed: {
            ...mapState({
                userId: state => state.user.user.id,
                pageLoading: state => state.pageLoading
            })
        },
    }
</script>