<template>
  <el-container class="back">
    <el-header class="hBack">{{ course_name }}</el-header>
    <el-container>
      <el-aside width="120px" class="lBack">
        <el-menu @select="handleSelect">
          <el-menu-item index="/studentHome/concreteCourse/Ann">
            <span slot="title">公告</span>
          </el-menu-item>
          <el-menu-item index="/studentHome/concreteCourse/Exper">
            <span slot="title">实验</span>
          </el-menu-item>
          <el-menu-item index="/studentHome/concreteCourse/Perform">
            <span slot="title">成绩</span>
          </el-menu-item>
          <el-menu-item index="/studentHome/concreteCourse/Peo">
            <span slot="title">人员</span>
          </el-menu-item>
          <el-menu-item index="/studentHome/concreteCourse/File">
            <span slot="title">文件</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="mBack"> <router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "",
      class_id: "",
      course_name: "",
    };
  },
  methods: {
    getParams: function () {
      this.c_id = this.$route.query.id;
    },
    handleSelect(index) {
      this.$router.push({
        path: index,
        query: {
          id: this.c_id,
        },
      });
    },
    getClassInfo() {},
  },
  mounted() {
    this.getParams();
  },
};
</script>
<style scoped>
.back {
  background: rgb(255, 255, 255);
  border-radius: 15px;
  height: 800px;
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
