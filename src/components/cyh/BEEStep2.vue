<template>
  <el-main style="width: 800px">
    <h1 class="title">生成图表如下:</h1>
    <div id="chart" ref="chart" class="chart"></div>
    <h1 class="title">如果今年的正常销量仍为2万只，回答以下问题</h1>
    <el-form
      :model="answerForm"
      :rules="formRules"
      ref="bEPForm"
      label-width="250px"
      class="inputForm"
      label-position="left"
    >
      <el-form-item label="盈亏平衡点(盈亏平衡时的销量)" prop="bep">
        <el-input v-model="answerForm.bep"></el-input>
      </el-form-item>
      <el-form-item label="盈亏平衡点作业率" prop="jobRate">
        <el-input v-model="answerForm.jobRate"></el-input>
      </el-form-item>
      <el-form-item label="安全边际率" prop="safeRate">
        <el-input v-model="answerForm.safeRate"></el-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="6">
        <el-button icon="el-icon-arrow-left" @click="previousStep"
          >上一页</el-button
        >
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="6">
        <el-button
          type="primary"
          icon="el-icon-check"
          @click="nextStep('bEPForm')"
          >确认</el-button
        >
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: "BEEStep2",
  data() {
    const fixedNumberRule = (rule, value, callback) => {
      //包含小数的数字
      let reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
      if (value === "") {
        callback(new Error("请输入内容"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    return {
      chart: null,
      xAxisData: [0, 5000, 10000, 15000, 20000],
      fixedCosts: [],
      variableCosts: [],
      totalCosts: [],
      sales: [],
      // bEPForm: {
      //   BEP: 0,
      //   jobRate:0,
      //   safeRate:0
      // },
      formRules: {
        BEP: [{ required: true, validator: fixedNumberRule, trigger: "blur" }],
        jobRate: [
          { required: true, validator: fixedNumberRule, trigger: "blur" },
        ],
        safeRate: [
          { required: true, validator: fixedNumberRule, trigger: "blur" },
        ],
      },
    };
  },
  props: ["answerForm"],
  methods: {
    setVariableCosts() {
      for (let i = 0; i < this.xAxisData.length; i++) {
        this.variableCosts.push(
          this.xAxisData[i] * Number(this.answerForm.variableCost)
        );
      }
      // console.log(this.variableCosts, "variableCosts")
    },
    setTotalCosts() {
      for (let i = 0; i < this.xAxisData.length; i++) {
        this.totalCosts.push(
          this.xAxisData[i] * Number(this.answerForm.variableCost) +
            Number(this.answerForm.fixedCost)
        );
      }
      // console.log(this.totalCosts, "totalCosts")
    },
    setSales() {
      for (let i = 0; i < this.xAxisData.length; i++) {
        this.sales.push(this.xAxisData[i] * Number(this.answerForm.price));
      }
      // console.log(this.sales,"sales")
    },
    setFixedCosts() {
      for (let i = 0; i < this.xAxisData.length; i++) {
        this.fixedCosts.push(Number(this.answerForm.fixedCost));
      }
      // console.log(this.fixedCosts, "fixedCosts")
    },
    createChart() {
      this.setSales();
      this.setTotalCosts();
      this.setVariableCosts();
      this.setFixedCosts();

      this.chart = this.$echarts.init(document.getElementById("chart"));

      let option = {
        grid: {
          //位置
          left: 70,
        },
        title: {
          //标题
          text: "盈亏平衡分析折线图",
        },
        legend: {
          //图例
          left: "right",
        },
        xAxis: {
          boundaryGap: false,
          name: "销量(只)",
          nameLocation: "end",
          data: this.xAxisData,
        },
        yAxis: {
          name: "收入(成本)",
        },
        tooltip: {
          trigger: "axis",
          formatter: "{a2}:{c2}" + "元" + "<br/>" + "{a3}:{c3}" + "元",
          axisPointer: {
            type: "line",
            label: "none",
            show: true,
            snap: false,
          },
        },
        series: [
          {
            type: "line",
            name: "固定成本",
            data: this.fixedCosts,
          },
          {
            type: "line",
            name: "变动成本",
            data: this.variableCosts,
          },
          {
            type: "line",
            name: "总成本",
            data: this.totalCosts,
            areaStyle: {},
          },
          {
            type: "line",
            name: "销售额",
            data: this.sales,
            areaStyle: {},
          },
        ],
      };
      this.chart.setOption(option);
      console.log(this.chart);
    },
    previousStep() {
      this.$emit("previousStep");
    },
    nextStep(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("nextStep", this.answerForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.createChart();
    console.log(this.answerForm);
  },
};
</script>

<style scoped>
.title {
  width: 600px;
  font-size: 130%;
  color: black;
  text-align: left;
  margin-left: 150px;
}
.chart {
  width: 600px;
  height: 400px;
  margin-left: 150px;
}
.inputForm {
  width: 400px;
  margin-left: 200px;
  margin-bottom: 50px;
}
</style>