<template>
  <el-container style="margin-top: 20px">
    <el-main>
      <el-card style="margin: 0px 100px 0px 100px">
        <div class="grid-content bg-purple-dark">
          <p style="
              margin: 0px 0px 0px 0px;
              padding-top: 20px;
              color: black;
              font: 22px Microsoft YaHei;
              text-align: center;
            ">
            编辑信息
          </p>
          <el-form ref="tableData" style="margin: 40px 100px 0px 50px" :model="tableData" label-width="80px">
            <el-form-item label="姓名" prop="name">
              <el-input type="text" v-model="tableData.name"></el-input>
            </el-form-item>

            <el-form-item label="学号" prop="id" >
              <el-input v-model="tableData.id" disabled></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="tableData.email"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="identityname">
              <el-input v-model="identityname" disabled></el-input>
            </el-form-item>
            <el-form-item label="年级" prop="grade" v-if="tableData.identity >= 4">
              <el-input type="grade" v-model="tableData.grade"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major" v-if="tableData.identity >= 4">
              <el-input type="major" v-model="tableData.major"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="class_id" v-if="tableData.identity >= 4">
              <el-input type="class_id" v-model="tableData.class_id"></el-input>
            </el-form-item>

            <el-form-item label="学院" prop="school" v-if="tableData.identity == 2 || tableData.identity == 3">
              <el-input type="school" v-model="tableData.school"></el-input>
            </el-form-item>
            <el-form-item label="职称" prop="title" v-if="tableData.identity == 2 || tableData.identity == 3">
              <el-input type="title" v-model="tableData.title"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button style="margin-left: 10px" @click="save()" type="primary">保存修改</el-button>
              <el-button style="margin-left: 100px" @click="back">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: null,
      role: null,
      identityname: "",
      tableData: {
        name: "",
        id: "",
        gender: "",
        phone_number: "",
        email: "",
        role: "",
      },
    };
  },
  methods: {
    getParams: function () {
      // 取到路由带过来的参数
      //var routerParams = this.$route.query.id;
      // 将数据放在当前组件的数据内

      this.id = JSON.parse(
        this.$Base64.decode(this.$route.query.info)
      )["id"];
      this.role = JSON.parse(
        this.$Base64.decode(this.$route.query.info)
      )["role"];
      console.log("路有参数" + this.id);
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
            this.identityname = "管理员";
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
              this.identityname = "责任教师";
            } else {
              this.identityname = "普通教师";
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
              this.identityname = "助教";
            } else {
              this.identityname = "学生";
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

    checkResponse(response) {
      if (response == "Success") this.$message("修改成功");
      else this.$message("错误");
    },

    save() {
      //保存修改
      switch (this.role) {
        case "1":
          axios({
            method: "POST",
            baseURL: '/api',
            url: "/user/modifyadmininfo",
            data: this.tableData
          }).then(() => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
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
            method: "POST",
            baseURL: '/api',
            url: "/user/modifyteacherinfo",
            data: this.tableData
          }).then(() => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
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
            method: "POST",
            baseURL: '/api',
            url: "/user/modifystudentinfo",
            data: this.tableData
          }).then(() => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
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

<style>
.el-button--primary {
  color: white;
}
</style>
