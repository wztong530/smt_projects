<template>
  <div class="anchor_search">
    <!-- 搜索条件区 -->
    <div class="criteria_container">
      <!-- 搜索框 -->
      <div class="search_box">
        <search-bar @search="searchHandle"></search-bar>
        <div class="spread_btn" @click="isSpread = !isSpread">
          <span>{{isSpread ? '收起搜索条件' : '展开搜索条件'}}</span>
          <i :class="isSpread ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
        </div>
      </div>
      <!-- 搜索条件 -->
      <el-collapse-transition>
        <div class="criteria_box" v-show="isSpread">
          <div class="criteria_one">
            <h4 class="search_title">状 &nbsp;&nbsp; 态：</h4>
            <div class="options_box">
              <!-- 状态 -->
              <div class="option_one">
                <el-select v-model="status" clearable placeholder="请选择">
                  <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <!-- 地区 -->
              <div class="option_two">
                <h5 class="title">地 &nbsp;&nbsp; 区：</h5>
                <el-select v-model="province" clearable placeholder="请选择" @change="changeProvince">
                  <el-option
                    v-for="(item, index) in regionList"
                    :key="item.code"
                    :label="item.name"
                    :value="index"
                  ></el-option>
                </el-select>
                <el-select v-model="city" clearable placeholder="请选择" @change="loadSearchList(1)">
                  <el-option
                    v-for="item in cities"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </div>
              <!-- 性别 -->
              <div class="option_two">
                <h5 class="title">性 &nbsp;&nbsp; 别：</h5>
                <el-select v-model="gender" clearable placeholder="请选择" @change="loadSearchList(1)">
                  <el-option
                    v-for="item in genderList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="criteria_two" v-for="(item, index) in criteriaList" :key="index">
            <h4 class="search_title">{{item.title}}：</h4>
            <div class="tab_box">
              <nav-tabs :tabsList="item.tabsList" :outerIndex="index" @tabChange="getIndex"></nav-tabs>
            </div>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <!-- 标签导航栏 -->
    <div class="navtab_list">
      <div
        class="item"
        :class="navTabIndex == index ? 'active' : ''"
        v-for="(item, index) in navTabList"
        :key="index"
        @click="changeNavTab(index)"
      >{{item.title}}</div>
    </div>
    <!-- 内容展示区 -->
    <ul class="show_box" v-show="showList.length > 0">
      <li class="item" v-for="(item, index) in showList" :key="index">
        <div class="anchor_info">
          <img class="avatar" :src="item.avatar" />
          <div class="info">
            <div class="top">
              <h5>{{item.nickname}}</h5>
              <p v-if="item.label">{{item.label}}</p>
            </div>
            <p>抖音号：{{item.hostId}}</p>
            <p>个性签名：{{item.signature || '这个人很懒，什么都没写！'}}</p>
          </div>
        </div>
        <div class="right">
          <div class="num_card_box">
            <div class="num_card">
              <p>粉丝数</p>
              <h4>{{item.fansCount | numFormat}}</h4>
            </div>
            <div class="num_card">
              <p>作品数</p>
              <h4>{{item.worksCount | numFormat}}</h4>
            </div>
            <div class="num_card">
              <p>总点赞数</p>
              <h4>{{item.likeCount | numFormat}}</h4>
            </div>
          </div>
          <div class="collect_card">
            <img
              :src="item.isCollect ? require('@/assets/images/icon-shoucang2.svg') : require('@/assets/images/icon-shoucang1.svg')"
              @click="collectHandle(index)"
            />
            <p>添加收藏</p>
          </div>
          <div class="btn_detail" @click="viewDetail(index)">查看详情</div>
        </div>
      </li>
    </ul>
    <div class="no_data" v-show="!(showList.length > 0)">
      <p>暂无数据</p>
    </div>
    <!-- 分页 -->
    <div class="page_box">
      <paging-tag :pageSize="pageSize" :total="total" @changeCurrent="getCurrent"></paging-tag>
    </div>
  </div>
</template>
<script>
import pagingTag from "@/components/pagingTag.vue";
import navTabs from "@/components/navTabs.vue";
import searchBar from "@/components/searchBar.vue"
import { searchList } from "@/utils/api.js";
import { region } from "@/utils/region.js";
import { mapState } from "vuex"

export default {
  data() {
    return {
      content: "", //搜索内容
      pageSize: 20, // page: 1 当前页码 从1页开始
      total: 0,
      isSpread: true, //已展开
      statusList: [], //状态列表
      status: "",
      regionList: region, //地区列表
      province: "",
      city: "",
      cities: [],
      genderList: [{ value: 1, label: "男" }, { value: 2, label: "女" }],
      gender: "", //性别
      criteriaList: [], //条件列表
      minFansCount: "",
      maxFansCount: "",
      minLikeCount: "",
      maxLikeCount: "",
      minAge: "",
      maxAge: "",
      navTabList: [], //胶囊导航栏
      navTabIndex: 0,
      orderBy: "", //胶囊导航排序
      showList: []
    };
  },
  methods: {
    //初始化默认数据
    initData() {
      //状态列表
      this.statusList = [
        { value: 1, label: "状态1" },
        { value: 2, label: "状态2" },
        { value: 3, label: "状态3" },
        { value: 4, label: "状态4" }
      ];
      //条件列表
      this.criteriaList = [
        {
          title: "粉丝数",
          tabsList: [
            { tabTitle: "全部" },
            { tabTitle: "<1万", maxFansCount: 10000 },
            { tabTitle: "1万-10万", minFansCount: 10000, maxFansCount: 100000 },
            {
              tabTitle: "10万-50万",
              minFansCount: 100000,
              maxFansCount: 500000
            },
            {
              tabTitle: "50万-100万",
              minFansCount: 500000,
              maxFansCount: 1000000
            },
            {
              tabTitle: "100万-500万",
              minFansCount: 1000000,
              maxFansCount: 5000000
            },
            {
              tabTitle: "500万-1000万",
              minFansCount: 5000000,
              maxFansCount: 10000000
            },
            { tabTitle: ">1000万", minFansCount: 10000000 }
          ]
        },
        {
          title: "点赞数",
          tabsList: [
            { tabTitle: "全部" },
            { tabTitle: "<1万", maxLikeCount: 10000 },
            { tabTitle: "1万-10万", minLikeCount: 10000, maxLikeCount: 100000 },
            {
              tabTitle: "10万-50万",
              minLikeCount: 100000,
              maxLikeCount: 500000
            },
            {
              tabTitle: "50万-100万",
              minLikeCount: 500000,
              maxLikeCount: 1000000
            },
            {
              tabTitle: "100万-200万",
              minLikeCount: 1000000,
              maxLikeCount: 2000000
            },
            { tabTitle: ">200万", minLikeCount: 2000000 }
          ]
        },
        {
          title: "年龄段",
          tabsList: [
            { tabTitle: "不限" },
            { tabTitle: "6-16", minAge: 6, maxAge: 16 },
            { tabTitle: "17-24", minAge: 17, maxAge: 24 },
            { tabTitle: "25-30", minAge: 25, maxAge: 30 },
            { tabTitle: "31-35", minAge: 31, maxAge: 35 },
            { tabTitle: "36-40", minAge: 36, maxAge: 40 },
            { tabTitle: "40+", minAge: 41 }
          ]
        }
      ];
      //胶囊导航栏
      this.navTabList = [
        { title: "最近发布", orderBy: "current_public_time" },
        { title: "粉丝最多", orderBy: "fans_count" },
        { title: "点赞最多", orderBy: "like_count" }
      ];
      this.orderBy = this.navTabList[0].orderBy;
    },
    //搜索事件
    searchHandle(e) {
      let reg = /^\s*$/
      if (reg.test(e)){
        if (reg.test(this.content)){
          this.$message({
            message: "请输入关键字搜索！",
            type: "warning"
          })
        } else {
          this.content = e
          this.loadSearchList(1)
        }
      } else {
        this.content = e
        this.loadSearchList(1)
      }
    },
    //加载搜索结果列表
    loadSearchList(page) {
      let {
        pageSize,
        content,
        province,
        city,
        gender,
        minFansCount,
        maxFansCount,
        minLikeCount,
        maxLikeCount,
        minAge,
        maxAge,
        orderBy
      } = this;
      searchList({
        enterpriseId: this.enterpriseId,
        page,
        limit: pageSize,
        content,
        province,
        city,
        gender,
        minFansCount,
        maxFansCount,
        minLikeCount,
        maxLikeCount,
        minAge,
        maxAge,
        orderBy
      })
        .then(res => {
          let { totalCount, list } = res.data;
          this.total = totalCount;
          list.forEach(item => (item.isCollect = false));
          this.showList = list;
        })
        .catch(err => console.log(err));
    },
    //选择省份
    changeProvince(index) {
      if (this.province === "") {
        this.cities = "";
      } else {
        this.cities = this.regionList[index].cities;
        this.province = this.regionList[index].name;
      }
      this.city = "";
      this.loadSearchList(1);
    },
    //获取条件标题
    getIndex(tabIndex, outerIndex) {
      let tabTitle = this.criteriaList[outerIndex].tabsList[tabIndex].tabTitle;
      let criteriaTitle = this.criteriaList[outerIndex].title;
      switch (criteriaTitle) {
        case "粉丝数":
          let minFansCount = this.criteriaList[outerIndex].tabsList[tabIndex]
            .minFansCount;
          let maxFansCount = this.criteriaList[outerIndex].tabsList[tabIndex]
            .maxFansCount;
          this.minFansCount = minFansCount ? minFansCount : "";
          this.maxFansCount = maxFansCount ? maxFansCount : "";
          break;
        case "点赞数":
          let minLikeCount = this.criteriaList[outerIndex].tabsList[tabIndex]
            .minLikeCount;
          let maxLikeCount = this.criteriaList[outerIndex].tabsList[tabIndex]
            .maxLikeCount;
          this.minLikeCount = minLikeCount ? minLikeCount : "";
          this.maxLikeCount = maxLikeCount ? maxLikeCount : "";
          break;
        case "年龄段":
          let minAge = this.criteriaList[outerIndex].tabsList[tabIndex].minAge;
          let maxAge = this.criteriaList[outerIndex].tabsList[tabIndex].maxAge;
          this.minAge = minAge ? minAge : "";
          this.maxAge = maxAge ? maxAge : "";
          break;
      }
      this.loadSearchList(1);
    },
    //分页当前页
    getCurrent(currentPage) {
      this.loadSearchList(currentPage);
    },
    //切换列表导航
    changeNavTab(index) {
      if (this.navTabIndex == index) return;
      this.navTabIndex = index;
      this.orderBy = this.navTabList[index].orderBy;
      this.loadSearchList(1);
    },
    //添加收藏
    collectHandle(index) {
      this.showList[index].isCollect = !this.showList[index].isCollect;
    },
    //查看详情
    viewDetail(index) {
      this.$router.push({
        name: "anchorDetail",
        params: { anchorDetail: this.showList[index] }
      });
    }
  },
  created() {
    this.initData();
    this.loadSearchList(1);
  },
  computed: {
    ...mapState({
      enterpriseId: state => state.userInfo.enterpriseId
    })
  },
  components: {
    pagingTag,
    navTabs,
    searchBar
  }
};
</script>
<style>
.el-select,
.el-input__inner {
  height: 30px;
  border-radius: 20px;
  border: 0;
  background: #f6f9fc;
  color: #333;
  line-height: 30px;
}
.el-input__icon {
  line-height: 30px;
}
.el-select-dropdown__item.selected {
  color: #fe6545;
}
</style>
<style scoped>
.anchor_search {
  width: 100%;
  height: 96%;
  background: #ffffff;
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
/* 搜索条件区 */
.criteria_container {
  font-size: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f2f3f5;
}
.search_box {
  display: flex;
  align-items: center;
}
.search_title {
  flex-shrink: 0;
  color: rgba(102, 102, 102, 0.85);
  font-weight: normal;
  margin-right: 10px;
}
.spread_btn:hover {
  cursor: pointer;
}
.spread_btn {
  flex-shrink: 0;
  width: 160px;
  height: 30px;
  border-radius: 20px;
  border: 1px solid #ff714b;
  box-shadow: 0 4px 12px 0 rgba(255, 68, 53, 0.1);
  color: #fe6545;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
}
.spread_btn i {
  font-size: 22px;
  margin-left: 2px;
}
/* 搜索条件 */
.criteria_one {
  display: flex;
  margin-top: 18px;
}
.criteria_one .search_title {
  margin-top: 6px;
}
.criteria_one .options_box {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
}
.criteria_one .options_box .option_one,
.criteria_one .options_box .option_two {
  flex-shrink: 0;
  margin-right: 40px;
  margin-bottom: 10px;
}
.criteria_one .options_box .option_one .el-select {
  width: 250px;
}
.criteria_one .options_box .option_two {
  display: flex;
  align-items: center;
}
.criteria_one .options_box .option_two .title {
  flex-shrink: 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: normal;
  margin-right: 10px;
  font-size: 14px;
}
.criteria_one .options_box .option_two .el-select {
  margin-right: 10px;
}
.criteria_two {
  display: flex;
}
.criteria_two .search_title {
  margin-top: 15px;
  margin-right: 16px;
}
.criteria_two .tab_box {
  flex-grow: 1;
}

/* 标签导航栏 */
.navtab_list {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 12px 12px 6px 12px;
  box-sizing: border-box;
  background: #ffffff;
}
.navtab_list .item {
  width: 90px;
  height: 30px;
  border: 1px solid #d9d9d9;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  border-right: 0;
}
.navtab_list .item:first-child {
  border-radius: 20px 0 0 20px;
}
.navtab_list .item:last-child {
  border-right: 1px solid #d9d9d9;
  border-radius: 0 20px 20px 0;
}
.navtab_list .item.active {
  border: 1px solid #ff302e;
  color: #ff302e;
}
.navtab_list .item.active + .item {
  border-left: 0;
}
.navtab_list .item:not(.active) {
  cursor: pointer;
}

/* 内容展示区 */
.no_data{
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 14px;
}
.show_box {
  padding-top: 12px;
  flex-grow: 1;
  list-style: none;
  overflow: auto;
  padding-bottom: 40px;
  box-sizing: border-box;
}
.show_box .item {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin-bottom: 12px;
  justify-content: space-between;
}
.show_box .item .right {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 750px;
}
.show_box .item .anchor_info {
  width: 500px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.show_box .item .anchor_info .avatar {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 1px solid #e3e3e3;
  margin-right: 12px;
}
.show_box .item .anchor_info .info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 4px 0;
  box-sizing: border-box;
}
.show_box .item .anchor_info .info .top {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.show_box .item .anchor_info .info .top > h5 {
  font-size: 14px;
  color: #333;
  margin-right: 18px;
}
.show_box .item .anchor_info .info .top > p {
  font-size: 12px;
  color: #ffbd37;
  border-radius: 4px;
  background: rgba(255, 189, 55, 0.2);
  padding: 3px 12px;
}
.show_box .item .anchor_info .info > p {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65);
  max-width: 360px;
  margin-top: 4px;
}
.show_box .item .num_card_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.show_box .item .num_card {
  text-align: center;
  font-size: 13px;
  color: #999999;
  margin: 0 20px;
}
.show_box .item .num_card h4 {
  color: #333;
  font-size: 18px;
  margin-top: 6px;
}
.show_box .item .collect_card {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #999999;
}
.show_box .item .collect_card > img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}
.show_box .item .btn_detail {
  width: 88px;
  height: 32px;
  background-image: linear-gradient(-90deg, #ff714b 4%, #ff3029 96%);
  border-radius: 44px;
  color: #ffffff;
  text-align: center;
  line-height: 32px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
  font-size: 13px;
  margin-left: 20px;
}
.show_box .item .btn_detail:hover {
  cursor: pointer;
}

/* 分页 */
.page_box {
  background: #ffffff;
  position: absolute;
  width: 100%;
  padding: 16px 18px 12px 0;
  text-align: right;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
}
</style>