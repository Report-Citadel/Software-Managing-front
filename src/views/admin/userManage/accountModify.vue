<template>
  <el-container style="margin-top: 20px">
    <el-main>
      <el-card style="margin: 0px 100px 0px 100px">
        <div class="grid-content bg-purple-dark">
          <p
            style="
              margin: 0px 0px 0px 0px;
              padding-top: 20px;
              color: black;
              font: 22px Microsoft YaHei;
              text-align: center;
            "
          >
            编辑信息
          </p>
          <el-form
            ref="userAccount"
            style="margin: 40px 100px 0px 50px"
            :model="userAccount"
            label-width="80px"
          >
            <el-form-item label="姓名" prop="name">
              <el-input type="text" v-model="userAccount.name"></el-input>
            </el-form-item>

            <el-form-item label="学号" prop="id">
              <el-input v-model="userAccount.id"></el-input>
            </el-form-item>

            <el-form-item label="性别">
              <el-radio-group v-model="userAccount.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="手机" prop="phone_number">
              <el-input v-model="userAccount.phone_number"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="userAccount.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                style="margin-left: 10px"
                @click="save()"
                type="primary"
                >保存修改</el-button
              >
              <el-button style="margin-left: 100px" @click="back"
                >取消</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      userAccount: {
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

      this.userAccount.id = JSON.parse(
        this.$Base64.decode(this.$route.query.info)
      )["id"];
      this.userAccount.role = JSON.parse(
        this.$Base64.decode(this.$route.query.info)
      )["role"];
      console.log("路有参数" + this.userAccount.id);
    },

    getInfo() {},

    checkResponse(response) {
      if (response == "Success") this.$message("修改成功");
      else this.$message("错误");
    },

    save() {
      //保存修改
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
