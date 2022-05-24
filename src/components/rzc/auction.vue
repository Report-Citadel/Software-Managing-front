<template>
    <div>
    <!--布局容器-->
              
      <el-container style="height: 100%;min-height:100%;" direction="vertical">
        <el-container>
          <!--左侧侧边栏-->

          
          <!--主要区域容器-->
          <div  class="courses">
            <!-- <img src="../../../public/tongji_front1.jpg" style="width:100% ; margin-top:-1%" class="image">
                    <div><hr /></div> -->
                    <!-- <span><h2>【               拍 卖 出 价               】</h2></span>
                    <div><hr /></div> -->
                    
            <div style="width:100%;">
              <el-button type="primary" @click="Exit()" style="float:left;">←返回</el-button>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-steps :active="1" simple>
                    <el-step title="拍卖详情" icon="el-icon-picture"></el-step>
                    <el-step title="拍卖出价" icon="el-icon-edit"></el-step>
                    <el-step title="供需曲线" icon="el-icon-upload"></el-step>
                </el-steps>
                <p></p>
                 <el-card class="box-card" >
                                <div class="text item">
                                    <el-row><h2>[ 拍 卖 详 情 ]</h2>
                                    <div>{{ruleForm.desc}}</div>
                                    </el-row>     
                                    <!-- <el-row><span  style="width:auto; display:block; text-align:left; line-height:30px" >{{FormData.desc}}</span></el-row> -->
                                </div>
                            </el-card>
                            <p></p>
                <div class="demo-image__lazy">
                    <img src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0430%2F2f7df6c3p00qscvh2001zc000m800cqm.png&thumbnail=660x2147483647&quality=80&type=jpg">
                </div>
            <div>
              <el-form ref="form" label-width="80px" class="demo-form-inline">
                <el-row>
                  <el-col :span="9">
                <el-form-item label="选择角色">
                  
                  <el-select v-model="role" placeholder="请选择">
                    <el-option
                      label="供给者"
                      value="false">
                    </el-option>
                    <el-option
                      label="需求者"
                      value="true">
                    </el-option>
                  </el-select>
                </el-form-item>
                </el-col>
                  <el-col :span="9">
                <el-form-item label="报价">
                  <el-input v-model="price"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="2">
                <el-form-item><el-button type="primary" @click="submitForm()">提交</el-button></el-form-item>
                </el-col>
                <el-col :span="2">
                <el-form-item><el-button @click="resetForm()">重置</el-button></el-form-item>
                 </el-col>
                </el-row>
                <el-row>
                  <el-col :span="2" :offset="22"><el-button @click="toNext()">下一步</el-button></el-col>
                </el-row>
                </el-form>
                          </div>
            <!-- <div style="margin:10px 50px;text-align:left;"><h3>请输入您愿意出价的金额</h3></div>
            <div class="inp">
            <el-input
                v-model="price"
                placeholder="请输入0~999内的数字"
                ></el-input>
            </div>
           
            <div style="float:left;">
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </div> -->
            </el-form>
          </div>
        </el-container>
      </el-container>
    </div>
</template>
<script>
// import Navigator from './instru_index1.vue'
  export default {
//     components: {
//             Navigator
//  },
    data() {
      return {
        aucId:'',
        role:'',
        ruleForm: {
          name: '',
          id: '',
          region: '',
          date1: '',
          delivery: false,
          type: [],
          resource: '',
          rule: '',
          process: '',
          desc: ''
        },
        price:'',
        // urls: [
        //     '../../public/auction.jpg',
        // //   'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        
        // ],
        rules: {
          desc: [
            { required: true, message: '请填写实验小结', trigger: 'blur' }
          ]
        }
      };
    },
          mounted(){
        console.log("begin")
        this.aucId=this.$route.query.id;
        this.axios.get('http://106.14.97.109:8081/auctionEntity/getAuction?id='+this.aucId)
        .then(res=>{
          console.log(res.data.data.description)
          this.ruleForm.desc=res.data.data.description
          console.log(this.ruleForm)
        })
    },
    methods: {

      submitForm() {
        // this.axios.post('http://106.14.97.109:8081/participationEntity/postPrice',
        //   {
        //   aucId:Number(this.aucId),
        //   price:Number(this.price),
        //   role: Boolean(this.role),
        //   userId:1953606,

        // })
        //this.axios.post('http://106.14.97.109:8081/participationEntity/postPrice?aucId='+this.aucId+'&price='+this.price+'&role='+this.role+'&userId='+localStorage.getItem('user-id'))
        this.axios.post('http://106.14.97.109:8081/participationEntity/postPrice?aucId='+this.aucId+'&price='+this.price+'&role='+this.role+'&userId=1953606')
        .then(res=>{
          if(res.data.code==200){
            this.$message({
            message: '提交成功',
          type: 'success'})
          
          }
          else {
            this.$message.error(res.data.message)
          }
          
         
        })
        .catch(res=>{
          console.log(res);
          this.$message.error("提交失败")
        })
        
      },
      resetForm(){
        this.price='';
        this.role='';
      },
      toNext(){
        this.$router.push({
          path: `/studentHome/concreteCourse/DemandSupplyCurve`,
          query: {
            id: this.aucId
          },
        });
      },
      Exit(){
     this.$router.push({
          path: "/studentHome/concreteCourse/DemandSupply",
        });
   }
    }
  }
</script>

<style scoped>
.el-aside{
  overflow: hidden;
}
.navigator{
  position:fixed;
  margin:-0.53% auto;
  left:-6%;
  z-index:5;
}
/* .el-main{
  margin-left: 14%;
} */
.inp{
  width:800px;
  margin:0px 50px;
  float: left;
}
</style>