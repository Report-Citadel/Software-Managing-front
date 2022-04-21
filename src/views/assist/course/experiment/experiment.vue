<template>
  <div>
    <div
      style="margin: auto auto; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15)"
    >
      <el-descriptions
        direction="vertical"
        :column="1"
        border
        size="medium"
        title="实验信息"
      >
        <template slot="extra">
          <el-row :gutter="20">
            <el-col :span="7"><v-btn dark @click="back">返回</v-btn></el-col>
          </el-row>
        </template>
        <el-descriptions-item label="实验名称">{{
          ex_info.title
        }}</el-descriptions-item>
        <el-descriptions-item label="截止日期">{{
          ex_info.end_time
        }}</el-descriptions-item>
        <el-descriptions-item label="实验权重" :span="2">{{
          ex_info.weight
        }}</el-descriptions-item>

        <el-descriptions-item label="实验简介">{{
          ex_info.brief
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialog: false,
      fileList: [],
      ex_id: "ex_id",
      ex_info: {
        title: "title",
        end_time: "end_time",
        weight: "weight",
        brief: "brief",
      },
    };
  },
  methods: {
    getParams: function () {
      this.ex_id = this.$route.query.info;
    },

    back() {
      this.$router.go(-1);
    },

    handleFile() {
      this.dialogVisible = true;
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
      console.log(this.fileListS);
    },

    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    getExInfo() {},
  },
  mounted() {
    this.getParams();
    this.getExInfo();
  },
};
</script>


<style scoped>
.el-row {
  margin: 20px;
}

.bg-purple {
  background: #385fbb;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin: 5px, 5px, 5px, 5px;
  padding: 5px, 5px, 5px, 5px;
}
</style>

