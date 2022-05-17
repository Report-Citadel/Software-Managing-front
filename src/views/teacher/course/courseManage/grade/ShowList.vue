<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 30px">
      <el-col class="选择班级" :span="6">
        <el-card class="small_card" style="height: 62px">
          <a>选择班级：</a>
          <el-select
            v-model="course_id"
            placeholder="请选择班级"
            size="small"
            @change="chooseCourse"
            style="width: 60%"
          >
            <el-option
              v-for="course in courses"
              :key="course.courseid"
              :label="course.time"
              :value="course.courseid"
            >
            </el-option>
          </el-select>
        </el-card>
      </el-col>
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
            <people v-bind:courseId="course_id"></people>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import People from "./People.vue";
export default {
  components: {
    People,
  },
  data() {
    return {
      student_total: "",
      current_average: "",
      attendance_average: "",
      course_id: "",
      courses: [],
    };
  },
  created() {
    this.axios.get("http://139.196.181.186:8000/api/getCourse").then((res) => {
      this.courses = res.data;
      this.course_id = this.courses[0].courseid;
      console.log(res.data);
      this.chooseCourse(this.courses[0].courseid);
    });
  },
  methods: {
    chooseCourse(value) {
      this.course_id = value;
      this.axios
        .get("http://139.196.181.186:8000/api/getStudentNum", {
          params: { courseId: value },
        })
        .then((res) => {
          this.student_total = res.data;
        });
      this.axios
        .get("http://139.196.181.186:8000/api/getAvgTotal", {
          params: { courseId: value },
        })
        .then((res) => {
          this.current_average = res.data;
        });
      this.axios
        .get("http://139.196.181.186:8000/api/getAvgAttendance", {
          params: { courseId: value },
        })
        .then((res) => {
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