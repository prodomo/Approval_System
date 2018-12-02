<template>
    <div>
        <system-header header="公文作業" ID=approvalCreate title="簽呈建檔"></system-header>
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
                                <input class="form-control" type="text" placeholder="" v-model="form.ReferencePetitionId" @click="showModal()">
                            </td>
                            <th>建檔日期</th>
                            <td>
                                <label></label>
                            </td>
                            <th>密等</th>
                            <td>
                                <select class="form-control" v-model="form.SecretLevelId" name="SecretLevelId"  v-validate="'required'">
                                    <option value=1>普通</option>
                                    <option value=2>密</option>
                                    <option value=3>機密</option>
                                    <option value=4>極機密</option>
                                </select>
                                <span v-show="errors.has(`SecretLevelId:required`)" class="error">{{"請選擇密等"}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>簽呈字號</th>
                            <td>
                            <label></label>
                            </td>
                            <th>ISO管制文件</th>
                            <td>
                                <label><input type="radio" name="ISOTypeId"  v-model="form.ISOTypeId"/>無</label>
                                <label><input type="radio" name="ISOTypeId" value=1 v-model="form.ISOTypeId"/>新增</label>
                                <label><input type="radio" name="ISOTypeId" value=2 v-model="form.ISOTypeId"/>修訂</label>
                                <label><input type="radio" name="ISOTypeId" value=3 v-model="form.ISOTypeId"/>廢止</label>
                            </td>
                            <th>限辦日期</th>
                            <td>
                                <label></label>
                            </td>
                            <th>速別</th>
                            <td>
                                <select class="form-control" v-model="form.PriorityId" name="PriorityId"  v-validate="'required'">
                                    <option value=1>普通件</option>
                                    <option value=2>速件</option>
                                    <option value=3>最速件</option>
                                    <option value=3>特速件</option>
                                </select>
                                <span v-show="errors.has(`PriorityId:required`)" class="error">{{"請選擇速別"}}</span>
                            </td>            
                        </tr>
                        <tr>
                            <th>主辦單位</th>
                            <td>
                                <select class="form-control" v-model="showForm.MainDepart" name="MainDepart"  v-validate="'required'">
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
                                <input class="form-control" type="text" placeholder="" v-model="form.Purport" name="Purport" v-validate="'required'">
                                <span v-show="errors.has(`Purport:required`)" class="error">{{"請輸入主旨"}}</span>
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
                                <textarea class="form-control" rows="10" aria-label="With textarea" v-model="showForm.Description" name="Description" v-validate="'required'"></textarea>
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
                                <label><input type="radio" name="ToDoValue" value="代為決行" v-model="showForm.ToDoValue" v-validate="'required'"/>代為決行</label><br>
                                <label><input type="radio" name="ToDoValue" value="簽核送出" v-model="showForm.ToDoValue"/>簽核送出</label><br>
                                <label><input type="radio" name="ToDoValue" value="送會其他單位" v-model="showForm.ToDoValue"/>送會其他單位</label><br>
                                <label><input type="radio" name="ToDoValue" value="單位分文" v-model="showForm.ToDoValue"/>單位分文</label><br>
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
                        <tr><th colspan="8"  v-if="form.ReferencePetitionId!=null">本文，依據{{form.ReferencePetitionId}}辦理</th></tr>
                        <tr>
                            <th>簽呈號</th>
                            <td colspan>
                                <label>{{showForm.showNumber}}</label>
                            </td>
                            <th>依據收文號</th>
                            <td colspan>
                                <label>{{form.ReferencePetitionId}}</label>
                            </td>
                            <th>建檔日期</th>
                            <td>
                                <label>{{datetime(showForm.Date)}}</label>
                            </td>
                            <th>密等</th>
                            <td>
                                <label>{{textForm.Confidentiality}}</label>
                            </td>
                        </tr>
                        <tr>
                            <th>簽呈字號</th>
                            <td>
                                <label>{{showForm.showNumberText}}</label>
                            </td>
                            <th>ISO管制文件</th>
                            <td>
                                <label>{{textForm.IsoValue}}</label>
                            </td>
                            <th>限辦日期</th>
                            <td>
                                <div v-if="form.LimitDate!=null">
                                    <label>{{datetime(showForm.LimitDate)}}</label>
                                </div>
                            </td>
                            <th>速別</th>
                            <td>
                                <label>{{textForm.priority}}</label>
                            </td>            
                        </tr>
                        <tr>
                            <th>主辦單位</th>
                            <td>
                                <label>{{showForm.MainDepart}}</label>
                            </td>
                            <th>承辦人員</th>
                            <td>
                            <label>{{"XXX"}}</label>
                            </td>
                            <th>歸檔日期</th>
                            <td>
                                <div v-if="form.ArchiveDate!=null">
                                    <label >{{datetime(form.ArchiveDate)}}</label>
                                </div>
                            </td>
                            <th>處理狀態</th>
                            <td>
                                <label>{{textForm.status}}</label>
                            </td>            
                        </tr>
                        
                        <tr>
                            <th>主旨</th>
                            <td colspan="7">
                                <label>{{form.Purport}}</label>
                            </td>
                        </tr>
                        <tr>
                            <th>說明</th>
                            <td colspan="7">
                                <label>{{showForm.Description}}</label>
                            </td>
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
                                <label>於{{datetime(showForm.Date)}}</label><br>
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
                                <label>{{showForm.ToDoValue}}</label>
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
import axios from 'axios';
import _ from 'lodash';

export default {
    name: 'ApprovalCreateSinglePage',
    components:{FilingNumModal, SystemHeader},
    data(){
        return{
            step:1,
            apID:null,
            items:[],
            showModalStatus: false,
            sending: false,
            form:{
                ReferencePetitionId:null,
                PetitionNumberId:null,
                PriorityId:1,
                SecretLevelId:1,
                ISOTypeId:null,               
                ArchiveDate:null,
                Purport:'',
                Proposition:'',
                LayerOptionId:null,
            },
            showForm:{
                MainDepart:'',
                State:'',
                Date:'',
                LimitDate:'',
                ToDoValue:null,
                Description:'',
                showNumberText:null,
                showNumber:null,
            },
            modalParams: {
                show: false,
                rid: null
            },
            textForm:
            {
                priority:'普通件',
                Confidentiality:'普通',
                IsoValue:'無',
                status:'',
            }

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
                    this.setPriorityText();
                    this.setConfidentialityText();
                    this.setISOText();
                    this.save();
                    this.textForm.status='創稿中';
                }
            }
        },
        async reset(){
            this.step=1;
            this.form.ReferencePetitionId=null;
            this.form.PetitionNumberId=null;
            this.showForm.MainDepart='';
            this.form.PriorityId=1;
            this.form.SecretLevelId=1;
            this.form.ISOTypeId=null;
            this.form.Purport='',
            this.form.Proposition='';
            this.showForm.Description='';
            this.showForm.Date='';
            this.showForm.LimitDate='';
            this.showForm.ToDoValue=null;
            this.form.LayerOptionId=null;
            this.apID=null;
            this.showForm.showNumberText=null;
        },
        showModal() {
            this.modalParams.show = true;
        },
        getfilingNum(lastid)
        {
            this.form.ReferencePetitionId=lastid;
        },
        async save()
        {
            let res = null;
            this.sending = true;
            try{
                if(!this.apID)
                {
                    res = await axios.post(`/api/PetitionNumbers`);
                    res = res.data;

                    if(res.Status==0)
                    {
                        const data = res.Data;
                        this.form.PetitionNumberId = data.Row[0].Id;
                        this.showForm.showNumber = data.Row[0].showNumber;
                        this.showForm.showNumberText =  data.Row[0].showNumberText;
                    }

                    const form = _.cloneDeep(this.form);
                    res = await axios.post(`/api/Petitions`, form);
                }
                else
                {
                    const form = _.cloneDeep(this.form);
                    res = await axios.put(`/api/Petitions/${this.apID}`, form);
                }
                res = res.data;
                if(res.Status==0)
                {
                    const data = res.Data;

                    this.showForm.Date = data.Row.CreatedAt;
                    this.form.ArchiveDate = data.Row.ArchiveDate;
                    this.apID = data.Row.Id;
                }
            }
            catch(err)
            {
                alert(err.message);
                this.guestRedirectHome(err.response.status);
            }

        },
        async onSubmit()
        {
            let res = null;
            this.sending = true;
            this.form.LayerOptionId=1;
            try{
                const form = _.cloneDeep(this.form);

                if(!this.apID)
                {
                    res = await axios.post(`/api/Petitions`, form);
                }
                else
                {
                    res = await axios.put(`/api/Petitions/${this.apID}`, form);
                }
                res = res.data;
                if(res.Status==0)
                {
                    this.$toast.success({
                        title: '成功訊息',
                        message: '送出成功'
                        });
                    this.reset();
                }
            }
            catch(err)
            {
                alert(err.message);
                this.guestRedirectHome(err.response.status);
            }
        },
        setPriorityText()
        {
            if (this.form.PriorityId==1)
                this.textForm.priority='普通';

            else if (this.form.PriorityId==2)
                this.textForm.priority='速件';

            else if (this.form.PriorityId==3)
                this.textForm.priority='最速件';

            else if (this.form.PriorityId==4)
                this.textForm.priority='特素件';
        },
        setConfidentialityText()
        {
            if (this.form.SecretLevelId==1)
                this.textForm.Confidentiality='普通';

            else if (this.form.SecretLevelId==2)
                this.textForm.Confidentiality='速件';

            else if (this.form.SecretLevelId==3)
                this.textForm.Confidentiality='最速件';

            else if (this.form.SecretLevelId==4)
                this.textForm.Confidentiality='特素件';
            
        },
        setISOText()
        {
            if (this.form.ISOTypeId ==1)
                this.textForm.IsoValue='普通';

            else if (this.form.ISOTypeId ==2)
                this.textForm.IsoValue='速件';

            else if (this.form.ISOTypeId ==3)
                this.textForm.IsoValue='最速件';

            else if (this.form.ISOTypeId ==4)
                this.textForm.IsoValue='特素件';
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
