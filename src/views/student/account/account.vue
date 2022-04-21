<!-- 个人信息页面-->
<template>
  <el-container style="margin-top: 20px">
    <el-aside width="200px"></el-aside>

    <el-main class="back">
<!--      <div class="circle" @click.stop="uploadHeadImg">-->
<!--        <div class="circle0" v-html="avatar"></div>-->
<!--        <div class="circle1">修改头像</div>-->
<!--      </div>-->
<!--      <input-->
<!--        type="file"-->
<!--        accept="image/*"-->
<!--        @change="handleFile"-->
<!--        class="hiddenInput"-->
<!--      />-->
      <div style="margin-top: 25px">
        <el-card style="box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.15)">
          <el-descriptions
            title="账户信息"
            :column="2"
            border
            size="medium"
            box-shadow="15px 15px 10px"
          >
            <template slot="extra">
              <el-button type="primary" size="medium" @click="modifyAccount()"
                >编辑</el-button
              >
            </template>
            <el-descriptions-item>
              <template slot="label"> 姓名 </template>
              {{ name }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> 学号 </template>
              {{ id }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> 性别 </template>
              {{ gender }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> 手机号 </template>
              {{ phone_number }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> 邮箱 </template>
              {{ email }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> 状态 </template>
              <el-tag
                :type="is_active === 1 ? 'success' : 'danger'"
                disable-transitions
                ><span v-if="is_active === 1">激活</span>
                <span v-if="is_active === 0">非激活</span></el-tag
              >
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label"> 学院 </template>
              {{ department }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> 专业 </template>
              {{ major_id }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
    </el-main>
    <el-aside width="200px"></el-aside>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      name: "梁潇怡",
      id: "1951567",
      gender: "女",
      phone_number: "18868629263",
      email: "2870375520@qq.com",
      is_active: 1,
      //role: "",
      department: "软件学院",
      major_id: "软件工程",
      avatar: "",
    };
  },
  methods: {


    // 打开图片上传




    modifyAccount() {
      this.$router.push({
        path: "/studentHome/modifyAccount",
      });
    },
  },
  mounted() {

  },
};
</script>


<style scoped>
.circle {
  margin: 0 auto;
  width: 220px;
  height: 220px;
  position: relative;
  overflow: hidden;
}
.circle0 {
  width: 220px;
  height: 220px;
  /* background-color: red; */
  background-size: 100% 100%;
}
.circle1 {
  width: 220px;
  height: 220px;
  background-color: #999999;
  opacity: 0.6;
  transition: transform 1s ease;
  text-align: center;
  display: -moz-box; /*兼容Firefox*/
  display: -webkit-box; /*兼容FSafari、Chrome*/

  -moz-box-align: center; /*兼容Firefox*/
  -webkit-box-align: center; /*兼容FSafari、Chrome */

  -moz-box-pack: center; /*兼容Firefox*/
  -webkit-box-pack: center; /*兼容FSafari、Chrome */
  color: #ffffff;
}
.circle:hover > .circle1 {
  transform: translateY(-100%);
}

.back {
  width: 700px;
  margin-top: 20px;
}
.demo-border .text {
  width: 15%;
}

.demo-border .line div {
  width: 100%;
  height: 0;
}

.hiddenInput {
  display: none;
}
.caption {
  color: #8f8f8f;
  font-size: 26px;
  height: 37px;
}
.el-button--primary {
  color: white;
}
</style>
