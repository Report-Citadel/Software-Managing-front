<template>
  <div>
    <div id="title">
      <el-button @click="back" type="success" class="leftButton">上一步</el-button>
      <span>上传文件</span>
      <el-button @click="next" type="success" class="rightButton">完成实验</el-button>
    </div>
    <el-card id = "curve">
      <div class="py-12"></div>
      <el-upload
        class="upload-demo"
        ref="upload"
        drag
        action="url"
        :auto-upload="false"
        :file-list="fileList"
        :on-success="handleSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
        <div class="el-upload__tip" slot="tip">只能上传pdf/doc/docx文件</div>
      </el-upload>
      <el-button @click="submit" type="primary" style="display:block;margin:10px auto;">上传</el-button>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "UploadFile",
  data() {
    return {
      EData: [],
      fileList: [],
    };
  },
  methods: {
        next() {
            this.$router.push("/");
        },
        back() {
          this.$emit("backStep")
        },
        submit() {
            this.$refs.upload.submit();
            console.log("上传");
        },
        handleSuccess() {
            alert("上传成功！")
            console.log("sccg")
        }
  },
  mounted() {
      sessionStorage.setItem("step",3);
  }
};
</script>

<style scoped>
.leftButton {
    margin-top: 10px;
    margin-left: 10%;
    float: left;
}

.rightButton {
    margin-top: 10px;
    margin-right: 10%;
    float: right;
}

#curve {
    height: calc(100vh - 180px);
    width: 80%;
    margin: 10px auto;
}
#title {
    text-align: center;
    font-size: 200%; 
}
.upload-demo {
    width: 360px;
    margin-left: calc(50% - 180px);
}
</style>