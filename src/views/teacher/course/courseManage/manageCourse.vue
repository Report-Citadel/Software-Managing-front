<!-- 教师查看自己名下所有班级 -->
<template>
  <v-row>
    <v-col v-for="index in classData" :key="index.class_id">
      <v-card max-width="344px">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>

        <v-card-title>
          {{ index.course_name }}
          {{ index.class_id }}
        </v-card-title>

        <v-card-subtitle>
          {{ index.year }} 年 {{ index.semester }}</v-card-subtitle
        >

        <v-card-actions>
          <v-btn color="orange lighten-2" @click="toClass(index)"> 查看 </v-btn>
          <v-btn
            color="orange lighten-2"
            @click="toAnn(index)"
            style="margin-left: 2px"
          >
            公告管理
          </v-btn>
          <v-btn
            color="orange lighten-2"
            @click="toPer(index)"
            style="margin-left: 2px"
          >
            成绩分析
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
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
    toClass(index) {
      console.log(index);
    },
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
  },
};
</script>
