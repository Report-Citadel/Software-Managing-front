<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="data in annList"
        :key="data.ann_id"
        placement="top"
        :timestamp="data.date"
      >
        <el-card
          style="box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.15); margin-right: 20%"
        >
          <h2>{{ data.title }}</h2>
          <el-link @click="handleTitle(data)"
            ><p v-html="data.content"></p
          ></el-link>
          <p style="text-align: right">{{ data.name }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-dialog :visible.sync="dialogVisible" :title="this.title" center>
      <span class="dialogBack">{{ this.content }}</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      dialogVisible: false,
      annList: [
        {
          ann_id: 1,
          date: "2022-01-01 00:00:00",
          title: "title",
          content: "content",
          name: "name",
        },
      ],
      class_id: "42034501",
    };
  },
  methods: {
    handleTitle(data) {
      this.title = data.title;
      this.content = data.content;
      this.dialogVisible = true;
    },
    getAnnList() {},
    getParams: function () {
      this.id = sessionStorage.getItem("id");
      this.class_id = this.$route.query.info;
    },
  },
  mounted() {
    this.getParams();
    this.getAnnList();
  },
};
</script>

<style>
.el-button--primary {
  color: white;
}
</style>