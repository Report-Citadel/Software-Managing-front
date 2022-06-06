<template>
  <div>
    <div id="title">
      <el-button @click="back" type="success" class="leftButton">上一步</el-button>
      <span>答题</span>
      <el-button @click="next" type="success" class="rightButton">下一步</el-button>
    </div>
    <el-card id = "curve">
      <div class="py-1"></div>
        <div class="question">
            <p>第一部分：请回答下面的问题(必答，5分)</p>
            <p>1.&nbsp;{{ questionList[0].question }}</p>
            <p>已知工程的持续年数为{{ question1Data.year }}年，原始成本为{{ question1Data.initialInvestment }},
               其它数据如下所示</p>
            <el-table
              border
              stripe
              :data="question1Table"
              style="width: 80%"
            >
              <el-table-column type="index" label="第N年" width="80">
              </el-table-column>
              <el-table-column label="利率" prop="interestRates"></el-table-column>
              <el-table-column label="运维成本" prop="oMCosts"></el-table-column>
              <el-table-column label="残余价值" prop="salvageValues"></el-table-column>
            </el-table>
            <el-radio-group v-model="radio1">
                <el-radio v-for="(answ,index1) in questionList[0].options" :key="index1" :label="index1">
                    {{letter[index1]}}.&nbsp;{{answ}}
                </el-radio>
            </el-radio-group>
            <el-divider />
        </div>
        <div class="question">
            <p>第二部分：根据从第一部分计算到的结果，回答下面第2到第5题的其中一道(5分)</p>
            <p>请注意只能回答一道问题，系统默认只记录最后回答的问题，其它的回答无效！</p>
            <el-tabs v-model="activeQue" type="card" @tab-click="handleClick">
                <el-tab-pane 
                  v-for="(que, index) in newQueList"
                  :name="toStr(index)"
                  :key="index"
                  :label="'第'+(index+2)+'题'"
                >
                  <p>{{index+2}}.&nbsp;{{que.question}}</p>
                  <div v-if="index==0">
                    <p>已知工程的持续年数为{{ question2Data.year }}年，原始成本为{{ question2Data.initialInvestment }},
                      其它数据如下所示</p>
                    <el-table
                      border
                      stripe
                      :data="question2Table"
                      style="width: 80%"
                    >
                      <el-table-column type="index" label="第N年" width="80">
                      </el-table-column>
                      <el-table-column label="利率" prop="interestRates"></el-table-column>
                      <el-table-column label="运维成本" prop="oMCosts"></el-table-column>
                      <el-table-column label="残余价值" prop="salvageValues"></el-table-column>
                    </el-table>
                  </div>
                  <div v-else-if="index==2">
                    <el-descriptions direction=" horizontal" :column="3" border>
                        <el-descriptions-item label="profits">{{ question4Data.profits.join(" , ") }}</el-descriptions-item>
                    </el-descriptions>
                  </div>
                  <el-radio-group v-model="radioList[index]" @change="chooseClick">
                    <el-radio v-for="(answ,index1) in que.options" :key="index1" :label="index1">
                        {{letter[index1]}}.&nbsp;{{answ}}
                    </el-radio>
                  </el-radio-group>
                </el-tab-pane>
                <el-divider />
            </el-tabs>
        </div>

        <el-button @click="save" type="success">暂存</el-button>
        <el-button @click="submit" type="primary">提交</el-button>
    </el-card>
  </div>
</template>

<script>
// import Ques from '@/components/ques.vue'
import { GetQuestions,SaveQuestions,GetScore } from '@/api/index'
export default {
    name: "Question",
//   components: { Ques },
    data() {
        return {
            id: sessionStorage.getItem("id"),
            question1Data: {},
            question1Table: [],
            /**
             * @type {object}
             * @property {string} ans 答案
             * @property {array} options 选项
             * @property {string} question 问题
             * @property {string} user_ans 已选择的答案
             */
            questionList: {},
            /**
             * @type {object}
             * @property {object} inputData 输入数据
             * @property {object} outputData 输出数据
             */
            question2Data: [],
            question2Table: [],
            /**
             * @type {object}
             * @property {string} FW 
             * @property {array} MARR 
             * @property {string} profit 
             */
            question4Data: {},
            radio1: "", //第一题保存的选项
            queChoose: 1, //后四题中选择的题目编号 1~4
            radio4: "", //选择的题目保存的选项
            activeQue: "0", //后四题中展示的题目的编号 0~3
            radioList: [], //后四题所有题目的选项
            letter: [ "A", "B", "C", "D", "E", "F", "G"],
        };
    },
    methods: {
        queAddStuId(){
          if(this.radio1!==""){
              var op1 = this.questionList[0].options[this.radio1];
              this.questionList[0].user_ans = op1;
            }
            if(this.radio4!==""){
              var i = this.queChoose;
              var op4 = this.questionList[i].options[this.radio4];
              this.questionList[i].user_ans = op4;
            }
            var ques= new Object();
            ques.questions=this.questionList;
            ques.stuId=this.id;
            return ques;
        },
        submit() {
            var ques = this.queAddStuId();
            GetScore(ques)
             .then((res)=>{
               var score=res.data.data;
               this.$alert("<font size='5'>分数："+score+"</font>","提交成功！",{
                 confirmButtonText: "确定",
                 type: "success",
                 center: true,
                 dangerouslyUseHTMLString: true,
               })
             })
             .catch(()=>{
               this.$message({
                  message: "提交失败！",
                  type: "warning"
                });
             })
        },
        save() {
            var ques = this.queAddStuId();
            SaveQuestions(ques)
              .then(()=>{
                this.$message({
                  message: "暂存成功！",
                  type: "success"
                });
              })
              .catch(()=>{
                this.$message({
                  message: "暂存失败！",
                  type: "warning"
                });
              })
        },
        next() {
            this.$emit("nextStep");
        },
        back() {
          this.$emit("backStep")
        },
        handleClick(tab){
            this.queChoose=parseInt(tab.index)+1;
        },
        chooseClick(value){
            this.radio4 = value;
            // var i = this.queChoose;
            // var op = this.questionList[i].options[value];
            // this.questionList[i].user_ans = op;
            // for(var temp in this.radioList){
            //     if(temp!=i-1){
            //         delete this.radioList[temp];
            //     }
            // }
            // console.log(this.radioList);
        },
        getQuestions() {
            GetQuestions({ stuId: this.id })
                .then((response) => {
                  this.question1Data = response.data.data.inputData;
                this.question2Data = response.data.data.question2Data.inputData;
                this.question4Data = response.data.data.question4Data;
                this.questionList = response.data.data.questions;
                console.log(this.question2Data);
                var temp;
                for (temp in this.questionList){
                    this.questionList[temp].options.sort(function(){
                        return Math.random()-0.5;
                    })
                    if(this.questionList[temp].user_ans!==""){
                      for(var x in this.questionList[temp].options){
                        if(this.questionList[temp].options[x]==this.questionList[temp].user_ans){
                          if(temp==0){
                            this.radio1=parseInt(x);
                          }else {
                            this.activeQue=this.toStr(parseInt(temp)-1);
                            this.radioList[temp-1]=parseInt(x);
                            this.queChoose=parseInt(temp);
                            this.radio4=parseInt(x);
                          }
                          break;
                        }
                      }
                    }
                }
                this.question1Table = this.transToTable(this.question1Data);
                this.question2Table = this.transToTable(this.question2Data);
                for (var y in this.question4Data.profits) {
                  this.question4Data.profits[y] = this.question4Data.profits[y].toFixed(2);
                }
                console.log(this.questionList)
                })
                .catch((error) => {
                console.log(error);
                });
        },
        transToTable(questionData) {
          var i = 0;
          var questionTable = [];
          for (i = 0; i < questionData.year; i++) {
            var rate=questionData.interestRates[i]*100;
            questionTable.push({
              interestRates: rate.toFixed(2)+"%",
              oMCosts: questionData.oMCosts[i].toFixed(2),
              salvageValues: questionData.salvageValues[i],
            });
          }
          return questionTable;
        },
        toStr(i){
            i = i.toString();
            return i;
        }
    },
    mounted() {
        this.getQuestions();
      sessionStorage.setItem("step", 2);
    },
    computed: {
        newQueList() {
            return this.questionList.slice(1);
        }
    }
}
</script>

<style scoped>
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

#curve {
    height: calc(100vh - 180px);
    overflow-y: auto;
    width: 80%;
    margin: 10px auto;
}
#title {
    text-align: center;
    font-size: 200%; 
}

.el-radio {

  text-overflow: ellipsis;
  white-space: pre-wrap;
  line-height: 25px;
  display: block;

}

.question {
    margin-left: 10px;
}
</style>