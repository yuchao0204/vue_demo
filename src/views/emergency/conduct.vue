<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;height:264px">
    <div style="width:100%;height:46px">
      <p>指挥系统</p>
    </div>
    <div>
      <div style="float:left;width:20%;height:200px;margin-left: 10px;margin-right: 10px;">
          <el-row>
              <el-button style="margin-top: 20px;">通话中</el-button>
              <el-button style="margin-top: 20px;">录音中</el-button>
              <el-button style="margin-top: 20px;">呼叫</el-button>
          </el-row>
      </div>
      <div style="float: right;width: 72%;height:210px;border: 1px;background-color:white;">
          <div>
              <img src="../../../assets/images/emergency-612-2.png" style="width: 140px; height: 100px;margin-left:10px;margin-top:4px">
              <img src="../../../assets/images/emergency-612-3.png" style="width: 140px; height: 100px;margin-left:10px;margin-top:4px">
          </div>
          <div>
              <img src="../../../assets/images/police-4.jpg" style="width: auto; height: 100px;margin-left:40px">
              <img src="../../../assets/images/police-3.jpg" style="width: auto; height: 100px;margin-left:70px">
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'conduct',
  data(){
    return{
    }
  }
}
</script>
<style scoped>
p{
  margin-top: 0px;
  margin-bottom: 0px;
  float: left;
  font-size: 24px;
  color: rgb(6 245 237);
}
</style>