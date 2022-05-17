<template>
  <div>
    <div
      style="
        margin-bottom: 5px;
        text-align: left;
        font-size: 30px;
        font-weight: bold;
      "
    >
      {{ course_id }} {{ course_name }}
    </div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="查看成绩" name="check"
          ><ShowGrade ref="showNotice"></ShowGrade
        ></el-tab-pane>
        <el-tab-pane label="数据分析" name="analyse"
          ><AnalyzeGrade></AnalyzeGrade
        ></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ShowGrade from "./ShowList.vue";
import AnalyzeGrade from "./GradeManagement.vue";
export default {
  components: {
    ShowGrade,
    AnalyzeGrade,
  },
  data() {
    return {
      activeName: "show",
      course_id: "",
      course_name: "",
    };
  },
  methods: {
    getParams: function () {
      this.course_id = this.$route.query.id;
      this.course_name = this.$route.query.name;
    },
  },
  created() {
    this.getParams();
  },
};
</script>