<template>
  <div class="fans_analysis">
    <!-- <div class="increment_box gap-top line"> -->
    <!-- <div class="headline">
        <p class="p">粉丝增量</p>
        <div class="select">
          <div class="selectivity">
            <P
              :class="{'active':timeTab==index}"
              @click="onTimeTab(index)"
              v-for="(item,index) in timeList"
              :key="index"
            >{{item.name}}</P>
          </div>
          <div class="selectivity">
            <P
              :class="{'active':riseTab==index}"
              @click="onTiseTab(index)"
              v-for="(item,index) in riseList"
              :key="index"
            >{{item.name}}</P>
          </div>
        </div>
    </div>-->
    <!-- <div class="echarts_box" id="nets_line"></div> -->
    <!-- </div> -->
    <div class="age_area">
      <div class="age_distribution line">
        <div class="pie" id="age_pie"></div>
        <div class="progress">
          <h3>性别分布</h3>
          <div class="strip">
            <img class="womana" src="../assets/images/icon-figures-black.png" />
            <el-progress
              class="linellae"
              :text-inside="false"
              :show-text="false"
              :stroke-width="16"
              :percentage="74"
              :color="customColorMethod"
            ></el-progress>
            <img class="woman" src="../assets/images/icon-figures-red.png" />
          </div>
          <div class="hint">
            <p>
              男
              <span></span>
              {{manPercent}}%
              <span></span>
              {{sexManData}}人
            </p>
            <p>
              女
              <span></span>
              {{(100-manPercent).toFixed(1)}}%
              <span></span>
              {{sexWomanData}}人
            </p>
          </div>
        </div>
      </div>
      <div class="area_distribution line">
        <div class="area_title">
          <h3>区域分布</h3>
          <!-- <div class="province">
            <div
              class="select"
              :class="{'activeProvince':provinceTab==index}"
              v-for="(item,index) in provinceList"
              :key="index"
              @click="onProvinceTab(index)"
            >{{item.name}}</div>
          </div> -->
        </div>
        <div class="table">
          <el-table :data="areaList" height="418" style="max-width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="item" label="名称"></el-table-column>
            <el-table-column label="占比">
              <template slot-scope="scope">{{scope.row.value}}%</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="gap-top">
      <div id="fans_columnar"></div>
    </div>
    <div class="sex gap-top">
      <!-- <h3>性别分不趋势图</h3>  -->
      <div class="title">
        <p>设备分布</p>
        <!-- <div class="button">
          <div
            class="cut"
            :class="{'activeSex':sexMantab==index}"
            @click="onSexMan(index)"
            v-for="(item,index) in timeList"
            :key="index"
          >{{item.name}}</div>
        </div> -->
      </div>
      <div class="sex_columnar" id="man_columnar"></div>
      <div class="title gap-top">
        <p>粉丝兴趣</p>
        <!-- <div class="button">
          <div
            class="cut"
            :class="{'activeSex':sexWomantab==index}"
            @click="onSexWoman(index)"
            v-for="(item,index) in timeList"
            :key="index"
          >{{item.name}}</div>
        </div> -->
      </div>
      <div class="sex_columnar" id="woman_columnar"></div>
    </div>
    <!-- <div class="age_broken_distribution gap-top">
      <div class="title">
        <h3>年龄分布趋势图</h3>
        <div class="button">
          <p class="select" :class="{'activeSex':sextab==index}" @click="onSexTab(index)" v-for="(item,index) in timeList" :key="index">{{item.name}}</p>
        </div>
      </div>
      <div id="age_broken"></div>
    </div>
    <div class="gap-top">
      <div id="video_content"></div>
    </div>-->
  </div>
</template>
<script>
import echarts from "echarts";
import {
  searchActive,
  searchAge,
  searchDevice,
  searchGeographical,
  searchGender,
  searchInterest
} from "@/utils/api.js";
export default {
  props: {
    uuid: {
      type: String,
      default: 0
    },
    enterpriseId: {
      type: String,
      default: 0
    }
  },
  data() {
    return {
      timeTab: 0,
      riseTab: 0,
      customColorMethod: "#B3BCC5 ",
      provinceTab: 0,
      sexMantab: 0,
      sexWomantab: 0,
      sextab: 0,
      timeList: [
        {
          name: "近7天"
        },
        {
          name: "30天"
        }
      ],
      riseList: [
        {
          name: "曾量"
        },
        {
          name: "总量"
        }
      ],
      provinceList: [
        {
          name: "省份"
        },
        {
          name: "城市"
        }
      ],
      pieList: [], //饼状列表
      areaList: [], //区域列表
      abscissaData: [], //横坐标
      ordinateData: [], //纵坐标
      sexManData: 0, //性别男数量
      sexWomanData: 0 //性别女数量
    };
  },
  created() {
    this.ageFetchData({
      uuid: this.uuid,
      enterpriseId: this.enterpriseId
    });
    this.sexFetchData({
      uuid: this.uuid,
      enterpriseId: this.enterpriseId
    });
    this.fetchList({
      uuid: this.uuid,
      enterpriseId: this.enterpriseId
    });
    this.fansFetchData({
      uuid: this.uuid,
      enterpriseId: this.enterpriseId
    });
    this.equipmentFetchData({
      uuid: this.uuid,
      enterpriseId: this.enterpriseId
    });
    this.interestFetchData({
      uuid: this.uuid,
      enterpriseId: this.enterpriseId
    });
  },
  computed: {
    //性别男百分比
    manPercent() {
      return Number(
        (this.sexManData / (this.sexManData + this.sexWomanData)) * 100
      ).toFixed(0);
    }
  },
  mounted() {
    // this.increment();
    // this.manColumnar();
    // this.womanColumnar();
    // this.ageBroken();
    // this.videoContent();
  },
  methods: {
    //年龄请求
    ageFetchData({ uuid, enterpriseId }) {
      searchAge({
        uuid,
        enterpriseId
      })
        .then(res => {
          this.formatData(res.data);
          this.agePie();
          this.formatListData(res.data);
          this.fansColumnar();
        })
        .catch(err => console.log(err));
    },
    //性别分布请求
    sexFetchData({ uuid, enterpriseId }) {
      searchGender({
        uuid,
        enterpriseId
      })
        .then(res => {
          this.sexManData = res.data[0].value;
          this.sexWomanData = res.data[1].value;
        })
        .catch(err => console.log(err));
    },
    //区域列表请求
    fetchList({ uuid, enterpriseId }) {
      searchGeographical({
        uuid,
        enterpriseId
      })
        .then(res => {
          this.areaList = res.data;
        })
        .catch(err => console.log(err));
    },
    //粉丝数据活跃天数请求
    fansFetchData({ uuid, enterpriseId }) {
      searchActive({
        uuid,
        enterpriseId
      })
        .then(res => {
          this.formatListData(res.data);
          this.fansColumnar();
        })
        .catch(err => console.log(err));
    },
    //设备请求
    equipmentFetchData({ uuid, enterpriseId }) {
      searchDevice({
        uuid,
        enterpriseId
      })
        .then(res => {
          this.formatListData(res.data);
          this.manColumnar();
        })
        .catch(err => console.log(err));
    },
    //粉丝数据兴趣请求
    interestFetchData({ uuid, enterpriseId }) {
      searchInterest({
        uuid,
        enterpriseId
      })
        .then(res => {
          this.formatListData(res.data);
          this.womanColumnar();
        })
        .catch(err => console.log(err));
    },
    //增量折线图
    increment() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("nets_line"));
      let option = {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#ffc652" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#fffaf0" // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        grid: {
          top: "3%",
          bottom: "52",
          left: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
            }
          },
          axisLine: {
            lineStyle: {
              color: "#97A4BA",
              width: 1 //这里是为了突出显示加上的
            }
          },
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Sun"]
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
            }
          },
          axisLine: {
            lineStyle: {
              color: "#97A4BA",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        series: [
          {
            data: [-820, -932, -901, 934, 1290, 1330, 1320, 12],
            type: "line",
            areaStyle: {}
          }
        ]
      };
      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //年龄饼状
    agePie() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("age_pie"));
      let option = {
        title: {
          text: "年龄分布",
          left: "3%",
          top: 5,
          bottom: 10,
          textStyle: {
            color: "#333333",
            fontSize: 16
          }
        },
        color: [
          "#c23519",
          "#91caff",
          "#4a87ff",
          "#ba6959",
          "#ffbd37",
          "#fe6545"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this_.pieList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //粉丝活跃时间分布-周
    fansColumnar() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("fans_columnar"));
      let option = {
        title: {
          text: "粉丝活跃",
          left: "3%",
          top: 5,
          bottom: 10,
          textStyle: {
            color: "#333333",
            fontSize: 16
          }
        },
        color: ["#3398DB"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#97A4BA",
                width: 1 //这里是为了突出显示加上的
              }
            },
            data: this_.abscissaData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
              }
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#FFBD37"
              }
            },
            barCategoryGap: "30%",
            // barWidth: 20,//柱图宽度
            barWidth: "20%",
            data: this_.ordinateData
          }
        ]
      };
      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //性别男分不趋势图
    manColumnar() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("man_columnar"));
      let option = {
        color: ["#3398DB"],
        tooltip: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#97A4BA",
                width: 1 //这里是为了突出显示加上的
              }
            },
            data: this_.abscissaData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
              }
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barCategoryGap: "30%",
            // barWidth: 20,//柱图宽度
            barWidth: "20%",
            itemStyle: {
              normal: {
                color: "#6599FF"
              }
            },
            data: this_.ordinateData
          }
        ]
      };
      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //性别女分不趋势图
    womanColumnar() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("woman_columnar"));
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#97A4BA",
                width: 1 //这里是为了突出显示加上的
              }
            },
            data: this_.abscissaData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
              }
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            itemStyle: {
              normal: {
                color: "#FE6545"
              }
            },
            barCategoryGap: "30%",
            // barWidth: 20,//柱图宽度
            barWidth: "20%",
            data: this_.ordinateData
          }
        ]
      };
      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //年龄分布趋势图
    ageBroken() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("age_broken"));
      let option = {
        tooltip: {
          trigger: "axis"
        },
        color: [
          "#91CAFF",
          "#BA6959",
          "#C23519",
          "#FE7C61",
          "#FFC755",
          "#6599FF"
        ],
        legend: {
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: "horizontal",
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: "4%",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "bottom",
          icon: "rect", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 20, // 设置宽度
          itemHeight: 20, // 设置高度
          itemGap: 40, // 设置间距
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#97A4BA",
              width: 1 //这里是为了突出显示加上的
            }
          },
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
            }
          }
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    // 视频内容关键词
    videoContent() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("video_content"));
      let option = {
        title: {
          text: "视频内容关键词"
        },
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 1,
              color: "#2E5BFF" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#fffaf0" // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: ["蒸发量", "平均温度"]
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#97A4BA",
                width: 1 //这里是为了突出显示加上的
              }
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "水量",
            min: 0,
            max: 250,
            interval: 50,
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
              }
            },
            axisLabel: {
              formatter: "{value} ml"
            }
          },
          {
            type: "value",
            name: "温度",
            min: 0,
            max: 25,
            interval: 5,
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
              }
            },
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#91CAFF"
              }
            },
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "平均温度",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      };
      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    // 列表对象提取
    formatData(list) {
      list.length > 0 &&
        list.forEach(val =>
          this.pieList.push({ name: val.item, value: val.value })
        );
    },
    // 数据对象格式转数组
    formatListData(list) {
      if (list.length > 0) {
        this.abscissaData = [];
        this.seriesDataTop = [];
        for (let i = 0; i < list.length; i++) {
          this.abscissaData.push(list[i].item);
          this.ordinateData.push(list[i].value);
        }
      }
    },
    onTimeTab(index) {
      this.timeTab = index;
    },
    onTiseTab(index) {
      this.riseTab = index;
    },
    onProvinceTab(index) {
      this.provinceTab = index;
    },
    onSexMan(index) {
      this.sexMantab = index;
    },
    onSexWoman(index) {
      this.sexWomantab = index;
    },
    onSexTab(index) {
      this.sextab = index;
    }
  }
};
</script>
<style >
.el-progress-bar__outer {
  background: #ff3029;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
}
.el-progress-bar__inner {
  border-radius: 0px;
}
</style>
<style >
.el-table__row > td {
  border-bottom: 1px solid #ebeef5;
}
</style>
<style scoped>
.fans_analysis {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}
.line {
  border: 1px solid #eaf0f7;
}
.gap-top {
  margin-top: 32px;
}
.active {
  background-image: linear-gradient(-90deg, #ff714b 4%, #ff3029 96%);
  color: #ffffff;
  border: none !important;
}
.activeProvince {
  color: #1890ff !important;
}
.activeSex {
  background-color: #1890ff;
  color: #ffffff !important;
  border: none;
}
.increment_box {
  width: 100%;
  height: auto;
}
.increment_box .echarts_box {
  width: 100%;
  height: 380px;
}
.increment_box .headline {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 3%;
  align-items: center;
  margin-top: 37px;
  margin-bottom: 20px;
}
.headline .p {
  font-size: 16px;
  color: #333333;
  font-weight: 600;
}
.headline .select {
  display: inline-flex;
}
.headline .select .selectivity {
  margin-right: 16px;
  font-size: 14px;
  color: #000000;
  display: inline-flex;
}
.headline .select .selectivity p {
  height: 32px;
  width: 63px;
  line-height: 32px;
  border: 1px solid #d9d9d9;
  text-align: center;
  border-radius: 15px;
  margin-right: 16px;
}
.age_area {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.age_distribution {
  flex-grow: 1;
  margin: auto;
  margin-top: 32px;
  margin-right: 20px;
  min-width: 300px;
}
.age_distribution .pie {
  width: 100%;
  height: 350px;
  margin-top: 28px;
}
.progress {
  margin: 20px 0 37px;
  padding-left: 5%;
  margin-right: 3%;
}
.progres h3 {
  font-size: 16px;
  color: #333333;
}
.progress .strip {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 40px 0 24px;
}
.progress .strip .linellae {
  width: 100%;
}
.progress .strip img {
  width: 15px;
  height: 42px;
}
.womana {
  margin-right: 17px;
}
.woman {
  margin-left: 17px;
}
.hint {
  display: flex;
  justify-content: space-between;
}
.hint p {
  font-size: 14px;
  color: #000000;
}
.hint p span {
  margin-right: 10px;
}
.area_distribution {
  flex-grow: 1;
  margin-top: 32px;
  padding: 32px;
  max-width: 500px;
  box-sizing: border-box;
}
.area_distribution .area_title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.area_distribution .area_title h3 {
  font-size: 16px;
  color: #000000;
}
.area_distribution .area_title .province {
  font-size: 14px;
  color: #000000;
  display: inline-flex;
  align-items: center;
}
.area_distribution .area_title .province .select {
  border-right: 2px solid #7a7a7a;
  padding: 0px 10px;
}
.area_distribution .area_title .province .select:last-child {
  border: none;
}
#fans_columnar {
  width: 100%;
  height: 400px;
}
.sex h3 {
  font-size: 16px;
  color: #333333;
  margin-bottom: 10px;
}
.sex .title {
  display: flex;
  justify-content: space-between;
}
.sex .title p {
  font-size: 14px;
  color: #333333;
}
.sex .title .button {
  display: flex;
}
.sex .title .cut {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 70px;
  height: 32px;
  color: #000000;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  margin-left: 15px;
}
.sex .sex_columnar {
  width: 100%;
  height: 400px;
}
.age_broken_distribution .title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.age_broken_distribution .title h3 {
  font-size: 16px;
  color: #333333;
}
.age_broken_distribution .title .button {
  display: flex;
}
.age_broken_distribution .title .button .select {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 70px;
  height: 32px;
  color: #000000;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  margin-left: 15px;
}
#age_broken {
  width: 100%;
  height: 500px;
}
#video_content {
  width: 100%;
  height: 350px;
}
</style>