<template>
  <div>
    <div id="title">
        <el-button @click="goHistory" type="info" class="leftButton" plain>查看历史数据</el-button>
        <span >生成初始数据</span>
        <el-button @click="next" type="success" class="rightButton">下一步</el-button>
    </div>
    <el-card id="initial">
      <el-form
        id="form"
        ref="initialData1"
        :model="initialData.inputData"
        label-width="80px"
        label-position="right"
        inline
      >
        <el-form-item required="true" label="初始成本">
          <el-input
          v-if="initialData.inputData.initialInvestment"
            v-model="initialData.inputData.initialInvestment"
          ></el-input>
        </el-form-item>
        <el-form-item required="true" label="总年数">
          <el-input
            :disabled="true"
            v-if="initialData.inputData.year"
            v-model="initialData.inputData.year"
          ></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button @click="submit" type="primary">提交修改</el-button>
          <el-button @click="generate" type="success">生成经济寿命期</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据-->
      <div class="tableData">
        <el-table
          border
          stripe
          :data="tableDatas"
          style="margin: auto; width: 80%"
        >
          <el-table-column type="index" label="第N年">
          </el-table-column>
          <el-table-column label="利率">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.interestRates"
                style="margin-left: 10px"
              />
            </template>
          </el-table-column>
          <el-table-column label="运维成本">
            <template slot-scope="scope">
              <el-input v-model="scope.row.oMCosts" style="margin-left: 10px" />
            </template>
          </el-table-column>
          <el-table-column label="残余价值">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.salvageValues"
                style="margin-left: 10px"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      
    </el-card>
    <!--经济寿命周期-->
      <div v-if="showLife" class="life">
        <Curve></Curve>
      </div>
  </div>
</template>

<script>
import { GetInitialData, GetEconomicLife } from "@/api/index";
import Curve from '@/components/economicLifeCycle/curve.vue';

export default {
  components: { Curve },
  name: "Initial",
  data() {
    return {
        id: sessionStorage.getItem("id"),
      showLife: false,
      isSubmit: false,
      /**
       * @type {object}
       * @property {object} inputData 输入数据
       * @property {number} initialInvestment 初始成本
       * @property {Array} interestRates 利率
       * @property {Array} oMCosts 运维成本
       * @property {Array} salvageValues 残余价值
       * @property {number} year 年数
       * @property {number} labNum 实验编号
       * @description 初始数据
       */
      initialData: {},
      /**
       * @property {Array} interestRates 利率
       * @property {Array} oMCosts 运维成本
       * @property {Array} salvageValues 残余价值
       */
      tableDatas: [],
      EData: "",
    };
  },
  methods: {
    initial() {
      GetInitialData({ stuId: this.id })
        .then((response) => {
          this.initialData = response.data.data;
          console.log(this.initialData);
          this.transToTable();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    transToTable() {
      var i = 0;
      for (i = 0; i < this.initialData.inputData.year; i++) {
        this.tableDatas.push({
          interestRates: this.initialData.inputData.interestRates[i],
          oMCosts: this.initialData.inputData.oMCosts[i],
          salvageValues: this.initialData.inputData.salvageValues[i],
        });
      }
      // console.log(this.tableDatas[0]);
    },
    transBackData() {
      let num = new Promise((resolve) => {
        var i = 0;
        this.initialData.inputData.interestRates = [];
        this.initialData.inputData.oMCosts = [];
        this.initialData.inputData.salvageValues = [];
        for (i = 0; i < this.initialData.inputData.year; i++) {
          this.initialData.inputData.interestRates.push(
            this.tableDatas[i].interestRates
          );
          this.initialData.inputData.oMCosts.push(this.tableDatas[i].oMCosts);
          this.initialData.inputData.salvageValues.push(
            this.tableDatas[i].salvageValues
          );
        }
        resolve(1);
      });
      return num;
    },
    async submit() {
      this.showLife=false;
      this.isSubmit=true;
      await this.transBackData();
      GetEconomicLife(this.initialData)
        .then((res) => {
          // console.log(res);
          this.EData = res.data.data;
          // console.log(this.EData);
          sessionStorage.setItem("EconomyLife", JSON.stringify(res.data.data));
          alert("提交成功");
        })
        .catch((error) => {
          alert(error);
        });
    },
    next() {
      this.$emit("nextStep");
    },
    goHistory() {
      this.$emit("goHistory")
    },
    generate() {
      if(this.isSubmit){
        this.showLife=true;
      }else {
        this.$alert('请先提交数据！','提示',{
          confirmButtonText: '确定'
        })
      }
      
    }
  },
  props: {},
  mounted() {
    this.initial();
    // console.log(this.$route);
    sessionStorage.setItem("step", 1);
  },
};
</script>

<style scoped>
#initial {
    height: calc(100vh - 180px);
    overflow-y: auto;
    width: 80%;
    margin: 10px auto;
    top: 200px;
}
#title {
    text-align: center;
    font-size: 200%; 
}

#form {
    height: 90%;
    width: 90%;
    margin: 10px auto;
}

.button {
    float: right;
    margin-right: 5%;
}

.bHistory {
    float: right;
    margin-right: 10%;
}

.tableData {
    margin: 10px auto;
}

.life {
    width: 80%;
    margin-left: 10%;
}

.leftButton {
    margin-top: 10px;
    margin-left: 10%;
    float: left;
}

.rightButton {
    margin-top: 10px;
    margin-right: 10%;
    float: right;
}
</style>
