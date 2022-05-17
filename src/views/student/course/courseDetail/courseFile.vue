<template>
  <div>
    <el-card>
      <el-tabs :tab-position="tabPosition" style="margin-top: 20px" >
        <el-tab-pane label="课件PPT" >
          <el-input
              style="margin-right: 10px;width: 23%;float:right"
              placeholder="请输入内容"
              v-model="search1"
              prefix-icon="el-icon-search">
          </el-input>
          <el-dialog title="上传PPT" :visible.sync="dialogFormPPTVisible">
            <el-form :model="PPTform">
              <el-form-item label="请输入PPT名称" :label-width="formLabelWidth">
                <el-input v-model="PPTform.name" autocomplete="off"></el-input>
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
              <el-button @click="dialogFormPPTVisible = false">取 消</el-button>
              <el-button type="primary" @click="loadppt">确 定</el-button>
            </div>
          </el-dialog>
          <el-table
              :data="tableData.filter(data => !search1|| data.name.toLowerCase().includes(search1.toLowerCase()))"
              style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column label="id" align="center" prop="courseware_id" v-if="false" />
            <el-table-column
                prop="time"
                label="日期"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="230">
            </el-table-column>
            <el-table-column
                prop="uploader"
                label="发布者"
                width="100">
            </el-table-column>
            <el-table-column
                prop="download_time"
                label="下载次数"
                width="90">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button size="mini" @click="downloadppt(scope.$index, scope.row)" :disabled="isnotOK1">下载</el-button>
                <el-button size="mini" @click="deleteppt(scope.$index, scope.row)" :disabled="isnotOK2">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="教材">
          <el-input
              style="margin-right: 10px;width: 23%;float:right"
              placeholder="请输入内容"
              v-model="search2"
              prefix-icon="el-icon-search">
          </el-input>
          <el-dialog title="上传教材" :visible.sync="dialogFormBOOKVisible">
            <el-form :model="BOOKform">
              <el-form-item label="请输入教材名称" :label-width="formLabelWidth">
                <el-input v-model="BOOKform.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="请输入教材作者" :label-width="formLabelWidth">
                <el-input v-model="BOOKform.writer" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="文件" size="mini">
                <el-upload ref="upfile"
                           style="display: inline"
                           :auto-upload="false"
                           :on-change="handleChange2"
                           :file-list="fileList2"
                           action="#">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormBOOKVisible = false">取 消</el-button>
              <el-button type="primary" @click="loadbook">确 定</el-button>
            </div>
          </el-dialog>
          <el-table
              :data="tableData1.filter(data => !search2|| data.name.toLowerCase().includes(search2.toLowerCase()))"
              style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column label="book_id" align="center" prop="book_id" v-if="false" />
            <el-table-column
                prop="time"
                label="日期"
                sortable
                width="170">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="170">
            </el-table-column>
            <el-table-column
                prop="uploader"
                label="发布者" width="90">
            </el-table-column>
            <el-table-column
                prop="download_time"
                label="下载次数" width="80">
            </el-table-column>
            <el-table-column
                prop="writer"
                label="作者" width="90">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button size="mini" @click="downloadbook(scope.$index, scope.row)" :disabled="isnotOK1">下载</el-button>
                <el-button size="mini" @click="deletebook(scope.$index, scope.row)" :disabled="isnotOK2">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="课外参考资料">
          <el-input
              style="margin-right: 10px;width: 23%;float:right"
              placeholder="请输入内容"
              v-model="search3"
              prefix-icon="el-icon-search">
          </el-input>
          <el-dialog title="上传参考资料" :visible.sync="dialogFormREFERENCEVisible">
            <el-form :model="REFERENCEform">
              <el-form-item label="请输入参考资料名称" :label-width="formLabelWidth">
                <el-input v-model="REFERENCEform.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="请输入参考资料作者" :label-width="formLabelWidth">
                <el-input v-model="REFERENCEform.writer" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="文件" size="mini">
                <el-upload ref="upfile"
                           style="display: inline"
                           :auto-upload="false"
                           :on-change="handleChange3"
                           :file-list="fileList3"
                           action="#">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormREFERENCEVisible = false">取 消</el-button>
              <el-button type="primary" @click="loadreference">确 定</el-button>
            </div>
          </el-dialog>
          <el-table
              :data="tableData2.filter(data => !search3|| data.name.toLowerCase().includes(search3.toLowerCase()))"
              style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column label="reference_id" align="center" prop="reference_id" v-if="false" />
            <el-table-column
                prop="time"
                label="日期"
                sortable
                width="170">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="170">
            </el-table-column>
            <el-table-column
                prop="uploader"
                label="发布者" width="90">
            </el-table-column>
            <el-table-column
                prop="download_time"
                label="下载次数" width="80">
            </el-table-column>
            <el-table-column
                prop="writer"
                label="作者" width="90">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button size="mini" @click="downloadreference(scope.$index, scope.row)" :disabled="isnotOK1">下载</el-button>
                <el-button size="mini" @click="deletereference(scope.$index, scope.row)" :disabled="isnotOK2">删除</el-button>
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
import storage from "good-storage";
export default {
  inject:['reload'],
  async created() {
    let query = this.$route.query;
    var params = {
      project_id: query.project_id,
    }
    console.log(query)
    await axios.get('http://101.132.121.170:8090/courseware/get'+'?project_id='+params.project_id).then(res => {
      this.tableData =  res.data;
      console.log(res)
    })
    await axios.get('http://101.132.121.170:8090/book/get'+'?project_id='+params.project_id).then(res => {
      this.tableData1 =  res.data;
      console.log(res)
    })
    await axios.get('http://101.132.121.170:8090/reference/get'+'?project_id='+params.project_id).then(res => {
      this.tableData2 =  res.data;
      console.log(res)
    })
    var params3 = {
      type: '责任教师' ,
    }
    await axios.get('http://101.132.121.170:8090/permission/get'+'?role='+params3.type).then(res => {
      console.log(res)
      if(this.contains("上传资料",res.data.permission)){
        this.isnotOK=false
      }
      else {
        this.isnotOK=true
      }
      if(this.contains("下载资料",res.data.permission)){
        this.isnotOK1=false
      }
      else {
        this.isnotOK1=true
      }
      if(this.contains("删除资料",res.data.permission)){
        this.isnotOK2=false
      }
      else {
        this.isnotOK2=true
      }
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
      PPTform: {
        name: '',
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
    handleChange2 (file, fileList) {
      this.fileList2 = fileList
    },
    handleChange3 (file, fileList) {
      this.fileList3 = fileList
    },
    loadppt(){
      let fd = new FormData()
      fd.append('project_id', this.project_id)
      fd.append('name', this.PPTform.name)
      fd.append('uploader', storage.get('user_name', ""))
      this.fileList1.forEach(item => {
        fd.append('file', item.raw)
      })
      axios.post('http://101.132.121.170:8090/courseware/upload',fd).then(res => {
        console.log(res)
        var params = {
          project_id:this.project_id,
        }
        axios.get('http://101.132.121.170:8090/courseware/get'+'?project_id='+params.project_id).then(res => {
          this.tableData =  res.data;
          console.log(res)
        })
      })
      this.dialogFormPPTVisible = false
    },
    loadbook(){
      let fd = new FormData()
      fd.append('project_id', this.project_id)
      fd.append('name', this.BOOKform.name)
      fd.append('writer', this.BOOKform.writer)
      fd.append('uploader', storage.get('user_name', ""))
      this.fileList2.forEach(item => {
        fd.append('file', item.raw)
      })
      axios.post('http://101.132.121.170:8090/book/upload',fd).then(res => {
        console.log(res)
        var params = {
          project_id:this.project_id,
        }
        axios.get('http://101.132.121.170:8090/book/get'+'?project_id='+params.project_id).then(res => {
          this.tableData1 =  res.data;
          console.log(res)
        })
      })
      this.dialogFormBOOKVisible = false
    },
    loadreference(){
      let fd = new FormData()
      fd.append('project_id', this.project_id)
      fd.append('name', this.REFERENCEform.name)
      fd.append('writer', this.REFERENCEform.writer)
      fd.append('uploader', storage.get('user_name', ""))
      this.fileList3.forEach(item => {
        fd.append('file', item.raw)
      })
      axios.post('http://101.132.121.170:8090/reference/upload',fd).then(res => {
        console.log(res)
        var params = {
          project_id:this.project_id,
        }
        axios.get('http://101.132.121.170:8090/reference/get'+'?project_id='+params.project_id).then(res => {
          this.tableData2 =  res.data;
        })
      })
      this.dialogFormREFERENCEVisible = false
    },
    downloadppt(index, row) {
      console.log(row)
      window.location.href=row.file
    },
    downloadbook(index, row) {
      console.log(row)
      window.location.href=row.file
    },
    downloadreference(index, row) {
      console.log(row)
      window.location.href=row.file
    },
    deleteppt(index, row) {
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
    deletebook(index, row) {
      console.log("shanchu"+row.book_id);
      var params = {
        book_id: row.book_id
      }
      axios.delete('http://101.132.121.170:8090/book/delete',{data: params}).then(res => {
        console.log(res)
        axios.get('http://101.132.121.170:8090/book/get'+'?project_id='+this.project_id).then(res => {
          this.tableData1 = res.data;
          console.log(res)
        })
      })
    },
    deletereference(index, row) {
      console.log("shanchu"+row.reference_id);
      var params = {
        reference_id: row.reference_id
      }
      axios.delete('http://101.132.121.170:8090/reference/delete',{data: params}).then(res => {
        console.log(res)
        axios.get('http://101.132.121.170:8090/reference/get'+'?project_id='+this.project_id).then(res => {
          this.tableData2 =  res.data;
          console.log(res)
        })
      })
    }
  }
};
</script>
