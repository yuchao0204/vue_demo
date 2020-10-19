<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;height:264px">
      <div style="width:100%;height:46px">
        <p>单兵移动系统</p>
      </div>
      <div style="margin-left: 20px;max-height:200px;overflow-y:auto">
          <table>
            <thead>
                <tr style="color:#adadad">
                    <th>编号</th>
                    <th>定位</th>
                    <th>录音</th>
                    <th>录像</th>
                    <th>呼叫</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for ="(item,index) in tableData" :key="index">
                <td><button >{{item.no}}</button></td>
                <td><button >{{item.location}}</button></td>
                <td><button >{{item.record}}</button></td>
                <td><button >{{item.video}}</button></td>
                <td><button >{{item.contact}}</button></td>
              </tr>
            </tbody>
          </table>
      </div>
  </div>
</template>
<script>
export default {
  name: 'indicidualMobile',
  data(){
    return{
        tableData:[
          {"no":"编号：007","location":"定位1","record":"录音1","video":"录像1","contact":"呼叫1"},
          {"no":"编号：007","location":"定位2","record":"录音2","video":"录像2","contact":"呼叫2"},
          {"no":"编号：007","location":"定位2","record":"录音2","video":"录像2","contact":"呼叫2"},
          {"no":"编号：007","location":"定位2","record":"录音2","video":"录像2","contact":"呼叫2"},
          {"no":"编号：007","location":"定位2","record":"录音2","video":"录像2","contact":"呼叫2"},
          {"no":"编号：007","location":"定位2","record":"录音2","video":"录像2","contact":"呼叫2"},
          {"no":"编号：007","location":"定位2","record":"录音2","video":"录像2","contact":"呼叫2"},
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