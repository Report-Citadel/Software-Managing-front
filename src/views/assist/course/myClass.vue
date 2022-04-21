<!-- 助教查看自己名下所有班级 -->
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
      classData: [
        {
          class_id: 42034501,

          course_name: "软件工程",

          semester: "春学期",
          year: "2022",
        },
      ],
      id: "",
    };
  },
  methods: {
    getParams: function () {
      this.id = sessionStorage.getItem("id");
    },
    getClass() {},

    toClass(index) {
      console.log("toClass", index);
      this.$router.push({
        path: "/assistHome/concreteCourse/Ann",
        query: {
          class_id: index.class_id,
        },
      });
    },
  },
  mounted() {
    this.getParams();
    this.getClass();
  },
};
</script>
