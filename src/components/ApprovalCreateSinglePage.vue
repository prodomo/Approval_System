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
                                <input class="form-control" type="text" placeholder="" v-model="form.ReferencePetitionId" @click="showFilingModal()">
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
                                    <option v-for="item in chief" :value="item">{{item.Department}} {{item.User}}</option>
                                </select>
                                <span v-show="errors.has(`MainDepart:required`)" class="error">{{"請選擇主辦單位"}}</span>
                            </td>
                            <th>承辦人員</th>
                            <td>
                            <label>{{userName}}</label>
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
                        <tr>
                            <th>說明</th>
                            <td colspan="7">
                                <textarea class="form-control" rows="10" aria-label="With textarea" v-model="form.State" name="State" v-validate="'required'"></textarea>
                                <span v-show="errors.has(`State:required`)" class="error">{{"請輸入說明"}}</span>
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
                                <div v-for="items in showForm.LayerOptions">
                                    <div v-if="items.Id == 1 ">
                                        <label><input type="radio" name="ToDoValue" :value="items.Name" v-model="showForm.ToDoValue" v-validate="'required'" >{{items.Name}}</label>
                                        <div v-if="showForm.ToDoValue==items.Name">
                                            <input type="checkbox" v-model="PetitionsChecked" @click="showDepartModal(PetitionsChecked)">
                                            <a @click="showDepartModal()">(送會其他單位)</a><br>
                                            <div v-if="PetitionsChecked">
                                                <label v-for="user in showForm.ProcessingUnits">{{user.Name}} {{user.User}}  ,</label>
                                            </div>
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
                                <label>{{showForm.MainDepart.Department}}</label>
                            </td>
                            <th>承辦人員</th>
                            <td>
                            <label>{{userName}}</label>
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
                                <label>{{userName}}</label>
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
                                <div v-if="PetitionsChecked">
                                    <label v-for="user in showForm.ProcessingUnits">{{user.Name}} {{user.User}}  ,</label>
                                </div>
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
        <filing-num-modal v-bind:modeID="1" v-model="filingModel.show" @getfilingNum="getfilingNum"></filing-num-modal>
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
import $ from 'jquery';

export default {
    name: 'ApprovalCreateSinglePage',
    components:{FilingNumModal, SystemHeader, DepartmentSelectModal},
    data(){
        return{
            step:1,
            apID:this.$route.params.apID ? parseInt(this.$route.params.apID) : null,
            items:[],
            showModalStatus: false,
            sending: false,
            PetitionsChecked:false,
            form:{
                ReferencePetitionId:null,
                ArticleNumberId:null,
                PriorityId:1,
                SecretLevelId:1,
                ISOTypeId:null,               
                ArchiveDate:null,
                Purport:'',
                Proposition:'',
                LayerOptionId:null,
                State:'',
                DepartmentPetitions:[],
                PetitionComments:[],           
            },
            showForm:{
                MainDepart:'',
                Date:'',
                LimitedDate:null,
                ToDoValue:null,
                showNumberText:null,
                showNumber:null,
                LayerOptions:null,
                ProcessingUnits:[],
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
            tempForm:
            {
                petitionId:null,
                layerId:null,
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
                    this.save();
                    this.textForm.status='創稿中';
                }
            }
        },
        async reset(){
            this.form.ReferencePetitionId=null;
            this.form.ArticleNumberId=null;
            this.form.PriorityId=1;
            this.form.SecretLevelId=1;
            this.form.ISOTypeId=null;              
            this.form.ArchiveDate=null;
            this.form.Purport='';
            this.form.Proposition='';
            this.form.LayerOptionId=null;
            this.form.State='';
            this.form.DepartmentPetitions=[];
            this.form.PetitionComments=[],
            this.showForm.MainDepart='';
            this.showForm.Date='';
            this.showForm.LimitedDate=null;
            this.showForm.ToDoValue=null;
            this.showForm.showNumberText=null;
            this.showForm.showNumber=null;
            this.showForm.LayerOptions=null;
            this.showForm.ProcessingUnits=[];
            this.apID=null;
            this.step=1;

        },
        showFilingModal() {
            this.filingModel.show = true;
        },
        showDepartModal() {
                this.departmentModel.show = true;
        },
        showDepartModal(checked) {
            if(!checked)
            {
                this.departmentModel.show = true;
            }
            else
            {
                this.departmentModel.show = false;
                this.showForm.ProcessingUnits=[];
                this.form.DepartmentPetitions=[];                
            }
        },
        getfilingNum(lastid)
        {
            this.form.ReferencePetitionId=lastid;
        },
        getDepartID(departInfo)
        {
            
            var i;
            this.showForm.ProcessingUnits=[];
            this.form.DepartmentPetitions=[];
            for( i=0; i < departInfo.length; i++)
            {
                this.form.DepartmentPetitions.push({DepartmentId: departInfo[i].Id});
                this.showForm.ProcessingUnits.push({Name: departInfo[i].Name,
                                                    User: departInfo[i].User});
            }
        },
        async save()
        {
            let res = null;
            this.sending = true;
            this.form.LayerOptionId=null;
            try{
                if(!this.apID)
                {
                    // res = await axios.post(`/api/PetitionNumbers`);
                    res = await axios.post(`/api/ArticleNumbers`,{
                    ArticleTypeId:1,
                    });
                    res = res.data;

                    if(res.Status==0)
                    {
                        const data = res.Data;
                        this.form.ArticleNumberId = data.Row.Id;
                        this.showForm.showNumber = data.Row.ShowNumber;
                        this.showForm.showNumberText =  data.Row.ShowNumberText;
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
                // alert(err.message);
                this.guestRedirectHome(err.response.status);
            }
        },
        async getOptionItems()
        {
            let res = null;
            this.tempForm.petitionId = this.apID;
            this.textForm.layerId = this.form.LayerOptionId;
            if(this.apID != null){
                await this.getApprovalInfo();
            }
            try{
                const textForm = _.cloneDeep(this.textForm);

                if(!this.apID)
                {
                    res = await axios.get(`/api/LayerOptions`);
                }
                else
                {
                    res = await axios.get(`/api/LayerOptions`, textForm);
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
                    this.showForm.showNumber = data.Row.ArticleNumber.ShowNumber;
                    this.showForm.showNumberText = data.Row.ArticleNumber.ShowNumberText;
                    this.showForm.InitUser = data.Row.User.Name;
                    this.showForm.MainDepart = data.Chief[0];
                    
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
    async mounted(){
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
