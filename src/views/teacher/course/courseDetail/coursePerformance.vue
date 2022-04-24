<template>
<!-- 查看这个班级的总体成绩分析 -->
  <div>
    <div ref="experiment" style="width: 100%; height: 400px"></div>
  </div>
</template>


<script>
//import echarts from "echarts";
export default {
  data() {
    return {
      id: "",
      c_id: "",

    };
  },
  methods: {

    getParams: function () {
      this.id = sessionStorage.getItem("id");
      this.c_id = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "class_id"
      ];
    },
  },
  mounted() {
    this.getParams();
    //this.drawLine();
  },
};
</script>
