<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;">
    <div style="width:100%;height:46px">
      <p>青浦工业园变动记录</p>
    </div>
    <div style="height:190px;float:left;width:100%;color:rgb(173 173 173);">
      <el-collapse v-model="activeName" accordion style="height:190px;overflow:auto;">
        <el-collapse-item title="变动记录-1" name="1">
          <div class="noticeItem">2020-4-1 青浦工业园区多出来一栋楼。</div>
        </el-collapse-item>
        <el-collapse-item title="变动记录-2" name="2">
          <div class="noticeItem">2020-5-1 青浦工业园区多出来两栋楼。</div>
        </el-collapse-item>
        <el-collapse-item title="变动记录-3" name="3">
          <div class="noticeItem">2020-6-12 青浦工业园区多出两块绿地。</div>
        </el-collapse-item>
        <el-collapse-item title="变动记录-4" name="4">
          <div class="noticeItem">2020-6-13 青浦工业园区多出一条道路。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'part1',
    data() {
      return {
        activeName: null
      }
    },
    methods:{
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
.noticeItem{
  background-color: rgb(96, 104, 69);
  text-align:left;
  padding-left: 5px;
}
</style>