<template>
    <div>
    <!--布局容器-->
      <el-container style="height: 100%;min-height:100%; " direction="vertical">
      
          
          <!--左侧侧边栏-->
          <!-- <el-aside width="13%" class="navigator">
            <Navigator></Navigator>
          </el-aside> -->
          <!--主要区域容器-->
          <!-- <div class="courses" > -->
            <div style="width:100%;">
              <el-button type="primary" @click="Exit()" style="float:left;">←退出</el-button>
            </div>
                  
            
                    <p></p>
                    <el-steps :active="0" simple>
                    <el-step title="拍卖详情" icon="el-icon-picture"></el-step>
                    <el-step title="拍卖出价" icon="el-icon-edit"></el-step>
                    <el-step title="供需曲线" icon="el-icon-upload"></el-step>
                    </el-steps>
                   <p></p>

                    <div style="width:100%;display:flex;max-height:300px;overflow-y:scroll;">
                      <div class="ongoing">
                        <el-divider><h2>进行中</h2></el-divider>
                        
                        <div class="eachAuction" v-for="item in auctions_ongoing" :key="item.auctionId">
    <h3>{{item.auctionTitle}}</h3>
    <br>
    开放时间：{{item.startTime.split('T')[0]}}&nbsp;{{item.startTime.split('T')[1]}}
    <br>
    关闭时间：{{item.endTime.split('T')[0]}}&nbsp;{{item.endTime.split('T')[1]}}
    <br>
   
    <el-button type="text" @click="enter(item.auctionId)" >进入实验></el-button>
    <el-button type="text" @click="curve(item.auctionId)">查看供需曲线></el-button>
    <el-button type="text" @click="will(item.auctionId)">查看意向表></el-button>

  </div>
                      </div>
  <div class="ongoing">
     <el-divider><h2>已结束</h2></el-divider>
  <div class="eachAuction" v-for="item in auctions_end" :key="item.auctionId">
    <h3>{{item.auctionTitle}}</h3>
    <br>
    开放时间：{{item.startTime.split('T')[0]}}&nbsp;{{item.startTime.split('T')[1]}}
    <br>
    关闭时间：{{item.endTime.split('T')[0]}}&nbsp;{{item.endTime.split('T')[1]}}
    <br>
   
    <el-button type="text" disabled @click="enter(item.auctionId)" >进入实验></el-button>
    <el-button type="text" @click="curve(item.auctionId)">查看供需曲线></el-button>
    <el-button type="text" @click="will(item.auctionId)">查看意向表></el-button>

  </div>
</div>
</div>
                    <el-row :gutter="24">
                        <el-col :span="12"><div class="principleIntroduction">
                            <el-card class="box-card" >
                                <div class="text item">
                                  <el-row><h2>[ 碳排放配额交易 ]</h2></el-row>
                                  <el-row><span style="width:auto; display:block; text-align:left; line-height:30px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  碳排放权本质上是政府为了应对气候变化、强制限制企业碳排放量，而给予企业的一种特别许可权/环境容量使用权。碳交易是为促进全球温室气体减排，减少全球二氧化碳排放所采用的，以碳配额市场机制。《京都议定书》把市场机制作为解决二氧化碳为代表的温室气体减排问题的新路径，即把二氧化碳排放权作为一种商品，从而形成了二氧化碳排放权的交易，简称碳交易。碳排放权交易的根本目的是促进全球温室气体减排，同时利用不同国家、行业或企业减排责任和成本的差异，使参与者以尽可能低的成本实现减排。
                                  </span></el-row>
                                   <img src="http://nwzimg.wezhan.cn/contents/sitefiles2024/10122242/images/4083861.png" alt="" style="width:100% ; margin-top:0.2% ">
                                  <el-row><span style="width:auto; display:block; text-align:left; line-height:30px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;虚拟仿真碳排放配额交易中，减排成本较低的排放实体(如清洁能源企业)，作为供给者将其所拥有的碳排放配额(CEA)在碳市场上有偿转让给需求者，即减排成本较高的排放实体(如火力发电厂等)的交易过程。本项实验虚拟仿真碳市场交易主体在买卖竞价中形成碳排放配额价格，即买卖双方在交易前不事先设定碳排放配额交易价格，交易双方均采用碳交易算法密封报价碳配额价格，竞价形成碳排放配额最优价格。实现碳排放配额供求均衡，碳配额交易将促进国家碳达峰碳中和事业发展。
                                  </span></el-row>
                                  <img src="http://nwzimg.wezhan.cn/contents/sitefiles2024/10122242/images/3800905.png" alt="" style="width:100% ; margin-top:0.2% ">
                                  </div>
                            </el-card>
                        </div></el-col>
                        <el-col :span="12"><div class="AuctionIntroduction">
                            <el-card class="box-card" >
                                <div class="text item">
                                   <el-row><h2>[ 供 需 平 衡 ]</h2></el-row>
                                        
                                    <el-row><span style="width:auto; display:block; text-align:left; line-height:30px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        软件产品具有高固定成本、低边际成本的特性，研究软件产品的最优定价策略，有助于合理决策市场行为，并根据不同的市场做出相对应的对策；
                                        同时软件产品具有外部效应的特性，一部分人对正版软件的购买与使用会影响另一部分人同样使用这一软件，产生正反馈效应。
                                        为了达成最大收益，在尽可能提高正版占有率的同时避免过低定价导致的利润损失，软件开发企业需要考虑基于用户意愿支出的价格来进行定价。
                                        但是问题在于了解每一位用户的意愿价格成本是非常高的。</span></el-row>
                                        
                                        <img src="http://mms2.baidu.com/it/u=488663266,1288806820&fm=253&app=120&f=JPEG&fmt=auto&q=75?w=640&h=352" style="width:100% ; margin-top:0.2% ">
                                        
                                    <el-row><span style="width:auto; display:block; text-align:left ;line-height:30px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        需求与供给实验采用拍卖的方式来调查需求者的意愿。实验以软件产品作为拍品，拍卖参与者提出自己愿意为这一产品所支出价格的报价。
                                        在这一实验进行的前提下，软件开发企业可以通过参与拍卖者的报价，获悉用户愿意为自己的软件产品所付出的价格。
                                        完成这一实验，有助于学生理解软件工程经济学中需求与供给的相关知识点，感受不同的定价策略导致的市场占有率与收益问题。
                                        同时，对于边际成本较高的软件产品，也可以通过这一实验找到需求与供给的供需平衡点。</span></el-row>
                                
                                    <el-row><h2>[ 拍 卖 说 明 ]</h2></el-row>
                                        
                                    <el-row><span style="width:auto; display:block; text-align:left; line-height:30px">
                                        
                                        [ 拍卖法介绍：二级价格密封拍卖法可以使每一个竞拍者不需要对市场形势和竞争对手作评估，给出自己真实的支付意愿。同时，这一拍卖法可以彻底揭示需求。
                                        如果竞拍者给出高于自己支付意愿的价格，当他人也采取同一行为时，他将以支付更高的价格为代价买下拍品；
                                        如果竞拍者以低于自己的支付意愿出价，则要面临其他竞拍者以低于自己实际愿意支付的价格买走竞拍者的风险。
                                        此外，竞拍者的出价策略与自身的风险评估和他人的策略预期无关，他总能以自己预期的代价来赢得自己本该获胜的拍卖。]</span></el-row>
                                        
                                        <!-- <img src="https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180202/f01f8f34fc1b45e78e7dd125d1eb50ca.jpeg" style="width:100% ; margin-top:0.2% "> -->
                                        
                                </div>
                            </el-card>
                        </div></el-col>
                        
</el-row>
<hr>

          <!-- </div> -->
      
      </el-container>
    </div>
</template>

<script>
// import Navigator from './instru_index1.vue'
  export default {
//     components: {
//             Navigator
//  },
 data(){
   return{
     auctions_ongoing:[],
     auctions_end:[],
   }
 },
 mounted(){

   this.axios.get('http://106.14.97.109:8081/auction/auctionEntity/getAllAuctionOnGoing')
   .then(res=>{
     this.auctions_ongoing=res.data.data;
   })
   this.axios.get('http://106.14.97.109:8081/auction/auctionEntity/getAllAuctionEnded')
   .then(res=>{
     this.auctions_end=res.data.data;
   })
 },
 methods:{
   enter(id){
     this.$router.push({
          path: `/studentHome/concreteCourse/DemandSupplyPar`,
          query: {
            id: id
          },
        });
   },
will(id){
     this.$router.push({
          path: `/studentHome/concreteCourse/DemandSupplyIntention`,
          query: {
            id: id
          },
        });
   },
   curve(id){
     this.$router.push({
          path: `/studentHome/concreteCourse/DemandSupplyCurve`,
          query: {
            id: id
          },
        });
   },
   Exit(){
     this.$router.push({
          path: "/studentHome/concreteCourse/Exper",
        });
   }
 }
 }
 </script>

 <style>
.el-aside{
  overflow: hidden;
}

.navigator{
  position:fixed;
  margin:-0.53% auto;
  left:-6%;
  z-index:5;
}

.eachAuction{
  width:85%;
  padding: 10px 40px;
  height: 150px;
  float: left;
  box-shadow: 0 5px 14px  rgba(51, 102, 255, 0.24);
  /* box-shadow: 5px 4px 20px  rgba(0,0,0,0.16); */
}
.ongoing{
  width: 50%;
}

</style>