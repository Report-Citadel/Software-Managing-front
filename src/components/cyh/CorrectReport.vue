<template>
  <el-container>
    <el-header class="header">
      <h1 class="title">待批改报告</h1>
    </el-header>
    <el-main>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="单位产品销售价格(单位:元) : ">
                <span class="answer">{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="单位产品变动成本(单位:元) : ">
                <span class="answer">{{ props.row.variableCost }}</span>
              </el-form-item>
              <el-form-item label="固定成本(单位:元) : ">
                <span class="answer">{{ props.row.fixedCost }}</span>
              </el-form-item>
              <el-form-item label="盈亏平衡点 : ">
                <span class="answer">{{ props.row.bep }}</span>
              </el-form-item>
              <el-form-item label="盈亏平衡点作业率 : ">
                <span class="answer">{{ props.row.jobRate }}</span>
              </el-form-item>
              <el-form-item label="安全边际率 : ">
                <span class="answer">{{ props.row.safeRate }}</span>
              </el-form-item>
              <el-form-item label="实验小结 : ">
                <el-button type="primary" plain @click="conclusionDetail(props.$index, tableData)" size="mini">查看详情</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            prop="userID"
            label="学号"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="courseName"
            label="课程"
            sortable
            width="280">
          <template slot-scope="scope">
            <el-tag
                type="success"
                disable-transitions>{{scope.row.courseName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="experimentName"
            label="实验"
            sortable
            width="200">
          <template slot-scope="scope">
            <el-tag
                type="primary"
                disable-transitions>{{scope.row.experimentName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="score"
            label="分数"
            width="200">
          <template slot-scope="scope">
            <el-tag
                type="danger"
                disable-transitions>{{scope.row.score}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="correctReport(scope.$index, tableData)"
                type="text"
                size="small">
              批改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog
        title="实验小结"
        :visible.sync="dialogVisible"
        class="dialog"
        width="700px">
      <div class="tool" id="tool"></div>
      <div class="editor" id="editor" name="editor"></div>
<!--      <div v-html="dialogContent" class="conclusion">{{dialogContent}}</div>-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" size="mini">确定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import wangEditor from 'wangeditor'
export default {
  name: "CorrectReport",
  data() {
    return {
      dialogVisible: true,
      dialogContent:"<strong>啊啊</strong>啊",
      tableData: [{
        price: "1",

      }],
      editor:null
    }
  },
  methods:{
    /**
     * @Description: 网页html显示实验小结
     * @author Zhao Ziqi
     * @date 2022/1/7
     * @Params null
     * @Return null
    */
    conclusionDetail(index,data){
      this.dialogContent=data[index].conclusion
      this.dialogVisible = true
      if(!this.editor) {
        this.editor = new wangEditor(`#tool`,`#editor`)
        this.editor.config.menus = []
        this.editor.create()
        this.editor.config.showFullScreen = true
        this.editor.disable()
      }
      this.editor.txt.html(this.dialogContent)
    },
    correctReport(index,table){
      console.log(index,table)
      this.$prompt('请输入分数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        let score= parseInt(value)
        if(score>100){
          this.$message.error('请勿输入大于100的分数');
        }
        else if(score<=60){
          this.$confirm('检测到该学生成绩可能异常, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: "'" + table[index].userName + "‘的成绩是:  " + score
            });
            table[index].score=score;
            this.postScore(table[index].reportId,table[index].userEmail,score);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
        else {
          this.$message({
            type: 'success',
            message: "'" + table[index].userName + "‘的成绩是:  " + score
          });
          table[index].score=score;
          this.postScore(table[index].reportId,table[index].userEmail,score);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },

    /**
     * @Description: 上传报告成绩url
     * @author Zhao Ziqi
     * @date 2022/1/7
     * @Params report_id, user_email, score
     * @Return null
    */
    postScore(reportId,userEmail,score){
      let axios = require('axios');
      let FormData = require('form-data');
      let data = new FormData();
      data.append('reportId', reportId);
      data.append('userEmail', userEmail);
      data.append('score', score);

      let config = {
        method: 'post',
        url: 'http://8.130.26.39:8082/experiment/score/update',
        data: data
      };

      axios(config)
          .then((response) => {
            console.log("postScore",response);
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    /**
     * @Description: 获得所有报告
     * @author Zhao Ziqi
     * @date 2022/1/7
     * @Params null
     * @Return null
    */
    getAllReport(){
      let axios = require('axios');

      let config = {
        method: 'post',
        url: 'http://8.130.26.39:8082/experiment/report/get',
      };

      axios(config)
          .then((response)=>{
            console.log("getAllReport",response.data);
            this.tableData=response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

    }

  },
  mounted() {
    this.getAllReport();
    this.dialogVisible=false
  },
  beforeDestroy() {
    // 销毁编辑器
    this.editor.destroy()
    this.editor = null
  }
}
</script>

<style scoped>
.title{
  font-size: 200%;
  font-weight: normal;
  text-align: left;
  height: 100px;
  margin-top: 0;
  color: #000;
}

.header{
  height: 300px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.answer{
  font-weight: bolder;
}
.dialog{
  margin: auto;
}
.conclusion{
  margin-top: 0;
  border: 1px;
}
</style>