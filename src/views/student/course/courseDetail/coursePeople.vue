<template>
  <div>


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
