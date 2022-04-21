<template>
  <div>
    <v-btn dark @click="handleUpload">上传文件</v-btn>
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
        <template >
          <v-row>
            <v-col cols="3">
              <v-btn dark small color="pink" 
                >查看</v-btn
              >
            </v-col>
            <v-col cols="3">
              <v-btn dark small color="indigo" 
                >下载</v-btn
              ></v-col
            >
            <v-col cols="3">
              <v-btn dark small
                >删除</v-btn
              ></v-col
            ></v-row
          >
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

    <el-dialog :visible.sync="fileDialog" title="请选择文件" center>
      <el-upload
        class="upload-import"
        ref="uploadImport"
        action="https://baidu.com/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :before-remove="beforeRemove"
        :file-list="fileList"
        :multiple="true"
        :auto-upload="false"
        accept=""
      >
        <el-button type="primary">选取文件</el-button>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fileDialog = false">取消</el-button>
        <el-button type="success" @click="uploadFile()">上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      currentPage: 1,
      pagesize: 6,
      fileDialog: false,
      c_id: "",

      fileData: [],
      fileList: [],
    };
  },
  methods: {
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
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

    handleUpload() {
      this.fileDialog = true;
    },

    getParams: function () {
      this.c_id = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "class_id"
      ];
      console.log("cid===" + this.c_id);
    },
  },
  mounted() {
    this.getParams();
    // this.getFileList();
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
.el-button--primary {
  color: white;
}
.el-button--success {
  color: white;
}
</style>
