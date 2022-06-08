<template>
  <div>
    <el-table
      :data="
        noticeData.filter(
          (data) =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      height="80vh"
      width="90vh"
    >
      <el-table-column label="公告" prop="title" style="fit: false">
      </el-table-column>
      <!--
      <el-table-column label="班级" prop="courseId"> </el-table-column>-->

      <el-table-column label="时间" sortable prop="date"> </el-table-column>

      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="danger"
            style="color: white"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="''"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <div slot="title" class="header-title">
        <h3 v-show="titleInformation" class="title-titleInformation">
          {{ titleInformation }}
        </h3>
      </div>
      <p style="font-size: 16px; line-height: 1.8">{{ message }}</p>
      <br />
      <p style="font-size: 16px; line-height: 1.8; text-align: right">
        {{ time }}
      </p>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">修改</el-button> -->
        <el-button
          type="primary"
          @click="dialogVisible = false"
          style="color: white"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleInformation: "",
      dialogVisible: false,
      noticeData: [],
      search: "",
      message: "",
      time: "",
    };
  },
  mounted: function () {
    this.getNoticeList();
  },
  methods: {
    handleClose(done) {
      done();
    },
    getNoticeList() {
      this.axios
        .get("/ann/api/getNoticeList", {
          params: { id: sessionStorage.getItem("id") },
        })
        .then((res) => {
          console.log("getNoticeList", res);

          this.noticeData = res.data;
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogVisible = true;
      this.titleInformation = this.noticeData[index].title;
      this.message = this.noticeData[index].content;
      this.time = this.noticeData[index].date;
    },
    handleDelete(index, row) {
      console.log(index, row);
      console.log(this.noticeData[index].title);
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .delete("/ann/api/deleteNotice", {
              data: {
                id: this.noticeData[index].id,
                title: this.noticeData[index].title,
                content: this.noticeData[index].content,
                date: this.noticeData[index].date,
                course_id: this.noticeData[index].courseId,
                publisher_id: this.noticeData[index].publisherId,
              },
            })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            });

          this.$delete(this.noticeData, index);
        })
        .catch(() => {});
    },
  },
};
</script>