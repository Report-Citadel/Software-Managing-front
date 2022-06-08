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
        <el-dialog title="上传实验指导书" :visible.sync="dialogFormVisible">
          <el-form :model="Fileform">
            <el-form-item label="请输入上传者" :label-width="formLabelWidth">
              <el-input v-model="Fileform.uploader" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="文件" size="mini">
              <el-upload ref="upfile"
                         style="display: inline"
                         :auto-upload="false"
                         :on-change="handleChange1"
                         :file-list="fileList1"
                         action="#">
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="reloadFile">确 定</el-button>
          </div>
        </el-dialog>
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
    await axios.get('http://101.132.121.170:8018/course-server/class/experiment',{
      params:{
        class_id:this.$route.query.id
      }
    }).then(res => {
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

    async reloadFile(){
      let fd = new FormData()
      fd.append('experiment_id', this.Fileform.experiment_id)
      fd.append('uploader',this.Fileform.uploader)
      this.fileList1.forEach(item => {
        fd.append('file', item.raw)
      })
      await axios.post('http://101.132.121.170:8018/course-server/experiment/upload',fd).then(res => {
        console.log(res);
        this.$message.success("上传成功")
      })
      location.reload()
    },
  }
};
</script>
