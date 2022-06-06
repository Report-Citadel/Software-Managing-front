<template>
  <el-container style="height: 100%; min-height: 100%" direction="vertical">
    <div style="width: 100%">
      <el-button type="primary" @click="Exit()" style="float: left"
        >←返回</el-button
      >
    </div>
    <el-container>
      <!--主要区域容器-->
      <div class="courses">
        <!-- <img src="../../../public/tongji_front1.jpg" style="width:100% ; margin-top:-1%" class="image">
                    <div><hr /></div> -->
        <p></p>
        <el-steps :active="2" simple>
          <el-step title="拍卖详情" icon="el-icon-picture"></el-step>
          <el-step title="拍卖出价" icon="el-icon-edit"></el-step>
          <el-step title="供需曲线" icon="el-icon-upload"></el-step>
        </el-steps>
        <p></p>
        <div class="auctionDetail">
          <!-- <div class="title">拍卖实验</div> -->
          <div class="left-box">
            <el-tabs type="border-card">
              <el-tab-pane label="需求-价格关系图">
                <div id="graph1" style="width: 430px; height: 300px"></div>
              </el-tab-pane>
              <el-tab-pane label="供给-价格关系图">
                <div id="graph2" style="width: 430px; height: 300px"></div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="right-box">
            <div id="graph3" style="width: 460px; height: 300px"></div>
          </div>
        </div>
      </div>
    </el-container>
  </el-container>
</template>
<script>
// import Navigator from './instru_index1.vue'
export default {
  //         components: {
  //             Navigator
  //  },
  data() {
    return {
      price: "",
      done: 0,
      dem: [],
      sup: [],
      auc_id: 1,
      myechart1: "",
      myechart2: "",
      myechart3: "",
    };
  },
  mounted() {
    this.auc_id = this.$route.query.id;
    // this.timer=setInterval(()=>{
    this.axios
      .get(
        "http://106.14.97.109:8081/auction/participationEntity/getSupPriceCurve?id=" +
          this.auc_id
      )
      .then((res) => {
        // console.log(res)
        this.sup = res.data.data;
      });
    this.axios
      .get(
        "http://106.14.97.109:8081/auction/participationEntity/getDemPriceCurve?id=" +
          this.auc_id
      )
      .then((res) => {
        //    console.log(res)
        this.dem = res.data.data;
      });

    //  },3000);

    this.myechart1 = this.$echarts.init(document.getElementById("graph1"));
    this.myechart2 = this.$echarts.init(document.getElementById("graph2"));
    this.myechart3 = this.$echarts.init(document.getElementById("graph3"));
    this.setchart1();
    this.setchart2();
    this.setchart3();
  },
  beforeDestroy() {
    // 页面销毁后同时清除定时器，避免占用内存

    clearInterval(this.timer);

    this.timer = null;
  },
  methods: {
    Exit() {
      this.$router.push({
        path: "/studentHome/concreteCourse/DemandSupply",
      });
    },
    submit() {
      this.done = 1;
    },
    setchart1() {
      var option = {
        title: {
          text: "需求-价格关系图",
        },
        grid: {
          x: 50,
          y: 55,
          x2: 45,
          y2: 30,
          borderWidth: 1,
        },
        tooltip: {},
        legend: {
          data: ["需求"],
        },
        xAxis: {
          name: "需求",
        },
        yAxis: {
          name: "价格",
        },
        series: [
          {
            name: "需求",
            type: "line",
            areaStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(80,141,255,0.39)",
                  },
                  {
                    offset: 0.34,
                    color: "rgba(56,155,255,0.25)",
                  },
                  {
                    offset: 1,
                    color: "rgba(38,197,254,0.00)",
                  },
                ]),
              },
            },
            data: this.dem, //[[1,5],[2,20],[3,36], [5,10],[6,10], [8,20]]
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myechart1.setOption(option);
    },
    setchart2() {
      var option = {
        title: {
          text: "供给-价格关系图",
        },
        grid: {
          x: 50,
          y: 55,
          x2: 45,
          y2: 30,
          borderWidth: 1,
        },
        tooltip: {},
        legend: {
          data: ["供给"],
        },
        xAxis: {
          name: "供给",
        },
        yAxis: {
          name: "价格",
        },
        series: [
          {
            name: "供给",
            type: "line",
            areaStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(80,141,255,0.39)",
                  },
                  {
                    offset: 0.34,
                    color: "rgba(56,155,255,0.25)",
                  },
                  {
                    offset: 1,
                    color: "rgba(38,197,254,0.00)",
                  },
                ]),
              },
            },
            data: this.sup, //[[1,5],[2,20],[3,36], [5,10],[6,10], [8,20]]
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myechart2.setOption(option);
    },
    setchart3() {
      var option = {
        title: {
          text: "供需平衡关系图",
        },
        grid: {
          x: 55,
          y: 95,
          x2: 45,
          y2: 20,
          borderWidth: 1,
        },
        tooltip: {},
        legend: {
          data: ["需求", "供给"],
        },
        xAxis: {
          name: "\n需求/供给",
          nameLocation: "middle",
        },
        yAxis: {
          name: "价格\n",
          nameLocation: "middle",
        },
        series: [
          {
            name: "需求",
            type: "line",
            data: this.dem,
          },
          { name: "供给", type: "line", data: this.sup },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myechart3.setOption(option);
    },
  },
  watch: {
    dem(val, oldVal) {
      console.log(1111, val, oldVal);
      this.setchart1();
      this.setchart3();
    },
    sup(val, oldVal) {
      console.log(1111, val, oldVal);
      this.setchart2();
      this.setchart3();
    },
  },
};
</script>
<style scoped>
.auctionDetail {
  margin: 0px 50px;
}
.left-box {
  height: 500px;
  float: left;
  margin: 20px 20px;
}
.right-box {
  height: 350px;
  float: left;
  margin: 40px 20px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.butt {
  margin: 10px 10px;
}
.el-aside {
  overflow: hidden;
}
.navigator {
  position: fixed;
  margin: -0.53% auto;
  left: -6%;
  z-index: 5;
}
/* .el-main{
  margin-left: 15%;
} */
</style>