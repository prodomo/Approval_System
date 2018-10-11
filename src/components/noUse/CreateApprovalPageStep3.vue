<template>
<div>
    <h1>公文作業</h1>
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

    <div class="box-body">
        <table class="table table-bordered">
            <tbody>
            <tr><th colspan="8">本文，依據{{lastApprovalID}}辦理</th></tr>
            <tr scope="row">
                <td>簽呈號</td>
                <td colspan="3">
                   <label>{{approvalID}}</label>
                </td>
                <td>建檔日期</td>
                <td>
                    <label>{{Date()}}</label>
                </td>
                <td>密等</td>
                <td>
                    <label>{{confidentiality}}</label>
                </td>            
            </tr>
            <tr scope="row">
                <td>簽呈字號</td>
                <td colspan="3">
                   <label>{{approvalName}}</label>
                </td>
                <td>限辦日期</td>
                <td>
                    <label>{{limitDate}}</label>
                </td>
                <td>速別</td>
                <td>
                    <label>{{priority}}</label>
                </td>            
            </tr>
             <tr scope="row">
                <td>承辦單位</td>
                <td>
                   <label>{{department}}</label>
                </td>
                <td>承辦人員</td>
                <td>
                   <label>{{person}}</label>
                </td>
                <td>歸檔日期</td>
                <td>
                    <label>{{storeDate}}</label>
                </td>
                <td>處理狀態</td>
                <td>
                    <label>{{state}}</label>
                </td>            
            </tr>
            <tr scope="row">
                <td>主旨</td>
                <td colspan="7">
                     <label>{{title}}</label>
                </td>
            </tr>
            <tr scope="row">
                <td>說明</td>
                <td colspan="7">
                     <label>{{descript}}</label>
                </td>
            </tr>
            <tr scope="row" class="table-warning">
                <td colspan="8">
                     <label>承辦人員  {{person}}  目前狀態 未處理</label><br>
                     <label>擬辦:{{proposition}}</label>
                </td>
            </tr>
            <tr scope="row" class="table-warning">
                <td colspan="8">
                     <label>單位主管  {{person}}  目前狀態 未處理</label>
                </td>
            </tr>
            <tr>
                <td>
                     <label>簽核選項</label>
                </td>
                <td colspan="7">
                    <label>陳核送出</label>
                </td>
            </tr>

            </tbody>
            <tr><td colspan="8">
            <btn class="btn btn-primary" to="/02">取消預覽</btn>
            <btn class="btn btn-primary" click="send" >確定送出</btn>
            </td></tr>
        </table>
        <br>
        <btn class="btn btn-primary" >列印</btn>
        <btn class="btn btn-primary" >主選單</btn>
        <btn  class="btn btn-primary" to="/02">回上一頁</btn>
    </div>
</div>
</template>

<script>
export default {
    name: 'CreateApprovalPageStep3',
    data(){
        return{
            approvalID:'1234',
            lastApprovalID:'1233',
            confidentiality:'普通',
            approvalName:'xxxxx簽呈字第xxx號',
            limitDate:'',
            priority:'普通件',
            department:'xxxx',
            person:'xxx',
            storeDate:'',
            state:'創稿中',
            title:'',
            proposition:'',
            descript:'',


        }

    },
    methods:{
        Date(){
            var date = Date.now();
            return date.Date.prototype.toString();
        },
        send(){

        }
    }

}
</script>

