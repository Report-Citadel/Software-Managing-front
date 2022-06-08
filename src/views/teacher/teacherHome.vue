<template>
  <div>
    <el-container class="back">
      <el-aside width="15%">
        <div>
          <el-menu class="admin-aside-menu" router>
            <img
              ref="stuAvatar"
              src="https://www.w3school.com.cn/i/photo/coffee.jpg"
              class="admin-aside-menu-head"
            />
            <el-menu-item index="/teacherHome/control">
              <i class="el-icon-reading"></i>
              <span slot="title">公告</span>
            </el-menu-item>
            <!-- <el-menu-item index="/teacherHome/account">
              <i class="el-icon-edit"></i>
              <span slot="title">个人信息</span>
            </el-menu-item> -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>个人信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/teacherHome/account"
                  >查看个人资料</el-menu-item
                >
                <el-menu-item index="/teacherHome/modifyAccount"
                  >编辑个人资料</el-menu-item
                >
                <el-menu-item index="/teacherHome/modifyPassword"
                  >修改密码</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>课程管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/teacherHome/manageCourse2">我的课程</el-menu-item>
                <el-menu-item v-if="show" index="/teacherHome/manageCourse">课程管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="/">
              <i class="el-icon-s-tools"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
  },
  data(){
    return{
      show:false
    }
  },
  created() {
    var authoriy = sessionStorage.getItem('authorities')
    var index = authoriy.search('manage_course')
    if(index == -1){
      this.show = false
    }
    else{
      this.show = true
    }
  }
};
</script>

<style scoped>
.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: left;
  border-radius: 20px;
  height: 900px;
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
  margin-top: 20px;
}
.admin-aside-menu-head {
  margin: 20px auto;
  width: 70%;
  height: 150px;
  border-radius: 50%;
}
</style>
