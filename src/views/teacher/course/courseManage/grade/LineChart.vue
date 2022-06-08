<template>
  <div id="line" style="width: 900px; height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
  props: ["id"],
  data() {
    return {
      c_id: this.id,
      scourse_id: 48001978,
      mychart1: null,
      course_id: [],
      courses: "",
      xlabel: [],
      courseGrade: [],
      option1: {
        title: {
          text: "班级成绩对比",
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: [],
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            // prettier-ignore
            data:[],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [],
      },
    };
  },

  created() {},
  mounted() {
    /* this.axios.get("").then((res) => {
      this.courses = res.data;
      for (let i = 0; i < this.courses.length; i++) {
        this.course_id[i] = this.courses[i].courseid;
        console.log("sgdfkuaqcsbkjnm", this.course_id[i]);
        this.getAllScores(this.course_id[i]);
      }
    });*/
    this.course_id.push(this.scourse_id);
    setTimeout(() => {
      for (let j = 0; j < this.courseGrade[0].data.length; j++) {
        this.xlabel.push(this.courseGrade[0].data[j].name);
      }
      this.option1.xAxis[0].data = this.xlabel;

      for (let i = 0; i < this.courseGrade.length; i++) {
        console.log("!!1111", this.courseGrade);
        this.option1.series.push({
          name: this.course_id[i],
          type: "bar",
          label: { show: true, position: "inside" },
          data: this.courseGrade[i].data,
        });
      }
      // 1. 基于准备好的dom，初始化echarts实例
      var mychart1 = echarts.init(document.getElementById("line"));

      // 3. 使用刚指定的配置项和数据，显示图表
      mychart1.setOption(this.option1);
    }, 1000);
    /* 
        this.option1.legend.data=this.course_id
        for(let i=0;i<this.courses.length;i++){
            this.getAllScores(this.courses[i].courseid,i)

           
        }
        console.log(this.courseGrade[0].data.length)
        for(let j=0;j<this.courseGrade[0].data.length;j++){
            this.xlabel.push(this.courseGrade[0].data[j].name)
            console.log("j",this.xlabel)
        }
        this.option1.xAxis[0].data=this.xlabel
        console.log( this.option1.xAxis[0].data)
        for(let i=0;i<this.course_id.length;i++){
            this.option1.series.push({
                name:this.course_id[i],
                type:'bar',
                label:{show:true,position:'inside'},
                data:this.courseGrade[i].data,
            })
        }
        */
  },
  methods: {
    getAllScores(courseId) {
      this.axios
        .get("/yxk/getAvgExperimentScore", {
          params: { courseId: courseId },
        })
        .then((res) => {
          this.courseGrade.push({
            data: res.data,
          });
          console.log("wfytdysgvdukbhiljfsk");
        });
    },
  },
};
</script>

<style scoped>
</style>