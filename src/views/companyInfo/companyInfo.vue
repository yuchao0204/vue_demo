<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;">
    <div style="width:100%;height:46px">
      <p>企业信息</p>
    </div>
    <div style="height:200px;overflow:auto;color:rgb(173 173 173);font-size:16px">
      <el-table :data="tableData" height="100%" border highlight-current-row @current-change="handleCurrentChange">
        <el-table-column prop="name" label="名称" width="152" font-size="20"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import companyData from '../../../assets/jsonData/companyData.json'//本地路径
  export default {
    name: 'companyInfo',
    data() {
      return {
        tableData:[],
      }
    },
    mounted(){
      if(this.tableData.length==0){
        this.tableData=companyData;
      }
    },
    methods:{
      handleCurrentChange(val){
        this.$store.commit("setCompanyChecked",val);
      }
    },
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

::-webkit-scrollbar {
  width:9px;
  height:9px;
}
::-webkit-scrollbar-thumb {
  background-color:#9BF7F7;
  background-clip:padding-box;
  min-height:28px;
}
</style>