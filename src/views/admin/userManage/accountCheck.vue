<!-- 查看页面-->
<template>
  <div>
    <el-card style="margin-top: 100px">
      <el-table ref="filterTable" :data="
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
        <!-- <el-table-column
          prop="is_active"
          label="状态"
          sortable
          :filters="[
            { text: '激活', value: 1 },
            { text: '非激活', value: 0 },
          ]"
          :filter-method="filterState"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.is_active === 1 ? 'success' : 'danger'"
              disable-transitions
              ><span v-if="scope.row.is_active === 1">激活</span>
              <span v-if="scope.row.is_active === 0">非激活</span></el-tag
            >
          </template>
        </el-table-column> -->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="button" size="small" @click="handleCheck(scope.row)">查看</el-button>
            <!-- <el-button size="small" type="danger" @click="handleEdit(scope.row)">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </el-card>
  </div>
</template>

<script >
import axios from "axios";
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 6,
      tableData: [
        {
          name: "001",
          id: "001",
          role: 1,
          is_active: 0,
        },
        {
          name: "002",
          id: "002",
          role: 2,
          is_active: 0,
        },
        {
          name: "003",
          id: "003",
          role: 3,
          is_active: 0,
        },
      ],
    };
  },
  mounted() {
    console.log("created");
    axios({
      method: "GET",
      baseURL: '/api',
      url: "/user/getallusers"
    }).then((res) => {
      console.log(res.data.data);
      this.tableData = res.data.data;
    }).catch((err) => {
      console.log(err);
      this.$message({
        message: "服务器错误",
        type: "error",
      });
    })
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
            JSON.stringify({ id: row.id, role: row.identity })
          ),
        },
      });
    },

    handleEdit(row) {
      console.log(row);
      this.$router.push({
        path: "/adminHome/userManage/accountModify",
        query: {
          info: this.$Base64.encode(
            JSON.stringify({ id: row.id, role: row.role })
          ),
        },
      });
    },

    filterState(value, row) {
      return row.is_active === value;
    },
    filterIdentity(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },

};
</script>

<style scoped>
.button {
  background: #7986cb;
  color: white;
}

.button:hover {
  color: yellow;
}

.el-button--danger {
  color: white;
}
</style>