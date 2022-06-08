<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 30px">
      <el-col class="班级学生数" :span="6">
        <el-card class="small_card"
          ><a>班级学生数：</a>{{ student_total }}
        </el-card>
      </el-col>
      <el-col class="当前平均分" :span="6">
        <el-card> <a>当前平均分：</a>{{ current_average }} </el-card>
      </el-col>
      <el-col class="考勤平均分" :span="6">
        <el-card> <a>考勤平均分：</a>{{ attendance_average }} </el-card>
      </el-col>
    </el-row>
    <el-row class="tableContainer">
      <div style="paddind: 5%">
        <div>
          <el-row style="height: 500px">
            <People :id="c_id"></People>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import People from "./People.vue";
export default {
  props: ["id"],
  components: {
    People,
  },
  data() {
    return {
      c_id: this.id,
      student_total: "",
      current_average: "",
      attendance_average: "",
      course_id: "",
      courses: [],
    };
  },
  mounted() {
    this.chooseCourse();
  },
  methods: {
    chooseCourse() {
      this.axios
        .get("/yxk/getStudentNum", {
          params: { courseId: this.c_id },
        })
        .then((res) => {
          //console.log("/yxk/getStudentNum", res);
          this.student_total = res.data;
        });
      this.axios
        .get("/yxk/getAvgTotal", {
          params: { courseId: this.c_id },
        })
        .then((res) => {
          //console.log("/yxk/getAvgTotal", res);
          this.current_average = res.data;
        });
      this.axios
        .get("/yxk/getAvgAttendance", {
          params: { courseId: this.c_id },
        })
        .then((res) => {
          ///console.log("/yxk/getAvgAttendance", res);
          this.attendance_average = res.data;
        });
    },
  },
};
</script>

<style>
a {
  color: grey;
  font-size: 14px;
}
</style>