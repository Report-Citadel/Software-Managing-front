
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
                data.title.toLowerCase().includes(search.toLowerCase())
            )
            .slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <el-table-column prop="title" label="实验名称" sortable />
        <el-table-column prop="end_time" label="发布日期" sortable />
        <el-table-column
          prop="ex_type"
          label="提交方式"
          sortable
          :filters="[
            { text: '在线提交', value: '在线提交' },
            { text: '提交文件', value: '提交文件' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.ex_type === '在线提交' ? 'primary' : 'success'"
              disable-transitions
              >{{ scope.row.ex_type }}</el-tag
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
              <v-col cols="4">
                <v-btn small dark @click="handleCheck(scope.row)">查看</v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn small dark @click="handleGrade(scope.row)">批改</v-btn>
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
      pagesize: 6,
      fileList: [],
      experimentList: [
        {
          title: "第一次试验",
          end_time: "2021-2-2",
          ex_type: "在线提交",
          weight: "0.3",
        },
        {
          title: "第2次试验",
          end_time: "2021-2-3",
          ex_type: "提交文件",
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
      return row.ex_type === value;
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
      //console.log(this.fileListS);
    },

    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleCheck(row) {
      this.$router.push({
        path: "/assistHome/concreteCourse/ConExper",
        query: row.ex_id,
      });
    },

    handleGrade(row) {
      this.$router.push({
        path: "/assistHome/concreteCourse/stuExperList",
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
      this.c_id = this.$route.query.info.class_id;
    },
  },
  mounted() {
    this.getParams();
    this.getCourseEx();
  },
};
</script>
