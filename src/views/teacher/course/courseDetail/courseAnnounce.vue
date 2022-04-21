<template>
  <div>
    <el-container style="margin-top: 20px">
      <el-main>

        <el-timeline>
          <el-timeline-item
            v-for="data in annList"
            :key="data.ann_id"
            center
            placement="top"
            :timestamp="data.date"
          >
            <el-card>

            </el-card>
          </el-timeline-item>
        </el-timeline>

      </el-main>
      <el-aside></el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      c_id: "",
      title: "",
      content: "",
      contentRe: "",
      dialogVisible: false,
      dialogAddVisible: false,
      annList: [],
      formAnn: {
        title: "",
        content: "",
      },
    };
  },
  methods: {

    getParams: function () {
      this.id = sessionStorage.getItem("id");
      this.c_id = JSON.parse(this.$Base64.decode(this.$route.query.info))[
        "class_id"
      ];
      console.log("cid===" + this.c_id);
    },
  },
  mounted() {
    this.getParams();
  },
};
</script>

<style>
.el-button--danger {
  color: white;
}
.el-button--primary {
  color: white;
}
</style>
