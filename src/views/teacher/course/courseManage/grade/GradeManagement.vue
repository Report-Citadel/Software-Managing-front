<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 30px">
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
            <!--
            <PieChart v-bind:course_id="course_id"></PieChart>-->
          </el-card>
          <el-card style="height: 40vh">
            <!--
            <LineChart></LineChart>-->
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
                v-model="gradeForm.attendanceNum"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="考勤占比"
              :label-width="formLabelWidth"
              prop="attendancePropotion"
            >
              <el-input
                v-model="gradeForm.attendanceProportion"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="实验总数"
              :label-width="formLabelWidth"
              prop="projectNum"
            >
              <el-input
                v-model="gradeForm.projectNum"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="实验占比"
              :label-width="formLabelWidth"
              prop="projectPropotion"
            >
              <el-input
                v-model="gradeForm.projectProportion"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="对抗占比"
              :label-width="formLabelWidth"
              prop="competitionPropotion"
            >
              <el-input
                v-model="gradeForm.competitionProportion"
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
//import PieChart from "./PieChart.vue";

//import LineChart from "./LineChart.vue";

export default {
  name: "GradeManagement",
  props: ["id"],
  components: {
    //PieChart,
    //LineChart,
  },
  data() {
    return {
      c_id: this.id,
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
    console.log("cid", this.c_id);
    this.chooseCourse();
  },
  methods: {
    getsettings() {
      this.axios.get("/yxk/getGradeSettings").then((res) => {
        //console.log("getsettings", res);
        this.gradeForm = res.data;
        console.log("getsettings", this.gradeForm);
      });
    },
    updateGradeSettings() {
      console.log("当前form:");
      console.log(this.gradeForm);

      this.axios
        .post("/yxk/updateGradeSettings", {
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
          // console.log("/yxk/getAvgTotal", res);
          this.current_average = res.data;
        });
      this.axios
        .get("/yxk/getAvgAttendance", {
          params: { courseId: this.c_id },
        })
        .then((res) => {
          // console.log("/yxk/getAvgAttendance", res);
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
