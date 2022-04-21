<template>
  <div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.filename.toLowerCase().includes(search.toLowerCase()) ||
            data.date.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column prop="filename" label="文件名" sortable />
      <el-table-column prop="date" label="上传时间" sortable />

      <el-table-column>
        <template #header>
          <el-input v-model="search" />
        </template>
        <template #default="scope">
          <el-button size="mini" @click="handleCheck(scope.row)"
            >查看</el-button
          >
          <el-button size="mini" type="primary" @click="handleDown(scope.row)"
            >下载</el-button
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
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      currentPage: 1,
      pagesize: 6,
      dialog: false,
      class_id: 12,
      tableData: [
        {
          filename:"课本教材实例",
          date:"2021-12-12 12:30:21"
        },
        {
          filename:"实验报告案例",
          date:"2021-12-12 12:30:21"
        }
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
    handleCheck() {

    },
    handleDown() {

    },
    getFileList() {

    },
    getParams: function () {

    },
  },
  mounted() {

  },
};
</script>

<style scoped>
.el-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 100%;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
}
</style>
