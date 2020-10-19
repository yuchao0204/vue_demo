<template>
  <div style="margin-left: 16px;margin-right: 16px;margin-top: 4px;">
    <div style="width:100%;height:46px">
      <p>工业区块面积</p>
    </div>
    <section class="chart-container">
      <el-row>                     
        <el-col :span="12">
          <div id="chartPie" style="width:100%; height:220px;"></div>
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
                chartPie: null
            }
        },
        methods: {                               
          drawPieChart() {
            this.chartPie = echarts.init(document.getElementById('chartPie'));
            this.chartPie.setOption({
              title: {
                text: '',
                subtext: '',
                x: 'center',
                textStyle:{
                  color:"#222",
                  fontStyle:"normal",
                  fontWeight:"600",
                  fontFamily:"san-serif",
                  fontSize:16,
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              color:['red', 'green','yellow','blueviolet',"#FE8463","#FFB400"],
              legend: {
                orient: 'horizontal',
                // left: '70%',
                y: '1%',
                // left: 'left',
                data: ['青浦工业园区', '嘉民青浦现代产业园', '徐泾工业园', '练塘工业园', '朱家角工业园',"其他"],
                textStyle:{//图例文字的样式
                  color:'#ADADAD',
                  fontSize:14
                }
              },
              series: [
                {
                  name: '工业区块',
                  type: 'pie',
                  radius: '50%',
                  center: ['50%', '60%'],
                  data: [
                    { value: 335, name: '青浦工业园区' },
                    { value: 310, name: '嘉民青浦现代产业园' },
                    { value: 234, name: '徐泾工业园' },
                    { value: 135, name: '练塘工业园' },
                    { value: 548, name: '朱家角工业园'},
                    { value: 135, name: '其他' }
                  ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            });
          },
          drawCharts() {
              this.drawPieChart()
          },
        },
        mounted: function () {
            this.drawCharts()
        }
  }
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