<template>
  <div>
    <el-button type="primary" @click="back()">返回</el-button>
    <div>
      <h3>{{ ex_title }}</h3>

      <br />
      <br />
      <p>{{ start_time }} - {{ end_time }}</p>
    </div>
    <el-form>
      <div v-for="(item, index) in questionList" :key="index">
        <el-card>
          <div>
            <!-- 题目的信息 -->
            <p style="font-weight: 700">
              第{{ index + 1 }}题 分值：{{ item.q_score }}
              <span v-if="item.q_type === 1">（单选）</span>
              <span v-if="item.q_type === 2">（多选）</span>
              <span v-if="item.q_type === 3">（判断）</span>
            </p>
            <br />
            <p>{{ item.title }}</p>

            <el-form-item v-if="item.q_type === 1">
              <el-radio-group v-model="item.answer">
                <el-radio disabled :label="1">A. {{ item.option_a }}</el-radio>
                <el-radio disabled :label="2">B. {{ item.option_b }}</el-radio>
                <el-radio disabled :label="3">C. {{ item.option_c }}</el-radio>
                <el-radio disabled :label="4">D. {{ item.option_d }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-if="item.q_type === 2">
              <el-checkbox-group v-model="item.checkList">
                <el-checkbox disabled :label="1">
                  A. {{ item.option_a }}
                </el-checkbox>
                <br />
                <el-checkbox disabled :label="2">
                  B. {{ item.option_b }}
                </el-checkbox>
                <br />
                <el-checkbox disabled :label="3">
                  C. {{ item.option_c }}
                </el-checkbox>
                <br />
                <el-checkbox disabled :label="4">
                  D. {{ item.option_d }}
                  <br />
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item v-if="item.q_type === 3">
              <el-radio-group disabled v-model="item.answer">
                <el-radio :label="1">正确</el-radio>
                <el-radio :label="2">错误</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-card>
      </div>
      <br />
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddExam",
  data() {
    return {
      questionList: [
        {
          title: "",
          option_a: "123",
          option_b: "123",
          option_c: "123",
          option_d: "123",
          q_score: 100,
          q_type: 1,
          answer: 0,
          q_id: null,
          checkList: null,
        },
      ],
      exam_id: "",
      ex_title: "",
      end_time: null,
      start_time: null,
      answerList: [],
      course_id: "",
    };
  },
  methods: {
    getParams() {
      this.exam_id = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "exam_id"
      ];
      this.course_id = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "course_id"
      ];
    },
    back() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getParams();
  },
};
</script>

<style scoped>
</style>