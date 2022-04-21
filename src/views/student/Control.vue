<template>
  <div>
    <h1 style="color: #409eff">消息页面</h1>
    <el-divider></el-divider>
    <h3>欢迎！</h3>
    <!-- <el-container style="margin-top:20px;">
      <el-main >
        <el-calendar v-model="value"></el-calendar>
      </el-main>
    </el-container> -->
    <el-card class="box-card" style="margin-top: 20px; height: 460px">
      <el-collapse
        v-model="activeName"
        v-for="item in msgList.slice(
          (currentPage - 1) * pagesize,
          currentPage * pagesize
        )"
        :key="item.stu_message_id"
        accordion
      >
        <el-collapse-item
          :title="item.create_time + item.title"
          :name="item.seq"
          style="color: #666666"
          v-if="item.is_read == 1"
        >
          <div>
            {{ item.content }}
            <el-button
              type="danger"
              icon="el-icon-delete"
              style="float: right"
              @click="deleteMsg(item.stu_message_id)"
              circle
            ></el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item
          :title="item.create_time + item.title"
          :name="item.seq"
          style="color: #cc0033"
          v-if="item.is_read == 0"
          @click.native="isRead(item.stu_message_id)"
        >
          <div>{{ item.content }}</div>
        </el-collapse-item>
      </el-collapse>

      <el-pagination
        layout="total, prev, pager, next, jumper"
        :total="lenList"
        class="pig"
        @current-change="handleCurrentChange"
        float="buttom"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      activeName: "0",
      msgList: [],
      lenList: 0,
      pagesize: 8,
      currentPage: 1,
      s_id: sessionStorage.getItem("id"),
    };
  },
  mounted() {
    this.getStudentMsg();
  },
  methods: {
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    getStudentMsg() {

    },
    isRead() {

    },
    deleteMsg() {

    },
  },
};
</script>

<style >
.el-button--danger {
  color: white;
}
</style>
