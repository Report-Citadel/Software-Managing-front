<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 30px">
      <el-col class="选择班级" :span="6">
        <el-card class="small_card" style="height: 62px">
          <a>选择班级：</a>
          <el-select
            v-model="value"
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
        <el-card class="small_card">
          <a>班级学生数：</a>{{ student_total }}
        </el-card>
      </el-col>
      <el-col class="当前平均分" :span="6">
        <el-card> <a>当前平均分：</a>{{ current_average }} </el-card>
      </el-col>
      <el-col class="考勤平均分" :span="6">
        <el-card> <a>考勤平均分：</a>{{ attendance_average }} </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row style="margin-bottom: 20px">
          <el-card style="height: 37vh; margin-bottom: 20px">
            <pie-chart v-bind:course_id="course_id"></pie-chart>
          </el-card>
          <el-card style="height: 40vh">
            <line-chart></line-chart>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-card class="gradeForm">
          设置成绩计算规则
          <el-form :model="gradeForm" ref="gradeForm" :rules="rules">
            <br />
            <el-form-item
              label="考勤次数"
              :label-width="formLabelWidth"
              prop="attendanceNum"
            >
              <el-input
                v-model="gradeForm.attendancenum"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="考勤占比"
              :label-width="formLabelWidth"
              prop="attendancePropotion"
            >
              <el-input
                v-model="gradeForm.attendanceproportion"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="实验总数"
              :label-width="formLabelWidth"
              prop="projectNum"
            >
              <el-input
                v-model="gradeForm.projectnum"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="实验占比"
              :label-width="formLabelWidth"
              prop="projectPropotion"
            >
              <el-input
                v-model="gradeForm.projectproportion"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="对抗占比"
              :label-width="formLabelWidth"
              prop="competitionPropotion"
            >
              <el-input
                v-model="gradeForm.competitionproportion"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-button class="submit_button" @click="submit(gradeForm)">
              确定
            </el-button>

            <el-button class="cancel_button" @click="cancel()">
              取消
            </el-button>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from "./PieChart.vue";

import LineChart from "./LineChart.vue";

export default {
  name: "GradeManagement",
  components: {
    PieChart,

    LineChart,
  },
  data() {
    return {
      value: "",
      formLabelWidth: "80px",
      activeName: "second",
      student_total: "",
      current_average: "",
      attendance_average: "",
      course_id: "",
      //courses: "",
      courses: [],
      projects: "[]",
      gradeForm: {
        id: "",
        attendancenum: "",
        attendanceproportion: "",
        projectnum: "",
        projectproportion: "",
        competitionproportion: "",
      },
      rules: {
        attendanceNum: [{ type: "number", message: "必须为整数" }],
        attendancePropotion: [
          {
            type: "number",
            message: "考勤分数所占百分比，请输入0-100间的整数",
          },
          {
            pattern: /^([0-9]|[1-9]\d)$/,
            message: "范围在0-99",
            trigger: "blur",
          },
        ],
        projectNum: [{ type: "number", message: "必须为整数" }],

        projectPropotion: [
          {
            type: "number",
            message: "所有实验总分数所占百分比，请输入0-100间的整数",
          },
          {
            pattern: /^([0-9]|[1-9]\d)$/,
            message: "范围在0-99",
            trigger: "blur",
          },
        ],

        competitionPropotion: [
          {
            type: "number",
            message: "所有实验总分数所占百分比，请输入0-100间的整数",
          },
          {
            pattern: /^([0-9]|[1-9]\d)$/,
            message: "范围在0-99",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getsettings();
    this.axios
      .get("http://139.196.181.186:8000/api/getCourse", {
        params: { instructor: localStorage.getItem("id") },
      })
      .then((res) => {
        this.courses = res.data;
        console.log(res.data);
        this.course_id = this.courses[0].courseid;
        this.chooseCourse(this.course_id);
        this.value = this.courses[0].courseid;
      });
  },
  methods: {
    getsettings() {
      this.axios
        .get("http://139.196.181.186:8000/api/getGradeSettings")
        .then((res) => {
          console.log(res);
          this.gradeForm = res.data;
        });
    },
    updateGradeSettings() {
      console.log("当前form:");
      console.log(this.gradeForm);

      this.axios
        .post("http://139.196.181.186:8000/api/updateGradeSettings", {
          id: this.gradeForm.id,
          attendancenum: this.gradeForm.attendancenum,
          attendanceproportion: this.gradeForm.attendanceproportion,
          projectnum: this.gradeForm.projectnum,
          projectproportion: this.gradeForm.projectproportion,
          competitionproportion: this.gradeForm.competitionproportion,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "设置成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "抱歉，设置失败",
              type: "error",
            });
            this.getsettings();
          }
        });
    },
    submit() {
      console.log("当前form:", this.gradeForm);
      console.log(
        "百分比之和为：",
        parseInt(this.gradeForm.attendanceproportion) +
          parseInt(this.gradeForm.projectproportion) +
          parseInt(this.gradeForm.competitionproportion)
      );
      if (
        parseInt(this.gradeForm.attendanceproportion) +
          parseInt(this.gradeForm.projectproportion) +
          parseInt(this.gradeForm.competitionproportion) !=
        100
      ) {
        this.$message({
          showClose: true,
          message: "各部分占比之和不为一百，请重新填写",
          type: "error",
        });
        this.getsettings();
      } else {
        this.$refs.gradeForm.validate((valid) => {
          if (valid) {
            this.updateGradeSettings();
          } else {
            this.$message({
              showClose: true,
              message: "非法输入，请重新填写成绩设置",
              type: "error",
            });
            this.getsettings();
          }
        });
      }
    },
    cancel() {
      this.getsettings();
    },

    chooseCourse(course_id) {
      this.course_id = course_id;
      this.axios
        .get("http://139.196.181.186:8000/api/getStudentNum", {
          params: { courseId: course_id },
        })
        .then((res) => {
          this.student_total = res.data;
        });
      this.axios
        .get("http://139.196.181.186:8000/api/getAvgTotal", {
          params: { courseId: course_id },
        })
        .then((res) => {
          this.current_average = res.data;
        });
      this.axios
        .get("http://139.196.181.186:8000/api/getAvgAttendance", {
          params: { courseId: course_id },
        })
        .then((res) => {
          this.attendance_average = res.data;
        });
    },
  },
};
</script>

<style scoped>
a {
  color: grey;
  font-size: 14px;
}
</style>
