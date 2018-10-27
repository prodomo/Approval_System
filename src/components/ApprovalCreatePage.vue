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
                        <li><a role="button">簽呈建檔</a></li>
                        <li class="active"><a role="button">簽呈查詢</a></li>
                        <li class="active"><a role="button">公告建檔</a></li>
                        <li class="active"><a role="button">公告查詢</a></li>
                        <li class="active"><a role="button">代理人設定</a></li>
                        <li class="active"><a role="button">流程示意圖</a></li>
                        <li class="active"><a role="button">操作說明</a></li>
                    </navbar-nav>
                    <navbar-nav right>
                    <li><a>您好，目前位於「公文作業畫面」</a></li>
                    </navbar-nav>
                    </template>
                </navbar>
            </div>
            <div class="box-body">
                <div v-if="step==1">
                    <table class="table">
                        <tbody>
                        <tr><th colspan="8" class="Reminder">*簽呈未經核決單位核准前，所有人員不得擅自執行作業或送出任何文件。</th></tr>
                        <tr><th colspan="8" class="Reminder">*急件簽呈須先行作業時，請主動與核決單位聯絡，經核准才可作業。</th></tr>
                        <tr>
                            <th>依據收文號</th>
                            <td>
                                <input class="form-control" type="text" placeholder="" v-model="form.LastID">
                            </td>
                            <th rowspan="4">主辦單位</th>
                            <td rowspan="4">
                                <select class="form-control" v-model="form.MainDepart" name="MainDepart"  v-validate="'required'">
                                    <option value="[資訊中心]">[資訊中心] xxx</option>
                                    <option value="[運務部]]">[運務部] xxx</option>
                                </select>
                                <span v-show="errors.has(`MainDepart:required`)" class="error">{{"請選擇主辦單位"}}</span>
                            </td>
                            <th rowspan="4">速別</th>
                            <td rowspan="4">
                                <select class="form-control" v-model="form.Priority" name="Priority"  v-validate="'required'">
                                    <option value="普通件">普通件</option>
                                    <option value="速件">速件</option>
                                    <option value="最速件">最速件</option>
                                    <option value="特速件">特速件</option>
                                </select>
                                <span v-show="errors.has(`Priority:required`)" class="error">{{"請選擇速別"}}</span>
                            </td>
                            
                            <th rowspan="4">密等</th>
                            <td rowspan="4">
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
                            <th>ISO管制文件</th>
                            <td>
                                <label><input type="radio" name="isoValue" value="無" v-model="form.IsoValue"/>無</label>
                                <label><input type="radio" name="isoValue" value="新增" v-model="form.IsoValue"/>新增</label>
                                <label><input type="radio" name="isoValue" value="修訂" v-model="form.IsoValue"/>修訂</label>
                                <label><input type="radio" name="isoValue" value="廢止" v-model="form.IsoValue"/>廢止</label>
                            </td>
                        </tr>
                        <tr>
                            <th>主旨</th>
                            <td colspan="7">
                                <input class="form-control" type="text" placeholder="" v-model="form.Subject" name="Subject" v-validate="'required'">
                                <span v-show="errors.has(`Subject:required`)" class="error">{{"請輸入主旨"}}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="button">
                        <btn class="btn btn-primary">主選單</btn>
                        <btn class="btn btn-primary" @click="next">下一步</btn>
                    </div>
                </div>
                <div v-if="step==2">
                    <table class="table table-bordered">
                        <tbody>
                        <tr><th v-if="form.LastID!=null" colspan="8" class="Reminder">本文，依據{{form.LastID}}辦理</th></tr>
                        <tr>
                            <th>簽呈號</th>
                            <td colspan="3">
                            <label></label>
                            </td>
                            <th>建檔日期</th>
                            <td>
                                <label></label>
                            </td>
                            <th>密等</th>
                            <td>
                                <label>{{form.Confidentiality}}</label>
                            </td>            
                        </tr>
                        <tr>
                            <th>簽呈字號</th>
                            <td colspan="3">
                            <label></label>
                            </td>
                            <th>限辦日期</th>
                            <td>
                                <label></label>
                            </td>
                            <th>速別</th>
                            <td>
                                <label>{{form.Priority}}</label>
                            </td>            
                        </tr>
                        <tr>
                            <th>承辦單位</th>
                            <td>
                            <label>{{"xx部"}}</label>
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
                                <label>{{form.Subject}}</label>
                            </td>
                        </tr>
                        <tr class="status-table">
                            <td colspan="8">
                                <label>承辦人員   目前狀態 </label>
                            </td>
                        </tr>
                        <tr class="status-table">
                            <td colspan="8">
                                <label>單位主管   目前狀態 </label>
                            </td>
                        </tr>
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
                                <label><input type="radio" name="ToDoValue" value="1" v-model="form.ToDoValue" v-validate="'required'"/>代為決行</label><br>
                                <label><input type="radio" name="ToDoValue" value="2" v-model="form.ToDoValue"/>簽核送出</label><br>
                                <label><input type="radio" name="ToDoValue" value="3" v-model="form.ToDoValue"/>送會其他單位</label><br>
                                <label><input type="radio" name="ToDoValue" value="4" v-model="form.ToDoValue"/>單位分文</label><br>
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
                        <btn class="btn btn-primary" >存草稿</btn>
                        <btn class="btn btn-primary" @click="next">預覽</btn>
                        <btn class="btn btn-primary" >作廢</btn>
                        </td></tr>
                    </table>
                </div>
                <div v-if="step==3">
                    <table class="table table-bordered">
                        <tbody>
                        <tr><th colspan="8"  v-if="form.LastID!=null">本文，依據{{form.LastID}}辦理</th></tr>
                        <tr>
                            <th>簽呈號</th>
                            <td colspan="3">
                            <label>{{"10700101501"}}</label>
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
                            <td colspan="3">
                            <label>{{"107XX簽呈字第1501號"}}</label>
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
                            <th>承辦單位</th>
                            <td>
                            <label>{{"資訊中心"}}</label>
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
                        <tr class="status-table">
                            <td colspan="8">
                                <label>承辦人員: xxx   目前狀態: xxx </label>
                            </td>
                        </tr>
                        <tr class="status-table">
                            <td colspan="8">
                                <label>單位主管: xxx   目前狀態: xxx </label>
                            </td>
                        </tr>
                        <tr>
                            <th>說明</th>
                            <td colspan="7">{{form.Description}}</td>
                        </tr>
                        <tr>
                            <th>擬辦</th>
                            <td colspan="7">{{form.Proposition}}</td>
                        </tr>
                        <tr>
                            <th>簽核選項</th>
                            <td colspan="7">
                                <label v-if="form.ToDoValue == 1">代為決行</label>
                                <label v-if="form.ToDoValue == 2">簽核送出</label>
                                <label v-if="form.ToDoValue == 3">送會其他單位</label>
                                <label v-if="form.ToDoValue == 4">單位分文</label>

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
        <!-- <modal v-model="showModalStatus" cancel-text="取消" ok-text="送出" size="lg" :keyboard="false" :footer="false" @show="onShowModal" @hide="hideModal">
            <div>
                <form>
                    <div class="row">請選擇來源類型:
                        <label><input type="radio" name="isoValue" value="無" v-model="form.IsoValue"/>無</label>
                        <label><input type="radio" name="isoValue" value="新增" v-model="form.IsoValue"/>新增</label>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">選擇</th>
                                <th scope="col">來源收文號</th>
                                <th scope="col">主旨</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items">
                                <td><option></option></td>
                                <td>{{ item.ID }}</td>
                                <td>{{ item.Subject }}</td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </modal> -->
    </div>
</template>

<script>
export default {
    name: 'ApprovalCreatePage',
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
                ToDoValue:'',

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

                if(this.step==3)
                {
                    this.form.Date=Date();
                    this.form.State='創稿中';
                    this.form.ID='1234';
                }
            }
        },

        async onSubmit(){
            const isPass = await this.$validator.validateAll();

            if(isPass!=true){
                alert(isPass);
                alert(JSON.stringify(this.$validator.errors.items));
            }
            else{
            }

        },

        async onShowModal() {
            this.loading = true;
            if(this.rid)
                await this.fetchData();
            this.loading = false;
        },
        
        hideModal() {
            // this.$emit('input', false);
            this.resetForm();
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

    th{
        text-align: center;
        padding-top: 15px !important;
        vertical-align: bottom;
    }
    td{
        text-align: left;
        vertical-align: bottom;

    }
    label{
        padding-top: 6px!important;
    }
    .status-table{
        background-color:#ffffcc ;
    }
    .status-table>td{
       text-align: center !important;
    }
</style>
