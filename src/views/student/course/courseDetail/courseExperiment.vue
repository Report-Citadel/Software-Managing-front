
<template>
  <div>
    <el-card>
      <el-table
        ref="filterTable"
        row-key="deadline"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="experiment_title" label="实验名称">
          <template slot-scope="scope"
            ><el-link @click="toExperiment(scope.row)">{{
              scope.row.experiment_title
            }}</el-link>
          </template></el-table-column
        >
        <el-table-column prop="end_time" label="截止日期" sortable />
        <el-table-column prop="status" label="实验状态" sortable />
        <el-table-column prop="score" label="成绩" sortable />
        <el-table-column prop="is_submit" label="提交状态" sortable>
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.is_submit === true"
              key="已提交"
              type="success"
              effect="plain"
            >
              已提交
            </el-tag>

            <el-tag
              v-if="scope.row.is_submit === false"
              key="未提交"
              type="danger"
              effect="plain"
            >
              未提交
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="120%">
          <template slot-scope="scope">
            <el-button size="small" @click="toExperiment(scope.row)"
              >查看</el-button
            >

            <el-button
              size="small"
              @click="toExFill(scope.row)"
              v-if="
                scope.row.type === '在线提交' && scope.row.status === '未过期'
              "
              >在线填写</el-button
            >
            <el-button
              size="small"
              @click="handleUpload(scope.row)"
              v-if="
                scope.row.type === '提交文件' && scope.row.status === '未过期'
              "
              >上传文件</el-button
            >
            <el-button
              type="primary"
              plain
              size="small"
              @click="goToOnline(scope.row.ex_id, scope.row.end_time)"
              v-if="scope.row.status === '未过期'"
              >模拟</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total,  prev, pager, next, jumper"
        :total="tableData.length"
        filterState
      >
      </el-pagination>
    </el-card>
    <el-dialog :visible.sync="fileDialog" title="上传实验报告" center>
      <el-upload
        class="upload-import"
        ref="uploadImport"
        action="https://baidu.com/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :before-remove="beforeRemove"
        :file-list="fileList"
        :multiple="true"
        :auto-upload="false"
        accept=""
      >
        <el-button type="primary">选取文件</el-button>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fileDialog = false">取消</el-button>
        <el-button type="success" @click="uploadFile()">上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script >
export default {
  data() {
    return {
      sid: "",
      class_id: "",
      ex_id: "",
      currentPage: 1,
      pagesize: 7,
      tableData: [
        {
          ex_id: 1,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "敏感性分析",
          is_submit: false,
          status: "未过期",
          score: null,
          type: "在线提交",
        },
        {
          ex_id: 2,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "不确定性分析",
          is_submit: false,
          status: "未过期",
          score: null,
          type: "提交文件",
        },
        {
          ex_id: 3,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "供需分析",
          is_submit: false,
          status: "未过期",
          score: 98,
          type: "提交文件",
        },
        {
          ex_id: 4,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "盈亏平衡",
          is_submit: false,
          status: "未过期",
          score: 98,
          type: "提交文件",
        },
        {
          ex_id: 5,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "项目经济指标测算",
          is_submit: false,
          status: "未过期",
          score: 98,
          type: "提交文件",
        },
        {
          ex_id: 6,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "经济寿命周期",
          is_submit: false,
          status: "未过期",
          score: 98,
          type: "提交文件",
        },
        {
          ex_id: 7,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "对抗练习",
          is_submit: false,
          status: "未过期",
          score: 98,
          type: "提交文件",
        },
        {
          ex_id: 8,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "软件成本估算",
          is_submit: false,
          status: "未过期",
          score: 98,
          type: "提交文件",
        },
        {
          ex_id: 9,
          end_time: "2021-12-2 12:30:21",
          experiment_title: "多人博弈",
          is_submit: false,
          status: "未过期",
          score: 98,
          type: "提交文件",
        },
      ],
      fileList: [],
      fileDialog: false,
    };
  },
  methods: {
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    goToOnline(ex_id, end_time) {
      console.log(ex_id, end_time);
    },
    handlePreview(file) {
      console.log(file);
    },

    handleRemove(file) {
      this.fileList.pop(file);
    },

    handleChange(file) {
      this.fileList.push(file);
    },

    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleUpload(row) {
      this.fileDialog = true;
      this.ex_id = row.ex_id;
    },
    handleExamine() {
      this.$router.push({
        path: "/studentHome/concreteCourse/FillExper",
        query: { sid: this.sid },
      });
    },

    toExperiment(row) {
      this.$router.push({
        path: "/studentHome/concreteCourse/ConExper",
        query: {
          info: this.$Base64.encode(JSON.stringify(row.ex_id)),
        },
      });
    },
    toExFill(row) {
      this.$router.push({
        path: "/studentHome/concreteCourse/FillExper",
        query: {
          info: this.$Base64.encode(row.ex_id),
          title: this.$Base64.encode(row.experiment_title),
        },
      });
    },
    uploadFile() {},
    getEx() {},
    checkResponse() {},
    getParams: function () {
      this.class_id = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "class_id"
      ];
      this.sid = sessionStorage.getItem("id");
    },
  },
  mounted() {
    this.getParams();
    this.getEx();
  },
};
</script>

<style >
.el-button--primary {
  color: white;
}
.el-button--success {
  color: white;
}
</style>
