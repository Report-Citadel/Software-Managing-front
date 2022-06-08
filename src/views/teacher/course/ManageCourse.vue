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
            <el-descriptions-item label="课程">{{
              a.class_name
            }}</el-descriptions-item>
            <el-descriptions-item label="责任教师">{{
                a.professor
              }} {{a.professor_name}}</el-descriptions-item>
            <el-descriptions-item label="班级助教">{{
              a.ta_id
            }} {{a.ta_name}}</el-descriptions-item>
            <el-descriptions-item label="班级老师">{{
              a.teacher_id
            }} {{a.teacher_name}}</el-descriptions-item>
          </el-descriptions>
          <el-button
              type="text"
              style="float: right; margin-top: -20px"
              @click="addStuVisible = true;selectClassId=a.class_id"
          >新增学生</el-button>
          <el-button
            type="text"
            style="float: right; margin-top: -20px"
            @click="deleteclass(a.class_id)"
            :disabled="isnotOK1"
            >删除</el-button>
        </el-card>
        <el-dialog title="人员管理" :visible.sync="dialogFormVisible">
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
            <el-table-column prop="id" label="学号" sortable />
            <el-table-column prop="name" label="姓名" sortable />
            <el-table-column prop="grade" label="年级" sortable />
            <el-table-column prop="major" label="专业" sortable />
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
          <el-input
              type="text"
              v-model="newclass.class_name"
              size="small"
              style="width: 210px; margin: 10px"
              placeholder="请输入班名"
          ></el-input>
          <div>
            <el-select
              v-model="newclass.teacherId"
              style="margin: 10px"
              size="small"
              filterable
              clearable
              placeholder="请选择老师"
            >
              <el-option
                v-for="item in options1"
                :key="item.id"
                :label="item.id + item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div>
            <el-select
              v-model="newclass.taId"
              style="margin: 10px"
              size="small"
              filterable
              clearable
              placeholder="请选择助教"
            >
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.id+item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div style="margin: 10px">
            <el-checkbox-group v-model="experimentList">
              <el-checkbox label="1">敏感性分析</el-checkbox>
              <el-checkbox label="2">不确定性分析</el-checkbox>
              <el-checkbox label="3">供需分析</el-checkbox>
              <el-checkbox label="4">盈亏平衡</el-checkbox>
              <el-checkbox label="5">项目经济测算指标</el-checkbox>
              <el-checkbox label="6">经济寿命周期</el-checkbox>
              <el-checkbox label="7">对抗练习</el-checkbox>
              <el-checkbox label="8">软件成本估算</el-checkbox>
              <el-checkbox label="9">多人博弈</el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
              <el-button
                @click="submit"
                size="small"
                type="text"
                :disabled="isnotOK"
                >OK</el-button
              >
          </div>
        </div>
<!--        <el-dialog title="班级信息" :visible.sync="tableVisible">-->
<!--          <el-table style="width: auto" border :data="tableData" id="tableData">-->
<!--            <template v-for="(item, index) in tableHead">-->
<!--              <el-table-column-->
<!--                :prop="item.column_name"-->
<!--                :label="item.column_comment"-->
<!--                :key="index"-->
<!--                v-if="item.column_name !== 'id'"-->
<!--              ></el-table-column>-->
<!--            </template>-->
<!--          </el-table>-->
<!--        </el-dialog>-->
      </el-card>
    </div>
    <el-dialog title="添加学生" :visible.sync="addStuVisible">
      <el-select
          v-model="selectId"
          style="margin: 10px"
          size="small"
          filterable
          clearable
          placeholder="请选择学生"
      >
        <el-option
            v-for="item in stuList"
            :key="item.id"
            :label="item.id + item.name"
            :value="item.id"
        ></el-option>
      </el-select>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import axios from "axios";

export default {
  name: "FillShippingCost",
  data() {
    return {
      experimentList:[],
      isnotOK: false,
      isnotOK1: false,
      tableVisible: false,
      addStuVisible:false,
      dialogFormVisible: false,
      newclass: [
        {
          class_id: "",
          class_name:"",
          student_list: "",
          taId: "",
          teacherId: "",
          professor:sessionStorage.getItem("id"),
        },
      ],
      classes: [],
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
      stuList:[],
      selectId:"",
      selectClassId:""
    };
  },
  async created() {
    await axios.get("/class/course-server/class/get/all").then((res) => {
      console.log(res);
      this.classes = res.data;
    });

    await axios.get("/api/user/getallusers").then(res=>{
      console.log(res.data.data)
      for(var i=0; i<res.data.data.length; i++){
        if(res.data.data[i].identity == 3 || res.data.data[i].identity == 2){
          this.options1.push(res.data.data[i])
        }
        else if(res.data.data[i].identity == 4){
          this.options2.push(res.data.data[i])
        }
        else if(res.data.data[i].identity == 5){
          this.stuList.push(res.data.data[i])
        }
      }
    })
  },

  methods: {
    contains(subs, str) {
      return str.indexOf(subs) >= 0 ? true : false;
    },

    async addStu(){
      await axios.post("/api/user/joinclass",{
        class_id:this.selectClassId,
        id:this.selectId
      }).then(res=>{
        console.log(res)
        this.$message.success("添加成功")
      })
      this.addStuVisible=false
      this.selectClassId=""
      this.selectId=""
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
          "http://101.132.121.170:8018/class/get" +
            "?class_id=" +
            params.class_id
        )
        .then((res) => {
          console.log(res.data.student_list);
          this.tableDatastu = res.data.student_list;
        });
    },
    async deleteclass(class_id) {
      await this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
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
            .delete("/class/course-server/class/delete", {
              data: params,
            })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              location.reload()

            });

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async submit() {

      var params = {
        class_id: this.newclass.class_id,
        class_name: this.newclass.class_name,

        ta_id: this.newclass.taId,
        teacher_id: this.newclass.teacherId,
        professor:sessionStorage.getItem("id"),
        experiment_list:this.experimentList.toString()
      };
      console.log("aaaaaa",params.experimentList)
      await axios
        .post("/class/course-server/class/new", params)
        .then((res) => {
          console.log(res);
          this.$alert("班级创建成功！", "提示", {
            confirmButtonText: "确定",
          });
        });
      location.reload()
    },
    async dialogvisiblea(class_id) {
      this.dialogFormVisible = true;
      await axios.get("/api/user/getstudentbyclassid",{
        params:{
          classId:class_id
        }
      }).then(res=>{
        console.log(res)
        this.tableDatastu=res.data.data
      })

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
