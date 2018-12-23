<template>
    <modal v-model="showModalStatus" size="lg" :keyboard="false" :footer="false" @show="onShowModal" @hide="hideModal">
        <div>
            <form>
                <div class="row">請選擇來源類型:
                    <label><input type="radio" name="according" value=2 v-model="form.according" @change="getArticleNumbers"/>外部</label>
                    <label><input type="radio" name="according" value=1 v-model="form.according" @change="getArticleNumbers"/>內部簽呈</label>
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
                            <td><input type="radio" :value=item.ShowNumber v-model="form.filingID"></td>
                            <td>{{ item.ShowNumber }}</td>
                            <td>{{ item.Petition.Purport }}</td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <button class="btn btn-primary" @click="onsubmit(form.filingID)">確認</button>
        </div>
    </modal>
</template>

<script>
    import axios from 'axios';
    import ClipLoader from "vue-spinner/src/ClipLoader";

    export default {
        name: "FilingNumModal",
        components: {ClipLoader},
        props:{
             value: {
                type: [Boolean, String]
            },
            rid: {
                type: [Number]
            },
            modeID:{
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
                form:{
                    according:1,
                    filingID:null,
                },
                items:[]
            };
        },
        methods:{
            async onShowModal() {
                
            },
            onsubmit(id){
                this.$emit('getfilingNum', id);
                this.hideModal();
                this.resetform();
            },
            hideModal() {
                this.$emit('input', false);
            },
            resetform(){
                this.form.according=1;
                this.form.filingID=null;
            },
            async getArticleNumbers()
            {
                let res = null;
                try{

                    res = await axios.get(`/api/ArticleNumbers`, {params:{
                        mode: this.modeID,
                        articleTypeId:this.form.according
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
                    alert(err.message);
                    this.guestRedirectHome(err.response.status);
                }
            },
        },
        async mounted(){
            this.getArticleNumbers();
        }
    }


</script>

