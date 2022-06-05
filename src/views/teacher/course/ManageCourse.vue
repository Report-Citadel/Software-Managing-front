<template>
  <div>
    <div class="wrapper">
      <div class="wrapper-content" v-for="a in classes" v-bind:key="a.class_id">
        <el-card>
          <el-descriptions
            :column="1"
            title="班级"
            @click.native="dialogvisiblea(a.class_id)"
          >
            <el-descriptions-item label="班号">{{
              a.class_id
            }}</el-descriptions-item>
            <el-descriptions-item label="班级人数">{{
              a.student_num
            }}</el-descriptions-item>
            <el-descriptions-item label="班级助教">{{
              a.ta_name
            }}</el-descriptions-item>
            <el-descriptions-item label="班级老师">{{
              a.teacher_name
            }}</el-descriptions-item>
          </el-descriptions>
          <el-button
            type="text"
            style="float: right; margin-top: -20px"
            @click="deleteclass(a.class_id)"
            :disabled="isnotOK1"
            >删除</el-button
          >
        </el-card>
        <el-dialog title="班级信息" :visible.sync="dialogFormVisible">
          <div>
            <el-button type="text" @click="lookclass(a.class_id)"
              >查看班级所有学生信息</el-button
            >
          </div>
          <el-table
            :data="
              tableDatastu.filter(
                (data) =>
                  !search ||
                  data.student_id.toLowerCase().includes(search.toLowerCase())
              )
            "
            style="width: 100%"
          >
            <el-table-column label="学号" prop="student_id"> </el-table-column>
            <el-table-column label="姓名" prop="student_name">
            </el-table-column>
            <el-table-column align="right">
              <template slot="header">
                <el-input
                  v-model.lazy="search"
                  size="mini"
                  placeholder="输入关键字搜索"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
      <el-card
        style="
          width: 32%;
          margin-left: 5px;
          margin-top: 5px;
          text-align: center;
          height: auto;
        "
      >
        <el-descriptions :column="1" title="新建班级"> </el-descriptions>
        <div>
          <el-input
            type="text"
            v-model="newclass.class_id"
            size="small"
            style="width: 210px; margin: 10px"
            placeholder="请输入班号"
          ></el-input>
          <div>
            <el-select
              v-model="newclass.teacher"
              style="margin: 10px"
              size="small"
              filterable
              clearable
              placeholder="请选择老师"
            >
              <el-option
                v-for="item in options1"
                :key="item.teacher_id"
                :label="item.teacher_name"
                :value="item.teacher_id"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </div>
          <div>
            <el-select
              v-model="newclass.ta_list"
              style="margin: 10px"
              size="small"
              multiple
              filterable
              clearable
              placeholder="请选择助教"
            >
              <el-option
                v-for="item in options2"
                :key="item.ta_id"
                :label="item.ta_name"
                :value="item.ta_id"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </div>
          <!--                  实验多选框-->
          <div>
            <el-upload
              ref="input"
              action="/"
              style="margin: 10px"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="importExcel"
              type="file"
            >
              <el-button slot="trigger" size="small" type="text"
                >上传文件</el-button
              >
              <el-button
                @click="tableVisible = true"
                size="small"
                type="text"
                style="margin-left: 10px"
                >查看学生</el-button
              >
              <el-button @click="exportToExcel" size="small" type="text"
                >导出</el-button
              >
              <el-button
                @click="submit"
                size="small"
                type="text"
                :disabled="isnotOK"
                >OK</el-button
              >
            </el-upload>
          </div>
        </div>
        <el-dialog title="班级信息" :visible.sync="tableVisible">
          <el-table style="width: auto" border :data="tableData" id="tableData">
            <template v-for="(item, index) in tableHead">
              <el-table-column
                :prop="item.column_name"
                :label="item.column_comment"
                :key="index"
                v-if="item.column_name !== 'id'"
              ></el-table-column>
            </template>
          </el-table>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import axios from "axios";

export default {
  name: "FillShippingCost",
  async created() {
    await axios.get("/class/course-server/class/get/all").then((res) => {
      console.log(res);
      this.classes = res.data;
    });
    // await axios.get("http://101.132.121.170:8090/class/teacher").then((res) => {
    //   console.log(res);
    //   this.options1 = res.data;
    // });
    // await axios.get("http://101.132.121.170:8090/class/ta/all").then((res) => {
    //   console.log(res);
    //   this.options2 = res.data;
    //   this.optionsown2 = res.data;
    // });
    // var params3 = {
    //   type: "责任教师",
    // };
    // await axios
    //   .get(
    //     "http://101.132.121.170:8090/permission/get" + "?role=" + params3.type
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     if (this.contains("创建班级", res.data.permission)) {
    //       this.isnotOK = false;
    //     } else {
    //       this.isnotOK = true;
    //     }
    //     if (this.contains("删除班级", res.data.permission)) {
    //       this.isnotOK1 = false;
    //     } else {
    //       this.isnotOK1 = true;
    //     }
    //   });
  },
  data() {
    return {
      isnotOK: false,
      isnotOK1: false,
      tableVisible: false,
      dialogFormVisible: false,
      newclass: [
        {
          class_id: "",
          student_list: "",
          ta_list: [],
          teacher: "",
        },
      ],
      classes: [
        {
          class_id: 4129302,
          student_num: 42,
          ta_name: "王明",
          teacher_name: "黄杰",
        },
        {
          class_id: 4129303,
          student_num: 42,
          ta_name: "王明",
          teacher_name: "黄杰",
        },
        {
          class_id: 4129304,
          student_num: 42,
          ta_name: "王明",
          teacher_name: "黄杰",
        },
      ],
      options1: [],
      options2: [],
      owntas: [],
      optionsown2: [],
      tableHead: [],
      tableData: [],
      tableDatastu: [],
      classaddta: "",
      classdeleteta: "",
      search: "",
    };
  },

  methods: {
    contains(subs, str) {
      return str.indexOf(subs) >= 0 ? true : false;
    },
    importExcel(file) {
      const types = file.name.split(".")[1];
      const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt"].some(
        (item) => item === types
      );
      if (!fileType) {
        alert("格式错误！请重新选择");
        return;
      }
      this.file2Xce(file).then((tabJson) => {
        if (tabJson && tabJson.length > 0) {
          const data = {};
          const this_ = this;
          // let params = Object.assign({}, this_.reviewForm);
          this_.card = JSON.stringify(tabJson[0].sheet);
          data.card = this_.card; //中英文转化
          this_.excelToTable(data); //调用生成table方法
        }
      });
    },
    file2Xce(file) {
      return new Promise(function (resolve) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = e.target.result;
          this.wb = XLSX.read(data, {
            type: "binary",
          });
          const result = [];
          this.wb.SheetNames.forEach((sheetName) => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName]),
            });
          });
          resolve(result);
        };
        reader.readAsBinaryString(file.raw);
      });
    },
    // 把excel用转化为table
    excelToTable(data) {
      const outData = JSON.parse(data.card);
      console.log("excel数据：  " + JSON.stringify(outData));
      // this.tableData=JSON.stringify(outData)
      const tableHeadList = [];
      let num = 1;
      for (const tableHead2 in outData[0]) {
        const tableHead1 = {};
        tableHead1["column_name"] = "column_name" + num;
        tableHead1["column_comment"] = tableHead2;
        num = num + 1;
        tableHeadList.push(tableHead1);
      }
      console.log("表头数据：" + JSON.stringify(tableHeadList));
      this.tableHead = tableHeadList; //定制表头
      console.log(this.tableHead);
      const tableDataList = [];
      for (let j = 0; j < outData.length; j++) {
        const tableData1 = {};
        for (let k = 0; k < tableHeadList.length; k++) {
          console.log(
            "表头字段：" +
              tableHeadList[k]["column_name"] +
              ",表头数据：" +
              tableHeadList[k]["column_comment"]
          );
          for (const outDataKey in outData[j]) {
            if (tableHeadList[k]["column_comment"] === outDataKey) {
              tableData1[tableHeadList[k]["column_name"]] =
                outData[j][outDataKey];
            }
          }
        }
        tableDataList.push(tableData1);
      }
      this.tableData = tableDataList; //给表格内容赋值
    },
    exportToExcel() {
      let et = XLSX.utils.table_to_book(document.getElementById("tableData")); //此处传入table的DOM节点
      let etOut = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([etOut], {
            type: "application/octet-stream",
          }),
          "trade-publish.xlsx"
        ); //trade-publish.xlsx 为导出的文件名
      } catch (e) {
        console.log(e, etOut);
      }
      return etOut;
    },
    lookclass(class_id) {
      var params = {
        class_id: class_id,
      };
      axios
        .get(
          "http://101.132.121.170:8090/class/get" +
            "?class_id=" +
            params.class_id
        )
        .then((res) => {
          console.log(res.data.student_list);
          this.tableDatastu = res.data.student_list;
        });
    },
    deleteclass(class_id) {
      this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var params = {
            class_id: class_id,
          };
          console.log(params.class_id);
          axios
            .delete("http://localhost:8100/class/delete", {
              data: params,
            })
            .then((res) => {
              console.log(res);
              axios.get("http://localhost:8100/class/all").then((res) => {
                console.log("res.data");
                this.classes = res.data;
              });
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    submit() {
      console.log(this.newclass);
      var n = this.tableData.length;
      var S_id = "";
      for (var i = 0; i < n; i++) {
        S_id = S_id + this.tableData[i].column_name1 + ",";
      }
      console.log(S_id);
      console.log(this.newclass.ta_list.toString());
      console.log(this.newclass.teacher);
      var params = {
        class_id: this.newclass.class_id,
        student_list: S_id,
        ta_list: this.newclass.ta_list.toString(),
        teacher: this.newclass.teacher,
      };
      axios
        .post("http://101.132.121.170:8090/class/open", params)
        .then((res) => {
          console.log(res);
          this.$alert("班级创建成功！", "提示", {
            confirmButtonText: "确定",
          });
          axios.get("http://101.132.121.170:8090/class/all").then((res) => {
            console.log("nihaokainbfwqy");
            console.log(res.data);
            this.classes = res.data;
          });
        });
    },
    dialogvisiblea(class_id) {
      this.dialogFormVisible = true;
      var params = {
        class_id: class_id,
      };
      axios
        .get(
          "http://101.132.121.170:8090/class/ta/get" +
            "?class_id=" +
            params.class_id
        )
        .then((res) => {
          this.owntas = [];
          console.log(res);
          var item = res.data.ta_name.split(",");
          console.log(item);
          for (let i = 0; i < item.length; i++) {
            this.owntas.push({
              ta_id: item[i],
              ta_name: item[i],
            });
          }
        });
    },
    addta(class_id) {
      console.log(class_id);
      var params = {
        class_id: class_id,
        ta_name: this.classaddta,
      };
      axios
        .put("http://101.132.121.170:8090/class/ta/add", params)
        .then((res) => {
          console.log(res);
        });
      axios.get("http://101.132.121.170:8090/class/all").then((res) => {
        console.log("res.data");
        this.classes = res.data;
      });
    },
    deleteta(class_id) {
      var params = {
        class_id: class_id,
        ta_name: this.classdeleteta,
      };
      axios
        .delete("http://101.132.121.170:8090/class/ta/delete", { data: params })
        .then((res) => {
          console.log(res);
        });
      axios.get("http://101.132.121.170:8090/class/all").then((res) => {
        console.log("res.data");
        this.classes = res.data;
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.wrapper-content {
  width: 32%;
  padding: 5px;
}
</style>
