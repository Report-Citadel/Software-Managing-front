<template>
  <div>
    <el-container class="back">
      <el-aside width="15%">
        <div>
          <el-menu class="admin-aside-menu" router>
            <img :src="imageUrl" class="admin-aside-menu-head" />

            <el-submenu index="">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>个人信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item @click="accountinfo()"
                  >查看个人资料</el-menu-item
                >
                <el-menu-item  @click="modifyAccount()"
                  >编辑个人资料</el-menu-item
                >
                <el-menu-item index="/adminHome/modifyPassword"
                  >修改密码</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu> 
            <el-menu-item index="/adminHome/accountAdd" v-if="auth_create_account">
              <i class="el-icon-user"></i>
              <span slot="title">创建账户</span>
            </el-menu-item>

            <!-- <el-menu-item index="/" @click="Logout()">
              <i class="el-icon-reading"></i>
              <span slot="title">退出登录</span>
            </el-menu-item> -->
            <!-- <el-menu-item index="/adminHome/annManage" v-if="auth_create_account">
              <i class="el-icon-postcard"></i>
              <span slot="title">创建账户</span>
            </el-menu-item> -->
            <el-menu-item index="/adminHome/accountCancel" v-if="auth_delete_account">
              <i class="el-icon-postcard"></i>
              <span slot="title">删除账户</span>
            </el-menu-item>
            <el-menu-item index="/adminHome/accountCheck" v-if="auth_edit_info">
              <i class="el-icon-postcard"></i>
              <span slot="title">修改账户信息</span>
            </el-menu-item>
            <el-menu-item index="/adminHome/editauth" v-if="auth_edit_auth">
              <i class="el-icon-postcard"></i>
              <span slot="title">修改权限信息</span>
            </el-menu-item>
            <el-menu-item index="/" @click="Logout()">
              <i class="el-icon-reading"></i>
              退出登录
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

    <el-dialog title="头像设置" :visible.sync="avatarDialog" center width="20%">
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
        :data="id"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <span
          v-if="imageUrl"
          class="el-upload-action"
          @click.stop="handleRemove()"
        >
          <i class="el-icon-delete"></i>
        </span>
        <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="avatarDialog = false">取 消</el-button>
        <el-button type="primary" @click="setAvatar">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  created() {
    // console.log("created");
    var authorities = sessionStorage.getItem("authorities");
    // console.log(authorities);
    this.auth_create_account = (authorities.indexOf("create_account") != -1);
    this.auth_delete_account = (authorities.indexOf("delete_account") != -1);
    this.auth_edit_auth = (authorities.indexOf("edit_auth") != -1);
    this.auth_edit_info = (authorities.indexOf("edit_info") != -1);

  },
  data() {
    return {
      avatarDialog: false,
      id: "",
      imageUrl: "http://39.107.51.181:5000/static/avatar/管理员头像.png",
      auth_create_account: false,
      auth_delete_account: false,
      auth_edit_info: false,
      auth_edit_auth: false,
    };
  },
  methods: {
    accountinfo(){
      this.$router.push({
        path: "/adminHome/account",
        query: {
          info: this.$Base64.encode(
            JSON.stringify({ id: sessionStorage.getItem("id"), role: sessionStorage.getItem("role") })
          ),
        },
      });
    },
    modifyAccount() {
      this.$router.push({
        path: "/adminHome/modifyAccount",
        query: {
          info: this.$Base64.encode(
            JSON.stringify({ id: sessionStorage.getItem("id"), role: sessionStorage.getItem("role")  })
          ),
        },
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleAvatar() {
      this.avatarDialog = true;
    },
    // 移除图片
    handleRemove() {
      this.imageUrl = "";
    },
    // 上传成功回调
    handleAvatarSuccess(response) {
      if (response.status == 200) {
        this.imageUrl = response.data.url;
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.$router.go(0);
      } else if (response.status == 400) {
        this.$message({
          message: "id错误",
          type: "error",
        });
      } else if (response.status == 501) {
        this.$message({
          message: "找不到该用户",
          type: "error",
        });
      }
    },
    // 上传前格式和图片大小限制
    beforeAvatarUpload(file) {
      const type =
        file.type === "image/jpeg" ||
        "image/jpg" ||
        "image/webp" ||
        "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!type) {
        this.$message.error("图片格式不正确!(只能包含jpg，png，webp，JPEG)");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return type && isLt2M;
    },
    setAvatar() {
      this.avatarDialog = false;
    },
    getAvatar() {
      //获取头像
    },
    Logout() {
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("token");
    },
  },
  mounted() {
    this.getAvatar();
  },
};
</script>

<style scoped>
.el-main {
  background-color: #ffffff;
  height: 650px;
  border-radius: 20px;
}

.back {
  margin-left: 10px;
  margin-top: 20px;
}

.admin-aside-menu {
  box-shadow: 3px 3px 10px #d3d3d3;
  background: #f0f8ff;
  border-radius: 10%;
  height: 800px;
}

.admin-aside-menu-head {
  margin: 20px auto;
  width: 70%;
  height: 150px;
  border-radius: 50%;
}

.avatar-uploader {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  background-size: 100% 100%;
  margin-left: 25%;
}

.avatar-uploader-icon {
  font-size: 0;
  color: #fff;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar-uploader-icon:hover {
  font-size: 28px;
  background-color: rgba(0, 0, 0, 0.3);
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.el-upload-action {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0;
  color: #fff;
  text-align: center;
  line-height: 120px;
}

.el-upload-action:hover {
  font-size: 20px;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
