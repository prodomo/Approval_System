<template>
    <modal v-model="showModalStatus" size="lg" :keyboard="false" :footer="false" @show="onShowModal" @hide="hideModal">
        <div>
            <form>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">加入</th>
                            <th scope="col">部門名稱</th>
                            <th scope="col">承辦人員</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items">
                            <td><input type="checkbox" id=item.Id :value=item.Id v-model="selected"/></td>
                            <td><label>{{ item.Name }}</label></td>
                            <td>{{ item.User }}</td>
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
                // form:{
                //     mode:2,
                //     departmentLevel:null,
                // },
                items:[],
                selected:[],
            };
        },
        methods:{
            async onShowModal() {
                this.getDepartList();
            },
            onsubmit(id){
                this.$emit('getDepartID', id);
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

            async getDepartList()
            {
                let res = null;
                // this.sending = true;
                try{
                    // if(!this.form.mode)
                    // {
                    //     res = await axios.get(`/api/Departments`);
                    // }
                    // else
                    // {
                    res = await axios.get(`/api/Departments`, {params:{
                        mode:2,
                        departmentLevel:null
                    }});
                    // }
                    res = res.data;

                    if(res.Status==0)
                    {
                        const data = res.Data;
                        this.items = data.Items;
                    }
                }
                catch(err)
                {
                    alert(err.message);
                    this.guestRedirectHome(err.response.status);
                }


            },
        },
    }


</script>

