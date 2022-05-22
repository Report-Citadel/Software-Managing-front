
<template>
  <div>
    <el-card>
      <el-table
        ref="filterTable"
        row-key="deadline"
        :data="
          experimentList
            .filter(
              (data) =>
                !search ||
                data.experiment_title
                  .toLowerCase()
                  .includes(search.toLowerCase())
            )
            .slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <el-table-column prop="experiment_title" label="实验名称" sortable />
        <el-table-column prop="end_time" label="截止日期" sortable />
        <el-table-column
          prop="status"
          label="状态"
          sortable
          :filters="[
            { text: '未过期', value: '未过期' },
            { text: '已过期', value: '已过期' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '未过期' ? 'primary' : 'success'"
              disable-transitions
              >{{ scope.row.status }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="权重" sortable />

        <el-table-column>
          <template #header>
            <el-input v-model="search" placeholder="请输入实验名称" />
          </template>
          <template #default="scope">
            <v-row>
              <v-col cols="3">
                <v-btn small dark @click="handleGrade(scope.row)"
                  >查看学生报告</v-btn
                >
              </v-col>
            </v-row>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total,  prev, pager, next, jumper"
        :total="experimentList.length"
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
      c_id: "",
      dialogVisible: false,
      search: "",
      currentPage: 1,
      pagesize: 9,
      fileList: [],
      experimentList: [
        {
          ex_id: 1,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "敏感性分析",
          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 2,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "不确定性分析",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 3,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "供需分析",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 4,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "盈亏平衡",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 5,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "项目经济指标测算",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 6,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "经济寿命周期",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 7,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "对抗练习",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 8,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "软件成本估算",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 9,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "多人博弈",

          status: "未过期",
          weight: "0.3",
        },
      ],
    };
  },
  methods: {
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.status === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    handlePreview(file) {
      console.log(file);
    },

    handleRemove(file, fileListS) {
      console.log(file, fileListS);
    },

    handleChange(file) {
      console.log(file);
      this.fileListS.push(file);
      console.log(this.fileListS);
    },

    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleGrade(row) {
      this.$router.push({
        path: "/teacherHome/concreteCourse/stuExperList",
        query: {
          ex_id: row.ex_id,
          ex_type: row.ex_type,
        },
      });
    },

    handleFile() {
      this.dialogVisible = true;
    },

    getCourseEx() {},
    getParams: function () {
      this.c_id = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "class_id"
      ];
      console.log("cid===" + this.c_id);
    },
  },
  mounted() {
    this.getParams();
    this.getCourseEx();
  },
};
</script>
