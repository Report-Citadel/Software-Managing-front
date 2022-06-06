<template>
  <div id="app">
    <ve-line :data="EconmicData" :mark-line="markLine"> </ve-line>
  </div>
</template>
<script>
import "echarts/lib/component/markLine";
import 'echarts/lib/component/grid'
export default {
  name: "curve",
  props: {EcoData: null },
  data() {
    
    return {
      markLine: {
      symbol: ["none", "none"], // 相当于["none", "none"] [虚线，没有箭头]
      silent: true, // true 不响应鼠标事件
      label: {
        show: true, // 是否展示文字
        color: "black",
        fontSize: 20,
        formatter: function () {
          return "Economic Life";
        },
      },
      lineStyle: {
        color: "black",
        width: 1, // 0 的时候可以隐藏线
        // type: "solid" // 实线，不写默认虚线
      },
      data: [
        {
          // type:"average"
          xAxis: '4', // 对于x轴中的一个值
        },
      ],
    },
      EconmicData: {
        columns: [
          "year",
          "Capital recovery with return",
          "Operating and maintenance cost",
          "Total Cost",
        ],
        rows: []
      },
    };
  },
  created() {
    console.log(this.EcoData)
    var tempData=[];
    if(this.EcoData==undefined){
      tempData=JSON.parse(sessionStorage.getItem('EconomyLife'));
    } else {
      tempData=this.EcoData;
    }
    console.log(tempData)
        for(let x=0;x<tempData.year;x++){
          let temp={
            year: x,
            "Capital recovery with return": tempData.cRs[x],
            "Operating and maintenance cost": tempData.aESumOMs[x],
            "Total Cost": tempData.sumTotalAE[x]
            //"Total Cost": this.EconmicLife.cRs[x]+this.EconmicLife.aESumOMs[x],
          };
          this.EconmicData.rows.push(temp);
        }
        this.markLine.data=[{ xAxis: tempData.economicLife }]
        console.log(this.markLine.data)
  },
};
</script>
<style scope>
</style>