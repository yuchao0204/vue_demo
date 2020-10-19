<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password">
            <el-input v-model="ruleForm.confirm_password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {request} from '../../http/request';
    const urlStr="http://localhost:8082/";
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    password: '',
                    confirm_password: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    confirm_password: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                if(this.ruleForm.confirm_password!==this.ruleForm.password){
                    alert('confirm password!');
                    return;
                }
                request({
                    url:urlStr+'regist',
                    params: this.ruleForm
                }).then(res => {
                    console.log("返回值res",res);
                    if(res.status==200){
                        if(res.data&&res.data.code==0){
                            alert(res.data.message||"注册成功！");
                            this.$router.push("/home/login");
                        }else{
                            alert(res.data.message||"注册失败！");
                        }
                    }else{
                        alert("net work error!");
                    }
                })
                // axios.post('http://localhost:3000/regist',this.ruleForm).then(function (response) {  
                //     console.log(response);  
                // }).catch(function (error) {
                //     console.log(error);  
                // });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style acoped>
.demo-ruleForm{
    position: absolute;
    width: 100%;
    height: 100vh;
}
</style>