<template>
  <el-tabs v-model="activeName">
<!-- 批改学生成绩 -->
      <el-table
        :data="
          scoreData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <el-table-column sortable prop="name" label="姓名" sorted />
        <el-table-column sortable prop="id" label="学号" />
        <!-- 自定义列的遍历-->

      </el-table>

  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      c_id: "",
      scoreDialog: false,
      score: "",
      s_id: "",
      ex_id: "",

    };
  },
  methods: {
    getParams: function () {
      this.id = sessionStorage.getItem("id");
      this.c_id = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "class_id"
      ];
      console.log("cid", this.c_id);
    },
  },
  mounted() {
    this.getParams();
  },
};
</script>

<style scoped>
.el-button--primary {
  color: white;
}
</style>
