<template>
  <el-form :model="ruleForm" ref="ruleForm">
    <div>
      <el-input placeholder="请输入测验标题" v-model="ex_title"></el-input>
      <br />
      <br />
      <el-date-picker
        v-model="start_time"
        type="datetime"
        placeholder="选择开始日期"
        style="margin-bottom: 15px; width: 50%"
      >
      </el-date-picker>
      <br />
      <el-date-picker
        v-model="end_time"
        type="datetime"
        placeholder="选择截止日期"
        style="margin-bottom: 15px; width: 50%"
      >
      </el-date-picker>
    </div>
    <br />
    <el-button type="primary" @click="addQuestion">增加一题</el-button>
    <el-button type="primary" @click="save">保存</el-button>
  </el-form>
</template>

<script>
export default {
  name: "AddExam",
  data() {
    return {
      questionList: [
        {
          title: "",
          option_a: null,
          option_b: null,
          option_c: null,
          option_d: null,
          q_score: null,
          q_type: null,
          answer: null,
          checkList: [],
        },
      ],
      ruleForm: {
        resource: [],
        type: [],
      },
      course_id: "",
      ex_title: "",
      end_time: null,
      start_time: null,
    };
  },
  methods: {
    getParams() {
      this.course_id = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "course_id"
      ];
    },

  },
  mounted() {
    this.getParams();
  },
};
</script>

<style>
.el-button--primary {
  color: white;
}
.el-button--success {
  color: white;
}
</style>
