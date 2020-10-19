<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;">
    <div style="width:100%;height:46px">
      <p>气温变化</p>
    </div>
    <section class="chart-container">
        <el-row>                     
            <el-col :span="12">
                <div id="chartLine" style="width:100%; height:230px;left:0px"></div>
            </el-col>          
        </el-row>
    </section>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
      data() {
            return {      
              chart:null,
            }
        },
        methods: {                               
          getChartOption(type) {
              var option = {};
              if(type == "line"){
                  option = {
                      title : {
                          x: 'center',
                          text: '未来一周气温变化',
                          subtext: '',
                          textStyle:{//图例文字的样式
                              color:'#ADADAD',
                              fontSize:16
                          }
                      },
                      tooltip : {
                          trigger: 'axis'
                      },
                      legend: {
                          data:['最低气温'],
                          y: '10%',
                          left: 'left',
                          textStyle:{//图例文字的样式
                              color:'#ADADAD',
                              fontSize:16
                          }
                      },
                      toolbox: {
                          show : true,
                          feature : {
                              mark : {show: true},
                              dataView : {show: true, readOnly: false},
                              magicType : {show: false, type: ['line', 'bar']},
                              restore : {show: true},
                              saveAsImage : {show: true}
                          }
                      },
                      calculable : true,
                      xAxis : [
                          {
                              type : 'category',
                              boundaryGap : false,
                              data : ['周一','周二','周三','周四','周五','周六','周日'],
                              axisLabel : {
                                  textStyle:{//图例文字的样式
                                      color:'#ADADAD',
                                      fontSize:12
                                  }
                              }
                              
                          }
                      ],
                      yAxis : [
                          {
                              type : 'value',
                              axisLabel : {
                                  formatter: '{value} °C',
                                  textStyle:{//图例文字的样式
                                      color:'#ADADAD',
                                      fontSize:12
                                  }
                              }
                          }
                      ],
                      series : [
                          {
                              name:'标准气温',
                              type:'line',
                              data:[16,16,16,16,16,16,16],//标准线效果
                              markLine : {
                                  data : [
                                      {type : 'average', name : '平均值'}
                                  ]
                              }
      
                          },
                          {
                              name:'最低气温',
                              type:'line',
                              data:[11, 14, 12, 15, 13, 12, 20],
                              markPoint : {
                                  data : [
                                      {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                                  ]
                              },
                              markLine : {
                                  data : [
                                      {type : 'average', name : '平均值'}
                                  ]
                              }
                          }
                      ]
                  };
              }
              return option;
          }
        },
        mounted: function () {
            this.chart = echarts.init(document.getElementById("chartLine"));
            this.chart.setOption(this.getChartOption("line"));
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
.echarts-content{
  width:100%;
  min-height:78px;
  max-height:300px;
  background:#fff;
  -webkit-box-shadow: 0 0 15px rgba(0,0,0,.1);
  -moz-box-shadow: 0 0 15px rgba(0,0,0,.1);
  box-shadow: 0 0 15px rgba(0,0,0,.1);	
  padding:0 30px;
}
.echarts-content .chart-head{
  height:78px;
  width:100%;	
  padding-top:30px;
}
.echarts-content .chart-head p{
  display:inline-block;
  height:21px;
  width:100%;
  cursor:pointer;
  text-align:center;
}
.echarts-content .chart-head p strong{
  font-weight:normal;
  font-size:16px;
  color:#999;
}
.echarts-content .chart-head p em{
  display:inline-block;
  font-style:normal;
  font-size:14px;
  color:#999;
}
.echarts-content .chart-head p i{
  display:inline-block;
  color:#e4e4e4;
  font-size: 14px;
  margin-left:10px;
}
 
.echarts-content .chart-main{
  width:100%;
  height:222px;	
  position: relative;  
  overflow: hidden;
  -webkit-transition: height 0.6s;
  -moz-transition: height 0.6s;
  -o-transition: height 0.6s;
  transition: height 0.6s;
}
.echarts-content .chart-main .chart-main-left{
  width:calc(100% - 20px);
  height:100%;
  float:left;
}
.echarts-content .chart-main .chart-main-right{
  width:20px;
  height:100%;
  float:right;
  padding-top:50px;
}
.echarts-content .chart-main .chart-main-right span{
  display:inline-block;
  width:12px;
  height:12px;
  background:#e4e4e4;
  border-radius:100%;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  cursor:pointer;
}
.echarts-content .chart-main .chart-main-right span:hover{
  background:#0188fd;
}
.echarts-content .chart-main .chart-main-right .spanActive{
  background:#0188fd;
}
</style>