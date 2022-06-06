<template>
    <div>
    <!--布局容器-->
      <el-container style="height: 100%;min-height:100%;" direction="vertical">
          <div style="width:100%;">
              <el-button type="primary" @click="Exit()" style="float:left;">←退出</el-button>
            </div>
        <el-container >
    
          <!--主要区域容器-->
          <div  class="courses">
           
                    <p></p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="135px" class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                    <el-form-item label="实验原理" prop="intro" >
                        <el-input type="textarea" :rows="2" v-model="ruleForm.intro"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="24">
                    <el-form-item label="实验内容" prop="content" >
                        <el-input type="textarea" :rows="3" v-model="ruleForm.content"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="实验步骤" prop="step" >
                        <el-input type="textarea" :rows="3" v-model="ruleForm.step"></el-input>
                    </el-form-item>
                </el-col>
                
                 <el-col :span="24">
                    <el-form-item label="实验心得" prop="result" >
                        <el-input type="textarea" :rows="4" v-model="ruleForm.result"></el-input>
                    </el-form-item>
                </el-col>
                

                <el-col :span="24">
                  <el-form-item label="实验图片上传" prop="picture" style="float:left;">
               <el-upload
                 action="#"
                 list-type="picture-card"
                 :on-preview="handlePictureCardPreview"
                 :on-remove="handleRemove"
                 :http-request="uploadAvatar"
                 :before-upload="beforeAvatarUpload"
                 :file-list="fileList"
               >
               <!-- :http-request="uploadAvatar" -->
                 <i class="el-icon-plus"></i>
               </el-upload>
               <el-dialog :visible.sync="dialogVisible">
                 <img width="100%" :src="dialogImageUrl" alt="">
               </el-dialog>
            </el-form-item>
                </el-col>
               
                
                
                

                <!-- <el-col :span="12">
                    <el-form-item label="学生姓名" prop="name" required>
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2"> </el-col>
               
                <el-col :span="12">
                    <el-form-item label="实验名称" prop="region">
                        <el-select v-model="ruleForm.region" style="width: 100%; float:left;" placeholder="请选择实验名称">
                        <el-option label="供需平衡" value="供给与需求模拟实验"></el-option>
                        <el-option label="其他" value="second"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2"> </el-col> -->
                <!-- <el-col :span="12">
                    <el-form-item label="实验时间" required>
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                </el-col> -->
            </el-row>
            <!-- <el-form-item label="实验报告" prop="rule" >
                <el-input v-model="ruleForm.content" ></el-input>
            </el-form-item> -->
            <!-- <div style="width:95%;margin:auto;">
            <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
    </quill-editor>
    </div> -->
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
          </div>
        </el-container>
      </el-container>
    </div>
</template>
<script>

//import { createStorage } from '@/utils/storage'
  export default {

    data() {
      return {
        formData:'',
        ruleForm: {
          intro:'',
          step:'',
          content:'',
          result:'',
          thought:'',
          picture:'',
          name: '',
          id: '',
          region: '',
          date1: '',
          delivery: false,
          type: [],
          resource: '',
          
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 7, max: 7, message: '请正确输入七位学号', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择实验名称', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          // content: [
          //   { required: true, message: '请填写实验报告', trigger: 'blur' }
          // ],
          process: [
            { required: true, message: '请填写实验过程', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写实验小结', trigger: 'blur' }
          ]
        },
          dialogImageUrl: '',
          dialogVisible: false,
          picList: [],


        content: `<p>在这里输入报告内容</p>`,
      editorOption: {
        theme: 'snow'
      },
      modules: {
        toolbar: [
         
        ]
      }
    
      };
    },
    methods: {
              submitForm() {
                
                this.formData.append('name',"test");
                this.formData.append('studentId','1953606');
                this.formData.append('intro',this.ruleForm.intro);
                this.formData.append('procedures',this.ruleForm.step);
                this.formData.append('analysis',this.ruleForm.result);
                // this.formData.append('images',this.picList);
                // ob.name="测试2";
                // ob.studentId=localStorage.getItem('user-id');
                // ob.intro=this.ruleForm.intro;
                // ob.procedures=this.ruleForm.strp;
                // ob.analysis=this.ruleForm.result;
                // ob.images=this.picList;
                console.log(this.formData);
                let config = {
                  headers: {
                  'Content-Type': 'multipart/form-data'
                  }};
                this.axios.post('http://106.14.97.109:8081/auction/aucReport2Entity/markdown2pdf',
                this.formData,
                config)
                .then(()=>{
                  this.$message({
                      message: '提交成功',
                  type: 'success'})
                  })
                .catch(()=>{
                this.$message.error("提交失败")
                })
                
            //   body:JSON.stringify(ob)})
            // this.$axios.post('http://106.14.97.109:8081/aucReportEntity/postReport',{
            //   this.$axios.post('http://106.14.97.109:8081/aucReportEntity/postReport',{
            //   body:JSON.stringify(ob)})
            // .then(res=>{
            // this.$message({
            //     message: '提交成功',
            // type: 'success'})
            // // this.$router.push('/auctionDetail')
            // })
            // .catch(res=>{
            // this.$message.error("提交失败")
            // })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    // onEditorReady (editor) { // 准备编辑器
    // },
    // onEditorBlur () {}, // 失去焦点事件
    // onEditorFocus () {}, // 获得焦点事件
    // onEditorChange () {}, // 内容改变事件
    uploadAvatar(item) {
          // const formData = new FormData()
          // formData.append('file', item.file)
          // const uid = item.file.uid
          this.picList.push(item.file);
          this.formData.append('images',item.file);
          console.log("appendPic")
          // createStorage(formData).then(res => {
          //   this.picList.push({ key: uid, value: res.data.data.url })
          //   this.emptyUpload()
          // }).catch(() => {
          //   this.$message.error('上传失败，请重新上传')
          //   this.emptyUpload()
          // })
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg'
          const isPng = file.type === 'image/png'
          const isLt2M = file.size / 1024 / 1024 < 2
 
          if (!isJPG && !isPng) {
            this.$message.error('上传图片只能是 JPG或png 格式!')
          }
          if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!')
          }
          return (isJPG || isPng) && isLt2M
        },
        handleRemove(file, fileList) {
          console.log(fileList)
          for (const i in this.picList) {
            if (this.picList[i].key === file.uid) {
              this.picList.splice(i, 1)
            }
          }
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url
          this.dialogVisible = true
        },
        /**
         * 清空上传组件
         */
        emptyUpload() {
          const mainImg = this.$refs.upload
          if (mainImg) {
            if (mainImg.length) {
              mainImg.forEach(item => {
                item.clearFiles()
              })
            } else {
              this.$refs.upload.clearFiles()
            }
          }
        },
         Exit(){
     this.$router.push({
          path: "/studentHome/concreteCourse/Exper",
        });
   }
    },
    computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted(){
    this.formData=new FormData();
  }
  }
</script>

<style>

</style>