<template>
  <el-container class="back">
    <el-header class="hBack">{{ course_name }}</el-header>
    <el-container>
      <el-aside width="120px" class="lBack">
        <el-menu @select="handleSelect">
          <el-menu-item index="/assistHome/concreteCourse/Ann">
            <span slot="title">公告</span>
          </el-menu-item>
          <el-menu-item index="/assistHome/concreteCourse/Exper">
            <span slot="title">实验</span>
          </el-menu-item>
          <el-menu-item index="/assistHome/concreteCourse/Score">
            <span slot="title">批改</span>
          </el-menu-item>
          <el-menu-item index="/assistHome/concreteCourse/Peo">
            <span slot="title">人员</span>
          </el-menu-item>
          <el-menu-item index="/assistHome/concreteCourse/File">
            <span slot="title">文件</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="mBack"> <router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.back {
  background: rgb(255, 255, 255);
  border-radius: 15px;
  height: 610px;
  margin-top: 20px;
}
.hBack {
  padding: 20px;
  text-align: left;
  font: 20px Microsoft YaHei;
}
.lBack {
  padding: 20px;
  border-radius: 15px;
}
.mBack {
  padding: 20px;
  border-radius: 15px;
  box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.15);
}
.rBack {
  padding: 20px;
}
</style>


<script>
export default {
  data() {
    return {
      c_id: "42034501",
      course_name: "软件工程",
    };
  },
  methods: {
    getParams: function () {
      this.c_id = this.$route.query.info.class_id;

      console.log("cid====" + this.c_id);
    },
    getClassInfo() {},
    handleSelect(index) {
      this.$router.push({
        path: index,
        query: {
          class_id: this.c_id,
        },
      });
    },
  },
  mounted() {
    this.getParams();
    this.getClassInfo();
  },
};
</script>
