<template>
  <div>
    <el-descriptions
      :column="1"
      border
      style="margin-bottom: 10px; margin-top: 10px"
      title="课程信息"
    >
      <el-descriptions-item label="课程id">{{
        course_id
      }}</el-descriptions-item>
      <el-descriptions-item label="课程名称">{{ name }}</el-descriptions-item>
      <el-descriptions-item label="责任教师" :span="2">{{
        id
      }}</el-descriptions-item>
      <el-descriptions-item label="上课时间">
        {{ year }}年 {{ semester }}
      </el-descriptions-item>
      <el-descriptions-item label="各项成绩占比">
        考试： {{ eachScore.exam }}<br />
        实验： {{ eachScore.report }}<br />
        出勤： {{ eachScore.attendance }}
      </el-descriptions-item>
    </el-descriptions>
    <div>
      <v-btn dark @click="handleScore">修改成绩占比</v-btn>
    </div>

    <div>
      <el-dialog
        :visible.sync="scoreDialog"
        title="设置成绩占比（以小数形式）"
        center
        width="50%"
      >
        <v-container>
          <v-text-field
            label="考试"
            auto-grow
            filled
            v-model="eachScore.exam"
            row-height="20"
          ></v-text-field>

          <v-text-field
            label="实验"
            auto-grow
            filled
            v-model="eachScore.report"
            row-height="20"
          ></v-text-field>
          <v-text-field
            label="出勤"
            auto-grow
            filled
            v-model="eachScore.attendance"
            row-height="20"
          ></v-text-field>
        </v-container>

        <div slot="footer" class="dialog-footer">
          <el-button @click="scoreDialog = false">取消</el-button>
          <el-button type="primary" @click="setPercent()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseInfo",
  data() {
    return {
      course_id: "",
      name: "",
      year: "",
      semester: "",
      id: "",
      scoreDialog: false,
      eachScore: {
        exam: 0,
        report: 0,
        attendance: 0,
      },
    };
  },
  methods: {
    getParams: function () {
      this.course_id = JSON.parse(
        this.$Base64.decode(this.$route.query.info)
      ).course_id;
      this.name = JSON.parse(this.$Base64.decode(this.$route.query.info)).name;
      this.year = JSON.parse(this.$Base64.decode(this.$route.query.info)).year;
      this.semester = JSON.parse(
        this.$Base64.decode(this.$route.query.info)
      ).semester;
      this.id = sessionStorage.getItem("id");
      //console.log("test"+JSON.parse(this.$Base64.decode(this.$route.query.info)))
    },

  },
  mounted() {
    this.getParams();
  },
};
</script>

<style scoped>
</style>
