<template>
    <div>
        <navbar class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" slot="brand" href="#">總管理處</a>
            <template slot="collapse">
            <navbar-text>員工名稱:XXX </navbar-text>
            <navbar-text>員工編號:XXX </navbar-text>
            <navbar-text>部門職稱:XXX </navbar-text>
            <navbar-text>變更部門
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
                        <th scope="row"><a href="/approvalQuery">{{items.PetitionsCount}}</a></th>
                    </tr>
                </tbody>
            </table>
            </div>
        </template>

        <tabs>
            <tab title="路況通知">
                <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
            </tab>
            <tab title="一般公告">
                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
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
            }
        },
        computed:{
        ...mapState({
            userName: state => state.user.user.Name,
            chief: state => state.user.user.Chief,
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
