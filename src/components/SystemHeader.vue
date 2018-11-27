<template>
    <div>
        <section class="content-header clearfix">
            <h1>公文系統-{{this.title}}</h1>
        </section>
            <div class="box-header">
                <navbar>
                    <a class="navbar-brand" slot="brand" ></a>
                    <template slot="collapse">
                    <navbar-nav >
                        <li class="disabled"><a role="button">收文查詢</a></li>
                        <li class="disabled"><a role="button">發文查詢</a></li>
                        <li ><a href="/approvalCreate" role="button">簽呈建檔</a></li>
                        <li ><a href="/approvalQuery" role="button">簽呈查詢</a></li>
                        <li ><a href="/announcementCreate" role="button">公告建檔</a></li>
                        <li ><a href="/announcementQuery" role="button">公告查詢</a></li>
                        <!-- <li class="active"><a role="button">代理人設定</a></li>
                        <li class="active"><a role="button">流程示意圖</a></li>
                        <li class="active"><a role="button">操作說明</a></li> -->
                    </navbar-nav>
                    <navbar-nav right>
                    <li><a>您好，目前位於「{{this.header}}畫面」</a></li>
                    </navbar-nav>
                    </template>
                </navbar>
            </div>
    </div>
</template>

<script>
    export default {
        name: 'SystemHeader',
        props:{
            value: {
                type: [Boolean, String]
            },
            ID: {
                type: [String]
            },
            header:{
                type:[String]
            },
            title:{
                type:[String]
            }
        },
        data(){
            return{
                pageID:this.ID,

            }
        },
        methods:{
            getClassSytle(id)
            {
            },
        }
    }


</script>

<style lang="scss" scoped>
 
</style>
