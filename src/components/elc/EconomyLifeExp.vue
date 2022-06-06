<template>
  <div>
      <div
        style="
          margin-bottom: 10px;
          color: grey;
          font: 32px Microsoft YaHei;
          font-weigh: 900;
          text-align: center;
        "
      >
        {{ title }}
       
      </div>
       <RemainingTime 
        :id="id" 
       ></RemainingTime>
      

    <el-container>
      <el-header v-if="activeNum>-1">
        <el-steps
          :active="activeNum"
          :space="400"
          finish-status="success"
          align-center
        >
          <el-step title="步骤 1" description="生成初始数据"></el-step>
          <el-step title="步骤 2" description="答题"></el-step>
          <el-step title="步骤 3" description="上传文件"></el-step>
        </el-steps>
      </el-header>
      <el-main>
        <InitialStep1
          v-if="activeNum === 0"
          @nextStep="nextStep"
          @goHistory="goHistory"
        ></InitialStep1>
        <QuestionStep2
          v-else-if="activeNum === 1"
          @backStep="backStep"
          @nextStep="nextStep"
        ></QuestionStep2>
        <FileStep3
          v-else-if="activeNum === 2"
          @backStep="backStep"
        ></FileStep3>
        <HistoryData
          v-else-if="activeNum === -1"
          @historyBack="historyBack"></HistoryData>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import InitialStep1 from "@/components/elc/InitialStep1.vue"
import QuestionStep2 from "@/components/elc/QuestionStep2.vue"
import FileStep3 from "@/components/elc/FileStep3.vue"
import HistoryData from "@/components/elc/HistoryData.vue"
import RemainingTime from "@/components/elc/RemainingTime.vue"
export default {
  name: "EconomyLife",
  components: {
    InitialStep1,
    QuestionStep2,
    FileStep3,
    HistoryData,
    RemainingTime,
  },
  data() {
    return {
      id: "",
      title: "",
      activeNum: "",
      step: "",
      paths: [],
      seconds: 0 ,
    };
  },
  props: {},
  methods: {
    nextStep() {
      if(this.activeNum++>2){
        this.activeNum=0;
      }
    },
    backStep() {
      if(this.activeNum>0){
        this.activeNum--;
      }
    },
    goHistory() {
      this.activeNum=-1;
    },
    historyBack() {
      this.activeNum=0;
    },
    getParams: function () {
      this.id = this.$route.query.id;
      this.title = this.$route.query.title;
    },
  },
  mounted() {
    this.getParams();
    if(sessionStorage.getItem("step")!=null){
      this.activeNum=sessionStorage.getItem("step")-1;
    }else {
      this.activeNum=0;
    }
  },
};
</script>

<style scoped>
</style>