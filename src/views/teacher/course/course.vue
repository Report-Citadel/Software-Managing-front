
<template>


  <v-row>

    <v-col v-for="index in courseData" :key="index">
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>

        <v-card-title>
          {{ index.course_name }}
          {{index.class_id }}
          <v-spacer></v-spacer>

        </v-card-title>

        <v-card-subtitle> {{ index.year }} 年  {{ index.semester }}</v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange lighten-2" @click="toCourse(index)"> 查看 </v-btn>

          <v-spacer></v-spacer>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
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
      this.$router.push({path:"/teacherHome/concreteCourse",
        query:{
          info : this.$Base64.encode(JSON.stringify({"class_id" : index.class_id}))}
      });
    },
  },

};
</script>

<style scoped>
.back {
  background: rgb(255, 255, 255);
  border-radius: 15px;
  height: 700px;
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