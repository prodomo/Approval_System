<template>
    <div>
        <system-header header="公文作業" ID=3></system-header>
        <section class="content">
            <div class="box-body">
                <div v-if="step==1">
                    <table class="table table-bordered">
                        <tbody>
                        <tr><th colspan="8" class="Reminder">*簽呈未經核決單位核准前，所有人員不得擅自執行作業或送出任何文件。</th></tr>
                        <tr><th colspan="8" class="Reminder">*急件簽呈須先行作業時，請主動與核決單位聯絡，經核准才可作業。</th></tr>
                        <tr>
                            <th>簽呈號</th>
                            <td>
                            <label></label>
                            </td>
                            <th>依據收文號</th>
                            <td>
                                <input class="form-control" type="text" placeholder="" v-model="form.LastID" @click="showModal()">
                            </td>
                            <th>建檔日期</th>
                            <td>
                                <label></label>
                            </td>
                            <th>密等</th>
                            <td>
                                <select class="form-control" v-model="form.Confidentiality" name="Confidentiality"  v-validate="'required'">
                                    <option value="普通">普通</option>
                                    <option value="密">密</option>
                                    <option value="機密">機密</option>
                                    <option value="極機密">極機密</option>
                                </select>
                                <span v-show="errors.has(`Confidentiality:required`)" class="error">{{"請選擇密等"}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>簽呈字號</th>
                            <td>
                            <label></label>
                            </td>
                            <th>ISO管制文件</th>
                            <td>
                                <label><input type="radio" name="isoValue" value="無" v-model="form.IsoValue"/>無</label>
                                <label><input type="radio" name="isoValue" value="新增" v-model="form.IsoValue"/>新增</label>
                                <label><input type="radio" name="isoValue" value="修訂" v-model="form.IsoValue"/>修訂</label>
                                <label><input type="radio" name="isoValue" value="廢止" v-model="form.IsoValue"/>廢止</label>
                            </td>
                            <th>限辦日期</th>
                            <td>
                                <label></label>
                            </td>
                            <th>速別</th>
                            <td>
                                <select class="form-control" v-model="form.Priority" name="Priority"  v-validate="'required'">
                                    <option value="普通件">普通件</option>
                                    <option value="速件">速件</option>
                                    <option value="最速件">最速件</option>
                                    <option value="特速件">特速件</option>
                                </select>
                                <span v-show="errors.has(`Priority:required`)" class="error">{{"請選擇速別"}}</span>
                            </td>            
                        </tr>
                        <tr>
                            <th>主辦單位</th>
                            <td>
                                <select class="form-control" v-model="form.MainDepart" name="MainDepart"  v-validate="'required'">
                                    <option value="[資訊中心] xxx">[資訊中心] xxx</option>
                                    <option value="[運務部] xxx">[運務部] xxx</option>
                                </select>
                                <span v-show="errors.has(`MainDepart:required`)" class="error">{{"請選擇主辦單位"}}</span>
                            </td>
                            <th>承辦人員</th>
                            <td>
                            <label>{{"XXX"}}</label>
                            </td>
                            <th>歸檔日期</th>
                            <td>
                                <label></label>
                            </td>
                            <th>處理狀態</th>
                            <td>
                                <label></label>
                            </td>            
                        </tr>
                        <tr>
                            <th>主旨</th>
                            <td colspan="7">
                                <input class="form-control" type="text" placeholder="" v-model="form.Subject" name="Subject" v-validate="'required'">
                                <span v-show="errors.has(`Subject:required`)" class="error">{{"請輸入主旨"}}</span>
                            </td>
                        </tr>
                        <!-- <tr><td colspan="8"> -->
                        <!-- <table  class="table table-bordered">
                        <tbody>
                        <tr class="status-table">
                            <th>
                                <label>承辦人員</label>
                            </th>
                            <th>
                                <label>xxx</label>
                            </th>
                            <td>
                                <label>狀態 未處理</label>
                            </td>
                        </tr>
                        </tbody> -->
                        <!-- </table> -->
                        <!-- <table  class="table table-bordered">
                            <tbody>
                            <tr class="status-table">
                                <th>
                                    <label>單位主管</label>
                                </th>
                                <th>
                                    <label>xxx</label>
                                </th>
                                <td>
                                    <label>狀態 未處理</label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </td></tr> -->
                        <tr>
                            <th>說明</th>
                            <td colspan="7">
                                <textarea class="form-control" rows="10" aria-label="With textarea" v-model="form.Description" name="Description" v-validate="'required'"></textarea>
                                <span v-show="errors.has(`Description:required`)" class="error">{{"請輸入說明"}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>擬辦</th>
                            <td colspan="7">
                                <textarea class="form-control" rows="10" aria-label="With textarea" v-model="form.Proposition" name="Proposition" v-validate="'required'"></textarea>
                                <span v-show="errors.has(`Proposition:required`)" class="error">{{"請輸入擬辦"}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>簽核選項</th>
                            <td colspan="7">
                                <label><input type="radio" name="ToDoValue" value="代為決行" v-model="form.ToDoValue" v-validate="'required'"/>代為決行</label><br>
                                <label><input type="radio" name="ToDoValue" value="簽核送出" v-model="form.ToDoValue"/>簽核送出</label><br>
                                <label><input type="radio" name="ToDoValue" value="送會其他單位" v-model="form.ToDoValue"/>送會其他單位</label><br>
                                <label><input type="radio" name="ToDoValue" value="單位分文" v-model="form.ToDoValue"/>單位分文</label><br>
                                <span v-show="errors.has(`ToDoValue:required`)" class="error">{{"請選擇簽核選項"}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>簽搞併陳</th>
                            <td colspan="7">
                                <input type="checkbox">如需『發文』或『公告』，請勾選，並上傳檔案(請注意：單一檔案大小限制為5MB。)
                            </td>
                        </tr>

                        </tbody>
                        <tr><td colspan="8" class="button">
                        <btn class="btn btn-primary" @click="next">存草稿</btn>
                        <btn class="btn btn-primary" @click="next">預覽</btn>
                        <btn class="btn btn-primary" @click="reset">作廢</btn>
                        </td></tr>
                    </table>
                </div>
                <div v-if="step==2">
                    <table class="table table-bordered">
                        <tbody>
                        <tr><th colspan="8"  v-if="form.LastID!=null">本文，依據{{form.LastID}}辦理</th></tr>
                        <tr>
                            <th>簽呈號</th>
                            <td colspan>
                                <label>{{"10700101501"}}</label>
                            </td>
                            <th>依據收文號</th>
                            <td colspan>
                                <label>{{form.LastID}}</label>
                            </td>
                            <th>建檔日期</th>
                            <td>
                                <label>{{form.Date}}</label>
                            </td>
                            <th>密等</th>
                            <td>
                                <label>{{form.Confidentiality}}</label>
                            </td>
                        </tr>
                        <tr>
                            <th>簽呈字號</th>
                            <td>
                                <label>{{"107XX簽呈字第1501號"}}</label>
                            </td>
                            <th>ISO管制文件</th>
                            <td>
                                <label>{{form.IsoValue}}</label>
                            </td>
                            <th>限辦日期</th>
                            <td>
                                <label>{{form.LimitDate}}</label>
                            </td>
                            <th>速別</th>
                            <td>
                                <label>{{form.Priority}}</label>
                            </td>            
                        </tr>
                        <tr>
                            <th>主辦單位</th>
                            <td>
                                <label>{{form.MainDepart}}</label>
                            </td>
                            <th>承辦人員</th>
                            <td>
                            <label>{{"XXX"}}</label>
                            </td>
                            <th>歸檔日期</th>
                            <td>
                                <label></label>
                            </td>
                            <th>處理狀態</th>
                            <td>
                                <label>{{form.State}}</label>
                            </td>            
                        </tr>
                        
                        <tr>
                            <th>主旨</th>
                            <td colspan="7">
                                <label>{{form.Subject}}</label>
                            </td>
                        </tr>
                        <tr>
                            <th>說明</th>
                            <td colspan="7">{{form.Description}}</td>
                        </tr>
                        <tr><td colspan="8">
                        <table  class="table table-bordered">
                        <tbody>
                        <tr class="status-table">
                            <th>
                                <label>承辦人員</label>
                            </th>
                            <th>
                                <label>xxx</label>
                            </th>
                            <td>
                                <label>於{{form.Date}}</label><br>
                                <label>擬辦{{form.Proposition}}</label>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                        <table  class="table table-bordered">
                            <tbody>
                            <tr class="status-table">
                                <th>
                                    <label>單位主管</label>
                                </th>
                                <th>
                                    <label>xxx</label>
                                </th>
                                <td>
                                    <label>狀態 未處理</label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </td></tr>
                        <tr>
                            <th>簽核選項</th>
                            <td colspan="7">
                                <label>{{form.ToDoValue}}</label>
                            </td>
                        </tr>
                        <tr>
                            <th>簽搞併陳</th>
                            <td colspan="7"></td>
                        </tr>

                        </tbody>
                        <tr><td colspan="8" class="button">
                        <btn class="btn btn-primary" @click="step--">取消預覽</btn>
                        <btn class="btn btn-primary" @click="onSubmit">確定送出</btn>
                        </td></tr>
                    </table>
                </div>
            </div>
        </section>
        <filing-num-modal v-model="modalParams.show" @getfilingNum="getfilingNum"></filing-num-modal>
    </div>
</template>

<script>
import FilingNumModal from "@/components/FilingNumModal";
import SystemHeader from '@/components/SystemHeader';

export default {
    name: 'ApprovalCreateSinglePage',
    components:{FilingNumModal, SystemHeader},
    data(){
        return{
            step:1,
            items:[],
            showModalStatus: false,
            form:{
                LastID:null,
                ID:'',
                MainDepart:'',
                Priority:'普通件',
                Confidentiality:'普通',
                IsoValue:'無',
                Subject:'',
                State:'',
                Proposition:'',
                Description:'',
                Date:'',
                LimitDate:'',
                ToDoValue:null,

            },
            modalParams: {
                show: false,
                rid: null
            },

        }
    },
    methods:{
        async next(){
            const isPass = await this.$validator.validateAll();

            if(isPass!=true){
                alert(isPass);
                alert(JSON.stringify(this.$validator.errors.items));
            }
            else
            {
                this.step++;

                if(this.step==2)
                {
                    this.form.Date=Date();
                    this.form.State='創稿中';
                    this.form.ID='1234';
                }
            }
        },
        async reset(){
            this.step=1;
            this.form.LastID=null;
            this.form.ID='';
            this.form.MainDepart='';
            this.form.Priority='普通件';
            this.form.Confidentiality='普通';
            this.form.IsoValue='無',
            this.form.Subject='',
            this.form.Proposition='';
            this.form.Description='';
            this.form.Date='';
            this.form.LimitDate='';
            this.form.ToDoValue=null;

        },
        showModal() {
            this.modalParams.show = true;
        },
        getfilingNum(lastid)
        {
            this.form.LastID=lastid;
        },
        onSubmit()
        {

        },
    },
}
</script>

<style>
    .Reminder{
        text-align: left;
    }

    .error{
        color: red;
    }

    .button{
        text-align: center;
    }

    .table-bordered>tbody>tr>td{
      width: 12.5% !important;
    }
    .table-bordered>tbody>tr>td{
      width: 12.5% !important; 
    }

    label{
        padding-top: 7px!important;
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
    .status-table{
        background-color:#ffffcc ;
    }
    .status-table>td{
       text-align: left !important;
       padding-left: 80px !important;
       width: 50% !important; 
    }
    .status-table>th{
       text-align: left !important;
       padding-left: 80px !important;
       width: 2.5% !important; 
    }
</style>
