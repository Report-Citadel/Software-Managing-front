<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="查看成绩" name="check"
          ><ShowGrade :id="c_id" ref="showNotice"></ShowGrade
        ></el-tab-pane>
        <el-tab-pane label="数据分析" name="analyse"
          ><AnalyzeGrade :id="c_id"></AnalyzeGrade
        ></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ShowGrade from "../courseManage/grade/ShowList.vue";
import AnalyzeGrade from "../courseManage/grade/GradeManagement.vue";
export default {
  components: {
    ShowGrade,
    AnalyzeGrade,
  },
  data() {
    return {
      activeName: "show",
      c_id: "",
    };
  },
  methods: {
    getParams: function () {
      this.c_id = this.$route.query.id;
      console.log("cid", this.c_id);
    },
  },
  created() {
    this.getParams();
  },
};
</script>