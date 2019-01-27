<template>
    <modal v-model="showModalStatus" size="lg" :keyboard="false" :footer="false" @show="onShowModal" @hide="hideModal">
        <div>
            <button class="btn btn-secondary" @click="allselect">全選</button>
            <button class="btn btn-secondary" @click="allnotSelect">全不選</button>
            <form>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">加入</th>
                            <th scope="col">部門名稱</th>
                            <th scope="col">部門職稱</th>
                            <th scope="col">員工姓名</th>
                            <!-- <th scope="col">承辦人員</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items">
                            <td><input type="checkbox" id=item.Id :value=item v-model="selected"/></td>
                            <td><label>{{ item.Department.Name}}</label></td>
                            <td><label>{{ item.Name}}</label></td>
                            <td><label>{{ item.User.Name}}</label></td>
                            <!-- <td>{{ item.User }}</td> -->
                        </tr>
                        
                    </tbody>
                </table>
            </form>
            <button class="btn btn-primary" @click="onsubmit(selected)">確認</button>
        </div>
    </modal>
</template>

<script>
    import axios from 'axios';
    import ClipLoader from "vue-spinner/src/ClipLoader";

    export default {
        name: "DepartmentSelectModal",
        components: {ClipLoader},
        props:{
            value: {
                type: [Boolean, String]
            },
            rid: {
                type: [Number]
            },
            departmentId:
            {
                type:[Number]
            },
            isChief:{
                type:[Number]
            },
            departmentLevel:{
                type:[Number]
            }

        },
        watch:{
            value(newVal) {
                this.showModalStatus = newVal;
            }
        },
        data(){
            return{
                loading: false,
                sending: false,
                showModalStatus: false,
                items:[],
                selected:[],
            };
        },
        methods:{
            async onShowModal() {
                this.getDepartList();
            },
            onsubmit(selected){
                if(this.departmentId==null){
                    this.$emit('getDepartID', selected, 1); //送會其他單位
                }
                else{
                    console.log('單位內分文');
                    this.$emit('getDepartID', selected, 2); //單位內分文
                }
                
                this.hideModal();
                this.resetform();
            },
            hideModal() {
                this.$emit('input', false);
            },
            resetform(){
                // this.form.according='';
                // this.form.filingID=null;
            },
            allselect(){
                this.selected = this.items;
            },
            allnotSelect()
            {
                this.selected=[];
            },
            async getDepartList()
            {
                let res = null;
                try{
                    console.log(this.departmentId);
                    console.log(this.isChief);
                    console.log(this.departmentLevel);

                    res = await axios.get(`/api/Professions`, {params:{
                        departmentId: this.departmentId,
                        isChief: this.isChief,
                        departmentLevel:this.departmentLevel
                    }});

                    res = res.data;

                    if(res.Status==0)
                    {
                        const data = res.Data;
                        this.items = data.Items;
                    }
                }
                catch(err)
                {
                    // alert(err.message);
                    this.guestRedirectHome(err.response.status);
                }
            },
        },
    }


</script>

