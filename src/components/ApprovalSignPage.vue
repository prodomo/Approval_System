<template>
    <div>
        <system-header header="公文作業" ID=approvalCreate title="簽呈建檔"></system-header>
        <section class="content">
            <div class="box-body">
                <div v-if="step==1">
                    
                    <table class="table table-bordered">
                        <tbody>
                        <tr>
                            <th colspan="8" v-if="form.ReferencePetition!=null && form.ReferencePetition.ArticleNumber != null">本文，依據{{form.ReferencePetition.ArticleNumber.ShowNumber}}辦理</th>
                        </tr>
                        <tr>
                            <th>簽呈號</th>
                            <td colspan>
                                <label>{{showForm.showNumber}}</label>
                            </td>
                            <th>依據收文號</th>
                            <td colspan>
                                <div v-if="form.ReferencePetition!=null && form.ReferencePetition.ArticleNumber!=null">
                                    <label>{{form.ReferencePetition.ArticleNumber.ShowNumber}}</label>
                                </div>
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
                                <div v-if="showForm.MainDepart!=null">
                                    <label>{{showForm.MainDepart.Department}}</label>
                                </div>
                                <div v-else>
                                    <label></label>
                                </div>
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
                                <label>擬辦{{form.Proposition}}</label><br>
                                <div v-if="showForm.Attachment != null">
                                    <label>主文檔案： <a @click="downloadFile('Petition',showForm.Attachment.FileName, showForm.Attachment.DownloadFileName)">{{showForm.Attachment.DownloadFileName}}</a></label>
                                </div>
                                <div v-if="showForm.AttachmentPetitions.length>0">
                                    <div v-for="item in showForm.AttachmentPetitions">
                                        <label>附件檔案:<a @click="downloadFile('PetitionAttachment',item.Attachment.FileName, item.Attachment.DownloadFileName)">{{item.Attachment.DownloadFileName}}</a></label><br>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                        <div v-for="(item,index) in Commnets ">                          
                        <table  class="table table-bordered">
                            <tbody>
                            <tr class="status-table" v-bind:class="{'status-table-gray' : item.IsClear}">
                                <th>
                                    <label>{{item.Layer.Name}}</label>
                                </th>
                                <th>
                                    <label>{{item.User.Name}}</label>
                                </th>
                                <td>
                                    <label>於{{date(item.CreatedAt)}}</label><br>
                                    <label>{{item.Comment}}</label><br>
                                    <label>附件檔案： <a v-if="item.Attachment!=null" @click="downloadFile('PetitionComment',item.Attachment.FileName, item.Attachment.DownloadFileName)">{{item.Attachment.DownloadFileName}}</a></label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        </td></tr>
                            <tr  v-if="userName =='楊豐文' && form.PetitionComments.length>0">
                                <th>常用詞彙</th>
                                <td colspan="7">
                                    <template v-for="vacabulary in PetitionCommonVocabulary">
                                        <label><input type="checkbox" :value="vacabulary.Name" v-model="words" @change="addword(vacabulary.Name)"/>{{vacabulary.Name}}</label>
                                    </template>
                                </td>
                            </tr>
                            <tr  v-if="userName =='楊豐文' && form.PetitionComments.length>0">
                                <th>列管追蹤</th>
                                <td colspan="7">
                                        <label><input type="radio" :value=null v-model="form.PetitionDecidedStatusId"/>無</label>
                                    <template v-for="decidedStatus in PetitionDecidedStatus">
                                        <label><input type="radio" :value="decidedStatus.Id" v-model="form.PetitionDecidedStatusId" @change="showForm.SignInfo+=decidedStatus.Name" />{{decidedStatus.Name}}</label>
                                    </template>
                                </td>
                            </tr>
                        <tr v-if="form.PetitionComments.length>0">
                            <th>簽核內容</th>
                            <td colspan="7">
                                <textarea class="form-control" rows="10" aria-label="With textarea" v-model="showForm.SignInfo" name="SignInfo" v-validate="'required'"></textarea>
                                <span v-show="errors.has(`SignInfo:required`)" class="error">{{"請輸入簽核內容"}}</span>
                                <upload-single-file @getMainFile="getComFile"></upload-single-file>
                            </td>
                        </tr>
                        <tr v-if="form.PetitionComments.length>0">
                            <th>簽核選項</th>
                            <td colspan="7">
                                <div v-for="items in showForm.LayerOptions">
                                    <div v-if="items.Name === '陳核送出（總經理室主任核稿）'">
                                         <label><input type="radio" name="ToDoValue" :value="items" v-model="showForm.ToDoValue" v-validate="'required'" :disabled="isDisabled">{{items.Name}}</label><br>
                                    </div>
                                    <div v-else-if="items.Id ===5">
                                        <label><input type="radio" name="ToDoValue" :value="items" v-model="showForm.ToDoValue" @click="showDepartModal(null, 1, showForm.DepartmentLevel)" v-validate="'required'" >{{items.Name}}</label><br>
                                        <div v-if="showForm.ProcessingUnits.length >0">
                                            <label v-for="user in showForm.ProcessingUnits">{{user.department}} ,</label>
                                        </div>
                                    </div>
                                    <div v-else-if="items.Id == 18 ">
                                        <label><input type="radio" name="ToDoValue" :value="items" v-model="showForm.ToDoValue" v-validate="'required'" >{{items.Name}}</label>
                                        <div v-if="showForm.ToDoValue!=null && showForm.ToDoValue.Name==items.Name">
                                            <input type="checkbox" v-model="PetitionsChecked" @click="showDepartModalchecked(PetitionsChecked, null, 1, showForm.DepartmentLevel)">
                                            <a @click="showDepartModal(null, 1, showForm.DepartmentLevel)">(送會其他單位)</a><br>
                                            <div v-if="PetitionsChecked">
                                                <label v-for="user in showForm.ProcessingUnits">{{user.department}} ,</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="items.Id == 3 ">
                                        <label><input type="radio" name="ToDoValue" :value="items" v-model="showForm.ToDoValue" v-validate="'required'" >{{items.Name}}</label>
                                        <div v-if="showForm.ToDoValue!=null && showForm.ToDoValue.Name==items.Name">
                                            <input type="checkbox" @click="showFilingModalchecked(AgentDecisionChecked)" v-model="AgentDecisionChecked">
                                            <a @click="showFilingModal()" >(依據收文號)</a><br>
                                            <div v-if="AgentDecisionChecked">
                                                <label>依據收文號 {{showForm.AgentDecisionPetitionId}}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="items.Id ==6 || items.Id==9">
                                        <label><input type="radio" name="ToDoValue" :value="items" v-model="showForm.ToDoValue" @click="showDepartModal(thisDepartmentId, null, null)" v-validate="'required'" >{{items.Name}}</label><br>
                                        <div v-if="showForm.WithinUnits.length >0">
                                            <label v-for="user in showForm.WithinUnits">{{user.Name}} {{user.User}} ,</label>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <label><input type="radio" name="ToDoValue" :value="items" v-model="showForm.ToDoValue" v-validate="'required'">{{items.Name}}</label><br>
                                    </div>
                                </div>
                                <span v-show="errors.has(`ToDoValue:required`)" class="error">{{"請選擇簽核選項"}}</span>
                            </td>
                        </tr>
                        <!-- <tr v-if="userName =='楊豐文' && form.PetitionComments.length!=0">
                            <th rowspan="2">簽搞併陳</th>
                            <td colspan="7">
                                <input type="checkbox" v-model="isfileUpload">如需『發文』或『公告』，請勾選，並上傳檔案(請注意：單一檔案大小限制為5MB。)<br>
                            </td>
                        </tr>
                        <tr v-if="userName =='楊豐文' && form.PetitionComments.length!=0">
                            <td>主文檔案:</td>
                            <td colspan="2">
                                <upload-single-file @getMainFile="getMainFile"></upload-single-file>
                                <span v-show="mainfile != ''">{{mainfile.name}}</span>
                            </td>
                            <td>附件檔案:</td>
                            <td colspan="3">
                                <upload-multiple-file @getAnnexFiles="getAnnexFiles" ></upload-multiple-file>
                                <span v-for="file in annexfiles">{{file.name}}</span>
                            </td>
                        </tr> -->

                        </tbody>
                        <tr v-if="form.PetitionComments.length!=0">
                            <td colspan="8" class="button">
                            <btn class="btn btn-primary" :disabled="sending" @click="next(1)">存草稿</btn>
                            <btn class="btn btn-primary" :disabled="sending" @click="next(2)">預覽</btn>
                            </td>
                        </tr>
                        <tr v-if="form.PetitionComments.length==0">
                            <td colspan="8" class="button">
                            <btn class="btn btn-primary" :disabled="sending" @click="goMainPage">回主選單</btn>
                            </td>
                        </tr>
                    </table>
                    
                </div>
                <div v-if="step==2">
                    <table class="table table-bordered">
                        <tbody>
                        <tr>
                            <th colspan="8" v-if="form.ReferencePetition!=null && form.ReferencePetition.ArticleNumber != null">本文，依據{{form.ReferencePetition.ArticleNumber.ShowNumber}}辦理</th>                     
                        </tr>
                        <tr>
                            <th>簽呈號</th>
                            <td colspan>
                                <label>{{showForm.showNumber}}</label>
                            </td>
                            <th>依據收文號</th>
                            <td colspan>
                                <div v-if="form.ReferencePetition!=null && form.ReferencePetition.ArticleNumber!=null">
                                    <label>{{form.ReferencePetition.ArticleNumber.ShowNumber}}</label>
                                </div>
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
                                <div v-if="showForm.Attachment != null">
                                    <label>主文檔案： <a @click="downloadFile('Petition',showForm.Attachment.FileName, showForm.Attachment.DownloadFileName)">{{showForm.Attachment.DownloadFileName}}</a></label>
                                </div>
                                <div v-if="showForm.AttachmentPetitions.length>0">
                                    <div v-for="item in showForm.AttachmentPetitions">
                                        <label>附件檔案:<a @click="downloadFile('PetitionAttachment',item.Attachment.FileName, item.Attachment.DownloadFileName)">{{item.Attachment.DownloadFileName}}</a></label><br>
                                    </div>
                                </div>
                            </td>
                            
                        </tr>
                        </tbody>
                        </table>
                        <div v-for="item in Commnets">
                        <table  class="table table-bordered">
                            <tbody>
                            <tr class="status-table" v-bind:class="{'status-table-gray' : item.IsClear}">
                                <th>
                                    <label>{{item.Layer.Name}}</label>
                                </th>
                                <th>
                                    <label>{{item.User.Name}}</label>
                                </th>
                                <td>
                                    <label>於{{date(item.CreatedAt)}}</label><br>
                                    <label>{{item.Comment}}</label>
                                    <label>附件檔案： <a v-if="item.Attachment!=null" @click="downloadFile('PetitionComment',item.Attachment.FileName, item.Attachment.DownloadFileName)">{{item.Attachment.DownloadFileName}}</a></label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div v-if="form.PetitionComments.length!=0">
                        <table  class="table table-bordered">
                            <tbody>
                            <tr class="status-table">
                                <th>
                                    <label>{{department}}</label>
                                </th>
                                <th>
                                    <label>{{userName}}</label>
                                </th>
                                <td>
                                    <label>於{{date(now)}}</label><br>
                                    <label>{{showForm.SignInfo}}</label>
                                    
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        </td></tr>
                        <tr>
                            <th>簽核選項</th>
                            <td colspan="7">
                                <label>{{showForm.ToDoValue.Name}}</label><br>
                                <div v-if="form.AgentDecisionPetitionId != null">
                                    <label>依據簽呈 {{showForm.AgentDecisionPetitionId}}</label>
                                </div>
                                <div v-if="showForm.ToDoValue.Id == 1 || showForm.ToDoValue.Id == 18  || showForm.ToDoValue.Id == 5">
                                    <label v-for="user in showForm.ProcessingUnits">{{user.department}} ,</label>
                                </div>
                                <div v-else-if="items.Id ==6 || items.Id==9 || items.Id==29">
                                    <label v-for="user in showForm.WithinUnits">{{user.Name}} {{user.User}} ,</label>
                                </div>
                            </td>
                        </tr>
                        <tr  v-if="userName =='楊豐文' && form.PetitionComments.length!=0">
                                <th>列管追蹤</th>
                                <td colspan="7">
                                    <div v-if="form.PetitionDecidedStatusId!=null">
                                        <label>{{PetitionDecidedStatus[form.PetitionDecidedStatusId-1].Name}}</label>
                                    </div>
                                </td>
                            </tr>
                        <!-- <tr>
                            <th>簽搞併陳</th>
                            <td colspan="7"></td>
                        </tr> -->

                        </tbody>
                        <tr><td colspan="8" class="button">
                        <btn class="btn btn-primary" :disabled="sending" @click="step--">取消預覽</btn>
                        <btn class="btn btn-primary" :disabled="sending" @click="onSubmit">確定送出</btn>
                        </td></tr>
                    </table>
                </div>
            </div>
        </section>
        <filing-num-modal v-bind:modeID="2" v-model="filingModel.show" @getfilingNum="getfilingNum"></filing-num-modal>
        <department-select-modal v-bind:departmentId="departmentModel.departmentId" v-bind:isChief="departmentModel.isChief"
        v-bind:departmentLevel="departmentModel.departmentLevel" v-model="departmentModel.show" @getDepartID="getDepartID"></department-select-modal>
    </div>

</template>

<script>
import FilingNumModal from "@/components/FilingNumModal";
import DepartmentSelectModal from "@/components/DepartmentSelectModal";
import SystemHeader from '@/components/SystemHeader';
import uploadSingleFile from '@/components/uploadSingleFile';
import uploadMultipleFile from '@/components/uploadMultipleFile';
import {mapState} from 'vuex';
import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';


export default {
    name: 'ApprovalSignPage',
    components:{FilingNumModal, SystemHeader, DepartmentSelectModal, uploadSingleFile, uploadMultipleFile},
    data(){
        return{
            step:1,
            now: new Date(),
            apID: this.$route.params.apID ? parseInt(this.$route.params.apID) : null,
            items:[],
            showModalStatus: false,
            sending: false,
            departmentList:null,
            words:[],
            trace:[],
            Commnets:[],
            PetitionCommonVocabulary :[],
            PetitionDecidedStatus:[],
            PetitionsChecked:false,
            AgentDecisionChecked:false,
            isfileUpload:false,
            mainfile:'',
            attachmentFile:'',
            annexfiles:[],
            form:{
                ReferencePetition:null,
                ArticleNumberId:null,
                PriorityId:1,
                SecretLevelId:1,
                ISOTypeId:null,               
                ArchiveDate:null,
                Purport:'',
                Proposition:'',
                LayerOptionId:null,
                State:'',
                PetitionProfessions:[],
                PetitionComments:[],
                AgentDecisionPetitionId:null,
                PetitionDecidedStatusId:null,

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
                WithinUnits:[],
                InitUser:'',
                SignInfo:'',
                AttachmentFileID:'',
                AgentDecisionPetitionId:null,
                Attachment:'',
                AttachmentPetitions:[],
                DepartmentLevel:'',
                
            },
            filingModel:{
                show: false,
                rid: null

            },
            departmentModel:{
                show: false,
                rid: null,
                departmentId:null,
                isChief:null,
                departmentLevel:null,
            },
            textForm:
            {
                priority:'',
                Confidentiality:'',
                IsoValue:'',
                status:'',
            },

        }
    },
    computed:{
        ...mapState({
            userName: state => state.user.user.Name,
            chief: state => state.user.user.Chief,
            department: state => state.user.user.Department,
            thisDepartmentId: state=> state.user.user.DepartmentId,
        }),
        isDisabled() {
            if(this.form.PetitionProfessions.length!=0 || this.showForm.ProcessingUnits.length!=0)
            {
                return true;
            }
            else{
                return false;
            }
        }

    },
    methods:{
        async next(type){


            if(type==1 && this.step==1)
            {
                await this.save();
                this.getPetitionComment();
                this.$router.push({
                    path: `/mainPage`,
                    });
                
            }
            else if(type==2)
            {
                const isPass = await this.$validator.validateAll();
                if(isPass!=true){
                    // alert(isPass);
                    // alert(JSON.stringify(this.$validator.errors.items));
                }
                else{
                    if(this.step==1){
                        this.getPetitionComment();
                        this.step++;
                    }
                    else{
                        
                    }
                }
            }
        },
            
        showFilingModal() {
            this.filingModel.show = true;
        },
        showFilingModalchecked(checked) {
            if(!checked)
            {
                this.filingModel.show = true;
            }
            else
            {
                this.filingModel.show = false;
                this.form.AgentDecisionPetitionId=null;
                this.showForm.AgentDecisionPetitionId=null;        
            }
        },
        showDepartModal(departID, isCif, departLevel) {
            
            console.log("showDepartModal");
            console.log(departID);
            console.log(isCif);
            console.log(departLevel);
            this.departmentModel.departmentId=departID;
            this.departmentModel.isChief=isCif;
            this.departmentModel.departmentLevel=departLevel;
            
            this.departmentModel.show = true;
        },
        showDepartModalchecked(checked, departID, isCif, departLevel) {
            console.log("showDepartModalchecked");
            this.departmentModel.departmentId=departID;
            this.departmentModel.isChief=isCif;
            this.departmentModel.departmentLevel=departLevel;
            if(!checked)
            {
                this.departmentModel.show = true;
            }
            else
            {
                this.departmentModel.show = false;
                this.showForm.ProcessingUnits=[];
                this.form.PetitionProfessions=[];                
            }
        },
        getfilingNum(lastid)
        {
            this.form.AgentDecisionPetitionId=lastid.Petition.Id; //代為決行的依據收文號
            this.showForm.AgentDecisionPetitionId=lastid.ShowNumber;  
        },
        getDepartID(departInfo, type)
        {
            console.log(departInfo);
            var i;
            
            this.form.PetitionProfessions=[];
            this.showForm.WithinUnits=[];
            this.showForm.ProcessingUnits=[];
            if(type == 1) //送會其他單位
            {
                
                for( i=0; i < departInfo.length; i++)
                {
                    this.form.PetitionProfessions.push({ProfessionId: departInfo[i].Id});
                    this.showForm.ProcessingUnits.push({department:departInfo[i].Department.Name ,Name: departInfo[i].Name, User:departInfo[i].User.Name });
                }
            }
            else if(type ==2) //單位內分文
            {
                
                
                 for( i=0; i < departInfo.length; i++)
                {
                    this.form.PetitionComments.push({UserId:departInfo[i].User.Id, ProfessionId:departInfo[i].Id});
                    this.showForm.WithinUnits.push({department:departInfo[i].Department.Name ,Name: departInfo[i].Name, User:departInfo[i].User.Name });
                }
                
            }
        },
        addword(word)
        {
            if(this.words.includes(word))
            {
                this.showForm.SignInfo += word;
            }
            else
            {
                while(this.showForm.SignInfo.includes(word))
                {
                    var temp = this.showForm.SignInfo.replace(word, "");
                    this.showForm.SignInfo = temp;
                }
            }
        },
        async save()
        {
            let res = null;
            this.sending = true;
            var fileID;

            if(this.attachmentFile!=''){
                fileID = await this.submitFile("PetitionComment", this.attachmentFile);
            }
            if(fileID != null)
            {
                this.showForm.AttachmentFileID = fileID;
            }

            this.form.PetitionComments[0].Comment = this.showForm.SignInfo;
            this.form.PetitionComments[0].AttachmentId = this.showForm.AttachmentFileID;
            
            this.form.LayerOptionId=null; //for 存草稿
            
            try{
                if(!this.apID)
                {
                    // res = await axios.post(`/api/PetitionNumbers`);
                    res = await axios.post(`/api/ArticleNumbers`, {ArticleTypeId:1});

                    res = res.data;

                    if(res.Status==0)
                    {
                        const data = res.Data;
                        this.form.ArticleNumberId = data.Row.Id;
                        this.showForm.showNumber = data.Row.ShowNumber;
                        this.showForm.showNumberText =  data.Row.ShowNumberText;
                        this.form.PetitionProfessions = this.showForm.ProcessingUnits;
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
                this.sending=false;
            }
            catch(err)
            {
                // alert(err.message);
                this.guestRedirectHome(err.response.status);
            }

        },
        async onSubmit()
        {
            let res = null;
            this.sending = true;
            this.form.LayerOptionId = this.showForm.ToDoValue.Id; //for 正式送出
            var fileID;

            if(this.attachmentFile!=''){
                fileID = await this.submitFile("PetitionComment", this.attachmentFile);
            }
            if(fileID != null)
            {
                this.showForm.AttachmentFileID = fileID;
            }

            this.form.PetitionComments[0].Comment = this.showForm.SignInfo;
            this.form.PetitionComments[0].AttachmentId = this.showForm.AttachmentFileID;
            
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
                    this.sending=false;

                }
                else if(res.Status==-3)
                {
                    this.$toast.error({
                        title: '失敗訊息',
                        message: '此文不能代為決行'
                        });
                }

                this.$router.push({
                    path: `/mainPage`,
                    });
                
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
                    this.form.ReferencePetition = data.Row.ReferencePetition;
                    this.form.SecretLevelId = data.Row.SecretLevelId;
                    this.form.ISOTypeId = data.Row.ISOTypeId;
                    this.form.PriorityId = data.Row.PriorityId;
                    this.form.Purport = data.Row.Purport;
                    this.form.Proposition = data.Row.Proposition;
                    this.textForm.LayerId = data.Row.LayerId;
                    this.form.State = data.Row.State;
                    this.showForm.LimitedDate = data.Row.LimitedDate;
                    this.showForm.showNumber = data.Row.ArticleNumber.ShowNumber;
                    this.showForm.showNumberText = data.Row.ArticleNumber.ShowNumberText;
                    this.showForm.InitUser = data.Row.User.Name;
                    this.showForm.MainDepart = data.Chief[0];
                    this.showForm.CreateDate = data.Row.CreateDate;
                    this.form.PetitionComments = data.Row.PetitionComments;
                    this.form.PetitionProfessions = data.Row.PetitionProfessions;
                    this.textForm.status = data.Row.ArticleStatus.Name;
                    this.showForm.Attachment = data.Row.Attachment;
                    this.showForm.AttachmentPetitions = data.Row.AttachmentPetitions;
                    this.showForm.DepartmentLevel = data.Row.Department.DepartmentLevel;
                    if(data.Row.PetitionComments[0].Comment != null){
                        this.showForm.SignInfo = data.Row.PetitionComments[0].Comment;
                    }
                    this.setPriorityText();
                    this.setConfidentialityText();
                    this.setISOText();

                    var i;
                    console.log(this.form.PetitionProfessions);
                    for(i=0; i<this.form.PetitionProfessions.length; i++)
                    {
                        this.showForm.ProcessingUnits.push({department: this.form.PetitionProfessions[i].Department.Name});
                    }


                }
            }
            catch(err)
            {
                // alert(err.message);
                this.guestRedirectHome(err.response.status);
            }
        },
        async getPetitionComment()
        {
            this.sending=true;
            let res = null;
            try{
                res = await axios.get(`/api/PetitionComments`, {params:{
                    petitionId: this.apID,
                }});
                res = res.data;
                if(res.Status==0)
                {
                    const data = res.Data;
                    this.Commnets = data.Items;
                }
            }
            catch(err)
            {
                // alert(err.message);
                this.guestRedirectHome(err.response.status);
            }
            this.sending=false;
        },
        async getPetitionCommonVocabulary()
        {
            let res = null;
            try{
                res = await axios.get(`/api/PetitionCommonVocabularies`);
                res = res.data;
                if(res.Status==0)
                {
                    const data = res.Data;
                    this.PetitionCommonVocabulary  = data.Items;
                }
            }
            catch(err)
            {
                // alert(err.message);
                this.guestRedirectHome(err.response.status);
            }
        },
        async getPetitionDecidedStatus()
        {
            let res = null;
            try{
                res = await axios.get(`/api/PetitionDecidedStatus`);
                res = res.data;
                if(res.Status==0)
                {
                    const data = res.Data;
                    this.PetitionDecidedStatus = data.Items;
                }
            }
            catch(err)
            {
                // alert(err.message);
                this.guestRedirectHome(err.response.status);
            }
        },
        async downloadFile(fileGroupName, fileName, downloadFileName)
        {
            try
            {
                axios({
                    url: `/api/Attachments/${fileGroupName}/Download/${fileName}`,
                    method: 'GET',
                    responseType: 'blob', // important
                    }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', downloadFileName); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    });
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
            if (this.form.ISOTypeId ==null)
                this.textForm.IsoValue='無';

            else if (this.form.ISOTypeId ==1)
                this.textForm.IsoValue='新增';

            else if (this.form.ISOTypeId ==2)
                this.textForm.IsoValue='修訂';

            else if (this.form.ISOTypeId ==3)
                this.textForm.IsoValue='廢止'; 
        },
        async goMainPage()
        {
            this.$router.push({
                        path: `/mainPage`
                    });
        },
        getMainFile(file)
        {
            console.log(file);
            this.mainfile = file;
            console.log(this.mainfile);
        },
        async getComFile(file)
        {
            console.log("getComFile");
            this.attachmentFile = file;
        },
        async submitFile(name, file)
        {
            let res = null;
            this.sending = true;
            const formData = new FormData();
            formData.append('file', file);
            try{
                    console.log(name);
                    console.log(file);
                    var fileGroupName = name;
                    res = await axios.post(`/api/Attachments/${fileGroupName}/Upload`, formData);
            }
            catch(err){
                 this.guestRedirectHome(err.response.status);
            }
            res = res.data;
            if(res.Status==0)
            {
                const data = res.Data;
                if(data.Row.Id != null)
                return data.Row.Id;
            }
            return null;
        },
        getAnnexFiles(files)
        {
            console.log(files);
            this.annexfiles = files;
            console.log(this.annexfiles);
        }
    },
    async mounted(){
        await this.getApprovalInfo();
        await this.getOptionItems();
        await this.getPetitionComment();
        if(this.userName =='楊豐文')
        {
            this.getPetitionCommonVocabulary();
            this.getPetitionDecidedStatus();
            
        }
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
        padding-right:10px;
    }

    th, .th{
        text-align: center;
        padding-top: 15px !important;
        vertical-align: bottom;
    }
    td, .td{
        text-align: left;
        vertical-align: bottom;

    }
    .status-table{
        background-color:#ffffcc ;
    }
    .status-table-gray{
        background-color:lightgray ;
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
