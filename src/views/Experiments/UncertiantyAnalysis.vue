<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="题目" name="question">
          <div class="Smallwords">题目：某软件公司现有一款数据分析软件产品。该公司市场部正在策划今后3年产品发展战略，面临4种相互排斥的备选方案。</div>
          <div class="Smallwords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方案A：继续维持现有市场，加大广告力度，以期获得更大市场份额。</div>
          <div class="Smallwords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方案B：在销售现行标准产品的同时，推出简化功能、低价格版产品。</div>
          <div class="Smallwords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方案C：在销售现行标准产品的同时，通过增加新功能推出企业版产品。</div>
          <div class="Smallwords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方案D：停止现行标准产品的线下销售，改为线上提供现有功能云服务。</div>
          <div class="Smallwords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该公司认为上述不同方案的盈利能力取决于产品的需求水平。需求水平受到经济状况(衰退、一般、繁荣)和竞争对手反应(无反应、竞争)，这两个因素的影响。 </div>
          <div class="Smallwords">状态：公司市场部认为，市场需求水平将会呈现出以下5种不同状态：</div>
          <div class="Smallwords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;θ1：经济衰退、竞争对手无反应。</div>
          <div class="Smallwords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;θ2：经济状况一般、竞争对手无反应。</div>
          <div class="Smallwords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;θ3：经济状况一般、竞争对手推出一种竞争产品。</div>
          <div class="Smallwords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;θ4：经济繁荣、竞争对手无反应。</div>
          <div class="Smallwords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;θ5：经济繁荣、竞争对手推出一种竞争产品。</div>
          <div class="Smallwords" style="margin-bottom: 8px">构造方案/状态表:
            <el-form :inline="true" :model="newform" style="margin-top: 8px">
              <el-form-item label="方案数">
                <el-input v-model="newform.plan" placeholder="方案数" style="width: 80px " ></el-input>
              </el-form-item>
              <el-form-item label="状态数">
                <el-input v-model="newform.state" placeholder="状态数" style="width: 80px" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="make" size="mini">构造</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div align="center">
            <el-table
                :data="tableData"
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 78%">
              <el-table-column label="净现值(单位：百万元)">
                <el-table-column
                    prop="plan"
                    label="方案\状态"
                    width="120">
                </el-table-column>
                <!--                            <template v-for='(col,index) in list'>-->
                <!--                                <el-table-column  :prop= col.dataItem-->
                <!--                                                  :label= "col.dataName"-->
                <!--                                                  :key= "index">-->

                <!--                                        <el-input size="mini" v-model= tableData.zhuangtai[col.dataItem] ></el-input>-->

                <!--                                </el-table-column>-->

                <!--                            </template>-->
                <el-table-column v-if="1<=newform.state" prop="stateone" label="θ1">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateone" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="2<=newform.state" prop="statetwo" label="θ2">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statetwo" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="3<=newform.state" prop="statethree" label="θ3">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statethree" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="4<=newform.state" prop="statefour" label="θ4">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefour" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="5<=newform.state" prop="statefive" label="θ5">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefive" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="6<=newform.state" prop="statesix" label="θ6">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statesix" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="7<=newform.state" prop="stateseven" label="θ7">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateseven" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="8<=newform.state" prop="stateeight" label="θ8">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateeight" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="9<=newform.state" prop="statenine" label="θ9">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statenine" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="10<=newform.state" prop="stateten" label="θ10">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateten" ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>

            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="最大最小法(Wald法)" name="first">
          <div class="Smallwords">定义：{{define1}}</div>
          <div class="Smallwords">方案/状态表:</div>
          <div align="center">
            <el-table :data="tableData" style="width: 78%">
              <el-table-column label="净现值(单位：百万元)">
                <el-table-column prop="plan" label="方案\状态" width="120"></el-table-column>
                <el-table-column v-if="1<=newform.state" prop="stateone" label="θ1">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateone" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="2<=newform.state" prop="statetwo" label="θ2">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statetwo" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="3<=newform.state" prop="statethree" label="θ3">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statethree" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="4<=newform.state" prop="statefour" label="θ4">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefour" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="5<=newform.state" prop="statefive" label="θ5">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefive" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="6<=newform.state" prop="statesix" label="θ6">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statesix" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="7<=newform.state" prop="stateseven" label="θ7">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateseven" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="8<=newform.state" prop="stateeight" label="θ8">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateeight" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="9<=newform.state" prop="statenine" label="θ9">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statenine" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="10<=newform.state" prop="stateten" label="θ10">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateten" ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <span class="Smallwords">计算过程：</span>
          <el-button type="primary" @click="calculate1" size="mini">一键生成</el-button>
          <el-card>
            <el-row>
              <el-col :span="12">
                <el-table :data="tableData1" style="width: 45%">
                  <el-table-column label="净现值(单位：百万元)">
                    <el-table-column prop="plan" label="方案" width="100"></el-table-column>
                    <el-table-column prop="worst" label="最不利结果" width="100">
                    </el-table-column>
                    <el-table-column prop="state" label="状态">
                    </el-table-column>
                  </el-table-column>
                </el-table>
                <span class="Smallwords right">
                        结果：<el-input size="medium" v-model="result1" style="width: 25%" ></el-input>
                    </span>
              </el-col>
              <!--                    <el-col :span="12">-->
              <!--                      <div id="main" style="width: 400px;height: 400px;"></div>-->
              <!--                    </el-col>-->
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="最大最大法" name="second">
          <div class="Smallwords">定义：{{define2}}</div>
          <div class="Smallwords">方案/状态表:</div>
          <div align="center">
            <el-table :data="tableData" style="width: 78%">
              <el-table-column label="净现值(单位：百万元)">
                <el-table-column prop="plan" label="方案\状态" width="120"></el-table-column>
                <el-table-column v-if="1<=newform.state" prop="stateone" label="θ1">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateone" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="2<=newform.state" prop="statetwo" label="θ2">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statetwo" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="3<=newform.state" prop="statethree" label="θ3">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statethree" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="4<=newform.state" prop="statefour" label="θ4">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefour" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="5<=newform.state" prop="statefive" label="θ5">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefive" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="6<=newform.state" prop="statesix" label="θ6">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statesix" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="7<=newform.state" prop="stateseven" label="θ7">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateseven" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="8<=newform.state" prop="stateeight" label="θ8">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateeight" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="9<=newform.state" prop="statenine" label="θ9">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statenine" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="10<=newform.state" prop="stateten" label="θ10">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateten" ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <span class="Smallwords">计算过程：</span>
          <el-button type="primary" @click="calculate2" size="mini">一键生成</el-button>
          <el-card align="left">
            <el-table :data="tableData2" style="width: 45%">
              <el-table-column label="净现值(单位：百万元)">
                <el-table-column prop="plan" label="方案" width="100"></el-table-column>
                <el-table-column prop="best" label="最优结果" width="100">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.best" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column prop="state" label="状态">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-select v-model="scope.row.state" placeholder="请选择对应状态">-->
                  <!--                                        <el-option label="θ1" value="θ1"></el-option>-->
                  <!--                                        <el-option label="θ2" value="θ2"></el-option>-->
                  <!--                                        <el-option label="θ3" value="θ3"></el-option>-->
                  <!--                                        <el-option label="θ4" value="θ4"></el-option>-->
                  <!--                                        <el-option label="θ5" value="θ5"></el-option>-->
                  <!--                                    </el-select>-->
                  <!--                                </template>-->
                </el-table-column>
              </el-table-column>
            </el-table>
            <span class="Smallwords right">
                        结果：<el-input size="medium" v-model="result2" style="width: 25%" ></el-input>
                    </span>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="赫维斯基法(Hurwicz法)" name="third">
          <div  style="white-space: pre-wrap;" class="Smallwords">定义：{{define3}}</div>
          <div class="Smallwords">方案/状态表:</div>
          <div align="center">
            <el-table :data="tableData" style="width: 78%">
              <el-table-column label="净现值(单位：百万元)">
                <el-table-column prop="plan" label="方案\状态" width="120"></el-table-column>
                <el-table-column v-if="1<=newform.state" prop="stateone" label="θ1">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateone" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="2<=newform.state" prop="statetwo" label="θ2">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statetwo" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="3<=newform.state" prop="statethree" label="θ3">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statethree" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="4<=newform.state" prop="statefour" label="θ4">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefour" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="5<=newform.state" prop="statefive" label="θ5">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefive" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="6<=newform.state" prop="statesix" label="θ6">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statesix" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="7<=newform.state" prop="stateseven" label="θ7">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateseven" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="8<=newform.state" prop="stateeight" label="θ8">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateeight" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="9<=newform.state" prop="statenine" label="θ9">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statenine" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="10<=newform.state" prop="stateten" label="θ10">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateten" ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <span class="Smallwords">计算过程：</span>
          <el-button type="primary" @click="calculate3" size="mini">一键生成</el-button>
          <el-card align="left">
            <template>
              <div class="Smallwords">乐观系数 λ取值:</div>
              <div class="block">
                <el-slider v-model="value" show-input max="1" step="0.01" class="self_slider"></el-slider>
              </div>
            </template>
            <el-table :data="tableData3" style="width: 402px">
              <el-table-column label="净现值(单位：百万元)">
                <el-table-column prop="plan" label="方案" width="100px"></el-table-column>
                <el-table-column prop="best" label="最优结果" width="100px">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.best" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column prop="worst" label="最不利结果" width="100px">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.worst" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column prop="result" label="计算结果" width="100px">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.result" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
              </el-table-column>
            </el-table>
            <span class="Smallwords right">
                        结果：<el-input size="medium" v-model="result3" style="width: 25%" ></el-input>
                    </span>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="拉普拉斯法(Laplace法)" name="fourth">
          <div class="Smallwords" style="white-space: pre-wrap;">定义：{{define4}}</div>
          <div class="Smallwords">方案/状态表:</div>
          <div align="center">
            <el-table :data="tableData" style="width: 78%">
              <el-table-column label="净现值(单位：百万元)">
                <el-table-column prop="plan" label="方案\状态" width="120"></el-table-column>
                <el-table-column v-if="1<=newform.state" prop="stateone" label="θ1">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateone" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="2<=newform.state" prop="statetwo" label="θ2">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statetwo" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="3<=newform.state" prop="statethree" label="θ3">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statethree" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="4<=newform.state" prop="statefour" label="θ4">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefour" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="5<=newform.state" prop="statefive" label="θ5">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefive" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="6<=newform.state" prop="statesix" label="θ6">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statesix" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="7<=newform.state" prop="stateseven" label="θ7">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateseven" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="8<=newform.state" prop="stateeight" label="θ8">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateeight" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="9<=newform.state" prop="statenine" label="θ9">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statenine" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="10<=newform.state" prop="stateten" label="θ10">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateten" ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <span class="Smallwords">计算过程：</span>
          <el-button type="primary" @click="calculate41" size="mini">一键生成</el-button>
          <el-card align="left">
            <div class="Smallwords" style="margin-bottom: 8px">每个状态的权重值:
              <el-input  style="width: 10%" size="mini" v-model="right" ></el-input>
            </div>
            <el-table :data="tableData41" style="width: 202px">
              <el-table-column label="净现值(单位：百万元)">
                <el-table-column prop="plan" label="方案" width="100px"></el-table-column>
                <el-table-column prop="result" label="期望值" width="100px">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.result" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
              </el-table-column>
            </el-table>
            <span class="Smallwords right">
                        结果：<el-input size="medium" v-model="result41" style="width: 25%" ></el-input>
                    </span>
          </el-card>
          <span class="Smallwords">改进的拉普拉斯法(Laplace法)：</span>
          <el-card align="left">
            <div class="Smallwords" style="margin-bottom: 8px">为每个状态分配权重值:
              <el-form :inline="true" :model="formInline">
                <el-form-item label="状态一" v-if="1<=newform.state">
                  <el-input v-model="formInline.right1" placeholder="权重" style="width: 80px" ></el-input>
                </el-form-item>
                <el-form-item label="状态二" v-if="2<=newform.state">
                  <el-input v-model="formInline.right2" placeholder="权重" style="width: 80px" ></el-input>
                </el-form-item>
                <el-form-item label="状态三" v-if="3<=newform.state">
                  <el-input v-model="formInline.right3" placeholder="权重" style="width: 80px" ></el-input>
                </el-form-item>
                <el-form-item label="状态四" v-if="4<=newform.state">
                  <el-input v-model="formInline.right4" placeholder="权重" style="width: 80px" ></el-input>
                </el-form-item>
                <el-form-item label="状态五" v-if="5<=newform.state">
                  <el-input v-model="formInline.right5" placeholder="权重" style="width: 80px" ></el-input>
                </el-form-item>
                <el-form-item label="状态六" v-if="6<=newform.state">
                  <el-input v-model="formInline.right6" placeholder="权重" style="width: 80px" ></el-input>
                </el-form-item>
                <el-form-item label="状态七" v-if="7<=newform.state">
                  <el-input v-model="formInline.right7" placeholder="权重" style="width: 80px" ></el-input>
                </el-form-item>
                <el-form-item label="状态八" v-if="8<=newform.state">
                  <el-input v-model="formInline.right8" placeholder="权重" style="width: 80px" ></el-input>
                </el-form-item>
                <el-form-item label="状态九" v-if="9<=newform.state">
                  <el-input v-model="formInline.right9" placeholder="权重" style="width: 80px" ></el-input>
                </el-form-item>
                <el-form-item label="状态十" v-if="10<=newform.state">
                  <el-input v-model="formInline.right10" placeholder="权重" style="width: 80px" ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" size="mini">确定</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table :data="tableData42" style="width: 202px">
              <el-table-column label="净现值(单位：百万元)">
                <el-table-column prop="plan" label="方案" width="100px"></el-table-column>
                <el-table-column prop="result" label="期望值" width="100px">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.result" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
              </el-table-column>
            </el-table>
            <span class="Smallwords right">
                        结果：<el-input size="medium" v-model="result42" style="width: 25%" ></el-input>
                    </span>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="最小最大后悔值法" name="fifth">
          <div class="Smallwords" style="white-space: pre-wrap;">定义：{{define5}}</div>
          <div class="Smallwords">方案/状态表:</div>
          <div align="center">
            <el-table :data="tableData" style="width: 78%">
              <el-table-column label="净现值(单位：百万元)">
                <el-table-column prop="plan" label="方案\状态" width="120"></el-table-column>
                <el-table-column v-if="1<=newform.state" prop="stateone" label="θ1">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateone" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="2<=newform.state" prop="statetwo" label="θ2">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statetwo" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="3<=newform.state" prop="statethree" label="θ3">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statethree" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="4<=newform.state" prop="statefour" label="θ4">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefour" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="5<=newform.state" prop="statefive" label="θ5">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statefive" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="6<=newform.state" prop="statesix" label="θ6">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statesix" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="7<=newform.state" prop="stateseven" label="θ7">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateseven" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="8<=newform.state" prop="stateeight" label="θ8">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateeight" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="9<=newform.state" prop="statenine" label="θ9">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.statenine" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="10<=newform.state" prop="stateten" label="θ10">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.stateten" ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <span class="Smallwords">计算过程：</span>
          <el-button type="primary" @click="calculate5" size="mini">一键生成</el-button>
          <el-card align="left">
            <div class="Smallwords" style="margin-bottom: 8px">计算各方案在各种状态下的后悔值，并选出各方案最大后悔值</div>
            <el-table :data="tableData5" style="width: 78%">
              <el-table-column label="净现值(单位：百万元)">
                <el-table-column prop="plan" label="方案\状态" width="120"></el-table-column>
                <el-table-column v-if="1<=newform.state" prop="stateone" label="θ1">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.stateone" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column v-if="2<=newform.state" prop="statetwo" label="θ2">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.statetwo" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column v-if="3<=newform.state" prop="statethree" label="θ3">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.statethree" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column v-if="4<=newform.state" prop="statefour" label="θ4">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.statefour" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column v-if="5<=newform.state" prop="statefive" label="θ5">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.statefive" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column v-if="6<=newform.state" prop="statesix" label="θ6">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.statesix" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column v-if="7<=newform.state" prop="stateseven" label="θ7">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.stateseven" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column v-if="8<=newform.state" prop="stateeight" label="θ8">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.stateeight" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column v-if="9<=newform.state" prop="statenine" label="θ9">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.statenine" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column v-if="10<=newform.state" prop="stateten" label="θ10">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.stateten" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
                <el-table-column prop="result" label="最大后悔值">
                  <!--                                <template slot-scope="scope">-->
                  <!--                                    <el-input size="mini" v-model="scope.row.result" ></el-input>-->
                  <!--                                </template>-->
                </el-table-column>
              </el-table-column>
            </el-table>
            <span class="Smallwords right">
                        结果：<el-input size="medium" v-model="result5" style="width: 25%" ></el-input>
                    </span>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="结果" name="result" lazy>
          <div class="Smallwords">最终结果：</div>
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary">
              展示折线图<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="first">最大最小法</el-dropdown-item>
              <el-dropdown-item command="second">最大最大法</el-dropdown-item>
              <el-dropdown-item command="third">赫维斯基法</el-dropdown-item>
              <el-dropdown-item command="fourth">拉普拉斯法</el-dropdown-item>
              <el-dropdown-item command="fourthtwo">改进的拉普拉斯法</el-dropdown-item>
              <el-dropdown-item command="fifth">最小最大后悔值法</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div>
            <ve-line :data="chartData" :title="计算结果"></ve-line>
          </div>
          <el-card align="center">
            <el-table :data="tableData6" style="width: 78%">
              <el-table-column prop="method" label="方法名称" width="180"></el-table-column>
              <el-table-column prop="suggest" label="推荐方案" width="180"></el-table-column>
            </el-table>
          </el-card>
          <el-card>
            <div class="Smallwords">实验小结：</div>
            <el-input style="align-content: center" type="textarea" v-model="summary" rows="3">{{summary}}</el-input>
          </el-card>
          <div style="float: right;">
            <el-button style="margin-top: 20px; margin-bottom: 20px;margin-right: 10px;" type="primary" @click="dialogVisible = true">预览</el-button>
            <el-button style="margin-top: 20px; margin-bottom: 20px;margin-left: 10px" type="primary" @click="dialogVisibleaa = true" :disabled="isnotOK1">提交</el-button>
          </div>
          <el-dialog  title="报告" :visible.sync="dialogVisible" style="width: 140%; margin-left: -125px; height: 600px">
            <div style="overflow-y: auto;max-height: 700px">
              <div id="demo" style="padding-top: 20px;padding-left: 20px">
                <div class="Smallwords">方案/状态表:</div>
                <div align="center">
                  <el-table :data="tableData" style="width: 78%">
                    <el-table-column label="净现值(单位：百万元)">
                      <el-table-column prop="plan" label="方案\状态" width="120"></el-table-column>
                      <el-table-column v-if="1<=newform.state" prop="stateone" label="θ1">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.stateone" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="2<=newform.state" prop="statetwo" label="θ2">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statetwo" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="3<=newform.state" prop="statethree" label="θ3">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statethree" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="4<=newform.state" prop="statefour" label="θ4">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statefour" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="5<=newform.state" prop="statefive" label="θ5">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statefive" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="6<=newform.state" prop="statesix" label="θ6">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statesix" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="7<=newform.state" prop="stateseven" label="θ7">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.stateseven" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="8<=newform.state" prop="stateeight" label="θ8">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.stateeight" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="9<=newform.state" prop="statenine" label="θ9">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statenine" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="10<=newform.state" prop="stateten" label="θ10">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.stateten" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="Smallwords">计算结果（最大最小法）:</div>
                <div align="center">
                  <el-table :data="tableData1" style="width: 49%">
                    <el-table-column label="净现值(单位：百万元)">
                      <el-table-column prop="plan" label="方案" width="100"></el-table-column>
                      <el-table-column prop="worst" label="最不利结果" width="100">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.worst" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column prop="state" label="状态">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-select v-model="scope.row.state" placeholder="请选择对应状态">-->
                        <!--                                            <el-option label="θ1" value="θ1"></el-option>-->
                        <!--                                            <el-option label="θ2" value="θ2"></el-option>-->
                        <!--                                            <el-option label="θ3" value="θ3"></el-option>-->
                        <!--                                            <el-option label="θ4" value="θ4"></el-option>-->
                        <!--                                            <el-option label="θ5" value="θ5"></el-option>-->
                        <!--                                        </el-select>-->
                        <!--                                    </template>-->
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="Smallwords">计算结果（最大最大法）:</div>
                <div align="center">
                  <el-table :data="tableData2" style="width: 49%">
                    <el-table-column label="净现值(单位：百万元)">
                      <el-table-column prop="plan" label="方案" width="100"></el-table-column>
                      <el-table-column prop="best" label="最优结果" width="100">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.best" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column prop="state" label="状态">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-select v-model="scope.row.state" placeholder="请选择对应状态">-->
                        <!--                                            <el-option label="θ1" value="θ1"></el-option>-->
                        <!--                                            <el-option label="θ2" value="θ2"></el-option>-->
                        <!--                                            <el-option label="θ3" value="θ3"></el-option>-->
                        <!--                                            <el-option label="θ4" value="θ4"></el-option>-->
                        <!--                                            <el-option label="θ5" value="θ5"></el-option>-->
                        <!--                                        </el-select>-->
                        <!--                                    </template>-->
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="Smallwords">计算结果（赫维斯基法）:</div>
                <div class="Smallwords">乐观系数 λ取值:{{value}}</div>
                <div align="center">
                  <el-table :data="tableData3" style="width: 402px">
                    <el-table-column label="净现值(单位：百万元)">
                      <el-table-column prop="plan" label="方案" width="100px"></el-table-column>
                      <el-table-column prop="best" label="最优结果" width="100px">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.best" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column prop="worst" label="最不利结果" width="100px">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.worst" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column prop="result" label="计算结果" width="100px">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.result" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="Smallwords">计算结果（拉普拉斯法）:</div>
                <div class="Smallwords">每个状态权重值:{{right}}</div>
                <div align="center">
                  <el-table :data="tableData41" style="width: 202px">
                    <el-table-column label="净现值(单位：百万元)">
                      <el-table-column prop="plan" label="方案" width="100px"></el-table-column>
                      <el-table-column prop="result" label="期望值" width="100px">
                        <!--                                        <template slot-scope="scope">-->
                        <!--                                            <el-input size="mini" v-model="scope.row.result" ></el-input>-->
                        <!--                                        </template>-->
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="Smallwords">计算结果（最小最大后悔值法）:</div>
                <div align="center">
                  <el-table :data="tableData5" style="width: 78%">
                    <el-table-column label="净现值(单位：百万元)">
                      <el-table-column prop="plan" label="方案\状态" width="120"></el-table-column>
                      <el-table-column v-if="1<=newform.state" prop="stateone" label="θ1">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.stateone" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="2<=newform.state" prop="statetwo" label="θ2">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statetwo" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="3<=newform.state" prop="statethree" label="θ3">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statethree" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="4<=newform.state" prop="statefour" label="θ4">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statefour" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="5<=newform.state" prop="statefive" label="θ5">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statefive" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="6<=newform.state" prop="statesix" label="θ6">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statesix" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="7<=newform.state" prop="stateseven" label="θ7">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.stateseven" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="8<=newform.state" prop="stateeight" label="θ8">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.stateeight" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="9<=newform.state" prop="statenine" label="θ9">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.statenine" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column v-if="10<=newform.state" prop="stateten" label="θ10">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.stateten" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                      <el-table-column prop="result" label="最大后悔值">
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        <el-input size="mini" v-model="scope.row.result" ></el-input>-->
                        <!--                                    </template>-->
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="Smallwords">最终结果:</div>
                <div align="center">
                  <el-table :data="tableData6" style="width: 78%">
                    <el-table-column prop="method" label="方法名称" width="180"></el-table-column>
                    <el-table-column prop="suggest" label="推荐方案" width="180"></el-table-column>
                  </el-table>
                </div>
                <div class="Smallwords">实验小结：{{summary}}</div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handledown">打 印</el-button>
                </div>
              </div>
            </div>
          </el-dialog>
          <el-dialog title="报告提交" :visible.sync="dialogVisibleaa">
            <div class="Smallwords">请选择报告文件</div>
            <el-upload ref="upfile"
                       style="display: inline"
                       :auto-upload="false"
                       :on-change="handleChange3"
                       :file-list="fileList3"
                       action="#">
              <i class="el-icon-plus avatar-uploader-icon" style="margin-left: 10px"></i>
            </el-upload>
            <div slot="footer">
              <el-button @click="dialogVisibleaa = false">取 消</el-button>
              <el-button type="primary" @click="loadreference">确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import storage from "good-storage";
import axios from "axios";
// import htmlToPdf from '../../components/htmlToPdf'
import VeLine from 'v-charts/lib/line'
//import echarts from "echarts"

export default {
  components: { VeLine},
  async created() {
    // console.log("方案数目"+this.newform.plan)
    //let length=this.newform.plan

    // this.chartData={
    //   columns: this.columnsList,
    //   rows: this.VeLineList
    // }


    var params1 = {
      type: '学生' ,
    }
    axios.get('http://101.132.121.170:8090/permission/get'+'?role='+params1.type).then(res => {
      if(this.contains("上传实验报告",res.data.permission)){
        this.isnotOK1=false
      }
      else {
        this.isnotOK1=true
      }
    })
    var params = {
      course_id: 1,
      project_id:8,
      user_id : storage.get('user_id', 1)
    }
    await axios.get('http://101.132.121.170:8090/uncertainty/get'+'?course_id='+params.course_id+'&project_id='+params.project_id).then(res => {
      console.log(res)
    })
  },
  data() {
    return {
      chartData: {
        columns: ['方案', '结果'],
        rows: []
      },

      xname:[],
      yname:[],
      isnotOK1:false,
      class:'',
      dialogVisibleaa:false,
      fileList3: [],
      dialogVisible:false,
      formInline: {
        right1:0.0,
        right2:0.0,
        right3:0.0,
        right4:0.0,
        right5:0.0,
        right6:0.0,
        right7:0.0,
        right8:0.0,
        right9:0.0,
        right10:0.0,
      },
      newform: {
        plan:0.0,
        state:0.0,
      },
      right:0,
      value: 0,
      activeName: 'question',
      tableData:[],
      define1:"最大最小法是决策者从最不利结果着眼，将在最不利结果中取得的最有利结果之行动作为最优行动方案。",
      define2:"最大最大法是决策者抱着最乐观的想法，从各方案最有利结果中选取最大值，该数值所对应的行动作为最优行动方案。",
      define3:"赫维斯基法是对最大最小法和最大最大法两个方法进行折中的方法。决策者同时抱有乐观和悲观的态度，对每个方案的最好结果和最差结果进行加权平均计算，然后选取加权平均收益最大的方案作为最优行动方案。"+"\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0采用该方法时，需要选取一个乐观系数 λ，该系数取值在0和1之间。如，风险厌恶型决策者会给与最好结果 0.3的权重，而给予最差结果 0.7的权重。",
      define4:"该方法的出发点是，既然不能肯定哪一种状态比另一种状态更可能出现，只好认为所有状态出现的概率是相等的。每个状态的权重值1/n。",
      define5:"该方法考虑了决策者在做完决定，知道实际结果时的态度，考虑到没有选取最优方案作为行动方案时的机会成本。"+"\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0该方法计算过程是：先计算各方案在各种状态下的后悔值，选出各方案的最大后悔值，然后从各方案最大后悔值中选取最小值，该数值对应的方案就是决策者没有选择最优方案时后悔值最小的方案。",
      define6:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0尽管上述不同方法给出的结论不一致，但是决策者根据自身的风险偏好和对风险的态度，可以选择一个或多个不确定性方法进行分析，以帮助决策者在决策时有更多的考量。",
      tableData1:[],
      result1:"",
      tableData2:[],
      result2:"",
      tableData3:[],
      result3:"",
      tableData41:[],
      tableData42:[],
      result41:"",
      result42:"",
      tableData5: [],
      result5:"",
      tableData6:[
        {
          method:"最大最小法",
          suggest:"",
        },
        {
          method:"最大最大法",
          suggest:"",
        },
        {
          method:"赫维斯基法",
          suggest:"",
        },
        {
          method:"拉普拉斯法",
          suggest:"",
        },
        {
          method:"最小最大后悔值法",
          suggest:"",
        },
      ],
      oo:0,
      nn:0,
      summary:'',
    };

  },
  watch:{
    result1(newText,oldText){
      console.log(newText, oldText);
      this.tableData6[0].suggest = newText;
      console.log(this.tableData6[0].suggest)
    },
    result2(newText,oldText){
      console.log(newText, oldText);
      this.tableData6[1].suggest = newText;
      console.log(this.tableData6[1].suggest)
    },
    result3(newText,oldText){
      console.log(newText, oldText);
      this.tableData6[2].suggest = newText;
      console.log(this.tableData6[2].suggest)
    },
    result41(newText,oldText){
      console.log(newText, oldText);
      this.tableData6[3].suggest = newText;
      console.log(this.tableData6[3].suggest)
    },
    result5(newText,oldText){
      console.log(newText, oldText);
      this.tableData6[4].suggest = newText;
      console.log(this.tableData6[4].suggest)
    },
  },
  methods: {
    handleChange3 (file, fileList) {
      this.fileList3 = fileList
    },
    async loadreference() {
      var params = {
        user_id: storage.get('user_id', 1),
      }
      await axios.get('http://101.132.121.170:8090/class/user' + '?user_id=' + params.user_id).then(res => {
        this.class = res.data[0].class_id
      })
      let fd = new FormData()
      fd.append('student_id', storage.get('user_id', 1))
      fd.append('class_id', this.class)
      fd.append('student_name', storage.get('user_name', ""))
      fd.append('grade', 0)
      this.fileList3.forEach(item => {
        fd.append('file', item.raw)
      })
      axios.post('http://101.132.121.170:8090/uncertainty/upload', fd).then(res => {
        console.log(res)
      })
      this.dialogVisibleaa = false
    },
    handleCommand (command) {
      this.xname=new Array();
      let length = this.newform.plan
      console.log(length)
      for (let tmp = 0; tmp < length; tmp++) {
        this.xname.push('方案' + Number(tmp + 1))
      }
      console.log(this.xname)
      if (command === 'first') {
        this.chartData.rows=new Array();
        console.log("正在绘制折线图")
        for(let tmp=0;tmp<length;tmp++)
        {
          this.chartData.rows.push({
            方案: this.xname[tmp],
            结果:this.tableData1[tmp].worst,
          })
        }
        console.log("绘制完成")
      }
      if (command === 'second') {
        this.chartData.rows=new Array();
        for(let tmp=0;tmp<length;tmp++)
        {
          this.chartData.rows.push({
            方案: this.xname[tmp],
            结果:this.tableData2[tmp].best,
          })
        }
      }
      if (command === 'third') {
        this.chartData.rows=new Array();
        for(let tmp=0;tmp<length;tmp++)
        {
          this.chartData.rows.push({
            方案: this.xname[tmp],
            结果:this.tableData3[tmp].best,
          })
        }
      }
      if (command === 'fourth') {
        this.chartData.rows=new Array();
        for(let tmp=0;tmp<length;tmp++)
        {
          this.chartData.rows.push({
            方案: this.xname[tmp],
            结果:this.tableData41[tmp].result,
          })
        }
      }
      if (command === 'fourthtwo') {
        this.chartData.rows=new Array();
        for(let tmp=0;tmp<length;tmp++)
        {
          this.chartData.rows.push({
            方案: this.xname[tmp],
            结果:this.tableData42[tmp].result,
          })
        }
      }
      if (command === 'fifth') {
        this.chartData.rows=new Array();
        for(let tmp=0;tmp<length;tmp++)
        {
          this.chartData.rows.push({
            方案: this.xname[tmp],
            结果:this.tableData5[tmp].result,
          })
        }
      }

    },
    //折线图相关
    // drawLine(id) {
    //   this.charts = echarts.init(document.getElementById(id))
    //   this.charts.setOption({
    //     tooltip: {
    //       trigger: 'axis'
    //     },
    //     // legend: {
    //     //   data: ['学生获得积分1']
    //     // },
    //     grid: {
    //       left: '3%',
    //       right: '4%',
    //       bottom: '3%',
    //       containLabel: true
    //     },
    //
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {}
    //       }
    //     },
    //     xAxis: {
    //       type: 'category',
    //       name:"方案",
    //       // type:'value',
    //       boundaryGap: false,
    //       data: []//["1","85","5","20","25","16","57"]
    //
    //     },
    //     yAxis: {
    //       name:"结果",
    //       type: 'value',
    //       data:[]
    //     },
    //
    //     series: [{
    //       name: '学生获得积分',
    //       type: 'line',
    //       stack: '总量',
    //       data: []
    //     }]
    //   })
    // },




    handledown(){
      htmlToPdf.downloadPDF(document.querySelector('#demo'),'实验报告')
    },
    onSubmit() {
      console.log(this.formInline.right1)
      console.log(this.formInline.right2)
      console.log(this.formInline.right3)
      console.log(this.formInline.right4)
      console.log(this.formInline.right5)
      console.log(Number(Number(this.formInline.right1)+Number(this.formInline.right2)+Number(this.formInline.right3)+Number(this.formInline.right4)+Number(this.formInline.right5)+Number(this.formInline.right6)+Number(this.formInline.right7)+Number(this.formInline.right8)+Number(this.formInline.right9)+Number(this.formInline.right10)))
      if(Number(Number(this.formInline.right1)+Number(this.formInline.right2)+Number(this.formInline.right3)+Number(this.formInline.right4)+Number(this.formInline.right5)+Number(this.formInline.right6)+Number(this.formInline.right7)+Number(this.formInline.right8)+Number(this.formInline.right9)+Number(this.formInline.right10)+Number(0.001))>1){
        this.$alert('权重分配合理', '权重之和判断', {
          confirmButtonText: '确定',
        });
        this.tableData42=[]
        if(this.newform.plan>0 && this.newform.state>0){
          var rows = this.newform.plan
          var cols = this.newform.state
          for (var i = 0; i < rows; i++) {
            var min = 0
            for (var j = 0; j < cols; j++) {
              if(j===0 && j<cols )
                min = Number(min+Number(this.tableData[i].stateone*this.formInline.right1))
              if(j===1 && j<cols )
                min =Number(min+Number(this.tableData[i].statetwo*this.formInline.right2))
              if(j===2 && j<cols )
                min =Number(min+Number(this.tableData[i].statethree*this.formInline.right3))
              if(j===3 && j<cols )
                min =Number(min+Number(min = this.tableData[i].statefour*this.formInline.right4))
              if(j===4 && j<cols )
                min =Number(min+Number(min = this.tableData[i].statefive*this.formInline.right5))
              if(j===5 && j<cols )
                min =Number(min+Number(min = this.tableData[i].statesix*this.formInline.right6))
              if(j===6 && j<cols )
                min =Number(min+Number(min = this.tableData[i].stateseven*this.formInline.right7))
              if(j===7 && j<cols )
                min =Number(min+Number(min = this.tableData[i].stateeight*this.formInline.right8))
              if(j===8 && j<cols )
                min =Number(min+Number(min = this.tableData[i].statenine*this.formInline.right9))
              if(j===9 && j<cols )
                min =Number(min+Number(min = this.tableData[i].stateten*this.formInline.right10))

            }
            this.tableData42.push({
              plan:'方案'+Number(i+1),
              result:min,
            })
            // this.tableData1[i].worst=min
            // this.tableData1[i].state='θ'+ minstate
          }
          console.log(this.tableData41)
        }
      }
      else{
        this.$alert('权重之和必须为1', '权重之和判断', {
          confirmButtonText: '确定',
        });
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    make() {
      this.nn++
      if(this.nn>this.oo){
        this.tableData=[]
      }
      for(var j=1;j<=this.newform.plan;j++){
        this.tableData.push({
          plan:'方案'+j,
          stateone:0,
          statetwo:0,
          statethree:0,
          statefour:0,
          statefive:0,
          statesix:0,
          stateseven:0,
          stateeight:0,
          statenine:0,
          stateten:0,
        })
      }
      this.oo=this.nn;
      console.log(this.tableData)
    },
    calculate1(){

      //this.drawLine('main')


      console.log(this.tableData)
      this.tableData1=[]
      if(this.newform.plan>0 && this.newform.state>0){
        var rows = this.newform.plan
        var cols = this.newform.state
        for (var i = 0; i < rows; i++) {
          var min = 100000
          var minstate = 10
          for (var j = 0; j < cols; j++) {
            console.log(min)
            if(j===0 && j<cols )
              if(Number(min)>Number(this.tableData[i].stateone)) {
                min = this.tableData[i].stateone
                minstate=1
                console.log("knazheli1"+min)
              }
            if(j===1 && j<cols ) {
              console.log("chucuo"+this.tableData[i].statetwo)
              console.log(min)
              if (Number(min) > Number(this.tableData[i].statetwo)) {
                min = this.tableData[i].statetwo
                minstate = 2
                console.log("knazheli2" + min)
              }
            }
            if(j===2 && j<cols )
              if( Number(min) > Number(this.tableData[i].statethree)) {
                min = this.tableData[i].statethree
                minstate=3
                console.log("knazheli3"+min)
              }
            if(j===3 && j<cols )
              if(Number(min)>Number(this.tableData[i].statefour)) {
                min = this.tableData[i].statefour
                minstate=4
              }
            if(j===4 && j<cols )
              if(Number(min)>Number(this.tableData[i].statefive)) {
                min = this.tableData[i].statefive
                minstate=5
              }
            if(j===5 && j<cols )
              if(Number(min)>Number(this.tableData[i].statesix)) {
                min = this.tableData[i].statesix
                minstate=6
              }
            if(j===6 && j<cols )
              if(Number(min)>Number(this.tableData[i].stateseven)) {
                min = this.tableData[i].stateseven
                minstate=7
              }
            if(j===7 && j<cols )
              if(Number(min)>Number(this.tableData[i].stateeight)) {
                min = this.tableData[i].stateeight
                minstate=8
              }
            if(j===8 && j<cols )
              if(Number(min)>Number(this.tableData[i].statenine)) {
                min = this.tableData[i].statenine
                minstate=9
              }
            if(j===9 && j<cols )
              if(Number(min)>Number(this.tableData[i].stateten)) {
                min = this.tableData[i].stateten
                minstate=10
              }
          }
          this.tableData1.push({
            plan:'方案'+Number(i+1),
            worst:min,
            state:'θ'+ minstate,
          })
          // this.tableData1[i].worst=min
          // this.tableData1[i].state='θ'+ minstate
        }
        console.log(this.tableData1)
      }

      // var opinionDataF=[];
      // var opinionData=[];
      //
      // alert(this.tableData1[0].worst)
      //
      // for (let i = 0; i < this.newform.plan; i++) {
      //   opinionDataF.push(String('方案'+Number(i+1)))
      //   opinionData.push(String(this.tableData1[i].worst))
      // }
      // this.charts.setOption({
      //   xAxis:{
      //     data:opinionDataF
      //   },
      //   series:[{
      //     data: opinionData
      //   }]
      // })


    },
    calculate2(){
      console.log(this.tableData)
      this.tableData2=[]
      if(this.newform.plan>0 && this.newform.state>0){
        var rows = this.newform.plan
        var cols = this.newform.state
        for (var i = 0; i < rows; i++) {
          var min = -100000
          var minstate = 0
          for (var j = 0; j < cols; j++) {
            if(j===0 && j<cols )
              if(Number(min)<Number(this.tableData[i].stateone)) {
                min = this.tableData[i].stateone
                minstate=1
              }
            if(j===1 && j<cols )
              if(Number(min)<Number(this.tableData[i].statetwo)) {
                min = this.tableData[i].statetwo
                minstate=2
              }
            if(j===2 && j<cols )
              if(Number(min)<Number(this.tableData[i].statethree)) {
                min = this.tableData[i].statethree
                minstate=3
              }
            if(j===3 && j<cols )
              if(Number(min)<Number(this.tableData[i].statefour)) {
                min = this.tableData[i].statefour
                minstate=4
              }
            if(j===4 && j<cols )
              if(Number(min)<Number(this.tableData[i].statefive)) {
                min = this.tableData[i].statefive
                minstate=5
              }
            if(j===5 && j<cols )
              if(Number(min)<Number(this.tableData[i].statesix)) {
                min = this.tableData[i].statesix
                minstate=6
              }
            if(j===6 && j<cols )
              if(Number(min)<Number(this.tableData[i].stateseven)) {
                min = this.tableData[i].stateseven
                minstate=7
              }
            if(j===7 && j<cols )
              if(Number(min)<Number(this.tableData[i].stateeight)) {
                min = this.tableData[i].stateeight
                minstate=8
              }
            if(j===8 && j<cols )
              if(Number(min)<Number(this.tableData[i].statenine)) {
                min = this.tableData[i].statenine
                minstate=9
              }
            if(j===9 && j<cols )
              if(Number(min)<Number(this.tableData[i].stateten)) {
                min = this.tableData[i].stateten
                minstate=10
              }
          }
          this.tableData2.push({
            plan:'方案'+Number(i+1),
            best:min,
            state:'θ'+ minstate,
          })
          // this.tableData1[i].worst=min
          // this.tableData1[i].state='θ'+ minstate
        }
        console.log(this.tableData2)
      }
    },
    calculate3(){
      if(this.value!=0){
        this.tableData3=[]
        if(this.newform.plan>0 && this.newform.state>0){
          var rows = this.newform.plan
          var cols = this.newform.state
          for (var i = 0; i < rows; i++) {
            var min = 1000000
            var max = -10000
            for (var j = 0; j < cols; j++) {
              if(j===0 && j<cols )
                if(Number(min)>Number(this.tableData[i].stateone)) {
                  min = this.tableData[i].stateone
                }
              if(j===0 && j<cols )
                if(Number(max)<Number(this.tableData[i].stateone)) {
                  max = this.tableData[i].stateone
                }
              if(j===1 && j<cols )
                if(Number(min)>Number(this.tableData[i].statetwo)) {
                  min = this.tableData[i].statetwo
                }
              if(j===1 && j<cols )
                if(Number(max)<Number(this.tableData[i].statetwo)) {
                  max = this.tableData[i].statetwo
                }
              if(j===2 && j<cols )
                if(Number(min)>Number(this.tableData[i].statethree)) {
                  min = this.tableData[i].statethree
                }
              if(j===2 && j<cols )
                if(Number(max)<Number(this.tableData[i].statethree)) {
                  max = this.tableData[i].statethree
                }
              if(j===3 && j<cols )
                if(Number(min)>Number(this.tableData[i].statefour)) {
                  min = this.tableData[i].statefour
                }
              if(j===3 && j<cols )
                if(Number(max)<Number(this.tableData[i].statefour)) {
                  max = this.tableData[i].statefour
                }
              if(j===4 && j<cols )
                if(Number(min)>Number(this.tableData[i].statefive)) {
                  min = this.tableData[i].statefive
                }
              if(j===4 && j<cols )
                if(Number(max)<Number(this.tableData[i].statefive)) {
                  max = this.tableData[i].statefive
                }
              if(j===5 && j<cols )
                if(Number(min)>Number(this.tableData[i].statesix)) {
                  min = this.tableData[i].statesix
                }
              if(j===5 && j<cols )
                if(Number(max)<Number(this.tableData[i].statesix)) {
                  max = this.tableData[i].statesix
                }
              if(j===6 && j<cols )
                if(Number(min)>Number(this.tableData[i].stateseven)) {
                  min = this.tableData[i].stateseven
                }
              if(j===6 && j<cols )
                if(Number(max)<Number(this.tableData[i].stateseven)) {
                  max = this.tableData[i].stateseven
                }
              if(j===7 && j<cols )
                if(Number(min)>Number(this.tableData[i].stateeight)) {
                  min = this.tableData[i].stateeight
                }
              if(j===7 && j<cols )
                if(Number(max)<Number(this.tableData[i].stateeight)) {
                  max= this.tableData[i].stateeight
                }
              if(j===8 && j<cols )
                if(Number(min)>Number(this.tableData[i].statenine)) {
                  min = this.tableData[i].statenine
                }
              if(j===8 && j<cols )
                if(Number(max)<Number(this.tableData[i].statenine)) {
                  max = this.tableData[i].statenine
                }
              if(j===9 && j<cols )
                if(Number(min)>Number(this.tableData[i].stateten)) {
                  min = this.tableData[i].stateten
                }
              if(j===9 && j<cols )
                if(Number(max)<Number(this.tableData[i].stateten)) {
                  max = this.tableData[i].stateten
                }
            }
            this.tableData3.push({
              plan:'方案'+Number(i+1),
              worst:min,
              best:max,
              result:Number(this.value*max)+Number(Number(1-this.value)*min),
            })
            // this.tableData1[i].worst=min
            // this.tableData1[i].state='θ'+ minstate
          }
          console.log(this.tableData3)
        }
      }
    },
    calculate41(){
      console.log(this.tableData)
      if(Number(this.right*this.newform.state)===1) {
        this.tableData41 = []
        if (this.newform.plan > 0 && this.newform.state > 0) {
          var rows = this.newform.plan
          var cols = this.newform.state
          for (var i = 0; i < rows; i++) {
            var min = 0
            for (var j = 0; j < cols; j++) {
              if (j === 0 && j < cols)
                min = Number(min + Number(this.tableData[i].stateone * this.right))
              if (j === 1 && j < cols)
                min = Number(min + Number(this.tableData[i].statetwo * this.right))
              if (j === 2 && j < cols)
                min = Number(min + Number(this.tableData[i].statethree * this.right))
              if (j === 3 && j < cols)
                min = Number(min + Number(min = this.tableData[i].statefour * this.right))
              if (j === 4 && j < cols)
                min = Number(min + Number(min = this.tableData[i].statefive * this.right))
              if (j === 5 && j < cols)
                min = Number(min + Number(min = this.tableData[i].statesix * this.right))
              if (j === 6 && j < cols)
                min = Number(min + Number(min = this.tableData[i].stateseven * this.right))
              if (j === 7 && j < cols)
                min = Number(min + Number(min = this.tableData[i].stateeight * this.right))
              if (j === 8 && j < cols)
                min = Number(min + Number(min = this.tableData[i].statenine * this.right))
              if (j === 9 && j < cols)
                min = Number(min + Number(min = this.tableData[i].stateten * this.right))

            }
            this.tableData41.push({
              plan: '方案' + Number(i + 1),
              result: min,
            })
            // this.tableData1[i].worst=min
            // this.tableData1[i].state='θ'+ minstate
          }
          console.log(this.tableData41)
        }
      }
      else{
        this.$alert('权重之和必须为1', '权重之和判断', {
          confirmButtonText: '确定',
        });
      }
    },
    calculate5(){
      this.tableData5=[]
      if(this.newform.plan>0 && this.newform.state>0){
        var rows = this.newform.plan
        var cols = this.newform.state
        var maxlist=new Array(cols)
        for(var o=0;o<cols;o++) {
          var maxcol=-10000000
          for (var p = 0; p < rows; p++) {
            if (o === 0 &&o<cols){
              if(Number(maxcol)<Number(this.tableData[p].stateone))
                maxcol=this.tableData[p].stateone
            }
            if (o === 1 &&o<cols){
              if(Number(maxcol)<Number(this.tableData[p].statetwo))
                maxcol=this.tableData[p].statetwo
            }
            if (o === 2 &&o<cols){
              if(Number(maxcol)<Number(this.tableData[p].statethree))
                maxcol=this.tableData[p].statethree
            }
            if (o === 3 &&o<cols){
              if(Number(maxcol)<Number(this.tableData[p].statefour))
                maxcol=this.tableData[p].statefour
            }
            if (o === 4 &&o<cols){
              if(Number(maxcol)<Number(this.tableData[p].statefive))
                maxcol=this.tableData[p].statefive
            }
            if (o === 5 &&o<cols){
              if(Number(maxcol)<Number(this.tableData[p].statesix))
                maxcol=this.tableData[p].statesix
            }
            if (o === 6 &&o<cols){
              if(Number(maxcol)<Number(this.tableData[p].stateseven))
                maxcol=this.tableData[p].stateseven
            }
            if (o === 7 &&o<cols){
              if(Number(maxcol)<Number(this.tableData[p].stateeight))
                maxcol=this.tableData[p].stateeight
            }
            if (o === 8 &&o<cols){
              if(Number(maxcol)<Number(this.tableData[p].statenine))
                maxcol=this.tableData[p].statenine
            }
            if (o === 9 &&o<cols){
              if(Number(maxcol)<Number(this.tableData[p].stateten))
                maxcol=this.tableData[p].stateten
            }
          }
          maxlist[o]=maxcol
        }
        console.log(maxlist)

        for (var i = 0; i < rows; i++) {
          for (var j = 0; j < cols; j++) {
            if(j===0)
              var one=Number(maxlist[j])-Number(this.tableData[i].stateone)
            if(j===1)
              var two=Number(maxlist[j])-Number(this.tableData[i].statetwo)
            if(j===2)
              var three=Number(maxlist[j])-Number(this.tableData[i].statethree)
            if(j===3)
              var four=Number(maxlist[j]-this.tableData[i].statefour)
            if(j===4)
              var five=Number(maxlist[j]-this.tableData[i].statefive)
            if(j===5)
              var six=Number(maxlist[j]-this.tableData[i].statesix)
            if(j===6)
              var seven=Number(maxlist[j]-this.tableData[i].stateseven)
            if(j===7)
              var eight=Number(maxlist[j]-this.tableData[i].stateeight)
            if(j===8)
              var nine=Number(maxlist[j]-this.tableData[i].statenine)
            if(j===9)
              var ten=Number(maxlist[j]-this.tableData[i].stateten)
          }
          var resultlist=[one,two,three,four,five,six,seven,eight,nine,ten]
          console.log(resultlist)
          var resultnewlist=resultlist.sort()
          console.log(resultnewlist)
          var result = resultnewlist[cols-1]
          this.tableData5.push({
            plan:'方案'+Number(i+1),
            stateone:one,
            statetwo:two,
            statethree:three,
            statefour:four,
            statefive:five,
            statesix:six,
            stateseven:seven,
            stateeight:eight,
            statenine:nine,
            stateten:ten,
            result:result,
          })
          // this.tableData1[i].worst=min
          // this.tableData1[i].state='θ'+ minstate
        }
        console.log(this.tableData5)
      }
    },
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px !important;
  height: 10px !important;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(248, 230, 230, 0.2);
  /* 滚动条的颜色 */
  background-color: #938d8d;
}
.dialog-footer{
  float: right;
}
.block{
  width: 70%;
}
.Smallwords{
  font-size: 32%;
  color: #444649;
  margin: 8px;
}
.right{
  margin-bottom: 8px;
  margin-right: 8px;
}
</style>
<style>
.el-slider__button-wrapper {
  top: -2px;
}
.el-slider__button {
  border: none;
  background-color: transparent;
}
.el-slider__button::after, .el-slider__button.dragging::after {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #2e0f6d;
  top: 3px;
  left: 12px;
}
.el-slider__button-wrapper .el-tooltip, .el-slider__button-wrapper::after {
  display: block;
}
</style>
