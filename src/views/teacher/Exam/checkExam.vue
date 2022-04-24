<template>
  <el-table :data="examList">
    <el-table-column prop="title" label="名称" width="170"> </el-table-column>
    <el-table-column prop="start_time" label="起始时间" width="180">
    </el-table-column>
    <el-table-column prop="end_time" label="截止时间" width="180" sortable>
    </el-table-column>
    <el-table-column width="80" prop="status" label="状态" sortable>
      <template #default="scope">
        <el-tag :key="scope.row.status" :type="scope.row.type" effect="plain">
          {{ scope.row.status }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "checkExam",
  data() {
    return {
      examList: [],
      course_id: "",
      courseName: "",
      dialogVisible: false,
      edit_start_time: null,
      edit_end_time: null,
      edit_exam_id: null,
      stu_list: [],
      addSuccess: false,
    };
  },
  methods: {
    getParams: function () {
      this.course_id = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "course_id"
      ];
    },


    lookExam(row) {
      this.$router.push({
        path: "/teacherHome/concreteCourse/exam",
        query: {
          info: this.$Base64.encode(
            JSON.stringify({ exam_id: row.exam_id, course_id: this.course_id })
          ),
        },
      });
    },

  },
  mounted() {
    this.getParams();

  },
};
</script>

<style scoped>
.el-button--primary {
  color: white;
}
</style>
