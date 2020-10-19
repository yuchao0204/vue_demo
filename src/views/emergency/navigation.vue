<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;height:264px">
    <div class="mainCSS">
      <p>车位统计</p>
    </div>
    <div style="width: 428px;margin-left: 50px;color:#adadad">
      <div>
        <p style="float:left;margin-top: 0px;margin-bottom: 0px;">停车场1</p>
        <div class="ParkingSpace"><el-progress :percentage="100" :format="format"></el-progress></div>
      </div>
      <div>
        <p style="float:left;margin-top: 0px;margin-bottom: 0px;">停车场2</p>
        <div class="ParkingSpace"><el-progress :percentage="50" :format="format"></el-progress></div>
      </div>
      <div>
        <p style="float:left;margin-top: 0px;margin-bottom: 0px;">停车场3</p>
        <div class="ParkingSpace"><el-progress :percentage="60" :format="format"></el-progress></div>
      </div>
      <div>
        <p style="float:left;margin-top: 0px;margin-bottom: 0px;">停车场4</p>
        <div class="ParkingSpace"><el-progress :percentage="70" :format="format"></el-progress></div>
      </div>
      <div>
        <p style="float:left;margin-top: 0px;margin-bottom: 0px;">停车场5</p>
        <div class="ParkingSpace"><el-progress :percentage="80" :format="format"></el-progress></div>
      </div>
      <div>
        <p style="float:left;margin-top: 0px;margin-bottom: 0px;">停车场6</p>
        <div class="ParkingSpace"><el-progress :percentage="90" :format="format"></el-progress></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"navigation",
    data() {
      return {
        radio:this.$store.getters.getNavigation,
      };
    },
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    }
  };
</script>
<style scoped>
.mainCSS{
  width:100%;height:46px
}
.mainCSS p{
  margin-top: 0px;
  margin-bottom: 0px;
  float: left;
  font-size: 24px;
  color: rgb(6 245 237);
}
.el-radio{
  float:left;
  display:block;
}
.ParkingSpace{
  margin-left: 100px
}
</style>