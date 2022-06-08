<template>
  <div>
    <el-button type="primary">添加学生</el-button>
    <el-table :data="studentData" style="width: 100%">
      <el-table-column prop="s_id" label="学号" sortable />
      <el-table-column prop="name" label="姓名" sortable />
      <el-table-column prop="role" label="身份" sortable />

    </el-table>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      c_id: "",

    };
  },
  methods: {
    getParams: function () {
      this.c_id = this.$route.query.id
    },
    async getPeople(){
      await axios({
        method: "get",
        baseURL:'http://139.196.114.7:8082',
        url: "/user/getstudentbyclassid",
        params: {class_id:this.c_id}
      }).then(res=>{
        console.log(res)
      })
    },
  },
  mounted() {
    this.getParams()
    this.getPeople()
  }

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
