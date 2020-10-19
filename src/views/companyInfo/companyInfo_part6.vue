<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;">
    <div style="width:100%;height:46px">
      <p>园区通知</p>
    </div>
    <el-collapse v-model="activeName" accordion style="height:190px;overflow:auto;color:rgb(173 173 173);">
      <el-collapse-item title="7/31停电通知" name="1">
        <div class="noticeItem">由于7号厂房车间需要进行配电改造工程，青浦供电公司将于7月31日星期五05:00-18:00停止为园区7栋楼供应电力。</div>
      </el-collapse-item>
      <el-collapse-item title="关于公司组织架构变更的通知" name="2">
        <div class="noticeItem">为加强公司管理，实现公司快速有效发展，明确公司部门职责与岗位职责，划分部门与岗位权限。现颁布公司组织架构及各部门管理权限变更的通知。</div>
      </el-collapse-item>
      <el-collapse-item title="圣之尧员工生日会邀请函" name="3">
        <div class="noticeItem">诚挚邀请各位参加公司为1-6月的寿星举办的生日Party。</div>
      </el-collapse-item>
      <el-collapse-item title="日报制度公布-不定时工作制" name="4">
        <div class="noticeItem">现为了更有效的管理，要求所有实行不定时工作制的员工每日完成附件的日报，仔细详细的记录每日工作内容和次日的工作计划。</div>
      </el-collapse-item>
      <el-collapse-item title="2020年中秋节和国庆节节假日通知" name="5">
        <div class="noticeItem">根据国务院办公厅关于2020年中秋节和国庆节节假日通知，并结合公司实际工作情况，现放假安排如下：放假时间为： 2020年10月01日-2020年10月08日（共8天）。9月27日（星期日）和10月10日（星期六）上班。</div>
      </el-collapse-item>
      <el-collapse-item title="加班调休统计" name="6">
        <div class="noticeItem">7月27日至8月2日为期一周工程部人员加班统计，请按照考勤管理办法进行调休。</div>
      </el-collapse-item>
      <el-collapse-item title="内部竞聘宣导会" name="7">
        <div class="noticeItem">诚挚邀请各位参加公司内部竞聘宣导会，会议主要内容为：<br>1. 公司组织架构变更<br>2. 公司岗位变更说明<br>3. 公司与中国航发商用航空发动机有限责任公司合作的UG外包项目宣导</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: 'part6',
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
  color: rgb(254, 255, 255);
  background-color: rgb(13, 42, 105);
  text-align:left;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  border:1px;
}
</style>