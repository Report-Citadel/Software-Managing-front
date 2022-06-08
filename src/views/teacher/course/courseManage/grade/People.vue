<template>
  <div>
    <!-- 表格 -->
    <el-table
      class="table"
      :data="
        students.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      max-height="75vh"
      style="width: 100%; height: 75vh"
    >
      <el-table-column prop="id" label="学号" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="totalscore" label="总成绩"> </el-table-column>
      <el-table-column prop="attendancescore" label="考勤分数">
      </el-table-column>
      <el-table-column prop="reportscore" label="报告分数"> </el-table-column>
      <el-table-column prop="competitionscore" label="对抗分数">
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block" style="margin-top: 15px">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="students.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "People",
  props: ["courseId"],
  data() {
    return {
      projectId: "",
      students: [],
      currentPage: 1, // 当前页码
      total: 5, // 总条数
      pageSize: 10, // 每页的数据条数
    };
  },
  created() {
    this.getStudents(this.courseId);
  },
  watch: {
    courseId(newv) {
      this.getStudents(newv);
    },
  },
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    getStudents(courseid) {
      this.axios
        .get("/yxk/findByCourseId", {
          params: { courseId: courseid },
        })
        .then((res) => {
          this.students = res.data;
          console.log(this.students);
        });
    },
  },
};
</script>

<style scoped>
.table {
  padding-top: 20px;
  padding-right: 30px;
  padding-bottom: 20px;
  padding-left: 30px;
}
</style>
