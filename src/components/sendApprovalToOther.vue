<template>
    <div>
    <section class="content">
        <div class="box-body">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>簽呈字號</th>
                        <td></td>
                        <th>主辦單位</th>
                        <td></td>
                        <th>限辦日期</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>主旨</th>
                        <td colspan="5"></td>
                    </tr>
                    <tr>
                        <th>續辦單位</th>
                        <td>
                            <button @click="showDepartModal">選擇續辦單位</button>
                            <div v-for="user in showForm.ProcessingUnits">
                                <label>{{user.Name}} {{user.User}}</label>
                            </div>
                        </td>
                        <th>續辦項目</th>
                        <td>
                            <label><input type="checkbox"/>公告</label>
                             <label><input type="checkbox"/>發文</label>
                        </td>
                    </tr>
                </tbody>
                <tr><td colspan="8" class="button">
                    <btn class="btn btn-primary">送出</btn>
                </td></tr>
            </table>
        </div>
    </section>
    <department-select-modal v-model="departmentModel.show" @getDepartID="getDepartID"></department-select-modal>
    </div>
</template>

<script>
import DepartmentSelectModal from "@/components/DepartmentSelectModal";
export default {
    name:'sendApprovalToOther',
    components:{DepartmentSelectModal},
    data(){
        return{
            showForm:{
                ProcessingUnits:[],
            },
            form:{
                DepartmentPetitions:[],
            },
            departmentModel:{
                show: false,
                rid: null
            },
        }
    },
    methods:{
        showDepartModal() {
                this.departmentModel.show = true;
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
    }

}
</script>

<style>
    .button{
        text-align: center;
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
</style>
