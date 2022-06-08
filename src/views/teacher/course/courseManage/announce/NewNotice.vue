<template>
  <div style="height: 100%; margin: auto; width: 70%; text-align: center">
    <br />
    <br />
    <div class="notice">
      <el-form
        ref="notice"
        :rules="rules"
        hide-required-asterisk
        :model="notice"
        label-width="80px"
      >
        <el-form-item label="公告名称" name="title" prop="title">
          <el-input
            v-model="notice.title"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="公告内容" name="content" prop="content">
          <el-input
            type="textarea"
            :rows="23"
            v-model="notice.content"
            maxlength="5000"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            @click="onSubmit('notice')"
            style="width: 30%"
            >立即发布</el-button
          >
          <el-button @click="resetForm('notice')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//import showNotice from "./ShowNotice.vue";
export default {
  props: ["id"],
  data() {
    return {
      c_id: this.id,
      notice: {
        title: "",
        content: "",
      },
      date: new Date(),
      i: "",
      noticeInformation: {
        content: "",
        title: "",
        date: "",
        courseId: "",
        publisherId: "",
      },
      list: [],
      rules: {
        title: [{ required: true, message: "请输入公告标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    console.log("cid++++++++++++", this.c_id);
  },
  methods: {
    onSubmit(noticeForm) {
      this.$refs[noticeForm].validate((valid) => {
        if (valid) {
          this.$confirm("确认发布?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }).then(() => {
            this.noticeInformation.title = this.notice.title;
            this.noticeInformation.content = this.notice.content;
            this.noticeInformation.date = this.date;
            this.noticeInformation.publisherId = parseInt(
              sessionStorage.getItem("id")
            );
            this.noticeInformation.courseId = this.c_id;

            console.log("this.noticeInformation", this.noticeInformation);
            this.list.push(this.noticeInformation);
            this.axios
              .post("/yxk/newNotice", this.list)
              .then((res) => {
                console.log("onSubmit", res);
                this.$message({
                  type: "success",
                  message: "发布成功!",
                });
                this.$refs[noticeForm].resetFields();
                //this.list.splice(0, this.list.length);
              })
              .catch((res) => {
                console.log(res);
                this.$message("发布失败 请检查网络后重试");
              });
          });
        }
      });
    },
    resetForm(notice) {
      this.$confirm("公告未发布 确认清空?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$refs[notice].resetFields();
          this.$message({
            message: "已重置",
          });
        })
        .catch(() => {});
    },
  },
};
</script>