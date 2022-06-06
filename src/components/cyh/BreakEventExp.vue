<template>
  <div>
    <div
      style="
        margin-bottom: 30px;
        color: grey;
        font: 32px Microsoft YaHei;
        font-weight: 900;
        text-align: center;
      "
    >
      {{ title }}
    </div>
    <el-container>
      <el-header>
        <el-steps
          :active="activeNum"
          :space="400"
          finish-status="success"
          align-center
        >
          <el-step title="步骤1" description="分析实验数据"></el-step>
          <el-step
            title="步骤2"
            description="生成图表并计算盈亏平衡点"
          ></el-step>
          <el-step title="步骤3" description="提交实验报告"></el-step>
        </el-steps>
      </el-header>
      <el-main>
        <BEEStep1
          v-if="activeNum === 0"
          v-bind:answerForm="answerForm"
          @submit="confirm"
        ></BEEStep1>
        <BEEStep2
          v-if="activeNum === 1"
          v-bind:answerForm="answerForm"
          @nextStep="nextStep"
          @previousStep="previousStep"
        ></BEEStep2>
        <BEEStep3
          v-if="activeNum === 2"
          v-bind:answerForm="answerForm"
          @submit="submit"
          @previousStep="previousStep"
        ></BEEStep3>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import BEEStep1 from "./BEEStep1";
import BEEStep2 from "./BEEStep2";
import BEEStep3 from "./BEEStep3";

export default {
  name: "BreakEventExp",
  components: {
    BEEStep1,
    BEEStep2,
    BEEStep3,
  },
  data() {
    return {
      id: "",
      title: "",
      activeNum: 0,
      question: "",
      answerForm: {
        price: 0,
        fixedCost: 0,
        variableCost: 0,
        bep: 0,
        jobRate: 0,
        safeRate: 0,
        conclusion: "",
      },
    };
  },

  methods: {
    next() {
      if (this.activeNum++ > 2) this.activeNum = 0;
      console.log(this.activeNum);
    },
    previous() {
      if (this.activeNum > 0) this.activeNum--;
    },
    confirm(data) {
      //step1 confirm
      this.next();
      this.answerForm = data;
    },
    nextStep(data) {
      //step2 -> step3
      this.next();
      this.answerForm.bep = data.bep;
      this.answerForm.jobRate = data.jobRate;
      this.answerForm.safeRate = data.safeRate;
      console.log(this.answerForm.bep);
    },
    previousStep() {
      //前一页
      this.previous();
    },

    /**
     * @Description: 上传\暂存 status
     * @author Zhao Ziqi
     * @date 2022/1/8
     * @Params data,status
     * @Return
     */
    submit(data, status) {
      this.answerForm = data;
      console.log(typeof this.conclusion);
      let axios = require("axios");
      let FormData = require("form-data");
      let postData = new FormData();
      postData.append("userEmail", this.$store.getters.userEmail);
      postData.append("experimentId", "1");
      postData.append("price", this.answerForm.price);
      postData.append("fixedCost", this.answerForm.fixedCost);
      postData.append("variableCost", this.answerForm.variableCost);
      postData.append("bep", this.answerForm.bep);
      postData.append("jobRate", this.answerForm.jobRate);
      postData.append("safeRate", this.answerForm.safeRate);
      postData.append("conclusion", this.answerForm.conclusion);
      postData.append("state", status);
      let config = {
        method: "post",
        url: "http://8.130.26.39:8082/experiment/report/write",
        data: postData,
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (status === 0) {
            this.$message({
              message: "提交成功",
              type: "success",
            });
          } else if (status === 1) {
            this.$message({
              message: "暂存成功",
              type: "success",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("操作失败，请重新尝试");
        });
      console.log(this.answerForm);
    },
    getParams: function () {
      this.id = this.$route.query.id;
      this.title = this.$route.query.title;
    },
  },

  mounted() {
    this.getParams();
    let axios = require("axios");

    let config = {
      method: "get",
      url: "http://8.130.26.39:8082/experiment/temporaryReport/get",
      params: {
        userEmail: this.$store.getters.userEmail,
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data) {
          this.answerForm.price = response.data.price;
          this.answerForm.fixedCost = response.data.fixedCost;
          this.answerForm.variableCost = response.data.variableCost;
          this.answerForm.bep = response.data.bep;
          this.answerForm.jobRate = response.data.jobRate;
          this.answerForm.safeRate = response.data.safeRate;
          this.answerForm.conclusion = response.data.conclusion;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("now", this.answerForm);
  },
};
</script>

<style scoped>
</style>