<template>
     <!-- <div>
        <input type="file" name="file" accept=".jpg, .jpeg, .png" @change="uploadAvatar">
    </div> -->
    <div>
        <el-dialog title="111111" width="500px" style="padding:0;" @close="resetAdd">
            附件名称：<el-input autocomplete="off" size="small" style="width: 300px;" ></el-input>
            <div class="add-file-right" style="height:70px;margin-left:100px;margin-top:15px;">
                <div class="add-file-right-img" style="margin-left:70px;">上传文件：</div>
                <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input" style="margin-left:70px;" accept=".docx,.doc,.pdf">
                <span class="add-file-right-more">支持扩展名：.doc .docx .pdf </span>
            </div>
            <div class="add-file-list">
                <ul>
                    <li v-for="(item, index) in addArr" :key="index"><a >{{item.name}}</a></li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAddFile" size="small">开始上传</el-button>
                <el-button @click="resetAdd" size="small">全部删除</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

import {request} from '../../http/request';
const urlStr="http://localhost:8082/";//node express
export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            addArr:[],
        };
    },
    methods: {
        doUpload(avatar) {
            console.log("1111111111111111111111",avatar.target.files[0])
            let file = avatar.target.files[0]
            let data = new FormData();
            // data.append("file", file, file.name); 
            // data.append('data', data)
            let params = {    // 5个字段
                file: file,
                data: data,
            };
            console.log(data.get('file'))
            request({url:urlStr+'zhutu',params: params}).then(res => {
                console.log("返回值res",res);
                if(res.status==200){
                    if(res.data&&res.data.code==0){
                        console.log(res.data.message)
                    }else if(res.data&&res.data.code==1){
                    }else if(res.data&&res.data.code==2){
                    }
                }else{
                    alert("net work error!");
                }
            })
            // this.$http.post(urlStr + '/zhutu', data).then(function(data) {
            //     console.log(data)
            // }, function(response) {
            //     console.log(response)
            // })
        },
        getFile(event){
            console.log("getFile-event",event);
            var file = event.target.files;
            for(var i = 0;i<file.length;i++){
            //    上传类型判断
                var imgName = file[i].name;
                var idx = imgName.lastIndexOf(".");  
                if (idx != -1){
                    var ext = imgName.substr(idx+1).toUpperCase();   
                    ext = ext.toLowerCase( ); 
                    this.addArr.push(file[i]);
                }else{

                }
            }
        },
        submitAddFile(){
            if(0 == this.addArr.length){
                this.$message({
                type: 'info',
                message: '请选择要上传的文件'
                });
                return;
            }
            var formData = new FormData();
            formData.append('num', this.addType);
            formData.append('linkId',this.addId);
            formData.append('rfilename',this.addFileName);
            for(var i=0;i<this.addArr.length;i++){
                formData.append('fileUpload',this.addArr[i]);
            }
            // let config = {
            //     headers: {
            //     'Content-Type': 'multipart/form-data',
            //     'Authorization': this.token
            //     }
            // };
            // this.axios.post(apidate.uploadEnclosure,formData,config)
            //     .then((response) => {
            //         if(response.data.info=="success"){this.$message({
            //                 type: 'success',
            //                 message: '附件上传成功!'
            //             });
            //         }
            //     })
            let file = avatar.target.files[0]
            let data = new FormData();
            // data.append("file", file, file.name); 
            // data.append('data', data)
            let params = {    // 5个字段
                data: formData,
            };
            console.log(data.get('file'))
            request({url:urlStr+'zhutu',params: params}).then(res => {
                console.log("返回值res",res);
                if(res.status==200){
                    if(res.data&&res.data.code==0){
                        console.log(res.data.message)
                    }else if(res.data&&res.data.code==1){
                    }else if(res.data&&res.data.code==2){
                    }
                }else{
                    alert("net work error!");
                }
            })
        },
        resetAdd(){

        }
    },
};
</script>
<style acoped>
    .login-form {
        width: 350px;
        margin: 160px auto; /* 上下间距160px，左右自动居中*/
        background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
        padding: 30px;
        border-radius: 20px; /* 圆角 */
    }

    /* 背景 */
    .login-container {
        position: absolute;
        width: 100%;
        height: 100vh;
        background: url("../../../assets/images/ploughuav.png");
    }

    /* 标题 */
    .login-title {
        color: #303133;
        text-align: center;
    }
</style>