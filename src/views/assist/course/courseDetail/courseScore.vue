<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="批改实验" name="first">
      <el-table
        :data="
          scoreData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <el-table-column sortable prop="name" label="姓名" sorted />
        <el-table-column sortable prop="id" label="学号" />
        <!-- 自定义列的遍历-->
        <el-table-column
          v-for="item in headers"
          :property="item.key"
          :key="item.key"
          :label="item.label"
          sortable
        >
          <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="
                handleScore(
                  scope.row[scope.column.property],
                  scope.row.id,
                  scope.column.property
                )
              "
              >{{ scope.row[scope.column.property] }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :visible.sync="scoreDialog"
        title="请输入学生成绩"
        center
        width="300px"
      >
        <el-input v-model="score"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="scoreDialog = false">取消</el-button>
          <el-button type="primary" @click="setScore()">确定</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="查看报告" name="second">
      <el-table
        :data="
          scoreData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <el-table-column sortable prop="name" label="姓名" sorted />
        <el-table-column sortable prop="id" label="学号" />
        <!-- 自定义列的遍历-->
        <el-table-column
          v-for="item in headers"
          :property="item.key"
          :key="item.key"
          :label="item.label"
          sortable
        >
          <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="toReportOnline(scope)"
              v-if="item.type == '在线提交'"
              >查看</el-button
            >
            <el-button
              type="text"
              @click="checkReport(scope)"
              v-if="item.type == '提交文件'"
              >查看</el-button
            >
            <el-button
              type="text"
              @click="downReport(scope)"
              v-if="item.type == '提交文件'"
              >下载</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      id: 1,
      c_id: "42034501",
      scoreDialog: false,
      score: "",
      s_id: "",
      ex_id: "",

      activeName: "first",
      currentPage: 1,
      pagesize: 10,
      scoreData: [
        {
          id: 1,
          name: "name",
          ex_1: "100",
          ex_2: "200",
          ex_3: "300",
        },
      ],
      headers: [
        {
          key: "ex_1",
          label: "实验1",
          type: "在线提交",
        },
        {
          key: "ex_2",
          label: "实验2",
          type: "提交文件",
        },
        {
          key: "ex_3",
          label: "实验3",
          type: "提交文件",
        },
      ],
    };
  },
  methods: {
    getParams: function () {
      this.id = sessionStorage.getItem("id");
      this.c_id = this.$route.query.info.class_id;
    },
    handleScore(score, sid, ex_id) {
      console.log("handleScore", score, sid, ex_id);
      this.scoreDialog = true;
      this.score = score;
      this.s_id = sid;
      this.ex_id = ex_id.substring(ex_id.indexOf("_") + 1);
    },
    getScoreData() {},
    setScore() {
      if (this.score > 100 || this.score < 0) {
        this.$message.warning("分数必须在0-100之间！");
        return;
      }
    },
    toReportOnline(row) {
      const { href } = this.$router.resolve({
        path: "/assistHome/concreteCourse/stuExperOnline",
        query: {
          s_id: row.row.id,
          ex_id: row.column.property.replace("ex_", ""),
          score: row.row[row.column.property],
        },
      });
      window.open(href, "_blank");
    },
    checkReport() {},
    downReport() {},
  },
  mounted() {
    this.getParams();
    this.getScoreData();
  },
};
</script>

<style scoped>
.el-button--primary {
  color: white;
}
</style>
