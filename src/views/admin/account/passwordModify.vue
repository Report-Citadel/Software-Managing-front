<template>
  <el-container style="margin-top: 150px">
    <el-main>
      <el-card style="
          box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.15);
          margin-left: 15%;
          margin-right: 15%;
        ">
        <el-form ref="userAccount" style="margin: 40px 100px 0px 50px" :model="form" label-width="80px">
          <el-form-item label="原密码" :required="true" status-icon="true">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item label="新密码" :required="true" status-icon="true">
            <el-input type="password" v-model="form.newPassword"></el-input>
          </el-form-item>

          <el-form-item label="再次输入" :required="true" status-icon="true">
            <el-input type="password" v-model="form.newPasswordC"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button style="margin-left: 30%" @click="validateCaptcha()" type="primary">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        "id": null,
        "password": null,
        "newPassword": null,
        "newPasswordC": null,
      },
    };
  },
  methods: {
    validateCaptcha() {
      if (this.form.newPasswordC != this.form.newPassword) {
        this.$message({
          message: "两次输入的密码不一致",
          type: "error",
        });
        return;
      }
      var formdata = {
        id: sessionStorage.getItem("id"),
        password: this.form.password,
        newPassword: this.form.newPassword
      }
      axios({
        method: "POST",
        baseURL: '/api',
        url: "/user/modifypassword",
        data: formdata
      }).then(() => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      }).catch(() => {
        this.$message({
          message: "服务器错误",
          type: "error",
        });
      })
    },
    save(captchaSuccess, old_password, new_password) {
      console.log(captchaSuccess, old_password, new_password);
    },
    back() {
      this.$router.push("/studentHome");
    },
    sendCaptcha() { },
  },
};
</script>
