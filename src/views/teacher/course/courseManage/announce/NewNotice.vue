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
        <el-form-item label="覆盖班级" name="choice" prop="choice">
          <el-checkbox-group
            v-model="notice.choice"
            style="margin: auto; width: 50%"
          >
            <el-checkbox label="01班" name="choice"></el-checkbox>
            <el-checkbox label="02班" name="choice"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
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
  data() {
    return {
      notice: {
        choice: [],
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
        title: [{ required: true, message: "请输入公告信息", trigger: "blur" }],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" },
        ],
        choice: [{ required: true, message: "请选择班级", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit(noticeForm) {
      this.$refs[noticeForm].validate((valid) => {
        if (valid) {
          this.$confirm("确认发布?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }).then(() => {
            for (this.i = 0; this.i < this.notice.choice.length; this.i++) {
              console.log(this.i);
              this.noticeInformation.title = this.notice.title;
              this.noticeInformation.content = this.notice.content;
              this.noticeInformation.date = this.date;
              this.noticeInformation.publisherId = 1953372;
              if (this.notice.choice[this.i] == "01班") {
                this.noticeInformation.courseId = 48001978;
              }
              if (this.notice.choice[this.i] == "02班") {
                this.noticeInformation.courseId = 48001979;
              }
              console.log(this.noticeInformation.courseId);
              this.list.push(this.noticeInformation);
            }
            this.axios
              .post("http://139.196.181.186:8000/api/newNotice", this.list)
              .then((res) => {
                console.log(res);
                this.$message({
                  type: "success",
                  message: "发布成功!",
                });
                this.$refs[noticeForm].resetFields();
                this.list.splice(0, this.list.length);
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