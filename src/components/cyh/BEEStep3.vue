<template>
  <el-main>
    <h1 class="title">实验报告数据</h1>
    <el-card class="formCard">
      <el-row class="item">
        <el-col :span="16"> 单位产品销售价格（单位：元）: </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="6" class="data">
          {{ answerForm.price }}
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="16"> 单位产品变动成本（单位：元）: </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="6" class="data">
          {{ answerForm.variableCost }}
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="16"> 固定成本（单位：元）: </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="6" class="data">
          {{ answerForm.fixedCost }}
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="16"> 盈亏平衡点（单位：只）: </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="6" class="data">
          {{ answerForm.bep }}
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="16"> 盈亏平衡点作业率: </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="6" class="data">
          {{ answerForm.jobRate }}
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="16"> 安全边际率: </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="6" class="data">
          {{ answerForm.safeRate }}
        </el-col>
      </el-row>
    </el-card>
    <h1 class="title">实验小结</h1>
    <div style="margin-left: 135px; width: 600px">
      <div name="editor" id="editor" class="editor"></div>
    </div>
    <el-row style="margin-top: 50px">
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="3">
        <el-button icon="el-icon-arrow-left" @click="previousStep"
          >上一页</el-button
        >
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="3">
        <el-button type="success" icon="el-icon-document-checked" @click="save"
          >暂存</el-button
        >
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-check" @click="submit"
          >提交</el-button
        >
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  name: "BEEStep3",
  props: ["answerForm"],
  data() {
    return {
      editor: null,
      editorData: "<p>asd000</p>",
      test: "<strong>asd</strong>",
    };
  },
  methods: {
    previousStep() {
      this.$emit("previousStep");
    },
    submit() {
      this.$emit("submit", this.answerForm, 0);
    },
    save() {
      this.$emit("submit", this.answerForm, 1);
    },
  },
  mounted() {
    this.editor = new wangEditor(`#editor`);
    // 配置 onchange 回调函数，将数据同步到 vue 中
    this.editor.config.onchange = (newHtml) => {
      this.answerForm.conclusion = newHtml;
    };
    this.editor.config.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo", // 重复
    ];
    // 创建编辑器
    this.editor.create();
    this.editor.txt.html(this.answerForm.conclusion);
    console.log("1", this.editor);
  },
  beforeDestroy() {
    // 销毁编辑器
    this.editor.destroy();
    this.editor = null;
  },
};
</script>

<style scoped>
.title {
  width: 600px;
  font-size: 130%;
  color: black;
  text-align: left;
  margin-left: 150px;
}
.formCard {
  width: 550px;
  margin-top: 20px;
  margin-left: 150px;
}
.item {
  margin-top: 20px;
  margin-bottom: 20px;
}
.data {
  font-weight: bolder;
}
</style>