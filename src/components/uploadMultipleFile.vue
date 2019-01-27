<template>
    
    <form enctype="multipart/form-data">
        <div class="field">
            <input multiple type="file" ref="files" accept="image/*,.pdf, .doc,.docx,application/msword," @change="selectFile" >
        </div>

        <div class="filed">
                <div class="level-item">
                    <div v-for="(file, index) in files" :key="index">
                        <label>{{file.file.name}}</label>
                        <span v-if="file.invalidMessage" style="color:red;">{{file.invalidMessage}}</span>
                        <a @click.prevent="cleanfile(index)"><i class="fas fa-trash-alt"></i></a>
                    </div>
                </div>

        </div>
        
    </form>
</template>

<script>

import axios from 'axios';
import _ from 'lodash';

export default {
    name:"uploadMultipleFile",

    data()
    {
        return{
            files:[],
        }
    },

    methods:{
        selectFile()
        {
            const files = this.$refs.files.files;
            this.files=[
                ...this.files,
                ..._.map(files, file=>({
                    file: file,
                    invalidMessage: this.validate(file) 
                }))
            ]
            this.$emit('getAnnexFiles', this.files);
        },

        validate(file){
            const allowTypes=["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"];
            const MAX_SIZE = 5000*1000;

            if(file.size > MAX_SIZE){
                return "檔案太大!";
            }

            if(!allowTypes.includes(file.type)){
                return "格式不符!";
            }

            return "";

        },

        cleanfile(index)
        {
            this.files.splice(index, 1);
            this.$refs.files.value='';
            this.$emit('getAnnexFiles', this.files);
        }

        
    }

}
</script>

<style>

</style>
