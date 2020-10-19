<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;">
    <div  class="partyBuildMainCSS">
      <p>党组分布</p>
    </div>
    <div style="height:190px;float:left;width:100%;">
      <div style="margin-right: 50px;color:#adadad">
        <div style="float:right;display:inline-block;margin-left: 15px;margin-right: 5px;">
          <p>党组织数量</p>
          <p>368</p>
        </div>
        <div style="float:right;display:inline-block;">
          <p>党员数量</p>
          <p>11681</p>
        </div>
      </div>
      <div style="height: 185px;width:185px;">
        <img src="../../../assets/images/party1.jpg" style="height: 100%;width: 100%;margin-left: 5px;">
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'part1',
    data() {
      return {
      }
    },
    methods:{
    },
  }
</script>

<style scoped>
.partyBuildMainCSS{
  width:100%;height:46px
}
.partyBuildMainCSS p{
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