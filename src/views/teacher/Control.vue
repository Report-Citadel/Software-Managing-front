<template>
  <div>
    <h1 style="color: #409eff">公告板</h1>
    <el-divider></el-divider>
    <h3>欢迎！</h3>

  <!-- 公告板部分主体在这里，可根据实际情况修改，这里的card部分仅为参考 -->
    <el-card class="box-card" style="margin-top: 20px; height: 460px">
      <el-collapse
        v-model="activeName"
        v-for="item in msgList.slice(
          (currentPage - 1) * pagesize,
          currentPage * pagesize
        )"
        :key="item.tea_message_id"
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
              circle
            ></el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item
          :title="item.create_time + item.title"
          :name="item.seq"
          style="color: #cc0033"
          v-if="item.is_read == 0"
        >
          <div>{{ item.content }}</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // 这里的data部分仅为参考
    return {
      value: new Date(),
      activeName: "0",
      msgList: [],

      pagesize: 8,
      currentPage: 1,
      t_id: sessionStorage.getItem("id"),
    };
  },

  methods: {

  },
};
</script>

<style>
.el-button--danger {
  color: white;
}
</style>