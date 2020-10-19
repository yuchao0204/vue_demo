<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;height:264px">
    <div style="width:100%;height:46px">
        <p>多媒体信息发布</p>
    </div>
    <div style="max-height:200px;overflow-y:auto;">
        <tr v-for="(item,index) in dataList" :key="index">
            <div style="height:25px;width:428px;margin-top: 8px;margin-bottom: 4px;border-radius: 4px;background-color:white;text-align:center">{{item.name}}</div>
        </tr>
    </div>
</div>
</template>
<script>
export default {
    name: 'indicidualMobile',
    data(){
        return{
            dataList:[
                {"name":"呼叫功能"},
                {"name":"广场大屏幕"},
                {"name":"微博平台"},
                {"name":"微信公众号平台"},
                {"name":"报纸报刊"}
            ],
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