
<template>
  <div style="margin-left: 5%">
    <v-row>
      <v-col v-for="index in courseData" :key="index.class_id">
        <v-card class="mx-auto" max-width="344">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>

          <v-card-title>
            <b>{{ index.course_name }} {{ index.class_id }}</b>
            <v-spacer></v-spacer>
            <br />
            <p>{{ index.year }}年 {{ index.semester }}</p>
          </v-card-title>

          <v-card-subtitle> {{ index.place }}{{ index.time }}</v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" @click="toCourse(index)">
              查看
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show"> </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text> 课程简介 </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      courseData: [
        {
          class_id: 401902,
          course_name: "软件工程",
          year: 2021,
          semester: "春季"
        }
      ],
    };
  },
  methods: {
    toCourse(index) {
      this.$router.push({
        path: "/studentHome/concreteCourse/Ann",
        query: {
          info: this.$Base64.encode(
            JSON.stringify({ class_id: index.class_id })
          ),
        },
      });
    },
    getCourse() {

    },
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
  },
  mounted() {
    this.getCourse();
  },
};
</script>
