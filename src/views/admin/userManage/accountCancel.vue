<template>
  <div>
    <el-scrollbar>
      <el-card style="margin-top: 100px">
        <el-table ref="multipleTable" :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        " style="width: 100%">
          <el-table-column prop="name" label="姓名" sortable />
          <el-table-column prop="id" label="学号" sortable />
          <el-table-column prop="identity" label="身份权限" sortable :filters="[
            { text: '学生', value: 1 },
          
            { text: '教师', value: 2 },
            { text: '助教', value: 3 },
          ]" :filter-method="filterIdentity">
            <template slot-scope="scope">
              <span v-if="scope.row.identity === '1'">管理员</span>
              <span v-if="scope.row.identity === '2'">责任教师</span>
              <span v-if="scope.row.identity === '3'">普通教师</span>
              <span v-if="scope.row.identity === '4'">助教</span>
              <span v-if="scope.row.identity === '5'">学生</span>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" sortable />


          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button size="small" @click="handleCheck(scope.row)">查看</el-button> -->
              <el-button size="small" type="danger" @click="handleCheckCancelO(scope.row)">注销</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pagesize" layout="total,prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script >
import axios from "axios";
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 6,
      multipleSelection: [],
      tableData: null,
    };
  },
  methods: {
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },

    handleCheck(row) {
      console.log(row);
      this.$router.push({
        path: "/adminHome/userManage/accountInfo",
        query: {
          info: this.$Base64.encode(
            JSON.stringify({ id: row.id, role: row.role })
          ),
        },
      });
    },

    filterState(value, row) {
      return row.state === value;
    },
    filterIdentity(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },

    cancelOneAccount(row) {
      console.log(row.id)
      //注销单个账户
      axios({
        method: "POST",
        baseURL: '/api',
        url: "/user/deleteuser",
        params: {
          id: row.id
        }
      }).then((res) => {
        console.log(res.data.data);
        // this.$message({
        //   message: "注销成功",
        //   type: "success",
        // });
      }).catch((err) => {
        console.log(err);
        this.$message({
          message: "服务器错误",
          type: "error",
        });
      })
    },

    handleCheckCancelO(row) {
      this.$confirm("确认注销账户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.cancelOneAccount(row);

          this.$message({
            type: "success",
            message: "注销成功!",
          });
          this.getUserData();
          //document.execCommand("Refresh");
          //location.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消注销操作",
          });
        });
      this.getUserData();
    },

    getUserData() {
      //获取所有用户所有信息
      axios({
        method: "GET",
        baseURL: '/api',
        url: "/user/getallusers"
      }).then((res) => {
        console.log(res.data.data);
        this.tableData = res.data.data;
        console.log(this.tableData)
        console.log(555)
      }).catch((err) => {
        console.log(err);
        this.$message({
          message: "服务器错误",
          type: "error",
        });
      })
    },
  },
  mounted() {
    this.getUserData()
  },
};
</script>

<style scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: hidden;
}

.el-button--danger {
  color: white;
}

.el-button--primary {
  color: white;
}
</style>