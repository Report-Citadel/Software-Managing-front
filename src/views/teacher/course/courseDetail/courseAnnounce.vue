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
      {{ course_id }} {{ course_name }}
    </div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="查看公告" name="show"
          ><ShowNotice ref="showNotice"></ShowNotice
        ></el-tab-pane>
        <el-tab-pane label="新增公告" name="add"
          ><NewNotice></NewNotice
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
      course_id: "",
      course_name: "",
    };
  },
  methods: {
    getParams: function () {
      this.course_id = this.$route.query.id;
      this.course_name = this.$route.query.name;
    },
  },
  created() {
    this.getParams();
  },
};
</script>