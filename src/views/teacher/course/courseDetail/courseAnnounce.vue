<template>
  <div>
    <div
      style="
        margin-bottom: 5px;
        text-align: left;
        font-size: 30px;
        font-weight: bold;
      "
    >
      {{ course_id }}
    </div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="查看公告" name="show"
          ><ShowNotice :id="c_id" ref="showNotice"></ShowNotice
        ></el-tab-pane>
        <el-tab-pane label="新增公告" name="add"
          ><NewNotice :id="c_id"></NewNotice
        ></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import NewNotice from "../courseManage/announce/NewNotice.vue";
import ShowNotice from "../courseManage/announce/ShowNotice.vue";
export default {
  components: {
    NewNotice,
    ShowNotice,
  },
  data() {
    return {
      activeName: "show",
      c_id: "",
      //course_name: "",
    };
  },
  methods: {
    getParams: function () {
      this.c_id = this.$route.query.id;
    },
  },
  created() {
    this.getParams();
  },
};
</script>