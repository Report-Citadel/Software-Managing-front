<template>
  <div>
    <div id="title">
      <el-button @click="back" type="success" class="leftButton">返回实验</el-button>
      <span>历史数据</span>
      <el-button @click="next" type="success" class="rightButton">返回首页</el-button>
    </div>
    <el-card id="initial">
      <el-table :data="tableData" border stripe>
        <el-table-column prop="lab_id" label="实验数据编号"></el-table-column>
        <el-table-column prop="year" label="工程持续年数"></el-table-column>
        <el-table-column
          prop="economicLife"
          label="经济寿命周期"
        ></el-table-column>
        <el-table-column
          prop="initialInvestment"
          label="原始成本"
        ></el-table-column>
        <el-table-column type="expand" label="查看更多" width="100">
          <template slot-scope="props">
            <div class="try">
              <Curve :EcoData="props.row"></Curve>
              <el-descriptions title="更多数据" :column="1" border>
                <el-descriptions-item label="实验数据编号">{{
                  props.row.lab_id
                }}</el-descriptions-item>
                <el-descriptions-item label="每年利率">{{
                  props.row.interestRates.join(",")
                }}</el-descriptions-item>
                <el-descriptions-item label="每年的残差价值">{{
                  props.row.salvageValues.join(",")
                }}</el-descriptions-item>
                <el-descriptions-item label="每年的运维成本">{{
                  props.row.oMCosts.join(",")
                }}</el-descriptions-item>
                <el-descriptions-item label="资本回收成本">{{
                  props.row.cRs.join(",")
                }}</el-descriptions-item>
                <el-descriptions-item label="每年总运维成本">{{
                  props.row.aESumOMs.join(",")
                }}</el-descriptions-item>
                <el-descriptions-item label="每年总成本">{{
                  props.row.sumTotalAE.join(",")
                }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { GetHistoryData } from "@/api/index";
import Curve from "@/components/elc/curve.vue";

export default {
  components: { Curve },
  name: "History",
  data() {
    return {
      stuId: sessionStorage.getItem("id"),
      tableData: [],
      historyData: {
        aE_sum_O_M: "",
        cR: "",
        ecnomic_life: "",
        initial_investment: "",
        interest_rate: "",
        lab_id: "",
        salvage_value: "",
        o_M_cost: "",
        sum_total_AE: "",
        year: "",
      },
    };
  },
  methods: {
    toImage(index, row) {
      console.log(index);
      console.log(row);
      this.$router.push("/");
    },
    saveData(row) {
      console.log(row);
    },
    back() {
        this.$emit("historyBack");
    },
    next() {
        console.log("返回首页");
    }
  },
  mounted() {
    sessionStorage.setItem("step", 0);
  },
  created() {
    let st = { stuId: this.stuId };
    GetHistoryData(st)
      .then((res) => {
        //console.log(res.data[0]);
        var tempData = res.data.data;
        console.log(tempData);
        for (let x = 0; x < tempData.length; x++) {
          var obj1 = { lab_id: tempData[x].lab_id };
          var obj2 = JSON.parse(tempData[x].input_json);
          var obj3 = {};
          if (tempData[x].output_json != "") {
            obj3 = JSON.parse(tempData[x].output_json);
          }
          //var obj3=JSON.parse(tempData[x].output_json);
          var obj4 = Object.assign(obj1, obj2, obj3);
          this.tableData.push(obj4);
        }
        console.log(this.tableData[0]);
      })
      .catch((error) => {
        console.log("获取历史数据失败");
        alert(error)
      });
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
