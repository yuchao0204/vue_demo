<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;height:264px">
      <div style="width:100%;height:46px">
        <p>监控信息</p>
      </div>
      <div>
        <div class="videoDiv">
          <video muted autoplay loop crossorigin controls style="width:200px;height:auto;margin-left: 3px;">
            <source src="../../../assets/videos/air-612-1.mp4" type="video/mp4">
            Your browser does not support the <code>video</code> element.
          </video>
        </div>
        <div class="videoDiv">
          <video muted autoplay loop crossorigin controls style="width:210px;height:auto;margin-left: 3px;margin-bottom: 10px;">
            <source src="../../../assets/videos/air-612-2.mp4" type="video/mp4">
            Your browser does not support the <code>video</code> element.
          </video>
        </div>
        <div class="videoDiv">
          <video muted autoplay loop crossorigin controls style="width:210px;height:auto;margin-left: 3px;">
            <source src="../../../assets/videos/air-612-5.mp4" type="video/mp4">
            Your browser does not support the <code>video</code> element.
          </video>
        </div>
        <div class="videoDiv">
          <video muted autoplay loop crossorigin controls style="width:210px;height:auto;margin-left: 3px;">
            <source src="../../../assets/videos/air-613-3.mp4" type="video/mp4">
            Your browser does not support the <code>video</code> element.
          </video>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'monitoring',
  data(){
    return{
    }
  }
}
</script>
<style scoped>
.videoDiv{
  float: left;
}
p{
  margin-top: 0px;
  margin-bottom: 0px;
  float: left;
  font-size: 24px;
  color: rgb(6 245 237);
}
</style>