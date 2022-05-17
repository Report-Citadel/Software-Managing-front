<template>
  <div>
    <el-container>
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
              <el-link @click="handleTitle(data)">
                <h2>{{ data.title }}</h2></el-link
              >

              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                style="float: right; margin-left: 5px"
                @click="handleDelete(data)"
              ></el-button>

              <el-button
                type="primary"
                icon="el-icon-zoom-in"
                circle
                size="mini"
                style="float: right"
                @click="handleTitle(data)"
              ></el-button>
            </el-card>
          </el-timeline-item>
        </el-timeline>

        <el-dialog :visible.sync="dialogVisible" :title="this.title" center>
          <v-textarea filled auto-grow :value="content" disabled></v-textarea>
          <div slot="footer">
            <el-button type="primary" @click="dialogVisible = false"
              >确定</el-button
            >
          </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogAddVisible" title="新增公告" center>
          <el-form
            :model="formAnn"
            style="margin: 40px 65px 0px 25px"
            label-width="80px"
          >
            <el-form-item
              label="标题"
              :required="true"
              prop="title"
              status-icon="true"
            >
              <el-input v-model="formAnn.title" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item
              label="内容"
              :required="true"
              prop="content"
              status-icon="true"
            >
              <el-input v-model="formAnn.content" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="dialogAddVisible = false">取消</el-button>
            <el-button type="primary" @click="addAnn()">确定</el-button>
          </div>
        </el-dialog>
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
      annList: [
        {
          ann_id: 1,
          date: "2022-01-01 00:00:00",
          title: "title",
          content: "content",
          name: "name",
        },
      ],
      formAnn: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    handleTitle(data) {
      this.title = data.title;
      this.content = data.content;
      this.dialogVisible = true;
    },
    handleDelete(row) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteAnnounce(row);

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    deleteAnnounce() {},

    handleAnn() {
      this.dialogAddVisible = true;
    },
    addAnn() {},

    getAnnList() {},

    getParams: function () {
      this.id = sessionStorage.getItem("id");
      this.c_id = this.$route.query.info;
    },
  },
  mounted() {
    this.getParams();
    //this.getAnnList();
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
