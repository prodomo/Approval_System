<template>
    
    <form enctype="multipart/form-data">
        <div class="field">
            <input type="file" ref="file" @change="selectFile" >
        </div>

        <div class="filed">
            <div v-if="file" class="level">
                <div class="level-item">
                    <label>{{file.name}}</label>
                    <span v-if="invalidMessage" style="color:red;">{{invalidMessage}}</span>
                    <a @click.prevent="cleanfile"><i class="fas fa-trash-alt"></i></a>
                </div>
            </div>

        </div>
        
    </form>
</template>

<script>

import axios from 'axios';

export default {
    name:"uploadSingleFile",

    data()
    {
        return{
            file:'',
            mainfile:'',
            invalidMessage:"",
        }
    },

    methods:{
        selectFile()
        {
            const data = this.$refs.file.files[0];
            const allowTypes=["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"];
            const MAX_SIZE = 5000*1000;
            const tooLarge = data.size > MAX_SIZE;

            this.file = data;
            if(!allowTypes.includes(data.type))
            {
                this.invalidMessage="格式不符!";
            }
            else if(tooLarge)
            {
                this.invalidMessage="檔案太大!";
            }
            else{
                this.invalidMessage="";
                this.mainfile = data;
            }
            this.$emit('getMainFile', this.mainfile);
        },

        cleanfile()
        {
            this.file='';
            this.$refs.file.value='';
            this.mainfile='';
            this.$emit('getMainFile', this.mainfile);
        }
    }

}
</script>

<style>

</style>
