<template>
    <div>
      <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新建拍卖</el-button>
      <div style="width:100%;">
        <el-table :data="auctions" >
           <el-table-column label="拍卖标题"  width="180" align="center" prop="auctionTitle" />
            <el-table-column label="开始时间" align="center" prop="startTime" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.startTime.split('T')[0]}}&nbsp;{{scope.row.startTime.split('T')[1]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" align="center" prop="endTime" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.endTime.split('T')[0]}}&nbsp;{{scope.row.endTime.split('T')[1]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center" prop="description" width="160" />
             <el-table-column label="操作" align="center"  width="160">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
        </el-table>
      </div>
      <el-dialog title="新建/修改拍卖" :visible.sync="open" width="780px" append-to-body>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="拍卖标题" prop="auctionTitle">
                <el-input v-model="ruleForm.auctionTitle"></el-input>
            </el-form-item>
            <el-form-item label="实验时间" required>
               <el-date-picker
                v-model="ruleForm.duration"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                
                >
                <!-- @change="timeRange" -->
              </el-date-picker>
               
            </el-form-item>
          

            <el-form-item label="实验说明" prop="desc">
                <el-input type="textarea" v-model="ruleForm.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
            </el-form>

    </el-dialog>
      
            

    </div>
</template>
<script>
import qs from 'qs'
 
  export default {
    components: {
           
 },
    data() {
      return {
        auctions:[],
        current_auction:'',
        open:false,
        ruleForm: {
          auctionId:undefined,
          initiatorId: '20001',
          description:undefined,
          auctionTitle:undefined,
          startTime:undefined,
          endTime:undefined,
          duration:undefined,
          
        },
        rules: {
          auctionTitle: [
            { required: true, message: '请输入拍卖标题', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
         
          startTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          endTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          des: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        itemKey:0,
      };
    },
    methods: {
        submitForm() {
          if(this.ruleForm.auctionId==undefined){
            this.axios.post('http://106.14.97.109:8081/auction/auctionEntity/postAuction',
            qs.stringify(
            {
              initiatorId:"20001",
              des:this.ruleForm.description,
              title:this.ruleForm.auctionTitle,
              startTime:this.ruleForm.duration[0],
              endTime:this.ruleForm.duration[1],
            })
          )
            .then(res=>{
              console.log(res);
            this.$message({
                message: '创建成功',
            type: 'success'})
            this.getdata();
            this.open=false;
           this.resetForm();
            }
            
            )
            .catch(res=>{
              console.log(res);
            this.$message.error("创建失败")
            })
          }
            else{
              this.axios.post('http://106.14.97.109:8081//auction/auctionEntity/updateAuction',
            qs.stringify(
            {
              auctionId:this.ruleForm.auctionId,
              initiatorId:"20001",
              des:this.ruleForm.description,
              title:this.ruleForm.auctionTitle,
              startTime:this.ruleForm.duration[0],
              endTime:this.ruleForm.duration[1],
            })
          )
            .then(res=>{
              console.log(res);
            this.$message({
                message: '修改成功',
            type: 'success'})
            this.open=false;
            this.resetForm();
            this.getdata();
            }
            
            )
            .catch(res=>{
              console.log(res);
            this.$message.error("修改失败")
            })
            }
      },


  
      cancel() {
      this.open = false;
      this.resetForm();
       
    },
    handleAdd(){
      this.open=true;
    },
    handleUpdate(row){
      this.open=true;
      this.axios.get("http://106.14.97.109:8081/auction/auctionEntity/getAuction?id="+row.auctionId)
      .then(res=>{
        this.ruleForm=res.data.data;
        this.ruleForm.duration = [new Date(this.ruleForm.startTime), new Date(this.ruleForm.endTime)];
        console.log(this.ruleForm)
      })
    },
    handleDelete(row){
      this.axios.get("http://106.14.97.109:8081/auction/auctionEntity/deleteAuction",{params:{auctionId:row.auctionId}})
       .then(res=>{
              console.log(res);
            this.$message({
                message: '删除成功',
            type: 'success'})
            this.getdata();
            }
            
            )
            .catch(res=>{
              console.log(res);
            this.$message.error("删除失败")
            })
           
    },
      resetForm() {
        this.ruleForm= {
          auctionId:undefined,
          initiatorId: '20001',
          description:undefined,
          auctionTitle:undefined,
          startTime:undefined,
          endTime:undefined,
          duration:undefined,
          
        };
      },
  getdata(){
 this.axios.get('http://106.14.97.109:8081/auction/auctionEntity/getAllAuction')
   .then(res=>{
     this.auctions=res.data.data;
   })
  }
  


    },
    mounted(){
     this.getdata();
    }
  }
 
</script>

<style>

</style>