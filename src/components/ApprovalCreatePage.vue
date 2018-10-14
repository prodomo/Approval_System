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
                        <tr><th colspan="8">*簽呈未經核決單位核准前，所有人員不得擅自執行作業或送出任何文件。</th></tr>
                        <tr><th colspan="8">*急件簽呈須先行作業時，請主動與核決單位聯絡，經核准才可作業。</th></tr>
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
                                    <div v-show="errors.has(`Priority:required`)" class="error">
                                    請選擇主辦單位
                                    </div>
                                </select>
                            </td>
                            <th rowspan="4">速別</th>
                            <td rowspan="4">
                                <select class="form-control" v-model="form.Priority" name="Priority"  v-validate="'required'">
                                    <option value="普通件">普通件</option>
                                    <option value="速件">速件</option>
                                    <option value="最速件">最速件</option>
                                    <option value="特速件">特速件</option>
                                    <div v-show="errors.has(`Priority:required`)" class="error">
                                    請選擇速別
                                    </div>
                                </select>
                            </td>
                            
                            <th rowspan="4">密等</th>
                            <td rowspan="4">
                                <select class="form-control" v-model="form.Confidentiality" name="Confidentiality"  v-validate="'required'">
                                    <option value="普通">普通</option>
                                    <option value="密">密</option>
                                    <option value="機密">機密</option>
                                    <option value="極機密">極機密</option>
                                    <div v-show="errors.has(`Priority:required`)" class="error">
                                    請選擇密等
                                    </div>
                                </select>
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
                                <div v-show="errors.has(`Subject:required`)" class="error">
                                請選擇密等
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <btn class="btn btn-primary" >主選單</btn>
                    <btn class="btn btn-primary" @click="step++" >下一步</btn>
                </div>
                <div v-if="step==2">
                    <table class="table table-bordered">
                        <tbody>
                        <tr><th v-if="form.LastID!=null" colspan="8">本文，依據{{form.LastID}}辦理</th></tr>
                        <tr>
                            <td>簽呈號</td>
                            <td colspan="3">
                            <label></label>
                            </td>
                            <td>建檔日期</td>
                            <td>
                                <label></label>
                            </td>
                            <td>密等</td>
                            <td>
                                <label>{{form.Confidentiality}}</label>
                            </td>            
                        </tr>
                        <tr>
                            <td>簽呈字號</td>
                            <td colspan="3">
                            <label></label>
                            </td>
                            <td>限辦日期</td>
                            <td>
                                <label></label>
                            </td>
                            <td>速別</td>
                            <td>
                                <label>{{form.Priority}}</label>
                            </td>            
                        </tr>
                        <tr>
                            <td>承辦單位</td>
                            <td>
                            <label>{{"xx部"}}</label>
                            </td>
                            <td>承辦人員</td>
                            <td>
                            <label>{{"XXX"}}</label>
                            </td>
                            <td>歸檔日期</td>
                            <td>
                                <label></label>
                            </td>
                            <td>處理狀態</td>
                            <td>
                                <label></label>
                            </td>            
                        </tr>
                        <tr>
                            <td>主旨</td>
                            <td colspan="7">
                                <label>{{form.Subject}}</label>
                            </td>
                        </tr>
                        <tr class="table-warning">
                            <td colspan="8">
                                <label>承辦人員   目前狀態 </label>
                            </td>
                        </tr>
                        <tr class="table-warning">
                            <td colspan="8">
                                <label>單位主管   目前狀態 </label>
                            </td>
                        </tr>
                        <tr>
                            <td>說明</td>
                            <td colspan="7">
                                <textarea class="form-control" aria-label="With textarea" v-model="form.Description">

                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>擬辦</td>
                            <td colspan="7">
                                <textarea class="form-control" aria-label="With textarea" v-model="form.Proposition"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>簽核選項</td>
                            <td colspan="7">
                                <label><input type="radio" name="toDo" value="1" v-model="form.ToDoValue"/>代為決行</label><br>
                                <label><input type="radio" name="toDo" value="2" v-model="form.ToDoValue"/>簽核送出</label><br>
                                <label><input type="radio" name="toDo" value="3" v-model="form.ToDoValue"/>送會其他單位</label><br>
                                <label><input type="radio" name="toDo" value="4" v-model="form.ToDoValue"/>單位分文</label><br>
                            </td>
                        </tr>
                        <tr>
                            <td>簽搞併陳</td>
                            <td colspan="7">
                                <input type="checkbox">如需『發文』或『公告』，請勾選，並上傳檔案(請注意：單一檔案大小限制為5MB。)
                            </td>
                        </tr>

                        </tbody>
                        <tr><td colspan="8">
                        <btn class="btn btn-primary" >存草稿</btn>
                        <btn class="btn btn-primary" @click="step++; form.Date=Date(); form.State='創稿中'">預覽</btn>
                        <btn class="btn btn-primary" >作廢</btn>
                        </td></tr>
                    </table>
                </div>
                <div v-if="step==3">
                    <table class="table table-bordered">
                        <tbody>
                        <tr><th colspan="8"  v-if="form.LastID!=null">本文，依據{{form.LastID}}辦理</th></tr>
                        <tr>
                            <td>簽呈號</td>
                            <td colspan="3">
                            <label>{{"10700101501"}}</label>
                            </td>
                            <td>建檔日期</td>
                            <td>
                                <label>{{form.Date}}</label>
                            </td>
                            <td>密等</td>
                            <td>
                                <label>{{form.Confidentiality}}</label>
                            </td>            
                        </tr>
                        <tr>
                            <td>簽呈字號</td>
                            <td colspan="3">
                            <label>{{"107XX簽呈字第1501號"}}</label>
                            </td>
                            <td>限辦日期</td>
                            <td>
                                <label>{{form.LimitDate}}</label>
                            </td>
                            <td>速別</td>
                            <td>
                                <label>{{form.Priority}}</label>
                            </td>            
                        </tr>
                        <tr>
                            <td>承辦單位</td>
                            <td>
                            <label>{{"資訊中心"}}</label>
                            </td>
                            <td>承辦人員</td>
                            <td>
                            <label>{{"XXX"}}</label>
                            </td>
                            <td>歸檔日期</td>
                            <td>
                                <label></label>
                            </td>
                            <td>處理狀態</td>
                            <td>
                                <label>{{form.State}}</label>
                            </td>            
                        </tr>
                        <tr>
                            <td>主旨</td>
                            <td colspan="7">
                                <label>{{form.Subject}}</label>
                            </td>
                        </tr>
                        <tr class="table-warning">
                            <td colspan="8">
                                <label>承辦人員: xxx   目前狀態: xxx </label>
                            </td>
                        </tr>
                        <tr class="table-warning">
                            <td colspan="8">
                                <label>單位主管: xxx   目前狀態: xxx </label>
                            </td>
                        </tr>
                        <tr>
                            <td>說明</td>
                            <td colspan="7">{{form.Description}}</td>
                        </tr>
                        <tr>
                            <td>擬辦</td>
                            <td colspan="7">{{form.Proposition}}</td>
                        </tr>
                        <tr>
                            <td>簽核選項</td>
                            <td colspan="7">
                                <li v-if="form.ToDoValue == 1">代為決行</li>
                                <li v-if="form.ToDoValue == 2">簽核送出</li>
                                <li v-if="form.ToDoValue == 3">送會其他單位</li>
                                <li v-if="form.ToDoValue == 4">單位分文</li>

                            </td>
                        </tr>
                        <tr>
                            <td>簽搞併陳</td>
                            <td colspan="7"></td>
                        </tr>

                        </tbody>
                        <tr><td colspan="8">
                        <btn class="btn btn-primary" @click="step--">取消預覽</btn>
                        <btn class="btn btn-primary" >確定送出</btn>
                        </td></tr>
                    </table>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
export default {
    name: 'ApprovalCreatePage',
    data(){
        return{
            step:1,
            form:{
                LastID:null,
                ID:'',
                MainDepart:'',
                Priority:'',
                Confidentiality:'',
                IsoValue:'',
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
        onSubmit(){
            this.form.step++;
            this.form.Date=Date();
            this.form.State='創稿中';
            this.form.ID='1234';

        },
    },
}
</script>

<style>

    .th{
        text-align: center;
        padding: 15px;
        vertical-align: bottom;
    }
    .td{
        text-align: left;
        vertical-align: bottom;
    }
</style>
