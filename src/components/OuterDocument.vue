<template>
    <div>
        <system-header header="公文作業" ID=announcementCreate title="公告建檔"></system-header>
        <section class="content">
             <div class="box-body">
                 <table class="table table-bordered">
                     <tbody>
                         <tr>
                            <th>簽呈字號</th>
                            <td></td>
                            <th>主辦單位</th>
                            <td></td>
                            <th>限辦日期</th>
                            <td></td>
                         </tr>
                         <tr>
                            <th>主旨</th>
                            <td colspan="5">
                                
                            </td>
                         </tr>
                         <tr>
                            <th rowspan="2">發文字號</th>
                            <td><label><input type="checkbox"/>執行發文流程</label></td>
                        </tr>
                        <tr>
                            <td colspan="5">
                                <textarea class="form-control" rows="10" aria-label="With textarea" v-model="form.Description" name="Description" v-validate="'required'"></textarea>
                                <span v-show="errors.has(`Description:required`)" class="error">{{"請輸入公告字號"}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th rowspan="2" >發文單位</th>
                            <td rowspan="2" colspan="2">
                                <div style="white-space:nowrap">
                                    <select v-model="departForm.depart">
                                            <option v-for="item in options" :value=item.value>{{item.value}}</option>
                                    </select>
                                </div>
                            </td>
                            <th>承辦單位</th>
                            <td colspan="2">xxxxxxxxxx</td>
                         </tr>
                         <tr>
                            <th><a>設定正本</a></th>
                            <td colspan="2">
                                <textarea textarea class="form-control" aria-label="With textarea"></textarea>
                            </td>
                         </tr>
                         <tr>
                            <th>發文日期</th>
                            <td colspan="2">
                                <datepicker placeholder="選擇日期" v-model="form.startDate"></datepicker>
                            </td>
                            <th rowspan="2"><a>設定副本</a></th>
                            <td rowspan="2" colspan="2" >
                                <textarea textarea class="form-control" aria-label="With textarea"></textarea>
                            </td>
                         </tr>
                         <tr>
                            <th>上傳發文檔</th>
                            <td colspan="2">
                                <input type="file">
                            </td>
                         </tr>
                         <tr>
                            <th>主旨</th>
                            <td colspan="5">
                                <input class="form-control" type="text" placeholder="" v-model="form.Subject" name="Subject" v-validate="'required'">
                                <span v-show="errors.has(`Subject:required`)" class="error">{{"請輸入主旨"}}</span>
                            </td>
                         </tr>
                         <tr>
                            <th>歸檔備註</th>
                            <td colspan="5">
                                <textarea class="form-control" rows="10" aria-label="With textarea" v-model="form.Description" name="Description" v-validate="'required'"></textarea>
                                <span v-show="errors.has(`Description:required`)" class="error">{{"請輸入歸檔備註"}}</span>
                            </td>
                        </tr>
                        
                        <tr>
                            <td colspan="8" style="text-align: center;">
                                <button class="btn btn-primary" >送出</button>
                            </td>
                        </tr>
                     </tbody>
                 </table>
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
    import SystemHeader from '@/components/SystemHeader'

    export default {
        name: 'OuterDocument',
        components:{SystemHeader, Datepicker},
        data(){
            return{
                departForm:{
                    depart:'',
                },
                options:[
                    {value:'和欣汽車客運股份有限公司'},
                    {value:'日勝運通有限公司'},
                    {value:'如黃台中企業行'},
                    ],
                form:{
                    Subject:'',
                    Description:'',
                    startDate:null,
                },
            }
        },
        methods:{
            
        }
    }


</script>

<style lang="scss" scoped>

    label{
        padding-top: 7px!important;
    }
    .table-bordered>tbody>tr>td{
      width: 16% !important;
    }
    .table-bordered>tbody>tr>td{
      width: 16% !important; 
    }
    th{
        text-align: center;
        padding-top: 15px !important;
        vertical-align: bottom;
    }
    td{
        text-align: left;
        vertical-align: bottom;

    }
</style>

