<template>
  <div>
    <el-table
      ref="filterTable"
      row-key="id"
      :data="
        fileData.filter(
          (data) =>
            !search ||
            data.title.toLowerCase().includes(search.toLowerCase()) ||
            data.upload.toLowerCase().includes(search.toLowerCase()) ||
            data.modify.toLowerCase().includes(search.toLowerCase()) ||
            data.author.toLowerCase().includes(search.toLowerCase())
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
          <v-row>
            <v-col cols="3">
              <v-btn dark small color="pink" @click="handleCheck(scope.row)"
                >查看</v-btn
              >
            </v-col>
            <v-col cols="3">
              <v-btn dark small color="indigo" @click="handleDown(scope.row)"
                >下载</v-btn
              ></v-col
            >
          </v-row>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="fileData.length"
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

      c_id: "42034501",

      fileData: [
        {
          id: 1,
          filename: "filename",
          date: "2022-01-01 00:00:00",
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

    handleCheck() {},
    handleDown() {},

    getFileList() {},
    getParams: function () {
      this.c_id = this.$route.query.info.class_id;
    },
  },
  mounted() {
    this.getParams();
    this.getFileList();
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
