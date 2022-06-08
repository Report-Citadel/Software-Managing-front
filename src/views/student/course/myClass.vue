
<template>
  <div style="margin-left: 5%">
    <v-row>
      <v-col v-for="index in courseData" :key="index.class_id">
        <v-card class="mx-auto" max-width="344">
          <v-img
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinakd2021517s%2F199%2Fw600h399%2F20210517%2F8668-kpzzqna9149622.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657271598&t=012c43f35122b4a9b9c3a2442b6c8805"
            height="200px"
          ></v-img>

          <v-card-title>
            <b>{{ index.class_name }} {{ index.class_id }}</b>

          </v-card-title>

          <v-card-actions>
            <el-button type="primary" @click="intoClass(index.class_id)">进入班级</el-button>

          </v-card-actions>

          <v-expand-transition>

          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      show: false,
      courseData: [
      ],
    };
  },
  methods: {
    toCourse(index) {
      this.$router.push({
        path: "/studentHome/concreteCourse/Exper",
        query: {
          class_id: index.class_id,
          course_name: index.course_name,
        },
      });
    },
    getCourse() {},
    checkResponse(response) {
      if (response["code"] === 404) {
        this.$message("找不到页面");
        this.$router.push({ path: "/404" });
      } else if (response["code"] === 301) {
        this.$message("验证过期");
        this.$router.push({ path: "/login" });
      } else {
        this.courseData = response["data"];
      }
    },
    intoClass(id){
      this.$router.push({path:'/studentHome/concreteCourse',query: {id:id}})
    }
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    let classId;
    axios.get("/api/user/getclass",{
      params:{
        id:sessionStorage.getItem("id")
      }
    }).then(res=>{
      classId = res.data.msg

      axios.get("http://101.132.121.170:8018/course-server/class/get/one",{
        params:{
          class_id:classId
        }
      }).then(res=>{
        this.courseData.push(res.data)
      })
    })
  },
};
</script>
