<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="data in AnnList"
        :key="data.id"
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
          title: "课程即将中期考核",
          content: "大家注意时间",
          date: "2020-12-1",
        },
        {
          ann_id: 1,
          title: "课程即将开始",
          content: "大家注意时间",
          date: "2020-11-1",
        },
      ],
      AnnList: [],
      class_id: "123123",
    };
  },
  methods: {
    handleTitle(data) {
      this.title = data.title;
      this.content = data.content;
      this.dialogVisible = true;
    },
    getAnnList() {
      this.axios
        .get("/yxk/getNoticeList", {
          params: { id: 20001 },
          crossDomain: true,
        })
        .then((response) => {
          console.log("getAnnList", response);
          this.AnnList = response.data;
          /*for (var i = 0; i < this.AnnList.length; i++) {
            this.AnnList[i].createTime = this.AnnList[i].createTime.slice(
              0,
              this.AnnList[i].createTime.indexOf(".")
            );
            this.AnnList[i].createTime = this.AnnList[i].createTime.replace(
              "T",
              " "
            );
          }*/
        })
        .catch(function () {});
    },
    getParams: function () {
      console.log("cid===" + this.class_id);
    },
  },
  mounted() {
    this.getAnnList();
  },
};
</script>
<style>
.el-button--primary {
  color: white;
}
</style>
