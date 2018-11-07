<template>
    <div>
        <system-header header="公文作業"></system-header>
        <section class="content">
             <div class="box-body">
                 <table class="table">
                     <tbody>
                         <tr>
                             <th>發文單位</th>
                             <td>
                                 <select v-model="departForm.depart">
                                        <option v-for="(item,index) in options" :value=item.value>{{item.value}}</option>
                                 </select>
                                 <label>{{departForm.year}}</label>
                                 <label>{{departForm.fixtext}}</label>
                                 <input type="text" v-model="departForm.text">
                             </td>
                             <th>發文公司</th>
                             <td>
                             </td>
                         </tr>
                         <tr>
                             <th>主旨</th>
                            <td colspan="3">
                                <input class="form-control" type="text" placeholder="" v-model="form.Subject" name="Subject" v-validate="'required'">
                                <span v-show="errors.has(`Subject:required`)" class="error">{{"請輸入主旨"}}</span>
                            </td>
                         </tr>
                         <tr>
                            <th>說明</th>
                            <td colspan="3">
                                <textarea class="form-control" rows="10" aria-label="With textarea" v-model="form.Description" name="Description" v-validate="'required'"></textarea>
                                <span v-show="errors.has(`Description:required`)" class="error">{{"請輸入說明"}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>發文者</th>
                            <td colspan="2">
                                <input type="file" >
                            </td>
                            <td style="text-align: right !important; padding-right: 30px !important;">
                                <button class="btn">上傳</button>
                                <a>下載範例</a>
                            </td>
                        </tr>
                        <tr>
                            <th>發文者清單</th>
                            <td colspan="3"></td>
                        </tr>
                        <tr>
                            <th style="color:red;">可供列印檔</th>
                            <td colspan="3">
                                <input type="file">
                            </td>
                        </tr>
                        <tr>
                            <th style="color:blue;">不可供列印檔</th>
                            <td colspan="3">
                                <input type="file">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="8" style="text-align: center;">
                                <button class="btn btn-primary" >公告發文</button>
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
        name: 'AnnouncementCreatePage',
        components:{SystemHeader},
        data(){
            return{
                departForm:{
                    depart:'',
                    year:'107',
                    fixtext:'和行字第',
                    text:'',
                },
                options:[
                    {value:'董事長室'},
                    {value:'總管理處'},
                    {value:'財務部'},
                    ],
                form:{
                    Subject:'',
                    Description:'',
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
        width: 40% !important;
        padding-top: 15px !important;
        padding-left: 20px !important;
    }
    th{
        text-align: left;
        width: 10% !important;
        padding-top: 15px !important;
        padding-left: 20px !important;
    }
</style>

