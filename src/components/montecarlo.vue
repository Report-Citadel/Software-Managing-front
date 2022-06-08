<template>
  <div>
    <!-- <el-dialog
      :visible.sync="dialogVisible"
      title="请选择文件"
      center
      border-radius="4px"
    >
      <el-upload
        ref="uploadImport"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :before-remove="beforeRemove"
        :file-list="fileList"
        :multiple="true"
        :auto-upload="false"
        accept=""
      >
        <el-button type="primary" style="float: center">选取文件</el-button>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="success" @click="uploadMyEx()">上传</el-button>
      </div>
    </el-dialog> -->
    <el-col :span="14"><v-btn dark @click="back">返回</v-btn></el-col>
    <div>
      <br />
      <br />

      <h2 align="left">蒙特卡洛分析</h2>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="label" label="" width="80"> </el-table-column>
        <el-table-column label="最乐观" width="100">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.zuileguan"
              placeholder="请输入最乐观工期"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="最可能" width="100">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.zuikeneng"
              placeholder="请输入最可能工期"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="最悲观" width="100">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.zuibeiguan"
              placeholder="请输入最悲观工期"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="平均工期" width="100">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.pingjungongqi"
              placeholder="请输入平均工期"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="标准差" width="100">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.biaozhuncha"
              placeholder="请输入标准差"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="fenbu" label="分布" width="100">
        </el-table-column>
      </el-table>
      <br />
      <el-button type="primary" @click="calMonto">进行蒙特卡洛分析</el-button>
      <br />
      <br />
      <h2 align="left">蒙特卡洛分析结果数据</h2>
      <br />
      <br />
      <el-table :data="tableDataFinal" stripe style="width: 100%">
        <el-table-column prop="design" label="设计" width="120">
        </el-table-column>
        <el-table-column prop="develop" label="开发" width="120">
        </el-table-column>
        <el-table-column prop="test" label="测试" width="120">
        </el-table-column>
        <el-table-column prop="sum" label="SUM" width="120"> </el-table-column>
      </el-table>
    </div>
    <br />
    <br />
    <h2 align="left">蒙特卡洛分析结果折线图</h2>
    <br />
    <br />

    <div
      class="mengtekaluo"
      :key="certinfokey"
      style="width: 100%; height: 800px"
    >
    <div id="myChart2" style="width: 100%; height: 600px; float: left"></div>
      <!-- <div id="myChart2" style="width: 150%; height: 800px; float: left"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "mengtekaluo",
  data() {
    return {
      dialogVisible: false,
      dialog: false,
      fileList: [],
      certinfokey: 0,
      ex_id: "",
      ex_info: {},
      myChart2: "",
      sum: [],
      chart_x: [],
      chart_y: [],
      tableData: [
        {
          label: "设计",
          zuileguan: "12",
          zuikeneng: "20",
          zuibeiguan: "28",
          pingjungongqi: "20",
          biaozhuncha: "2",
          fenbu: "均匀分布",
        },
        {
          label: "开发",
          zuileguan: "16",
          zuikeneng: "25",
          zuibeiguan: "34",
          pingjungongqi: "25",
          biaozhuncha: "3",
          fenbu: "均匀分布",
        },
        {
          label: "测试",
          zuileguan: "10",
          zuikeneng: "22",
          zuibeiguan: "34",
          pingjungongqi: "22",
          biaozhuncha: "4",
          fenbu: "均匀分布",
        },
      ],
      tableDataFinal: [],
    };
  },
  methods: {
    getParams: function () {
      this.ex_id = JSON.parse(this.$Base64.decode(this.$route.query.info));
    },

    back() {
      this.$router.go(-1);
    },

    handleFile() {
      this.dialogVisible = true;
    },

    handlePreview(file) {
      console.log(file);
    },

    handleRemove(file, fileListS) {
      console.log(file, fileListS);
    },

    handleChange(file) {
      console.log(file);
      this.fileListS.push(file);
      console.log(this.fileListS);
    },

    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    fillExperiment() {
      this.$router.push({
        path: "/studentHome/concreteCourse/FillExper",
        query: {
          info: this.$Base64.encode(JSON.stringify(this.ex_info.ex_id)),
          title: this.$Base64.encode(JSON.stringify(this.ex_info.title)),
        },
      });
    },

    calMonto() {
      console.log("change");
      console.log(this.tableData[0].zuileguan);
      console.log(this.tableData[1].zuileguan);
      console.log(this.tableData[2].zuileguan);

      let design_num =
        1 +
        (this.tableData[0].zuibeiguan - this.tableData[0].zuileguan) /
          this.tableData[0].biaozhuncha;
      let work_num =
        1 +
        (this.tableData[1].zuibeiguan - this.tableData[1].zuileguan) /
          this.tableData[1].biaozhuncha;
      let test_num =
        1 +
        (this.tableData[2].zuibeiguan - this.tableData[2].zuileguan) /
          this.tableData[2].biaozhuncha;

      console.log(design_num);
      console.log(work_num);
      console.log(test_num);

      let design_list = [];
      let work_list = [];
      let test_list = [];

      for (var ii = 0; ii < design_num; ii++) {
        design_list.push(
          Number(this.tableData[0].zuileguan) +
            ii * Number(this.tableData[0].biaozhuncha)
        );
      }
      for (var jj = 0; jj < work_num; jj++) {
        work_list.push(
          Number(this.tableData[1].zuileguan) +
            jj * Number(this.tableData[1].biaozhuncha)
        );
      }
      for (var kk = 0; kk < test_num; kk++) {
        test_list.push(
          Number(this.tableData[2].zuileguan) +
            kk * Number(this.tableData[2].biaozhuncha)
        );
      }

      console.log(design_list);
      console.log(work_list);
      console.log(test_list);

      this.tableDataFinal = [];

      for (var i = 0; i < 80; i++) {
        let design_random = Math.floor(Math.random() * (design_num - 1));
        let work_random = Math.floor(Math.random() * (work_num - 1));
        let test_random = Math.floor(Math.random() * (test_num - 1));

        console.log(design_random);
        console.log(work_random);
        console.log(test_random);

        this.tableDataFinal.push({
          design: design_list[design_random],
          develop: work_list[work_random],
          test: test_list[test_random],
          sum:
            design_list[design_random] +
            work_list[work_random] +
            test_list[test_random],
          proportion: 0,
        });
      }

      let num_list = [];
      let pot_list = [];
      this.tableDataFinal = this.tableDataFinal.sort(this.compare("sum"));
      console.log(this.tableDataFinal);
      for (var ij = 0; ij < 80; ij++) {
        this.tableDataFinal[ij].proportion = Math.floor((ij / 80) * 100);
        pot_list.push(this.tableDataFinal[ij].proportion);
        num_list.push(ij);
      }

      this.chart_x = num_list;
      this.chart_y = pot_list;
      this.drawLine1();
    },
    compare(property) {
      return function (obj1, obj2) {
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2; // 升序
      };
    },
    getExInfo() {},
    uploadMyEx() {},
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      this.myChart2.setOption({
        title: {
          text: "", // 主标题
          subtext: "", // 副标题
          x: "left", // x轴方向对齐方式
        },
        tooltip: {
          trigger: "axis", // axis   item   none三个值
        },
        xAxis: {
          type: "category", // 还有其他的type，可以去官网喵两眼哦
          data: this.chart_x, // x轴数据
          name: "", // x轴名称
          // x轴名称样式
          // nameTextStyle: {
          //   fontWeight: 600,
          //   fontSize: 18
          // }
        },
        yAxis: {
          type: "value",
          name: "估计概率", // y轴名称
          // y轴名称样式
          // nameTextStyle: {
          //   fontWeight: 600,
          //   fontSize: 18
          // }
        },
        legend: {
          orient: "vertical",
          x: "center",
          y: "top",
          data: ["估计概率"],
        },
        series: [
          {
            name: "估计概率",
            data: this.chart_y,
            type: "line",
          },
        ],
      });
    },
  },
  mounted() {
    this.getParams();
    this.getExInfo();
    this.drawLine1();
  },
};
</script>


<style scoped>
.el-row {
  margin: 20px;
}

.bg-purple {
  background: #385fbb;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin: 5px, 5px, 5px, 5px;
  padding: 5px, 5px, 5px, 5px;
}
</style>

<style lang="sass" scoped>
</style>

