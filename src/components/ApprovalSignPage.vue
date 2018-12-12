<template>
    <div>
        <system-header header="公文作業" ID=approvalCreate title="簽呈建檔"></system-header>
        <section class="content">
            <div class="box-body">
                <div v-if="step==1">
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
                                <div v-if="showForm.CreateDate!=null">
                                    <label>{{date(showForm.CreateDate)}}</label>
                                </div>
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
                                <div v-if="showForm.LimitedDate!=null">
                                    <label>{{date(showForm.LimitedDate)}}</label>
                                </div>
                            </td>
                            <th>速別</th>
                            <td>
                                <label>{{textForm.priority}}</label>
                            </td>            
                        </tr>
                        <tr>
                            <th>承辦單位</th>
                            <td>
                                <label></label>
                            </td>
                            <th>承辦人員</th>
                            <td>
                            <label>{{showForm.InitUser}}</label>
                            </td>
                            <th>歸檔日期</th>
                            <td>
                                <div v-if="form.ArchiveDate!=null">
                                    <label >{{date(form.ArchiveDate)}}</label>
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
                                <label>{{form.State}}</label>
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
                                <label>{{showForm.InitUser}}</label>
                            </th>
                            <td>
                                <label>於{{date(showForm.Date)}}</label><br>
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
                                    <label></label>
                                </th>
                                <td>
                                    <label>狀態 未處理</label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </td></tr>
                        <tr>
                            <th>簽核內容</th>
                            <td colspan="7">
                                <textarea class="form-control" rows="10" aria-label="With textarea" v-model="showForm.SignInfo" name="SignInfo" v-validate="'required'"></textarea>
                                <span v-show="errors.has(`SignInfo:required`)" class="error">{{"請輸入簽核內容"}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>簽核選項</th>
                            <td colspan="7">
                                <div v-for="items in showForm.LayerOptions">
                                    <div v-if="items.Name =='送會其他單位'">
                                        <label><input type="radio" name="ToDoValue" :value="items.Name" v-model="showForm.ToDoValue" @click="showDepartModal()" v-validate="'required'" >{{items.Name}}</label><br>
                                        <div v-if="showForm.ProcessingUnits.length !=0">
                                            <label v-for="user in showForm.ProcessingUnits">{{user.Name}} {{user.User}}  ,</label>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <label><input type="radio" name="ToDoValue" :value="items.Name" v-model="showForm.ToDoValue" v-validate="'required'">{{items.Name}}</label><br>
                                    </div>
                                </div>
                                <span v-show="errors.has(`ToDoValue:required`)" class="error">{{"請選擇簽核選項"}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>簽搞併陳</th>
                            <td colspan="7"></td>
                        </tr>

                        </tbody>
                        <tr><td colspan="8" class="button">
                        <btn class="btn btn-primary" @click="next">存草稿</btn>
                        <btn class="btn btn-primary" @click="next">預覽</btn>
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
                                <label>{{date(showForm.Date)}}</label>
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
                                <div v-if="showForm.LimitedDate!=null">
                                    <label>{{date(showForm.LimitedDate)}}</label>
                                </div>
                            </td>
                            <th>速別</th>
                            <td>
                                <label>{{textForm.priority}}</label>
                            </td>            
                        </tr>
                        <tr>
                            <th>承辦單位</th>
                            <td>
                                <label>{{showForm.MainDepart[0].Department}}</label>
                            </td>
                            <th>承辦人員</th>
                            <td>
                            <label>{{showForm.InitUser}}</label>
                            </td>
                            <th>歸檔日期</th>
                            <td>
                                <div v-if="form.ArchiveDate!=null">
                                    <label >{{date(form.ArchiveDate)}}</label>
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
                                <label>{{form.State}}</label>
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
                                <label>{{showForm.InitUser}}</label>
                            </th>
                            <td>
                                <label>於{{date(showForm.Date)}}</label><br>
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
                                    <label>{{showForm.MainDepart.User}}</label>
                                </th>
                                <td>
                                    <label>狀態 未處理</label><br>
                                    <label>{{showForm.SignInfo}}</label>
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
        <filing-num-modal v-model="filingModel.show" @getfilingNum="getfilingNum"></filing-num-modal>
        <department-select-modal v-model="departmentModel.show" @getDepartID="getDepartID"></department-select-modal>
    </div>
</template>

<script>
import FilingNumModal from "@/components/FilingNumModal";
import DepartmentSelectModal from "@/components/DepartmentSelectModal";
import SystemHeader from '@/components/SystemHeader';
import {mapState} from 'vuex';
import axios from 'axios';
import _ from 'lodash';

export default {
    name: 'ApprovalSignPage',
    components:{FilingNumModal, SystemHeader, DepartmentSelectModal},
    data(){
        return{
            step:1,
            apID: this.$route.params.apID ? parseInt(this.$route.params.apID) : 35,
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
                State:'',
                DepartmentPetitions:null,               
            },
            showForm:{
                MainDepart:null,
                CreateDate:null,
                LimitedDate:null,
                ToDoValue:null,
                showNumberText:null,
                showNumber:null,
                LayerOptions:null,
                ProcessingUnits:[],
                InitUser:'',
                SignInfo:'',
            },
            filingModel:{
                show: false,
                rid: null
            },
            departmentModel:{
                show: false,
                rid: null
            },
            textForm:
            {
                priority:'普通件',
                Confidentiality:'普通',
                IsoValue:'無',
                status:'',
            },

        }
    },
    computed:{
        ...mapState({
            userName: state => state.user.user.Name,
            chief: state => state.user.user.Chief,
        }),
        

    },
    methods:{
        async next(){
            const isPass = await this.$validator.validateAll();

            if(isPass!=true){
                // alert(isPass);
                // alert(JSON.stringify(this.$validator.errors.items));
            }
            else
            {
                this.step++;

                if(this.step==2)
                {
                    this.setPriorityText();
                    this.setConfidentialityText();
                    this.setISOText();
                    // this.save();
                }
            }
        },
        showFilingModal() {
            this.filingModel.show = true;
        },
        showDepartModal() {
            this.departmentModel.show = true;
        },
        getfilingNum(lastid)
        {
            this.form.ReferencePetitionId=lastid;
        },
        getDepartID(lastid)
        {
            this.showForm.ProcessingUnits=lastid;
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
                        this.form.PetitionNumberId = data.Row.Id;
                        this.showForm.showNumber = data.Row.ShowNumber;
                        this.showForm.showNumberText =  data.Row.ShowNumberText;
                        this.form.DepartmentPetitions = this.showForm.ProcessingUnits;
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
                    this.showForm.LimitedDate = data.Row.LimitedDate;
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
            try{
                // const form = _.cloneDeep(this.form);

                // if(!this.apID)
                // {
                //     res = await axios.post(`/api/Petitions`, form);
                // }
                // else
                // {
                //     res = await axios.put(`/api/Petitions/${this.apID}`, form);
                // }
                // res = res.data;
                // if(res.Status==0)
                // {
                    this.$toast.success({
                        title: '成功訊息',
                        message: '送出成功'
                        });
                    this.$router.push({
                    path: `/mainPage`,
                    });
                // }
            }
            catch(err)
            {
                // alert(err.message);
                this.guestRedirectHome(err.response.status);
            }
        },
        async getOptionItems()
        {
            let res = null;
            try{
                if(!this.apID)
                {
                    res = await axios.get(`/api/LayerOptions`);
                }
                else
                {
                    res = await axios.get(`/api/LayerOptions`, {params:{
                        petitionId: this.apID,
                        layerId: this.textForm.LayerId
                    }});
                }
                res = res.data;
                if(res.Status==0)
                {
                    const data = res.Data;
                    this.showForm.LayerOptions = data.Items;
                }
            }
            catch(err)
            {
                // alert(err.message);
                this.guestRedirectHome(err.response.status);
            }
        },
        async getApprovalInfo()
        {
            let res = null;
            try{

                res = await axios.get(`/api/Petitions/${this.apID}`);
                res = res.data;
                if(res.Status==0)
                {
                    const data = res.Data;
                    this.form.ReferencePetitionId = data.Row.ReferencePetitionId;
                    this.form.SecretLevelId = data.Row.SecretLevelId;
                    this.form.ISOTypeId = data.Row.ISOTypeId;
                    this.form.PriorityId = data.Row.PriorityId;
                    this.form.Purport = data.Row.Purport;
                    this.form.Proposition = data.Row.Proposition;
                    this.textForm.LayerId = data.Row.LayerId;
                    this.form.LayerOptionId = data.Row.LayerOptionId;
                    this.form.State = data.Row.State;
                    this.showForm.LimitedDate = data.Row.LimitedDate;
                    this.showForm.showNumber = data.Row.PetitionNumber.ShowNumber;
                    this.showForm.showNumberText = data.Row.PetitionNumber.ShowNumberText;
                    this.showForm.InitUser = data.Row.User.Name;
                    this.showForm.MainDepart = data.Chief;
                    this.showForm.CreateDate = data.Row.CreateDate;
                    // this.form.PetitionNumberId = this.apID;
                }
            }
            catch(err)
            {
                // alert(err.message);
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
    async mounted(){
        await this.getApprovalInfo();
        this.getOptionItems();
    }
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
