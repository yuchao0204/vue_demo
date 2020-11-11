<template>
    <div class="login-container">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
            <h2 class="login-title">管理系统</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

import {request} from '../../http/request';
const urlStr="http://localhost:8082/";//node express
export default {
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            let params = {    // 5个字段
                username: this.form.username,
                password: this.form.password,
            };
            console.log("params",params);
            // request({url:urlStr+'login',params: params}).then(res => {
                request({url:'http://localhost:3003/fileMd5',params: params}).then(res=>{
                console.log("返回值res",res);
                if(res.status==200){
                    if(res.data&&res.data.code==0){
                        this.$router.push("/main");
                        this.$store.commit('setUserInfo', params);
                        localStorage.setItem("login","true");
                    }else if(res.data&&res.data.code==1){
                        alert(res.data.message||"用户名错误！");
                    }else if(res.data&&res.data.code==2){
                        alert(res.data.message||"密码错误！");
                    }
                }else{
                    alert("net work error!");
                }
            })
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