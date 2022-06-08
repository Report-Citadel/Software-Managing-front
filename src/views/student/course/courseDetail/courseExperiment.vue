<template>
  <div>
    <el-card>
      <el-table
          ref="filterTable"
          row-key="deadline"
          :data="
          experimentList
            .filter(
              (data) =>
                !search ||
                data.experiment_title
                  .toLowerCase()
                  .includes(search.toLowerCase())
            )
            .slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
          style="width: 100%"
      >
        <el-table-column prop="experiment_title" label="实验名称" sortable>
          <template slot-scope="scope"
          >
            <el-link @click="specialFunc(scope.row)">{{
                scope.row.name
              }}
            </el-link>
          </template>
        </el-table-column>

        <el-table-column>
          <template #header>
            <el-input v-model="search" placeholder="请输入实验名称" />
          </template>
          <template #default="scope">
            <v-row>
              <v-col>
                <v-btn small dark @click="handleGrade(scope.row)">参与 </v-btn>
              </v-col>
              <v-col>
                <v-btn small dark @click="dialogFormVisible=true;Fileform.experiment_id=scope.row.experiment_id">上传实验报告 </v-btn>
              </v-col>
              <v-col v-if="scope.row.file ===  null">
                暂无实验指导书
              </v-col>
              <v-col v-else>
                <v-btn small dark @click="downloadFile(scope.$index, scope.row)">查看实验指导书</v-btn>
              </v-col>
            </v-row>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="上传实验报告" :visible.sync="dialogFormVisible">
        <el-form :model="Fileform">
          <el-form-item label="请输入上传者" :label-width="formLabelWidth">
            <el-input v-model="Fileform.uploader" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请输入文件名" :label-width="formLabelWidth">
            <el-input v-model="Fileform.file_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文件" size="mini">
            <el-upload
                ref="upfile"
                style="display: inline"
                :auto-upload="false"
                :on-change="handleChange1"
                :file-list="fileList1"
                action="#"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="uploadReport()">取 消</el-button>
          <el-button type="primary" @click="loadFile">确 定</el-button>
        </div>
      </el-dialog>

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total,  prev, pager, next, jumper"
          :total="experimentList.length"
          filterState
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      c_id: "",
      dialogFormVisible: false,
      isnotOK: false,
      dialogVisible: false,
      search: "",
      currentPage: 1,
      pagesize: 9,
      fileList: [],
      fileList1: [],
      Fileform: {
        name: "",
        experiment_id: "",
        uploader: "",
        file_name:""
      },
      experimentList: [],
    };
  },
  methods: {
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.status === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    handlePreview(file) {
      console.log(file);
    },

    handleRemove(file, fileListS) {
      console.log(file, fileListS);
    },

    handleChange(file) {
      console.log(file);
      this.fileListS.push(file);
      console.log(this.fileListS);
    },

    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleChange1(file, fileList) {
      this.fileList1 = fileList;
    },

    async loadFile() {
      let fd = new FormData();
      fd.append("experiment_id", this.Fileform.experiment_id);
      fd.append("uploader", this.Fileform.uploader);
      this.fileList1.forEach((item) => {
        fd.append("file", item.raw);
      });
      await axios
          .post("http://101.132.121.170:8018/course-server/experiment/upload", fd)
          .then((res) => {
            console.log(res);
            this.$message.success("上传成功！")
          });
      location.reload()
    },
    // eslint-disable-next-line no-unused-vars
    async uploadReport(row){
      let fd = new FormData();
      fd.append("experiment_id", this.Fileform.experiment_id);
      fd.append("class_id", this.$route.query.id);
      fd.append("student_id",sessionStorage.getItem("id"));
      fd.append("student_name",this.Fileform.uploader);
      fd.append("file_name",this.Fileform.file_name);

      this.fileList1.forEach(item => {
        fd.append('file', item.raw)
      })

      axios.post("http://101.132.121.170:8018/course-server/report/upload",fd).then((res) => {
        console.log(res);
        this.$message.success("上传成功！")
      });
    },
    handleGrade(row) {
      switch (row.ex_id) {
        case 1:
          this.$router.push({
            path: "/studentHome/concreteCourse/FillSimulater",
            query: {
              id: row.ex_id,
              title: row.experiment_title,
            },
          });
          break;
        case 2:
          this.$router.push({
            path: "/experiment/uncertainty-analysis",
            query: {
              id: row.ex_id,
              title: row.experiment_title,
            },
          });
          break;
        case 4:
          this.$router.push({
            path: "/studentHome/concreteCourse/BalanceCostExp",
            // query: {
            //   id: row.ex_id,
            //   title: row.experiment_title,
            // },
          });
          break;
        default:
          this.$router.push({
            path: "/teacherHome/concreteCourse/stuExperList",
            query: {
              ex_id: row.ex_id,
              ex_type: row.ex_type,
            },
          });
      }
    },
    downloadFile(index, row) {
      // console.log(row)
      // console.log("down")

      window.location.href=row.file
    },
    handleFile() {
      this.dialogVisible = true;
    },
    async getCourseEx() {
      await axios.get("http://101.132.121.170:8018/course-server/class/experiment",{
        params:{
          class_id:this.$route.query.id
        }
      }).then(res=>{
        console.log(res)
        this.experimentList = res.data
      })
    },

    specialFunc(row) {
      switch (row.ex_id) {
        case 3:
          this.$router.push({
            path: "/teacherHome/concreteCourse/Exper/DemandSupplyManage",
            query: {
              id: row.ex_id,
              title: row.experiment_title,
            },
          });
          break;
      }
    },
  },
  mounted() {
    this.getCourseEx();
  },
};
</script>
