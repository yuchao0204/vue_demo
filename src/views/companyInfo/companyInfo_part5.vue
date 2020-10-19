<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;">
    <div style="width:100%;height:46px">
      <p>人流密度</p>
    </div>
    <section class="chart-container">
        <el-row>                     
            <el-col :span="12">
                <div id="chartLine1" style="width:100%; height:220px;left:0px"></div>
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
                  text: '',
                  subtext: '',
                  x: 'center',
                  textStyle:{
                    color:"#222",
                    fontStyle:"normal",
                    fontWeight:"600",
                    fontFamily:"san-serif",
                    fontSize:14,
                  }
              },
              color:['red', 'green','yellow','blueviolet',"#FE8463","#FFB400"],
              legend: {
                orient: 'horizontal',
                // left: '70%',
                // y: '1%',
                left: 'left',
                textStyle:{//图例文字的样式
                  color:'#ADADAD',
                  fontSize:14
                }
              },
              tooltip : {
                  trigger: 'axis'
              },
              // calculable : true,
              yAxis: {
                  type: 'value',
                  boundaryGap: [0, 0.01],
                  axisLine: {
                      lineStyle: {
                          color: "#fff000",
                      }
                  }
              },
              xAxis: {
                  type: 'category',
                  data: ['7', '9', '11', '13', '15', '17'],
                  axisLine: {
                      lineStyle: {
                          color: "#fff",
                      }
                  },
              },
              series : [
                  {
                      name:'圆津禅院',
                      type:'line',
                      data:[2116,1156,896,996,746,1126,126],
                  },
                  {
                      name:'放生桥',
                      type:'line',
                      data:[146,176,216,256,296,266,176],
                  },
                  {
                      name:'大清邮局',
                      type:'line',
                      data:[1226,1336,2316,2456,1496,1366,1276],
                  },
                  {
                      name:'扎西达娲藏文化',
                      type:'line',
                      data:[326,436,556,686,796,366,246],
                  },
                  {
                      name:'朱家角城隍庙',
                      type:'line',
                      data:[1126,1136,2116,1156,2196,3166,1126],
                  },
                  {
                      name:'课植园',
                      type:'line',
                      data:[146,1226,1386,1456,1596,1366,1226],
                  }
              ]
          };
        }
        return option;
      }
    },
    mounted: function () {
      this.chart = echarts.init(document.getElementById("chartLine1"));
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