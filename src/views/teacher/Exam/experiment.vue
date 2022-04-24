<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <v-btn dark @click="handleAddEx">新增实验</v-btn>
        </el-row>

        <el-row :gutter="4">
          <el-col v-for="item in experList" :key="item.ex_id" :span="8">
            <v-card color="#1F7087" dark>
              <div>
                <v-card-title v-text="item.title"></v-card-title>
                <v-card-subtitle
                  v-text="'实验占比：' + item.weight"
                ></v-card-subtitle>
                <v-card-subtitle
                  v-if="item.status === 0"
                  v-text="'实验状态：未发布'"
                ></v-card-subtitle>
                <v-card-subtitle
                  v-if="item.status === 1"
                  v-text="'实验状态：已发布'"
                ></v-card-subtitle>
                <v-card-subtitle
                  v-if="item.status === 3"
                  v-text="'实验状态：已过期'"
                ></v-card-subtitle>
                <v-card-text
                  v-text="'截止日期：' + item.end_time"
                ></v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    @click="toExperiment(item)"
                    v-if="item.status !== 3"
                  >
                    详情
                  </v-btn>
                  <v-btn
                    text
                    @click="handleProportion(item)"
                    v-if="item.status !== 3"
                  >
                    占比
                  </v-btn>
                  <v-btn
                    text
                    @click="handlePushExper(item)"
                    v-if="item.status === 0"
                  >
                    发布
                  </v-btn>
                  <v-btn
                    text
                    @click="handleStopExper(item)"
                    v-if="item.status === 1"
                  >
                    终止
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text @click="handleDeleteExper(item)"> 删除 </v-btn>
                </v-card-actions>
              </div>
            </v-card>
            <br />
          </el-col>
        </el-row>

        <el-dialog
          :visible.sync="classDialog"
          title="新增班级"
          center
          width="300px"
        >
          <el-select v-model="tid">
            <el-option
              v-for="item in teaList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <div slot="footer" class="dialog-footer">
            <el-button @click="classDialog = false">取消</el-button>
            <el-button type="primary" @click="createClass()">确定</el-button>
          </div>
        </el-dialog>

        <el-dialog
          :visible.sync="teaDialog"
          title="选择教师"
          center
          width="300px"
        >
          <el-select v-model="changeTemp.t_id">
            <el-option
              v-for="i in teaList"
              :key="i.id"
              :label="i.id"
              :value="i.id"
            >
            </el-option>
          </el-select>
          <div slot="footer" class="dialog-footer">
            <el-button @click="teaDialog = false">取消</el-button>
            <el-button type="primary" @click="updateTea(changeTemp)"
              >确定</el-button
            >
          </div>
        </el-dialog>

        <el-dialog
          :visible.sync="proDialog"
          title="设置实验占比"
          center
          width="300px"
        >
          <el-input v-model="changeTemp.weight"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="proDialog = false">取消</el-button>
            <el-button type="primary" @click="setPro(changeTemp)"
              >确定</el-button
            >
          </div>
        </el-dialog>

        <el-dialog :visible.sync="exDialog" title="新增实验" center width="70%">
          <v-container>
            <v-row style="margin-bottom: 5px">
              <v-col cols="6">
                <el-date-picker
                  v-model="experiment.end_time"
                  type="datetime"
                  placeholder="选择实验截止日期时间"
                  :picker-options="pickerOptions"
                  style="margin-bottom: 15px; width: 100%"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="6">
                <el-select
                  v-model="experiment.status"
                  placeholder="请选择实验提交方式"
                  style="margin-bottom: 15px; width: 100%"
                >
                  <el-option
                    v-for="item in exStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </v-col>
              <v-col cols="6">
                <el-cascader
                  v-model="is_online"
                  placeholder="是否在线模拟"
                  :options="online_op"
                  @change="handleExChange"
                ></el-cascader>
              </v-col>
            </v-row>

            <v-textarea
              filled
              label="实验名称"
              auto-grow
              height="20px"
              v-model="experiment.title"
            ></v-textarea>

            <v-textarea
              filled
              label="实验简介"
              auto-grow
              v-model="experiment.brief"
            ></v-textarea>

            <v-textarea
              filled
              label="实验占比"
              auto-grow
              height="20px"
              v-model="experiment.weight"
            ></v-textarea>
          </v-container>

          <div slot="footer" class="dialog-footer">
            <el-button @click="exDialog = false">取消</el-button>
            <el-button type="primary" @click="addExSendMsg()">确定</el-button>
          </div>
        </el-dialog>

        <el-dialog
          :visible.sync="scoreDialog"
          title="设置成绩占比（以小数形式）"
          center
          width="50%"
        >
          <v-container>
            <el-input label="考试" v-model="eachScore.exam"></el-input>

            <el-input
              filled
              label="实验"
              auto-grow
              height="20px"
              v-model="eachScore.report"
            ></el-input>

            <el-input
              filled
              label="出勤"
              auto-grow
              height="20px"
              v-model="eachScore.attendance"
            ></el-input>
          </v-container>

          <div slot="footer" class="dialog-footer">
            <el-button @click="scoreDialog = false">取消</el-button>
            <el-button type="primary" @click="setScore()">确定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  data() {
    return {
      syllabus: "",
      teaDialog: false,
      proDialog: false,
      fileDialog: false,
      classDialog: false,
      exDialog: false,
      scoreDialog: false,

      courseID: "",
      name: "",
      year: "",
      semester: "",
      id: "",
      is_online: "", //默认不是线上开课
      addSuccess: false,

      tid: "",
      teaList: [],
      classList: [],
      experList: [],
      fileList: [],
      stu_list: [],
      experiment: {
        courseID: "",
        title: "",
        brief: "",
        weight: "",
        end_time: "",
        status: null,
      },
      eachScore: {
        exam: "",
        report: "",
        attendance: "",
      },
      exStatus: [
        {
          value: "在线提交",
          label: "在线提交",
        },
        {
          value: "提交文件",
          label: "提交文件",
        },
      ],

      online_op: [
        {
          value: "0",
          label: "否",
        },
        {
          value: "1",
          label: "是",
          children: [
            {
              value: "paimai",
              label: "软件工程拍卖在线实验",
            },
          ],
        },
      ],

      changeTemp: {},
      timeout: null,
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    handleExChange(value) {
      this.is_online = value[0];
      console.log(this.is_online);
    },
    getParams: function () {
      this.courseID = JSON.parse(
        this.$Base64.decode(this.$route.query.info)
      ).course_id;
      this.name = JSON.parse(this.$Base64.decode(this.$route.query.info)).name;
      this.year = JSON.parse(this.$Base64.decode(this.$route.query.info)).year;
      this.semester = JSON.parse(
        this.$Base64.decode(this.$route.query.info)
      ).semester;
      this.id = sessionStorage.getItem("id");
      this.experiment.courseID = this.courseID;
      console.log(this.courseID);
    },

  },
  mounted() {
    this.getParams();
  },
};
</script>

<style scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: hidden;
}
.el-button--primary {
  color: white;
}
</style>
