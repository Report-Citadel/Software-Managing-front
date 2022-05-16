<template>
  <div id="bar" style="width: 700px; height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "BarChart",
  mounted() {
    // 1. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("bar"));

    // 3. 使用刚指定的配置项和数据，显示图表
    myChart.setOption(this.option);
  },
};
</script>

<style scoped>
</style>