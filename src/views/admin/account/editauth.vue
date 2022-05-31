<template>
  <div style="height: 100%">
    <el-card style="height: 100%">
      <div slot="header" class="clearfix">
        <span><b>权限管理</b></span>
      </div>
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px" style="width: 500px"
        :hide-required-asterisk="true">
        <el-form-item label="ID：">
          <el-input v-model="id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="get_auth">确认</el-button>
        </el-form-item>
        <el-form-item label=" 账号类型：" prop="id">
          <el-input v-model="accountType"></el-input>
        </el-form-item>
        <el-form-item label="权限范围：">
          <el-select v-model="ClassValue" filterable placeholder="请选择" @change="handelScopeChange">
            <el-option v-for="item in classes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
          </el-checkbox>
          <div style="margin: 15px 0"></div>
          <el-checkbox-group v-model="checkedAuthorities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in authorities" :label="city" :key="city">{{ city }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-row style="width: 500px">
        <el-col :span="3" :offset="8">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-col>
        <el-col :span="3" :offset="2">
          <router-link to="/admin/user-management">
            <el-button>取消</el-button>
          </router-link>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
.el-card {
  border-radius: 15px;
}

.info {
  text-align: left;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.clearfix {
  font-size: 18px;
}

p {
  color: rgb(0, 0, 0);
  position: relative;
}

.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-leave-active {
  transition: all 0.3s;
}

.image {
  margin-top: -0.5cm;
}

.modify {
  margin-top: 1cm;
  margin-left: 5cm;
}

.pic {
  height: 45%;
  width: 45%;
  margin-top: 1cm;
  margin-left: 2.2cm;
}
</style>

<script>
// import { POSTInstructor, POSTStudent } from "../../API/http";
import axios from "axios";
export default {
  data() {
    return {
      id: '',
      accountType: "学生",
      authorities: ["创建账户", "删除账户", "修改账户信息", "修改权限信息"],
      checkedAuthorities: [],
      isIndeterminate: true,
      checkAll: false,
      options: [
        {
          value: "选项1",
          label: "1951111",
        },
        {
          value: "选项2",
          label: "1952222",
        },
        {
          value: "选项3",
          label: "1953333",
        },
        {
          value: "选项4",
          label: "1954444",
        },
        {
          value: "选项5",
          label: "1955555",
        },
      ],
      classes: [
        {
          value: "1",
          label: "用户管理权限",
        },
        {
          value: "2",
          label: "软件经济学",
        },
        {
          value: "3",
          label: "计算机组成原理",
        },
      ],
      value: "选项1",
      ClassValue: "1",
    };
  },

  methods: {
    columnStyle({ row, column, rowIndex, columnIndex }) {
      row;
      column;
      //console.log(row, column, rowIndex, columnIndex, "row");
      if (columnIndex == 0 && rowIndex < 3) {
        return "background:#FBFBEF; font-weight: 700;";
      } else if (columnIndex == 0) {
        return "background:#EFFBEF; font-weight: 700;";
      }
    },

    // submitForm: function (formName) {
    //   // this.$refs[formName].validate((valid) => {
    //   //   if (valid) {
    //   //     if (this.ruleForm.type === "student") {
    //   //       POSTStudent({
    //   //         id: this.ruleForm.id,
    //   //         email: this.ruleForm.email,
    //   //         name: this.ruleForm.name,
    //   //         classnum: this.ruleForm.classnum,
    //   //         schoolName: this.ruleForm.schoolName,
    //   //       })
    //   //         .then(() => {
    //   //           this.$message("添加成功");
    //   //           this.$router.go(-1);
    //   //         })
    //   //         .catch((err) => {
    //   //           console.log(err);
    //   //           this.$message("添加失败");
    //   //         });
    //   //     } else {
    //   //       POSTInstructor({
    //   //         id: this.ruleForm.id,
    //   //         name: this.ruleForm.name,
    //   //         schoolName: this.ruleForm.schoolName,
    //   //         email: this.ruleForm.email,
    //   //       })
    //   //         .then(() => {
    //   //           this.$message("添加成功");
    //   //           this.$router.go(-1);
    //   //         })
    //   //         .catch((err) => {
    //   //           console.log(err);
    //   //           this.$message("添加失败");
    //   //         });
    //   //     }
    //   //   }
    //   // });
    // },
    handleCheckAllChange(val) {
      this.checkedAuthorities = val ? this.authorities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handelScopeChange(val) {
      switch (val) {
        case "1":
          this.authorities = [
            "创建账户",
            "删除账户",
            "修改账户信息",
            "修改权限信息",
          ];
          break;
        default:
          this.authorities = [
            "发布实验项目",
            "参加实验",
            "上传课程文件",
            "批改报告",
            "分数管理",
            "关闭课程",
          ];
          break;
      }
    },
    submitForm() {
      this.$message({
        message: '权限提交成功',
        type: 'success'
      });
      //  this.$notify({
      //     title: '成功',
      //     message: '权限提交成功',
      //     type: 'success'
      //   });;
    },
    get_auth() {
      axios
        //params:可传递多个参数,固定写法,不能改,否则参数传递失败
        // .get("/api/user/getauth", { params: { id: this.id } })
        .get("/api/user/getallusers", { params: { id: this.id } })
        .then((data) => {
          if (data.data.code == 404) {
            this.$message({
              message: '用户不存在',
              type: 'error'
            });
          }
          console.log(data);
        })
        .catch((err) => {
          this.$message({
            message: '服务器错误',
            type: 'error'
          });
          console.log(err);
        });

    }
  },
};
</script>