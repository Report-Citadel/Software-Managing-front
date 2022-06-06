<template>
  <div style=" text-align: right;" class="mr-24" >
    <i 
      class="el-icon-timer" 
    >{{count}}</i>
  </div>
</template>
<script>
import "echarts/lib/component/markLine";
import {GetRestTime} from "@/api/index"

export default {
  data() {
        return {
            count: '', //倒计时
            seconds:"",
            stuId: this.id,
        }
  },
  mounted() {
    let st = { stuId: this.stuId };
    console.log(11)
    GetRestTime(st)
      .then((res) => {
        //console.log(res.data)
        this.seconds = res.data.data;
      })
      .catch(() => {
        console.log("获取剩余时间失败");
      });

    this.Time() //调用定时器
  },
  props:['id'],
  methods: {
      // 天 时 分 秒 格式化函数
      countDown() {
        //console.log(this.seconds)
        let d = parseInt(this.seconds / (24 * 60 * 60))
        let h = parseInt(this.seconds / (60 * 60) % 24);
        h = h < 10 ? "0" + h : h
        let m = parseInt(this.seconds / 60 % 60);
        m = m < 10 ? "0" + m : m
        let s = parseInt(this.seconds % 60);
        s = s < 10 ? "0" + s : s
        this.count = d + '天' + h + '时' + m + '分' + s + '秒'
      },
      //定时器没过1秒参数减1
      Time() {
          setInterval(() => {
              this.seconds -= 1
              this.countDown()
          }, 1000)
      },
  }
};
</script>
<style scope>
</style>