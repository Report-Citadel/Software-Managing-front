<template>
  <div>
    <el-table :data="studentData" style="width: 100%">
      <el-table-column prop="s_id" label="学号" sortable />
      <el-table-column prop="name" label="姓名" sortable />
      <el-table-column prop="role" label="身份" sortable />

    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      c_id: "42034501",

      studentData: [
        {
          s_id: 1001,
          name: "name",
        },
      ],

      currentPage: 1,
      pagesize: 6,
    };
  },
  methods: {
    getStuList() {},

    getParams: function () {
      this.c_id = this.$route.query.info.class_id;
    },
  },
  mounted() {
    this.getParams();
    this.getStuList();
  },
};
</script>

<style scoped>
.box-card {
  border-radius: 15px;
  box-shadow: 7px 7px 10px rgba(0, 0, 0, 0.15);
}
.el-card {
  margin-bottom: 20px;
  margin-top: 15px;
}
</style>
