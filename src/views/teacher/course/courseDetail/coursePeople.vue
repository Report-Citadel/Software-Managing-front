<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">添加学生</el-button>

    <el-dialog title="添加学生" :visible.sync="dialogFormVisible">
      <el-select
          v-model="selectId"
          style="margin: 10px"
          size="small"
          filterable
          clearable
          placeholder="请选择学生"
      >
        <el-option
            v-for="item in stuList"
            :key="item.id"
            :label="item.id + item.name"
            :value="item.id"
        ></el-option>
      </el-select>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="studentData" style="width: 100%">
      <el-table-column prop="id" label="学号" sortable />
      <el-table-column prop="name" label="姓名" sortable />
      <el-table-column prop="grade" label="年级" sortable />
      <el-table-column prop="major" label="专业" sortable />

    </el-table>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      c_id: "",
      selectId:"",
      dialogFormVisible:false,
      stuList:[],
      studentData:[]
    };
  },
  methods: {
    getParams: function () {
      this.c_id = this.$route.query.id
    },
    async getPeople(){
      await axios.get("/api/user/getstudentbyclassid",{
        params:{
          classId:this.$route.query.id
        }
      }).then(res=>{
        console.log(res)
        this.studentData=res.data.data
      })
    },
    async add(){
      await axios.post("/api/user/joinclass",{
        class_id:this.$route.query.id,
        id:this.selectId
      }).then(res=>{
        console.log(res)
        this.$message.success("添加成功")
      })
      location.reload()
    }
  },
  async mounted() {
    this.getParams()
    this.getPeople()
    await axios.get("/api/user/getallusers").then(res=>{
      console.log(res.data.data)
      for(var i=0; i<res.data.data.length; i++){
        if(res.data.data[i].identity == 5){
          this.stuList.push(res.data.data[i])
        }
      }
    })
  }

};
</script>

<style scoped>
.box-card {
  border-radius: 15px;
  box-shadow: 7px 7px 10px rgba(0, 0, 0, 0.15);
}
.el-card {
  margin-bottom: 20px;
  margin-top: 15px;
}
</style>
