<template>
    <div>
      <el-card>
        <div slot="header" class="clearfix">
          <span><b>敏感性分析实验</b></span>
        </div>
        <el-row>
          <el-col :span="4">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="步长(%)">
                <el-input-number
                  v-model="form.step"
                  :precision="2"
                  :step="0.2"
                  :max="5"
                  :min="0.1"
                  size="small"
                  :disabled="disable"
                ></el-input-number>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="10">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="变化范围">
                <el-slider
                  v-model="form.range"
                  range
                  :max="25"
                  :min="-25"
                  :disabled="disable"
                >
                </el-slider>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="3" align="middle">
            <el-button @click="compute()" type="primary" :disabled="disable"
              >确定步长</el-button
            >
          </el-col>
          <el-col :span="4" align="middle">
            <el-select v-model="selectedItem" placeholder="请选择">
              <el-option
                v-for="item in select"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3" align="middle">
            <el-button @click="display()" type="primary" :disabled="!disable">{{
              text
            }}</el-button>
          </el-col>
        </el-row>
        <div
          id="linechart"
          style="width: 100%; height: 250px"
          v-if="!showReport"
        ></div>
        <div v-if="showReport">
          <p>1. 结果分析</p>
          <quill-editor
            class="editor"
            ref="purposeEditor"
            v-model="purpose"
            :options="editorOption"
          >
          </quill-editor>
          <p>2. 思考讨论</p>
          <quill-editor
            class="editor"
            ref="principleEditor"
            v-model="principle"
            :options="editorOption"
          >
          </quill-editor>
        </div>
        <!--        <el-form-item label="实验步骤" prop="progress">-->
        <!--          <el-input-->
        <!--              clearable-->
        <!--              class="input"-->
        <!--              type="textarea"-->
        <!--              :rows="2"-->
        <!--              placeholder="请输入内容"-->
        <!--              v-model="ruleform.progress"-->
        <!--              maxlength="400"-->
        <!--              show-word-limit-->
        <!--          >-->
        <!--          </el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item align="center">-->
        <!--          <el-button-->
        <!--              size="medium"-->
        <!--              type="primary"-->
        <!--              @click="submitForm('reportform')"-->
        <!--          >提交</el-button-->
        <!--          >-->
        <!--          <el-button size="medium" @click="back">取消</el-button>-->
        <!--        </el-form-item>-->
        <el-divider></el-divider>
        <el-table
          v-loading="loading"
          :header-row-style="{ height: '20px' }"
          :cell-style="{ padding: '5px' }"
          ref="filterTable1"
          :data="showedTableData"
          height=""
          stripe
          highlight-current-row
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column prop="changeRate" label="变化率(%)"></el-table-column>
          <el-table-column label="不确定因素">
            <el-table-column label="营业收入">
              <template slot-scope="scope">
                <div v-if="scope.row.income < 0">
                  <el-link underline="false" type="danger">
                    {{ scope.row.income }}%
                  </el-link>
                </div>
                <div v-else>
                  {{ scope.row.income == null ? "" : scope.row.income + "%" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="建设投资">
              <template slot-scope="scope">
                <div v-if="scope.row.investment < 0">
                  <el-link underline="false" type="danger">
                    {{ scope.row.investment }}%
                  </el-link>
                </div>
                <div v-else>
                  {{
                    scope.row.investment == null ? "" : scope.row.investment + "%"
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="运维成本">
              <template slot-scope="scope">
                <div v-if="scope.row.operatingCost < 0">
                  <el-link underline="false" type="danger">
                    {{ scope.row.operatingCost }}%
                  </el-link>
                </div>
                <div v-else>
                  {{
                    scope.row.operatingCost == null
                      ? ""
                      : scope.row.operatingCost + "%"
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="人员成本">
              <template slot-scope="scope">
                <div v-if="scope.row.staffCost < 0">
                  <el-link underline="false" type="danger">
                    {{ scope.row.staffCost }}%
                  </el-link>
                </div>
                <div v-else>
                  {{
                    scope.row.staffCost == null ? "" : scope.row.staffCost + "%"
                  }}
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </template>
  
  <script>
//   import store from "../../store/state";
//   import { GETComputed, PUTReport } from "../../API/http";
  import * as echarts from "echarts";
  export default {
    //  components: {
    //     FeedbackDialog,
    //  },
    mounted() {
      var chartDom = document.getElementById("linechart");
      this.myChart = echarts.init(chartDom);
    },
    data() {
      return {
        myChart: null,
        text: "计算",
        ruleform: {
          purpose: "",
          principle: "",
          progress: "",
        },
        showReport: false,
        finishCompute: false,
        loading: "",
        form: {
          step: 2,
          range: [-15, 15],
        },
        chartData: [],
        showedChartData: [],
        tabledata: [],
        showedTableData: [],
        selectedItem: "营业收入",
        disable: false,
        selected: [],
        select: [
          {
            value: "营业收入",
            label: "营业收入",
          },
          {
            value: "建设投资",
            label: "建设投资",
          },
          {
            value: "运维成本",
            label: "运维成本",
          },
          {
            value: "人员成本",
            label: "人员成本",
          },
        ],
        editorOption: {
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
              ["blockquote", "code-block"], // 引用  代码块
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
              [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
              [{ script: "sub" }, { script: "super" }], // 上标/下标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              // [{'direction': 'rtl'}],                         // 文本方向
              [{ size: ["small", false, "large", "huge"] }], // 字体大小
              [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
              [{ font: [] }], // 字体种类
              [{ align: [] }], // 对齐方式
              ["clean"], // 清除文本格式
              ["image"], // 链接、图片、视频
            ], //工具菜单栏配置
          },
          placeholder: "请在这里填写内容",
          theme: "snow",
          syntax: true,
        },
      };
    },
    watch: {
      form: {
        handler(newVal) {
          if (newVal.range[0] > 0) {
            this.form.range[0] = 0;
          }
          if (newVal.range[1] < 0) {
            this.form.range[1] = 0;
          }
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      setToDB() {
        // PUTReport({
        //   studentId: store.state.id,
        //   courseId: "420244",
        //   sectionId: "01",
        //   labId: String(this.labId),
        //   url: "www.google.com",
        //   grades: 0,
        //   purpose: this.ruleform.purpose,
        //   progress: this.ruleform.progress,
        //   principle: this.ruleform.principle,
        // })
        //   .then(() => {
        //     this.$alert("提交成功");
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     this.$message("提交失败");
        //   });
      },
      submitForm(formName) {
        console.log("submitform");
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.setToDB();
          } else {
            console.log("ID", this.$route.query.activityID);
            console.log("name", this.$route.query.activityName);
            console.log("ground", this.$route.query.groundId);
            console.log("error submit!!");
            return false;
          }
        });
      },
      display() {
        if (this.selected.length == 4) {
          if (!this.showReport) {
            this.showReport = true;
            this.text = "提交报告";
          } else {
            this.submitForm("reportform");
          }
          return;
        }
        if (this.selected.indexOf(this.selectedItem) == -1) {
          this.showedTableData = [];
          this.showedChartData = [];
          this.selected.push(this.selectedItem);
          console.log("select", this.selectedItem);
          for (var i = 0; i < this.tabledata.length; i++) {
            var tmp = {
              changeRate: null,
              income: null,
              investment: null,
              operatingCost: null,
              staffCost: null,
            };
            var tmp1 = {
              changeRate: null,
              income: null,
              investment: null,
              operatingCost: null,
              staffCost: null,
            };
            tmp.changeRate = this.tabledata[i].changeRate;
            tmp1.changeRate = this.chartData[i].changeRate;
            for (var j = 0; j < this.selected.length; j++) {
              switch (this.selected[j]) {
                case "营业收入":
                  tmp1.income = this.chartData[i].income;
                  tmp.income = this.tabledata[i].income;
                  break;
                case "建设投资":
                  tmp1.investment = this.chartData[i].investment;
                  tmp.investment = this.tabledata[i].investment;
                  break;
                case "运维成本":
                  tmp1.operatingCost = this.chartData[i].operatingCost;
                  tmp.operatingCost = this.tabledata[i].operatingCost;
                  break;
                case "人员成本":
                  tmp1.staffCost = this.chartData[i].staffCost;
                  tmp.staffCost = this.tabledata[i].staffCost;
                  break;
                default:
                  tmp1 = this.chartData[i];
                  tmp = this.tabledata[i];
              }
            }
            this.showedChartData.push(tmp1);
            this.showedTableData.push(tmp);
          }
        }
        this.myEcharts();
        console.log("selected", this.selected);
        console.log("showedChardata", this.showedChartData);
        console.log("showedTabledata", this.showedTableData);
        if (this.selected.length == 4) {
          this.text = "填写报告";
        }
      },
      handle(event) {
        this.value = event;
        console.log(event, this.value);
      },
      compute() {
        this.disable = true;
        let i;
        const params = [];
        for (i = 0; i > this.form.range[0]; i -= this.form.step) {
          params.unshift(i * 0.01);
        }
        for (i = this.form.step; i < this.form.range[1]; i += this.form.step) {
          params.push(i * 0.01);
        }
        console.log("params: ", params);
        // GETComputed(params)
        //   .then((data) => {
        //     console.log("data", data);
        //     this.chartData = [];
        //     this.tabledata = [];
        //     for (var i = 0; i < data.length; ++i) {
        //       this.chartData.push({
        //         changeRate: params[i] * 100,
        //         income: data[i][0],
        //         investment: data[i][1],
        //         operatingCost: data[i][2],
        //         staffCost: data[i][3],
        //       });
        //       this.tabledata.push({
        //         changeRate: Math.round(params[i] * 1000) / 10,
        //         income: Math.round(data[i][0] * 1000) / 10,
        //         investment: Math.round(data[i][1] * 1000) / 10,
        //         operatingCost: Math.round(data[i][2] * 1000) / 10,
        //         staffCost: Math.round(data[i][3] * 1000) / 10,
        //       });
        //     }
        //     console.log("tabledata", this.tabledata);
        //     // this.myEcharts();
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     this.$message("无法获取计算结果");
        //   });
      },
      myEcharts() {
        let option;
        // const chartDom = document.getElementById("linechart");
        // const myChart = echarts.init(chartDom);
        option = {
          title: {
            text: "敏感性分析图",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["营业收入", "建设投资", "运维成本", "人员成本"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "营业收入",
              type: "line",
              // stack: "Total",
              data: [],
            },
            {
              name: "建设投资",
              type: "line",
              // stack: "Total",
              data: [],
            },
            {
              name: "运维成本",
              type: "line",
              // stack: "Total",
              data: [],
            },
            {
              name: "人员成本",
              type: "line",
              // stack: "Total",
              data: [],
            },
          ],
        };
        for (var item in this.showedChartData) {
          // console.log(this.tabledata[item]);
          option.xAxis.data.push(this.showedChartData[item].changeRate + "%");
          option.series[0].data.push(this.showedChartData[item].income);
          option.series[1].data.push(this.showedChartData[item].investment);
          option.series[2].data.push(this.showedChartData[item].operatingCost);
          option.series[3].data.push(this.showedChartData[item].staffCost);
        }
        console.log("option", option);
        option && this.myChart.setOption(option);
      },
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    formatter(row) {
      return row.groundname;
    },
    handleChange(index, row, type) {
      index;
      type;
      this.$router.push({
        name: "ApplySiteWindow",
        query: {
          activityID: row.ID,
        },
      });
    },
    handleFeedback(row) {
      console.log(row);
      this.feedbackVisible = true;
      this.feedbackRow = row;
    },
    handleRenew(index, row) {
      console.log(index, row);
    },
    handleCurrentChange1(val) {
      this.currentRow = val;
      //this.$router.push('/Recorddescription')
    },
  };
  </script>
  
  <style scoped>
  .el-dialog {
    border-radius: 12px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .clearfix {
    font-size: 18px;
  }
  html,
  body {
    padding: 0px;
    margin: 0px;
    height: 100%;
  }
  .page {
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    background-color: rgb(236, 233, 233);
    background: rgba(240, 235, 235, 0.5);
    justify-content: center;
    align-items: center;
  }
  .el-dialog__header {
    border-bottom: 1px solid #ebebeb;
  }
  .background {
    margin: 0;
    height: 98%;
    width: 99%;
    background-color: rgb(255, 255, 255);
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    position: relative;
  }
  .el-card {
    border-radius: 15px;
    height: 100%;
    overflow: auto;
  }
  .modify {
    margin-left: 0.3cm;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .el-card {
    border-radius: 15px;
  }
  .demo-table-expand label {
    width: 90px;
    font-weight: 700;
  }
  .dialog {
    backdrop-filter: blur(10px);
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  ::v-deep .el-dialog__body {
    padding: 0px;
    display: flex;
    justify-content: center;
  }
  #pdfDom {
    /* 要想pdf周边留白，要在这里设置 */
    padding: 20px;
    width: 750px;
  }
  .proBox {
    /* background: url("../../assets/zs.jpg") no-repeat; */
    background-size: cover;
    width: 750px;
    height: 525px;
    padding: 90px 94px;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    color: #000;
    font-family: SimSun;
  }
  .tit {
    color: #cf0c0c;
    font-size: 36px;
    font-weight: 700;
    position: relative;
    top: -6px;
    left: 8px;
    letter-spacing: 20px;
    font-family: STHeiti;
    margin: 20px 0;
  }
  .proid {
    text-align: right;
    margin: 0;
    font-weight: 500;
    /* margin-right: 5px; */
  }
  .con {
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    margin: 10px 0;
    line-height: 32px;
    text-indent: 2em;
  }
  .con-name {
    font-family: 华文行楷, STXingkai;
    border-bottom: 2px solid #000;
  }
  .con-unit {
    font-size: 18px;
    font-weight: 700;
    position: absolute;
    right: 100px;
    bottom: 100px;
    text-align: center;
    letter-spacing: 3px;
  }
  .con-unit p {
    margin: 5px 0;
  }
  .con-footer {
    font-size: 18px;
    font-weight: 700;
    position: absolute;
    bottom: 45px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .chapter {
    border-radius: 50%;
    position: absolute;
    bottom: 75px;
    right: 134px;
  }
  </style>
  
  <style>
  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "常规";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "小";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "中";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "大";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
  }
  </style>