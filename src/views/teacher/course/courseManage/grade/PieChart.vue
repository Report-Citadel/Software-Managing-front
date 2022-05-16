<template>
  <div>
    <br />
    <div id="attendance" style="width: 900px; height: 30vh"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "PieChart",
  props: ["course_id"],
  data() {
    return {
      attendanceScore: [
        /*
        { name: "0-60", value: 2 },
        { name: "60-80", value: 1 },
        { name: "80-100", value: 3 },
        { name: "100", value: 60 },
        */
      ],
      totalScore: [
        /*
        { value: 2, name: "不合格" },
        { value: 1, name: "合格" },
        { value: 1, name: "中" },
        { value: 15, name: "良好" },
        { value: 10, name: "优秀" },
        */
      ],
      myChart: null,

      option: {
        title: [
          {
            text: "班级成绩分析",
            left: "center",
          },
          {
            subtext: "考勤分数",
            left: "23%",
            top: "80%",
            textAlign: "center",
          },
          {
            subtext: "绩点分布",
            left: "75%",
            top: "80%",
            textAlign: "center",
          },
        ],
        color: [
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
          "#fc8452",
        ],
        series: [
          {
            name: "考勤",
            type: "pie",
            radius: "60%",
            data: [],

            label: {
              position: "outer",
              alignTo: "none",
              bleedMargin: 5,
            },
            left: 0,
            right: "50%",
            top: 0,
            bottom: 0,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
          {
            name: "绩点",
            type: "pie",
            radius: "60%",
            data: [],
            label: {
              position: "outer",
              alignTo: "none",
              bleedMargin: 5,
            },
            left: "50%",
            right: 0,
            top: 0,
            bottom: 0,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  created() {
    this.getAttendance(this.course_id);
    this.getTatol(this.course_id);
  },
  watch: {
    course_id: {
      handler(newc) {
        this.getAttendance(newc);
        this.getTatol(newc);

        setTimeout(() => {
          if (this.myChart) {
            this.option.series[0].data = this.attendanceScore;
            this.option.series[1].data = this.totalScore;
            console.log("currentCourse2:", newc);

            console.log("555:", this.attendanceScore);

            console.log("666:", this.totalScore);
            this.myChart.setOption(this.option);
          } else {
            this.myChart = echarts.init(document.getElementById("attendance"));
            this.myChart.setOption(this.option);
          }
        }, 600);
      },
      immediate: false,
    },
  },
  mounted() {
    setTimeout(() => {
      this.option.series[0].data = this.attendanceScore;
      this.option.series[1].data = this.totalScore;
      // 1. 基于准备好的dom，初始化echarts实例

      this.myChart = echarts.init(document.getElementById("attendance"));
      //this.myChart= echarts.init(document.getElementById("attendance")),
      console.log("currentCourse1:", this.course_id);

      console.log("init1:", this.option.series[0].data);

      console.log("init2:", this.option.series[1].data);
      // 3. 使用刚指定的配置项和数据，显示图表
      this.myChart.setOption(this.option);
    }, 1000);
  },

  methods: {
    getAttendance(course_id) {
      this.axios
        .get("http://139.196.181.186:8000/api/getAttendanceScore", {
          params: { courseid: course_id },
        })
        .then((res) => {
          console.log(res.data);
          this.attendanceScore = res.data;
          console.log("id:", course_id, "attendance", res.data);
        });
    },
    getTatol(course_id) {
      this.axios
        .get("http://139.196.181.186:8000/api/getTotalScore", {
          params: { courseid: course_id },
        })
        .then((res) => {
          console.log(res.data);
          this.totalScore = res.data;
          console.log("id:", course_id, "total", res.data);
        });
    },
  },
};
</script>

<style scoped>
</style>