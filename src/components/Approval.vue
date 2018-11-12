<template>
    <div>
        <system-header header="公文作業"></system-header>
        <section class="content">
            <div class="box-body">
                <div v-if="step==1">
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
                        <tr class="status-table">
                            <td>
                                <label>承辦人員</label>
                            </td>
                            <td>
                                <label>xxx</label>
                            </td>
                            <td colspan="6">
                                <label>於2018/08/13 15:39</label><br>
                                <label>擬辦 test2</label>
                            </td>
                        </tr>
                        <tr class="status-table">
                            <td>
                                <label>單位主管</label>
                            </td>
                            <td>
                                <label>xxx</label>
                            </td>
                            <td colspan="6">
                                <label>於2018/08/13 16:12</label><br>
                                <label>說明 test2 OK!</label>
                            </td>
                        </tr>
                        <tr>
                            <th>常用詞彙</th>
                            <td colspan="7">
                                <label><input type="checkbox" value="閱" v-model="form.words"/>閱</label>
                                <label><input type="checkbox" value="可" v-model="form.words"/>可</label>
                                <label><input type="checkbox" value="如擬" v-model="form.words"/>如擬</label>
                                <label><input type="checkbox" value="存查" v-model="form.words"/>存查</label>
                                <label><input type="checkbox" value="來說明" v-model="form.words"/>來說明</label>
                            </td>
                        </tr>
                        <tr>
                            <th>列管追蹤</th>
                            <td colspan="7">
                                <label><input type="checkbox" name="trace" value="發文公告" v-model="form.trace"/>發文公告</label>
                                <label><input type="checkbox" name="trace" value="會議中討論" v-model="form.trace"/>會議中討論</label>
                                <label><input type="checkbox" name="trace" value="座談會宣導" v-model="form.trace"/>座談會宣導</label>
                            </td>
                        </tr>
                        <tr>
                            <th>簽核內容</th>
                            <td colspan="7">
                                <textarea class="form-control" rows="10" aria-label="With textarea" v-model="form.words" name="Content" v-validate="'required'"></textarea>
                                <span v-show="errors.has(`Content:required`)" class="error">{{"請輸入說明"}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>簽核選項</th>
                            <td colspan="7">
                                <label><input type="radio" name="ToDoValue" value="退回重簽" v-model="form.ToDoValue" v-validate="'required'"/>退回重簽</label><br>
                                <label><input type="radio" name="ToDoValue" value="決行" v-model="form.ToDoValue"/>決行</label><br>
                                <span v-show="errors.has(`ToDoValue:required`)" class="error">{{"請選擇簽核選項"}}</span>
                            </td>
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
                        <tr class="status-table">
                            <td>
                                <label>承辦人員</label>
                            </td>
                            <td>
                                <label>xxx</label>
                            </td>
                            <td colspan="6">
                                <label>於2018/08/13 15:39</label><br>
                                <label>擬辦 test2</label>
                            </td>
                        </tr>
                        <tr class="status-table">
                            <td>
                                <label>單位主管</label>
                            </td>
                            <td>
                                <label>xxx</label>
                            </td>
                            <td colspan="6">
                                <label>於2018/08/13 15:39</label><br>
                                <label>說明 test2 OK!</label>
                            </td>
                        </tr>
                        <tr>
                            <th>簽核選項</th>
                            <td colspan="7">
                                <label>{{form.ToDoValue}}</label>
                            </td>
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
    name: 'Approval',
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
                words:[],
                trace:[],
                content:'',

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
        addContent(word)
        {
            this.form.content= this.form.content+word;
        }
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
    }
</style>
