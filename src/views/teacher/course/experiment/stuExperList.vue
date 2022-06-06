
<template>
  <div>
    <el-card>
      <el-table
        ref="filterTable"
        @selection-change="handleSelectionChange"
        :data="
          stuExData.filter(
            (data) =>
              !search ||
              data.sid.toLowerCase().includes(search.toLowerCase()) ||
              data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column prop="s_id" label="学号" sortable />
        <el-table-column prop="s_name" label="姓名" sortable />
        <el-table-column prop="status" label="是否提交" sortable />
        <el-table-column prop="submitTime" label="提交日期" sortable />
        <el-table-column prop="score" label="分数" sortable />

        <el-table-column>
          <template #header>
            <el-input v-model="search" placeholder="请输入" />
          </template>
          <template #default="scope">
            <v-row>
              <v-col cols="4">
                <v-btn small dark @click="checkExperiment(scope.row)"
                  >查看</v-btn
                >
              </v-col>

              <v-col cols="4">
                <v-btn small dark @click="gradeExperiment(scope.row)"
                  >打分</v-btn
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
        :total="stuExData.length"
        filterState
      >
      </el-pagination>
    </el-card>
    <el-dialog
      :visible.sync="scoreDialog"
      title="学生分数"
      center
      width="300px"
    >
      <el-input v-model="stuScore"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="proDialog = false">取消</el-button>
        <el-button type="primary" @click="giveScoreDown()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script >
export default {
  data() {
    return {
      ex_id: "",
      ex_type: "",
      search: "",
      currentPage: 1,
      scoreDialog: false,
      stuScore: "",
      s_id: "",

      pagesize: 10,
      multipleSelection: [],

      stuExData: [
        {
          s_id: "1",
          s_name: "1",
          status: "是",
          submitTime: "2021.11.1",
          score: "2022",
        },
        {
          s_id: "2",
          s_name: "2",
          status: "是",
          submitTime: "2021.11.1",
          score: "2022",
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    gradeExperiment(row) {
      this.scoreDialog = true;
      this.s_id = row.s_id;
    },
    giveScoreDown() {},

    checkExperiment() {},

    getStuEx() {},
    getParams: function () {
      this.ex_id = this.$route.query.ex_id;
      this.ex_type = this.$route.query.ex_type;
    },
  },
  mounted() {
    this.getParams();
    this.getStuEx();
  },
};
</script>