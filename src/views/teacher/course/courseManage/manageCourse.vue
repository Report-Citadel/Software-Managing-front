<!-- 教师查看自己名下所有班级 -->
<template>
  <v-row>
    <v-col v-for="index in classData" :key="index.class_id">
      <v-card max-width="344px">
        <v-img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinakd2021517s%2F199%2Fw600h399%2F20210517%2F8668-kpzzqna9149622.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657271598&t=012c43f35122b4a9b9c3a2442b6c8805"
          height="200px"
        ></v-img>

        <v-card-title>
          {{ index.class_name }}
          {{ index.class_id }}
        </v-card-title>

        <v-card-actions>
<!--          <v-btn-->
<!--            color="orange lighten-2"-->
<!--            @click="toAnn(index)"-->
<!--            style="margin-left: 2px"-->
<!--          >-->
<!--            公告管理-->
<!--          </v-btn>-->
<!--          <v-btn-->
<!--            color="orange lighten-2"-->
<!--            @click="toPer(index)"-->
<!--            style="margin-left: 2px"-->
<!--          >-->
<!--            成绩分析-->
<!--          </v-btn>-->
          <el-button type="primary" @click="intoClass(index.class_id)">进入班级</el-button>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      show: false,
      // 获得的课程信息可以放在这个classData里面，格式可以按照这样来，要显示什么，直接在上面的地方修改即可
      classData: [
        {
          class_id: 401902,
          course_name: "软件工程",
          year: 2021,
          semester: "春季",
        },
      ],
      id: "",
    };
  },
  methods: {
    toAnn(row) {
      this.$router.push({
        path: "/teacherHome/manageCourse/Ann",
        query: {
          id: row.class_id,
          name: row.course_name,
        },
      });
    },
    toPer(row) {
      this.$router.push({
        path: "/teacherHome/manageCourse/Perform",
        query: {
          id: row.class_id,
          name: row.course_name,
        },
      });
    },
    async get(){
      await axios.get("http://101.132.121.170:8018/course-server/class/get/teacher/class",{
        params:{
          teacher_id:sessionStorage.getItem("id")
        }
      }).then(res=>{
        this.classData = res.data
      })
    },
    intoClass(id){
      this.$router.push({path:'/teacherHome/concreteCourse',query: {id:id}})
    }
  },
  mounted() {
    this.get()
  }
};
</script>
