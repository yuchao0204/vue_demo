<template>
  <div class="small" style="margin-left: 16px;margin-right: 16px;margin-top: 4px;height:264px;">
    <div style="width:100%;height:46px">
      <p>企业员工统计</p>
    </div>
    <canvas id="myChart1" width="428px" height="210px"></canvas>
  </div>
</template>

<script>
  import Chart from 'chart.js';

  export default {
    name: 'part1',
    data() {
      return {
      }
    },
    mounted() {
      var ctx2 = document.getElementById("myChart1");
      var myChart = new Chart(ctx2, {
        type: "bar",
        data: {
          labels: ["圣之尧", "征世科技", "company1", "company2", "company3", "company4", "company5"],
          datasets: [
            {
              label: "企业员工人数",
              backgroundColor: "rgba(225,10,10,0.7)",
              borderColor: "rgba(225,103,110,1)",
              borderWidth: 1,
              pointStrokeColor: "#fff",
              pointStyle: "crossRot",
              data: [65, 59, 20, 81, 56, 30, 40],
              cubicInterpolationMode: "monotone",
              spanGaps: "false",
              fill: "false",
            }
          ]
        },
        options: {
        }
      });
    },
    methods:{
    },
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
</style>