<template>
    <modal v-model="showModalStatus" size="lg" :keyboard="false" :footer="false" @show="onShowModal" @hide="hideModal">
        <div>
            <form>
                <div class="row">請選擇來源類型:
                    <label><input type="radio" name="according" value="out" v-model="form.according"/>外部</label>
                    <label><input type="radio" name="according" value="inner" v-model="form.according"/>內部簽呈</label>
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
                            <td><input type="radio"></td>
                            <td>{{ item.ID }}</td>
                            <td>{{ item.Subject }}</td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <button class="btn btn-primary" >確認</button>
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
                    according:'',
                },
                items:[
                    {ID:"1234", Subject:"test"}
                ]
            };
        },
        methods:{
            async onShowModal() {
                
            },
            hideModal() {
                this.showModalStatus=false;
            },
        }
    }


</script>

