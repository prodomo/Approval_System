<template>
    <div>
        <system-header header="內部公文" ID=announcementQuery title="公告查詢"></system-header>
        <section class="content">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>所屬部門:</th>
                        <td colspan="3"><treeselect v-model="form.depart" :options="departs" :multiple="true" placeholder="請選擇主辦單位"></treeselect></td>
                        <th>發文字號</th>
                        <td>
                            <input type="text" class="form-control" v-model="form.filingID">
                        </td>
                       
                    </tr>
                    <tr>
                        <th>送簽日期:</th>
                        <td>
                            <datepicker placeholder="Select Date" v-model="form.startDate"></datepicker>
                        </td>
                        <th>至</th>
                        <td><datepicker placeholder="Select Date" v-model="form.endDate"></datepicker></td>
                        <th>關鍵字查詢</th>
                        <td>
                            <input type="text" class="form-control" v-model="form.keyword">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="8" style="text-align: center;">
                            <button class="btn btn-primary" >查詢</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import ClipLoader from "vue-spinner/src/ClipLoader";
    import Treeselect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    import Datepicker from 'vuejs-datepicker';
    import SystemHeader from '@/components/SystemHeader'

    export default {
        name: 'AnnouncementQueryPage',
        components:{SystemHeader, Treeselect, Datepicker},
        data(){
            return{
                departID:[],
                departs:[
                    {id:'運務部', label:'運務部'},
                    {id:'運務管理部', label:'運務管理部'},
                    {id:'企劃室', label:'企劃室'},
                    {id:'包車部', label:'包車部'},
                ],
                options:[
                    {value:'董事長室'},
                    {value:'總管理處'},
                    {value:'財務部'},
                    ],
                form:{
                    depart:[],
                    startDate:'',
                    endDate:'',
                    filingID:'',
                    keyword:'',
                },
            }
        },
        methods:{
            
        }
    }


</script>

<style lang="scss" scoped>
    td{
        text-align: left;
        width: 20% !important;
        padding-top: 15px !important;
        padding-left: 20px !important;
    }
    th{
        text-align: left;
        width: 5% !important;
        padding-top: 15px !important;
        padding-left: 20px !important;
    }
</style>

