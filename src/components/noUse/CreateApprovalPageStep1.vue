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
        <table class="table">
            <tbody>
            <tr><th colspan="8">*簽呈未經核決單位核准前，所有人員不得擅自執行作業或送出任何文件。</th></tr>
            <tr><th colspan="8">*急件簽呈須先行作業時，請主動與核決單位聯絡，經核准才可作業。</th></tr>
            <tr>
                <th>依據收文號</th>
                <td>
                    <input class="form-control" type="text" placeholder="">
                </td>
                <th rowspan="4">主辦單位</th>
                <td rowspan="4">
                    <input class="form-control" type="text" placeholder="">
                </td>
                <th rowspan="4">速別</th>
                <td rowspan="4">
                    <select class="form-control" id="Priority">
                        <option>普通件</option>
                        <option>速件</option>
                        <option>最速件</option>
                        <option>特速件</option>
                    </select>
                </td>
                
                <th rowspan="4">密等</th>
                <td rowspan="4">
                    <select class="form-control" id="Confidentiality">
                        <option>普通</option>
                        <option>密</option>
                        <option>機密</option>
                        <option>極機密</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>ISO管制文件</th>
                <td>
                    <label><input type="radio" name="iso-value"/>無</label>
                    <label><input type="radio" name="iso-value"/>新增</label>
                    <label><input type="radio" name="iso-value"/>修訂</label>
                    <label><input type="radio" name="iso-value"/>廢止</label>
                </td>
            </tr>
            <tr>
                <th>主旨</th>
                <td colspan="7">
                    <input class="form-control" type="text" placeholder="">
                </td>
            </tr>
            </tbody>
        </table>
        <btn class="btn btn-primary" >主選單</btn>
        <btn class="btn btn-primary" to="/02" >下一步</btn>
    </div>
</div>
</template>

<script>
export default {
    name: 'CreateApprovalPageStep1',
}
</script>

