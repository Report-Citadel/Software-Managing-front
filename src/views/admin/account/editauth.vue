<template>
  <div style="height: 100%;margin-top: 50px">
    <el-card style="height: 100%;">
      <div slot="header" class="clearfix">
        <span><b>权限管理</b></span>
      </div>
      <div style="  display: flex;justify-content: center;" >
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
          <!-- <el-form-item label="权限范围：">
            <el-select v-model="ClassValue" filterable placeholder="请选择" @change="handelScopeChange">
              <el-option v-for="item in classes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0"></div>
            <el-checkbox-group v-model="checkedAuthorities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in authorities" :label="city" :key="city">{{ city }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-col :span="3" :offset="8">
            <el-button type="primary" @click="submitForm()">提交</el-button>
          </el-col>
          <el-col :span="3" :offset="2">
            <router-link to="/admin/user-management">
              <el-button>取消</el-button>
            </router-link>
          </el-col>
        </el-form>
      </div>

    </el-card>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      id: '',
      accountType: "",
      authorities: ["创建账户", "删除账户", "修改账户信息", "修改权限信息", "修改密码", "管理课程", "查看所有账户", "浏览课程", "查看个人信息"],
      checkedAuthorities: [],
      englishauthoritys: {
        "创建账户": "create_account",
        "删除账户": "delete_account",
        "修改账户信息": "edit_auth",
        "修改权限信息": "edit_info",
        "修改密码": "edit_pwd",
        "管理课程": "manage_course",
        "查看所有账户": "view_account",
        "浏览课程": "view_class",
        "查看个人信息": "view_info"
      },
      isIndeterminate: true,
      checkAll: false,
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
    // handelScopeChange(val) {
    //   switch (val) {
    //     case "1":
    //       this.authorities = [
    //         "创建账户",
    //         "删除账户",
    //         "修改账户信息",
    //         "修改权限信息",
    //       ];
    //       break;
    //     default:
    //       this.authorities = [
    //         "发布实验项目",
    //         "参加实验",
    //         "上传课程文件",
    //         "批改报告",
    //         "分数管理",
    //         "关闭课程",
    //       ];
    //       break;
    //   }
    // },
    submitForm() {
      var auths = "";
      console.log(this.checkedAuthorities)
      for (var i = 0; i < this.checkedAuthorities.length; i++) {
        auths = auths + this.englishauthoritys[this.checkedAuthorities[i]] + ','
      }
      console.log(auths)
      if (auths != "") {
        auths = auths.substring(0, auths.length - 1)
      }
      var formdata = {
        id: this.id,
        authorities: auths
      }
      console.log(formdata)
      axios({
        method: "PUT",
        baseURL: '/api',
        url: "/user/updateauth",
        data: formdata
      }).then((res) => {
        console.log(res.data);
        this.$message({
          message: "添加成功",
          type: "success",
        });
      }).catch((err) => {
        console.log(err);
        this.$message({
          message: "服务器错误",
          type: "error",
        });
      })
    },
    get_auth() {
      axios({
        method: "GET",
        baseURL: '/api',
        url: "/user/getauth",
        params: {
          id: this.id
        }
      }).then((res) => {
        console.log(res.data.data);
        switch (res.data.data.identity) {
          case "1":
            this.accountType = "管理员"
            break;
          case "2":
            this.accountType = "责任教师"
            break;
          case "3":
            this.accountType = "普通教师"
            break;
          case "4":
            this.accountType = "助教"
            break;
          default:
            this.accountType = "学生"
            break;
        }
        this.$message({
          message: "添加成功",
          type: "success",
        });
      }).catch((err) => {
        console.log(err);
        this.$message({
          message: "服务器错误",
          type: "error",
        });
      })

    }
  },
};
</script>



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
