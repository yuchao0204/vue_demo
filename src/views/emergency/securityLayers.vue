<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;">
    <div style="width:100%;height:46px">
      <p>安防设施</p>
    </div>
    <div style="width:100px;height:100%;">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedOptions" @change="handleCheckedOptionsChange">
        <el-checkbox v-for="item in items" :label="item" :key="item">{{item}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        checkAll: true,
        checkedOptions: this.$store.getters.getSecurityCheckedLayers,
        items: ['疏散路线1',"疏散路线2","监控设备1","监控设备2"],
        isIndeterminate: true,
      };
    },
    mounted(){
      this.checkAll = this.checkedOptions.length === this.items.length;
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedOptions = val ? this.items : [];
        this.isIndeterminate = false;
        this.$store.commit('setSecurityCheckedLayers',this.checkedOptions);
      },
      handleCheckedOptionsChange(value) {
        this.$store.commit('setSecurityCheckedLayers',this.checkedOptions);
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.items.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length;
      },
      back(){
        this.$router.push('/');
      }
    },
  };
</script>
<style scoped>
p{
    margin-top: 0px;
    margin-bottom: 0px;
    /* margin-left: 16px; */
    float: left;
    font-size: 24px;
    color: rgb(6 245 237);
}
.el-checkbox{
  display:block;
  float:left;
  color:rgb(173 173 173);font-size: 16px;
}
</style>