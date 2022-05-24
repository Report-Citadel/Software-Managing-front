<template>
  <el-main class="el-main">
    <h1 class="title">实验内容</h1>
    <h1 class="questionTitle">问题背景</h1>
    <div class="question">{{ this.question }}</div>
    <h1 class="questionTitle">根据以上信息，回答下面的问题：</h1>
    <el-card class="formCard">
      <el-form
        :model="answerForm"
        :rules="formRules"
        ref="answerForm"
        label-width="250px"
        class="inputForm"
        label-position="left"
      >
        <el-form-item label="单位产品销售价格（单位：元）" prop="price">
          <el-input v-model="answerForm.price"></el-input>
        </el-form-item>
        <el-form-item label="单位产品变动成本（单位：元）" prop="variableCost">
          <el-input v-model="answerForm.variableCost"></el-input>
        </el-form-item>
        <el-form-item label="固定成本（单位：元）" prop="fixedCost">
          <el-input v-model="answerForm.fixedCost"></el-input>
        </el-form-item>
        <el-row style="margin-top: 60px">
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="3">
            <el-button type="info" plain @click="reset">重置</el-button>
          </el-col>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="3">
            <el-button type="primary" plain @click="submit">提交</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
export default {
  name: "BEEStep1",
  data() {
    const fixedNumberRule = (rule, value, callback) => {
      //包含小数的数字
      let reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
      if (value === "") {
        callback(new Error("请输入内容"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    return {
      question: "",
      // answerForm: {
      //   price: 0,
      //   fixedCost: 0,
      //   variableCost: 0,
      // },
      formRules: {
        price: [
          { required: true, validator: fixedNumberRule, trigger: "blur" },
        ],
        fixedCost: [
          { required: true, validator: fixedNumberRule, trigger: "blur" },
        ],
        variableCost: [
          { required: true, validator: fixedNumberRule, trigger: "blur" },
        ],
        BEP: [{ required: true, validator: fixedNumberRule, trigger: "blur" }],
      },
    };
  },
  props: ["answerForm"],
  methods: {
    setQuestion() {
      this.question =
        "某鼠标生产商去年一年销售某型号鼠标共2万只，总销售额为200万元，总成本为145万元，其中固定成本为45万。今年该公司计划增加广告费5万元，同时花费15万元改进了产品的生产线，生产同样一只鼠标较原来能节省5元。但由于国际金属的价格波动，每只鼠标的生产成本上升了2元。";
    },
    submit() {
      this.$emit("submit", this.answerForm);
      console.log(typeof this.answerForm.price);
    },
    reset() {
      this.answerForm.price = 0;
      this.answerForm.fixedCost = 0;
      this.answerForm.variableCost = 0;
      this.answerForm.BEP = 0;
    },
  },

  mounted() {
    this.setQuestion();
  },
};
</script>

<style scoped>
.title {
  width: 500px;
  font-size: 150%;
  color: black;
  text-align: left;
  margin-left: 150px;
}
.questionTitle {
  width: 500px;
  font-size: 130%;
  color: black;
  text-align: left;
  margin-left: 150px;
}
.question {
  width: 660px;
  font-size: 120%;
  color: #313131;
  text-align: left;
  margin-left: 100px;
  font-family: 宋体;
  font-weight: bold;
  line-height: 2;
  text-indent: 2em;
}
.inputForm {
  width: 400px;
  margin-left: 50px;
}
.formCard {
  width: 550px;
  margin-top: 80px;
  margin-left: 150px;
}
.el-main {
  width: 800px;
}
</style>