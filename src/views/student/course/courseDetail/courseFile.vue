<template>
  <div>
    <el-card>
      <el-tabs :tab-position="tabPosition" style="margin-top: 20px" >
        <el-tab-pane label="实验指导书" >
          <!--          <el-button type="primary" style="float:right;margin-right: 10px"  @click="dialogFormPPTVisible = true" :disabled="isnotOK">上传</el-button>-->
          <el-input
              style="margin-right: 10px;width: 23%;float:right"
              placeholder="请输入内容"
              v-model="search1"
              prefix-icon="el-icon-search">
          </el-input>
          <el-table
              :data="tableData.filter(data => !search1|| data.name.toLowerCase().includes(search1.toLowerCase()))"
              style="width: 100%"
          >
            <el-table-column label="id" align="center" prop="courseware_id" v-if="false" />
            <el-table-column
                prop="experiment_id"
                label="实验"
                width="100">
            </el-table-column>
            <el-table-column
                prop="name"
                label="资料名称"
                width="250">
            </el-table-column>
            <el-table-column
                prop="uploader"
                label="发布者"
                width="200">
            </el-table-column>
            <el-table-column
                label="操作"
                width="250"
            >
              <template slot-scope="scope">
                <el-button size="mini" @click="downloadFile(scope.$index, scope.row)" :disabled="isnotOK1">下载/预览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script scoped>
import axios from "axios";
export default {
  inject:['reload'],
  async created() {
    let query = this.$route.query;
    console.log(query)
    await axios.get('http://101.132.121.170:8018/course-server/experiment/get/all').then(res => {
      this.tableData =  res.data;
      console.log(res)
    })
  },
  data() {
    return {
      dialogFormVisible: false,
      isnotOK: false,
      isnotOK1:false,
      isnotOK2:false,
      search1: '',
      search2: '',
      search3: '',
      tabPosition: 'left',
      tableData: [],
      tableData1:[],
      tableData2: [],
      project_id:this.$route.query.project_id,
      dialogFormPPTVisible:false,
      dialogFormBOOKVisible:false,
      dialogFormREFERENCEVisible:false,
      Fileform: {
        name: '',
        experiment_id:'',
        uploader:'',
      },
      BOOKform:{
        name:'',
        writer:'',
      },
      REFERENCEform:{
        name:'',
        writer:'',
      },
      fileList1: [],
      fileList2: [],
      fileList3: [],
    };
  },

  methods: {
    contains(subs,str){
      return str.indexOf(subs)>=0?true:false;
    },
    handleChange1 (file, fileList) {
      this.fileList1 = fileList
    },

    downloadFile(index, row) {
      console.log(row)
      window.location.href=row.file
    },
  }
};
</script>
