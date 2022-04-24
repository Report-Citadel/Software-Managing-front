<template>
  <div>


    <el-table :data="studentData" style="width: 100%">
      <el-table-column prop="s_id" label="学号" sortable />
      <el-table-column prop="name" label="姓名" sortable />
    </el-table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      c_id: "",

    };
  },
  methods: {
    getParams: function () {
      this.c_id = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "class_id"
      ];
    },
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
