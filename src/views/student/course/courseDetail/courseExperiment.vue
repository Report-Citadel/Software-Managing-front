
<template>
  <div>
    <el-card>
      <el-table
        ref="filterTable"
        row-key="deadline"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="experiment_title" label="实验名称">
          <template slot-scope="scope"
            ><el-link @click="goToExcise(scope.row)">{{
              scope.row.experiment_title
            }}</el-link>
          </template></el-table-column
        >
        <el-table-column prop="end_time" label="截止日期" sortable />
        <el-table-column prop="status" label="实验状态" sortable />
        <el-table-column prop="score" label="成绩" sortable />
        <el-table-column prop="is_submit" label="提交状态" sortable>
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.is_submit === true"
              key="已提交"
              type="success"
              effect="plain"
            >
              已提交
            </el-tag>

            <el-tag
              v-if="scope.row.is_submit === false"
              key="未提交"
              type="danger"
              effect="plain"
            >
              未提交
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="120%">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="goToExcise(scope.row)"
              >模拟</el-button
            >
            <el-button
              size="small"
              @click="fillEx(scope.row)"
              v-if="scope.row.ex_id != 4"
              >在线填写</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total,  prev, pager, next, jumper"
        :total="tableData.length"
        filterState
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script >
export default {
  data() {
    return {
      sid: "",
      class_id: "",
      course_name: "",
      ex_id: "",
      currentPage: 1,
      pagesize: 9,
      tableData: [
        {
          ex_id: 1,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "敏感性分析",
          is_submit: false,
          status: "未过期",
          score: null,
        },
        {
          ex_id: 2,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "不确定性分析",
          is_submit: false,
          status: "未过期",
          score: null,
        },
        {
          ex_id: 3,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "供需分析",
          is_submit: false,
          status: "未过期",
          score: 98,
        },
        {
          ex_id: 4,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "盈亏平衡",
          is_submit: false,
          status: "未过期",
          score: 98,
        },
        {
          ex_id: 5,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "项目经济指标测算",
          is_submit: false,
          status: "未过期",
          score: 98,
        },
        {
          ex_id: 6,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "经济寿命周期",
          is_submit: false,
          status: "未过期",
          score: 98,
        },
        {
          ex_id: 7,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "对抗练习",
          is_submit: false,
          status: "未过期",
          score: 98,
        },
        {
          ex_id: 8,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "软件成本估算",
          is_submit: false,
          status: "未过期",
          score: 98,
        },
        {
          ex_id: 9,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "多人博弈",
          is_submit: false,
          status: "未过期",
          score: 98,
        },
      ],
      fileList: [],
      fileDialog: false,
    };
  },
  methods: {
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    // eslint-disable-next-line no-unused-vars
    goToOnline(ex_id, end_time) {},
    handlePreview(file) {
      console.log(file);
    },

    handleRemove(file) {
      this.fileList.pop(file);
    },

    handleChange(file) {
      this.fileList.push(file);
    },

    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleExamine() {
      this.$router.push({
        path: "/studentHome/concreteCourse/FillExper",
        query: { sid: this.sid },
      });
    },

    fillEx(row) {
      switch (row.ex_id) {
        case 1:
          this.$router.push({
            path: "/studentHome/concreteCourse/FillSimulater",
            query: {
              id: row.ex_id,
              title: row.experiment_title,
            },
          });
          break;
        case 4:
          this.$router.push({
            path: "/studentHome/concreteCourse/BalanceCost",
            query: {
              id: row.ex_id,
              title: row.experiment_title,
            },
          });
          break;
        default:
          this.$router.push({
            path: "/studentHome/concreteCourse/FillExper",
            query: {
              id: row.ex_id,
              title: row.experiment_title,
            },
          });
      }
    },
    goToExcise(row) {
      switch (row.ex_id) {
        case 3:
          this.$router.push({
            path: "/studentHome/concreteCourse/DemandSupply",
            query: {
              id: row.ex_id,
              title: row.experiment_title,
            },
          });
          break;
        case 4:
          this.$router.push({
            path: "/studentHome/concreteCourse/cyh",
            query: {
              id: row.ex_id,
              title: row.experiment_title,
            },
          });
          break;
        case 6:
          this.$router.push({
            path: "/studentHome/concreteCourse/EconomicLife",
            query: {
              id: row.ex_id,
              title: row.experiment_title,
            },
          });
          break;
        default:
          console.log("goToExcise", row);
      }
    },
    getParams: function () {
      this.class_id = this.$route.query.class_id;
      this.course_name = this.$route.query.course_name;
      this.sid = sessionStorage.getItem("id");
    },
  },
  mounted() {
    this.getParams();
  },
};
</script>

<style >
.el-button--primary {
  color: white;
}
.el-button--success {
  color: white;
}
</style>
