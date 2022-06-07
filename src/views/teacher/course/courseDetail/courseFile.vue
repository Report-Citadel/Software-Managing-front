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
<!--          <el-dialog title="上传实验指导书" :visible.sync="dialogFormPPTVisible">-->
<!--            <el-form :model="Fileform">-->
<!--              <el-form-item label="请输入" :label-width="formLabelWidth">-->
<!--                <el-input v-model="Fileform.uploader" autocomplete="off"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="请输入实验指导书名称" :label-width="formLabelWidth">-->
<!--                <el-input v-model="Fileform.name" autocomplete="off"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="请输入上传者" :label-width="formLabelWidth">-->
<!--                <el-input v-model="Fileform.uploader" autocomplete="off"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="文件" size="mini">-->
<!--                <el-upload ref="upfile"-->
<!--                           style="display: inline"-->
<!--                           :auto-upload="false"-->
<!--                           :on-change="handleChange1"-->
<!--                           :file-list="fileList1"-->
<!--                           action="#">-->
<!--                  <i class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                </el-upload>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--              <el-button @click="dialogFormPPTVisible = false">取 消</el-button>-->
<!--              <el-button type="primary" @click="loadFile">确 定</el-button>-->
<!--            </div>-->
<!--          </el-dialog>-->
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
                <el-button size="mini" @click="downloadFile(scope.$index, scope.row)" :disabled="isnotOK1">下载</el-button>
                <el-button size="mini" @click="deleteFile(scope.$index, scope.row)" :disabled="isnotOK2">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
<!--        <el-tab-pane label="教材">-->
<!--          <el-button type="primary" style="float:right;margin-right: 10px"  @click="dialogFormBOOKVisible = true" :disabled="isnotOK">上传</el-button>-->
<!--          <el-input-->
<!--              style="margin-right: 10px;width: 23%;float:right"-->
<!--              placeholder="请输入内容"-->
<!--              v-model="search2"-->
<!--              prefix-icon="el-icon-search">-->
<!--          </el-input>-->
<!--          <el-dialog title="上传教材" :visible.sync="dialogFormBOOKVisible">-->
<!--            <el-form :model="BOOKform">-->
<!--              <el-form-item label="请输入教材名称" :label-width="formLabelWidth">-->
<!--                <el-input v-model="BOOKform.name" autocomplete="off"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="请输入教材作者" :label-width="formLabelWidth">-->
<!--                <el-input v-model="BOOKform.writer" autocomplete="off"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="文件" size="mini">-->
<!--                <el-upload ref="upfile"-->
<!--                           style="display: inline"-->
<!--                           :auto-upload="false"-->
<!--                           :on-change="handleChange2"-->
<!--                           :file-list="fileList2"-->
<!--                           action="#">-->
<!--                  <i class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                </el-upload>-->
<!--              </el-form-item>-->
<!--            </el-form>-->

<!--            <div slot="footer" class="dialog-footer">-->
<!--              <el-button @click="dialogFormBOOKVisible = false">取 消</el-button>-->
<!--              <el-button type="primary" @click="loadbook">确 定</el-button>-->
<!--            </div>-->
<!--          </el-dialog>-->
<!--          <el-table-->
<!--              :data="tableData1.filter(data => !search2|| data.name.toLowerCase().includes(search2.toLowerCase()))"-->
<!--              style="width: 100%"-->
<!--              :default-sort = "{prop: 'date', order: 'descending'}">-->
<!--            <el-table-column label="book_id" align="center" prop="book_id" v-if="false" />-->
<!--            <el-table-column-->
<!--                prop="time"-->
<!--                label="日期"-->
<!--                sortable-->
<!--                width="170">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="name"-->
<!--                label="姓名"-->
<!--                width="170">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="uploader"-->
<!--                label="发布者" width="90">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="download_time"-->
<!--                label="下载次数" width="80">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="writer"-->
<!--                label="作者" width="90">-->
<!--            </el-table-column>-->
<!--            <el-table-column>-->
<!--              <template slot-scope="scope">-->
<!--                <el-button size="mini" @click="downloadbook(scope.$index, scope.row)" :disabled="isnotOK1">下载</el-button>-->
<!--                <el-button size="mini" @click="deletebook(scope.$index, scope.row)" :disabled="isnotOK2">删除</el-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane label="课外参考资料">-->
<!--          <el-button type="primary" style="float:right;margin-right: 10px"  @click="dialogFormREFERENCEVisible = true" :disabled="isnotOK">上传</el-button>-->
<!--          <el-input-->
<!--              style="margin-right: 10px;width: 23%;float:right"-->
<!--              placeholder="请输入内容"-->
<!--              v-model="search3"-->
<!--              prefix-icon="el-icon-search">-->
<!--          </el-input>-->
<!--          <el-dialog title="上传参考资料" :visible.sync="dialogFormREFERENCEVisible">-->
<!--            <el-form :model="REFERENCEform">-->
<!--              <el-form-item label="请输入参考资料名称" :label-width="formLabelWidth">-->
<!--                <el-input v-model="REFERENCEform.name" autocomplete="off"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="请输入参考资料作者" :label-width="formLabelWidth">-->
<!--                <el-input v-model="REFERENCEform.writer" autocomplete="off"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="文件" size="mini">-->
<!--                <el-upload ref="upfile"-->
<!--                           style="display: inline"-->
<!--                           :auto-upload="false"-->
<!--                           :on-change="handleChange3"-->
<!--                           :file-list="fileList3"-->
<!--                           action="#">-->
<!--                  <i class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                </el-upload>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--              <el-button @click="dialogFormREFERENCEVisible = false">取 消</el-button>-->
<!--              <el-button type="primary" @click="loadreference">确 定</el-button>-->
<!--            </div>-->
<!--          </el-dialog>-->
<!--          <el-table-->
<!--              :data="tableData2.filter(data => !search3|| data.name.toLowerCase().includes(search3.toLowerCase()))"-->
<!--              style="width: 100%"-->
<!--              :default-sort = "{prop: 'date', order: 'descending'}">-->
<!--            <el-table-column label="reference_id" align="center" prop="reference_id" v-if="false" />-->
<!--            <el-table-column-->
<!--                prop="time"-->
<!--                label="日期"-->
<!--                sortable-->
<!--                width="170">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="name"-->
<!--                label="姓名"-->
<!--                width="170">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="uploader"-->
<!--                label="发布者" width="90">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="download_time"-->
<!--                label="下载次数" width="80">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="writer"-->
<!--                label="作者" width="90">-->
<!--            </el-table-column>-->
<!--            <el-table-column>-->
<!--              <template slot-scope="scope">-->
<!--                <el-button size="mini" @click="downloadreference(scope.$index, scope.row)" :disabled="isnotOK1">下载</el-button>-->
<!--                <el-button size="mini" @click="deletereference(scope.$index, scope.row)" :disabled="isnotOK2">删除</el-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-tab-pane>-->
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
      isnotOK:false,
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
    loadFile(){
      let fd = new FormData()

      fd.append('experiment_id', this.Fileform.experiment_id)
      fd.append('name', this.Fileform.name)
      fd.append('uploader',this.Fileform.uploader)
      this.fileList1.forEach(item => {
        fd.append('file', item.raw)
      })
      axios.post('http://101.132.121.170:8018/course-server/experiment/upload',fd).then(res => {
        console.log(res);
        axios.get('http://101.132.121.170:8018/course-server/experiment/get/all').then(res => {
          this.tableData =  res.data;
        })
      })
      this.dialogFormPPTVisible = false
    },
    downloadFile(index, row) {
      console.log(row)
      window.location.href=row.file
    },
    deleteFile(index, row) {
      console.log("shanchu"+row.courseware_id);
      var params = {
        courseware_id: row.courseware_id
      }
      axios.delete('http://101.132.121.170:8090/courseware/delete',{data: params}).then(res => {
        console.log(res)
        axios.get('http://101.132.121.170:8090/courseware/get'+'?project_id='+this.project_id).then(res => {
          this.tableData =  res.data;
          console.log(res)
        })
      })
    },
  }
};
</script>
