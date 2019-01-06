<template>
    
    <form enctype="multipart/form-data">
        <div class="field">
            <!-- <label for="file" class="label">upload File</label> -->
            <input multiple type="file" ref="files" @change="selectFile" >
        </div>

        <div class="filed">
                <div class="level-item">
                    <div v-for="(file, index) in files" :key="index">
                        <label>{{file.name}}</label>
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
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    invalidMessage: this.validate(file) 
                }))
            ]
        },

        validate(file){
            const allowTypes=["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            const MAX_SIZE = 5000*1000;

            if(file.size > MAX_SIZE){
                return "file too large!";
            }

            if(!allowTypes.includes(file.type)){
                return "file type is not allow!";
            }

            return "";

        },

        cleanfile(index)
        {
            this.files.splice(index, 1);
            console.log(this.files);
            console.log(this.$refs.files.value);
            this.$refs.files.value='';
        }
    }

}
</script>

<style>

</style>
