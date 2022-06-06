<template>
<!--布局容器-->
      <el-container style="height: 100%;min-height:80%;" direction="vertical">
        <el-container >
          <!--左侧侧边栏-->
          <!--主要区域容器-->
          <el-main class="center">
            <div style="width:100%;">
              <el-button type="primary" @click="Exit()" style="float:left;">←返回</el-button>
            </div>
          <!-- <course-list :courses="joinCourses" :filter="serachName" /> -->
            <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                border
                
                :row-style="{background:'#000',color:'#000'}"
                :row-class-name="tableRowClassName"
                :header-cell-style="getRowClass"
                style="width: 100%">

                 <el-table-column :label="`意愿竞拍所得表`" 
                 align="center"
                 style="color:#000"
                 >
                <el-table-column
                prop="0"
                label="价格"
                sortable
                align="center"
                width="180">
                </el-table-column>
                <el-table-column
                prop="1"
                sortable
                align="center"
                label="报价者人数">
                </el-table-column>
                <el-table-column
                prop="2"
                sortable
                align="center"
                label="出售数量">
                </el-table-column>
                <el-table-column
                prop="3"
                sortable
                align="center"
                label="收益">
                </el-table-column>
                 </el-table-column>
            </el-table>  
          </el-main>  
        </el-container>
      </el-container>
</template>


<script>
  export default {
    
    data() {
      return {
        aucId:'',
        tableData: {
          0: '',
          1: '',
          2: '',
          3: ''
        },
        // [{
        //   price: 12,
        //   amount: 3,
        //   sales: 3,
        //   profit: 30
        // },{
        //   price: 11,
        //   amount: 5,
        //   sales: 5,
        //   profit: 45
        // }, {
        //   price: 15,
        //   amount: 12,
        //   sales: 10,
        //   profit: 130
        // },{
        //   price: 16,
        //   amount: 10,
        //   sales: 10,
        //   profit: 140
        // },{
        //   price: 18,
        //   amount: 5,
        //   sales: 5,
        //   profit: 80
        // },{
        //   price: 22,
        //   amount: 3,
        //   sales: 3,
        //   profit: 60
        // },{
        //   price: 27,
        //   amount: 2,
        //   sales: 2,
        //   profit: 50
        // },{
        //   price: 42,
        //   amount: 1,
        //   sales: 1,
        //   profit: 40
        // },{
        //   price: 13,
        //   amount:22,
        //   sales: 10,
        //   profit: 110
        // },{
        //   price: 8,
        //   amount: 5,
        //   sales: 5,
        //   profit: 30
        // },{
        //   price: 32,
        //   amount: 1,
        //   sales: 1,
        //   profit: 30
        // },]
      };
    },
    mounted(){
      this.aucId=this.$route.query.id;
        this.axios.get('http://106.14.97.109:8081/auction/participationEntity/getWillPriceForm?id='+this.aucId)
        .then(res=>{
            this.tableData=res.data.data;
            console.log("test");
            console.log(this.tableData);
        })
    },
    methods: {

    tableRowClassName ({ row, rowIndex }) {
      console.log(row);
      if ((rowIndex + 1) % 2 === 0) {
        return 'double';
      } else {
        return 'single';
      }
    }, 
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return 'background:#000'
      } else {
        return ''
      }
    },
    Exit(){
     this.$router.push({
          path: "/studentHome/concreteCourse/DemandSupply",
        });
   }


      // getSummaries(param) {
      //   const { columns, data } = param;
      //   const sums = [];
      //   columns.forEach((column, index) => {
      //     if (index === 0) {
      //       sums[index] = '汇总';
      //       return;
      //     }
      //     const values = data.map(item => Number(item[column.property]));
      //     if (!values.every(value => isNaN(value))) {
      //       sums[index] = values.reduce((prev, curr) => {
      //         const value = Number(curr);
      //         if (!isNaN(value)) {
      //           return prev + curr;
      //         } else {
      //           return prev;
      //         }
      //       }, 0);
      //       sums[index] += ' 元';
      //     } else {
      //       sums[index] = 'N/A';
      //     }
      //   });

      //   return sums;
      // }
    }
  };
</script>

<style>
.double {
  background: #f5f5f5 !important;
}
.single {
  background:  #ccc !important;
}
.el-aside{
  overflow: hidden;
}
.navigator{
  position:fixed;
  margin:-0.53% auto;
  left:-6%;
  z-index:5;
}

</style>