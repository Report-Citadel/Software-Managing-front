<template>
  <v-container
    style="
      background-color: #eff0f1;
      box-shadow: -5px -5px 10px 5px darkgrey;
      border-radius: 10px;
    "
  >
    <v-row>
      <v-col cols="12" md="6">
        <br />
        <br />

        <h2>实验名称： {{ ex_title }}</h2>

        <br />
        <br />
      </v-col>
    </v-row>
    <br />
    <h3>实验目的</h3>
    <br />
    <quill-editor style="background-color: white" v-model="report_info.goal"></quill-editor>

    <br />
    <br />
    <br />
    <h3>实验设备</h3>
    <br />

    <quill-editor style="background-color: white" v-model="report_info.device"></quill-editor>

    <br />
    <br />
    <br />
    <h3>实验步骤</h3>
    <br />
    <quill-editor style="background-color: white" v-model="report_info.step"></quill-editor>

    <br />
    <br />
    <br />
    <h3>实验过程</h3>
    <br />
    <quill-editor style="background-color: white" v-model="report_info.process"></quill-editor>

    <br />
    <br />
    <br />
    <h3>结果分析</h3>
    <br />
    <quill-editor style="background-color: white" v-model="report_info.result"></quill-editor>
    <br />
    <br />
    <el-row :gutter="10">
      <el-col :span="3" :offset="6"><v-btn dark @click="submit()">提交</v-btn></el-col>
      <el-col :span="3"><v-btn dark @click="cache()">暂存</v-btn></el-col>
      <el-col :span="3"><v-btn dark @click="back">取消</v-btn></el-col>
    </el-row>
    <br />
    <br />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialog: false,
      fileList: [],
      ex_id: "",
      ex_title: "",
      report_info: {},
    };
  },
  methods: {
    getParams: function () {
      // 取到路由带过来的参数
      this.ex_id = this.$Base64.decode(this.$route.query.info);
      this.ex_title = this.$Base64.decode(this.$route.query.title);
    },
    getMyReport() {

    },
    back() {
      this.$router.go(-1);
    },
    cache(){

    },
    submit(){

    }
  },
  mounted() {

  },
};
</script>
