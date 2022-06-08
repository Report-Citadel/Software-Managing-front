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
        <el-table-column prop="end_time" label="截止日期" sortable />

        <el-table-column
          prop="status"
          label="状态"
          sortable
          :filters="[
            { text: '未过期', value: '未过期' },
            { text: '已过期', value: '已过期' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '未过期' ? 'primary' : 'success'"
              disable-transitions
              >{{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="权重" sortable />
>>>>>>> 0a6192a78aa98aa4abf1c5b3e5581ae39be3f582

        <el-table-column>
          <template #header>
            <el-input v-model="search" placeholder="请输入实验名称" />
          </template>
          <template #default="scope">
            <v-row>
              <v-col>
                <v-btn small dark @click="handleGrade(scope.row)">批改 </v-btn>
              </v-col>
              <v-col v-if="scope.row.file !==  null">
                <v-btn small dark  @click="dialogFormVisible = true"
                       :disabled="isnotOK"
                >上传实验指导书
                </v-btn
                >
              </v-col>
              <v-col v-else>
                <v-btn small dark
                >查看实验指导书
                </v-btn
                >
              </v-col>
            </v-row>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="上传实验指导书" :visible.sync="dialogFormVisible">
        <el-form :model="Fileform">
          <el-form-item label="请输入实验" :label-width="formLabelWidth">
            <el-input
              v-model="Fileform.experiment_id"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="请输入实验指导书名称"
            :label-width="formLabelWidth"
          >
            <el-input v-model="Fileform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请输入上传者" :label-width="formLabelWidth">
            <el-input v-model="Fileform.uploader" autocomplete="off"></el-input>
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
          <el-button @click="dialogFormVisible = false">取 消</el-button>
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
      },
      experimentList: [
        {
          ex_id: 1,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "敏感性分析",
          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 2,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "不确定性分析",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 3,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "供需分析",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 4,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "盈亏平衡",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 5,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "项目经济指标测算",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 6,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "经济寿命周期",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 7,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "对抗练习",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 8,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "软件成本估算",

          status: "未过期",
          weight: "0.3",
        },
        {
          ex_id: 9,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "多人博弈",

          status: "未过期",
          weight: "0.3",
        },
      ],
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

    loadFile() {
      let fd = new FormData();
      fd.append("experiment_id", this.Fileform.experiment_id);
      fd.append("name", this.Fileform.name);
      fd.append("uploader", this.Fileform.uploader);
      this.fileList1.forEach((item) => {
        fd.append("file", item.raw);
      });
      axios
        .post("http://101.132.121.170:8018/course-server/experiment/upload", fd)
        .then((res) => {
          console.log(res);
        });
      this.dialogFormVisible = false;
    },

    handleGrade(row) {
      switch (row.ex_id) {
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
    this.getParams();
    this.getCourseEx();
  },
};
</script>
