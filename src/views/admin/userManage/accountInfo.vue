<!-- 个人信息页面-->
<template>
  <el-container style="margin-top: 20px">
    <el-main>
      <el-card>
        <el-descriptions title="账户信息" :column="2" border size="medium">
          <template slot="extra">
            <el-button type="primary" size="medium" @click="back">返回</el-button>
            <el-button type="primary" size="medium" @click="modifyAccount()">编辑</el-button>
          </template>
          <el-descriptions-item>
            <template slot="label"> 姓名 </template>
            {{ tableData.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 学号 </template>
            {{ tableData.id }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 邮箱 </template>
            {{ tableData.email }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 身份 </template>
            {{ tableData.identityname }}
          </el-descriptions-item>
          <el-descriptions-item v-if="tableData.identity >= 4">
            <template slot="label"> 年级 </template>
            {{ tableData.grade }}
          </el-descriptions-item>
          <el-descriptions-item v-if="tableData.identity >= 4">
            <template slot="label"> 专业 </template>
            {{ tableData.major }}
          </el-descriptions-item>
          <el-descriptions-item v-if="tableData.identity >= 4">
            <template slot="label"> 班级 </template>
            {{ tableData.class_id }}
          </el-descriptions-item>

          <el-descriptions-item v-if="tableData.identity == 2 || tableData.identity == 3">
            <template slot="label"> 学院 </template>
            {{ tableData.school }}
          </el-descriptions-item>
          <el-descriptions-item v-if="tableData.identity == 2 || tableData.identity == 3">
            <template slot="label"> 职称 </template>
            {{ tableData.title }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-main>
  </el-container>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      id: "",
      gender: "",
      phone_number: "",
      email: "",
      is_active: "",
      department: "",
      major_id: "",
      role: "",
      tableData: null,
    };
  },
  methods: {
    getParams: function () {
      // 取到路由带过来的参数
      //var routerParams = this.$route.query.id;
      // 将数据放在当前组件的数据内

      this.id = JSON.parse(this.$Base64.decode(this.$route.query.info))["id"];
      this.role = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "role"
      ];
      console.log("路有参数" + this.id + this.role);
    },

    getInfo() {
      switch (this.role) {
        case "1":
          axios({
            method: "GET",
            baseURL: '/api',
            url: "/user/getadmininfo",
            params: {
              id: this.id
            }
          }).then((res) => {
            console.log(res.data.data);
            this.tableData = res.data.data;
            this.tableData.identityname = "管理员";
          }).catch((err) => {
            console.log(err);
            this.$message({
              message: "服务器错误",
              type: "error",
            });
          })
          break;
        case "2":
        case "3":
          axios({
            method: "GET",
            baseURL: '/api',
            url: "/user/getteacherinfo",
            params: {
              id: this.id
            }
          }).then((res) => {
            console.log(res.data.data);
            this.tableData = res.data.data;
            if (this.tableData.identity == 2) {
              this.tableData.identityname = "责任教师";
            } else {
              this.tableData.identityname = "普通教师";
            }
          }).catch((err) => {
            console.log(err);
            this.$message({
              message: "服务器错误",
              type: "error",
            });
          })
          break;

        default:
          axios({
            method: "GET",
            baseURL: '/api',
            url: "/user/getstudentinfo",
            params: {
              id: this.id
            }
          }).then((res) => {
            console.log(res.data.data);
            this.tableData = res.data.data;
            if (this.tableData.identity == 4) {
              this.tableData.identityname = "助教";
            } else {
              this.tableData.identityname = "学生";
            }
          }).catch((err) => {
            console.log(err);
            this.$message({
              message: "服务器错误",
              type: "error",
            });
          })
          break;
      }

    },

    modifyAccount() {
      this.$router.push({
        path: "/adminHome/userManage/accountModify",
        query: {
          info: this.$Base64.encode(
            JSON.stringify({ id: this.id, role: this.role })
          ),
        },
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getParams();
    this.getInfo();
  },
};
</script>


<style scoped>
.demo-border .text {
  width: 15%;
}

.demo-border .line div {
  width: 100%;
  height: 0;
}

.el-button--primary {
  color: white;
}
</style>
