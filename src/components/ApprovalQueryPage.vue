<template>
    <div>
        <section class="content-header clearfix">
            <h1>公文系統</h1>
        </section>
        <section class="content">
            <div class="box-header">
                <navbar>
                    <a class="navbar-brand" slot="brand" ></a>
                    <template slot="collapse">
                    <navbar-nav>
                        <li class="active"><a role="button">收文查詢</a></li>
                        <li class="active"><a role="button">發文查詢</a></li>
                        <li class="active"><a href="/02" role="button">簽呈建檔</a></li>
                        <li ><a a href="/03" role="button">簽呈查詢</a></li>
                        <li class="active"><a role="button">公告建檔</a></li>
                        <li class="active"><a role="button">公告查詢</a></li>
                        <li class="active"><a role="button">代理人設定</a></li>
                        <li class="active"><a role="button">流程示意圖</a></li>
                        <li class="active"><a role="button">操作說明</a></li>
                    </navbar-nav>
                    <navbar-nav right>
                    <li><a>您好，目前位於「內部簽呈畫面」</a></li>
                    </navbar-nav>
                    </template>
                </navbar>
                <div class="box-body">
                    <table class="table table-bordered">
                        <tbody>
                        <tr><th colspan="8"><label>進階搜尋</label></th></tr>
                        <tr><th colspan="8"><label>1.主辦單位：可以多選</label></th></tr>
                        <tr><th colspan="8"><label>2.下方條件式多選時，查詢結果將為皆符合該條件式之紀錄!</label></th></tr>
                        <tr>
                            <th>主辦單位:</th>
                            <th><treeselect v-model="departID" :options="departs" :multiple="true" placeholder="請選擇主辦單位"></treeselect></th>
                            <th>主旨索引:</th>
                            <th><input type="text" v-model="form.index"></th>
                            <th>簽呈號:</th>
                            <th><input type="text" v-model="form.filingNum"></th>
                            <th>經辦人員編:</th>
                            <th><input type="text" v-model="form.personID"></th>
                        </tr>
                        <tr>
                            <th>送簽日期:</th>
                            <th>
                                <datepicker placeholder="Select Date"></datepicker>
                            </th>
                            <th>至</th>
                            <th><datepicker placeholder="Select Date"></datepicker></th>
                            <th>簽呈狀態:</th>
                            <th colspan="3">
                                <input type="radio" name="state" value="送簽中" v-model="form.state"/>送簽中
                                <input type="radio" name="state" value="已結案" v-model="form.state"/>已結案
                                <input type="radio" name="state" value="已歸檔" v-model="form.state"/>已歸檔
                            </th>
                        </tr>
                        <tr>
                            <td colspan="8" style="text-align: center;">
                                <button class="btn btn-primary" >查詢</button>
                            </td>
                        </tr>
                        <tr><th colspan="8"><label>快速搜尋: 查詢範圍為本身已經辦之公文</label></th></tr>
                        <tr>
                            <th>簽呈狀態:</th>
                            <th colspan="7">
                                <input type="radio" name="state" value="待簽辦" v-model="form.state"/>待簽辦
                                <input type="radio" name="state" value="會辦中" v-model="form.state"/>會辦中
                                <input type="radio" name="state" value="待核決" v-model="form.state"/>待核決
                                <input type="radio" name="state" value="未結案" v-model="form.state"/>未結案
                                <input type="radio" name="state" value="新結案" v-model="form.state"/>新結案
                            </th>
                        </tr>
                        </tbody>
                    </table>
                    <br>
                    <template v-if="items.length">
                    <table class="table filing-table">
                        <thead class="filing-table">
                        <tr>
                            <th scope="col">序號</th>
                            <th scope="col">送簽日期</th>
                            <th scope="col">簽呈號</th>
                            <th scope="col">主辦單位</th>
                            <th scope="col">主旨</th>
                            <th scope="col">狀態</th>
                            <th scope="col">結案日期</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in items">
                            <td>{{index}}</td>
                            <td>{{ item.date }}</td>
                            <td><a>{{ item.ID}}</a></td>
                            <td>{{ item.depart}}</td>
                            <td>{{ item.subject}}</td>
                            <td>{{ item.state}}</td>
                            <td>{{ item.enddate}}</td>
                        </tr>
                    </tbody>
                    </table>
                    </template>
                        <div v-else style="color:red;">無符合條件之資料!</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import ClipLoader from "vue-spinner/src/ClipLoader";
    import Treeselect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    import Datepicker from 'vuejs-datepicker';

    export default {
        name: 'ApprovalQueryPage',
        components: {Treeselect, Datepicker},
        data(){
            return{
                departID:[],
                departs:[
                    {id:'運務部', label:'運務部'},
                    {id:'運務管理部', label:'運務管理部'},
                    {id:'企劃室', label:'企劃室'},
                    {id:'包車部', label:'包車部'},
                ],
                form:{
                    index:'',
                    filingNum:'',
                    personID:'',
                    date:'',
                    state:'',
                    date:Date(),
                },
                items:[
                    {ID:"1234", date:'2018-09-12', depart:'運務部', subject:"test1" , state:'送簽中', enddate:''},
                    {ID:"4569", date:'2018-09-15', depart:'運務部', subject:"test2" , state:'送簽中', enddate:''},
                ]


            }
        },
        methods:{
            Date(){
                this.form.date= Date();
            }
        }
    }


</script>

<style lang="scss" scoped>
    .tree-height{
        height: 237px;
    }
    td{
        text-align: left;
        width: 12.5% !important;
        padding-top: 15px !important;
        padding-left: 20px !important;
    }
    th{
        text-align: left;
        width: 12.5% !important;
        padding-top: 15px !important;
        padding-left: 20px !important;
    }
    .filing-table{
        background-color:#5bc0de38 ;
    }
    
</style>

