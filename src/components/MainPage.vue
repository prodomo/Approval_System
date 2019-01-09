<template>
    <div>
        <navbar class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" slot="brand" href="#">總管理處</a>
            <template slot="collapse">
            <navbar-text>員工名稱: {{userName}}</navbar-text>
            <navbar-text>員工編號: {{account}}</navbar-text>
            <!-- <navbar-text>部門職稱:</navbar-text> -->
            <navbar-text>變更身分
                <select v-model="selected">
                    <option disabled value="">請選擇職稱</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                </select>
            </navbar-text>   
                <navbar-form right>
                    <btn size="lg" type="primary">簽到</btn>
                    <btn size="lg" type="warning">簽退</btn>
                    <btn size="lg" type="danger">離開</btn>
                </navbar-form>
            </template>

        </navbar>
        <template v-if="articleItems.length!=0">
            <div v-for="items in articleItems" class="article-table">
            <table>
                <thead class="thead-dark">
                <tr>
                    <th scope="col">{{items.Name}}</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" ><a @click="goRoute(items.Id)">{{items.PetitionsCount}}</a></th>
                    </tr>
                </tbody>
            </table>
            </div>
        </template>

        <tabs>
            <tab title="路況通知">
                <p>建構中</p>
            </tab>
            <tab title="一般公告">
                <p>建構中</p>
            </tab>
        </tabs>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import axios from 'axios';
    import _ from 'lodash';
    export default {
        name:'MainPage',
        data(){
            return{
                articleItems:[],
                selected:'',
                mode:1,
            }
        },
        computed:{
        ...mapState({
            userName: state => state.user.user.Name,
            chief: state => state.user.user.Chief,
            account: state => state.user.user.Account,
            department: state => state.user.user.Department,
            }),
        },
        methods:{
            async getArticleStatus(){
                let res = null;
                res = await axios.get(`/api/ArticleStatus`);
                res = res.data;
                if(res.Status==0)
                {
                    const data = res.Data;
                    this.articleItems = data.Items;
                }
            },
            async goRoute(articleStatusId)
            {
                this.$router.push({
                    path: `/approvalQuery/${articleStatusId}/1`
                });
            }
        },
        mounted: function(){
        this.getArticleStatus();
        },
    }



</script>

<style lang="scss" scoped>
    td{
        text-align: center;
        width: 100px !important;
    }
    th{
        text-align: center;
        width: 100px !important;
        padding-top: 5px !important;
        padding-bottom: 5px !important;

    }
    .article-table{
        padding-left: 50px;
        padding-bottom: 20px;
    }
    .article-table>table{
        background-color:#5bc0de38;
    }
    
</style>
