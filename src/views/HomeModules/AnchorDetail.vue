<template>
  <div class="anchor_detail">
    <div class="left">
      <!-- 主播简介 -->
      <div class="anchor_info">
        <div class="top_info">
          <img :src="anchorDetail.avatar" />
          <ul>
            <li>抖音号：{{anchorDetail.hostId}}</li>
            <li>性别：{{anchorDetail.gender==1?'男':'女'}}</li>
            <li>城市：{{anchorDetail.city}}</li>
          </ul>
        </div>
        <p class="signature">个性签名：{{anchorDetail.signature || '这个人很懒，什么都没写！'}}</p>
        <div class="tags" v-if="anchorDetail.label">{{anchorDetail.label}}</div>
      </div>
      <!-- 主播数据 -->
      <div class="user_data">
        <ul>
          <li>
            <p>粉丝数</p>
            <h6>{{anchorDetail.fansCount | numFormat}}</h6>
          </li>
          <li>
            <p>作品数</p>
            <h6>{{anchorDetail.worksCount | numFormat}}</h6>
          </li>
          <li>
            <p>点赞数</p>
            <h6>{{anchorDetail.likeCount | numFormat}}</h6>
          </li>
          <li>
            <p>平均点赞</p>
            <h6>{{anchorDetail.averageLikeCount | numFormat}}</h6>
          </li>
          <li>
            <p>总评论数</p>
            <h6>{{anchorDetail.commentCount | numFormat}}</h6>
          </li>
          <li>
            <p>平均评论</p>
            <h6>{{anchorDetail.averageCommentCount | numFormat}}</h6>
          </li>
          <li>
            <p>总分享</p>
            <h6>{{anchorDetail.shareCount | numFormat}}</h6>
          </li>
          <li>
            <p>平均分享</p>
            <h6>{{anchorDetail.averageShareCount | numFormat}}</h6>
          </li>
        </ul>
      </div>
    </div>
    <!-- 分析模块 -->
    <div class="right">
      <!-- 顶部标签 -->
      <div class="top_tabs">
        <div class="tabs_box">
          <nav-tabs :tabsList="tabsList" @tabChange="getIndex"></nav-tabs>
        </div>
        <div class="btn_back" @click="$router.back(-1)">返回上一页</div>
      </div>
      <!-- 展示数据 -->
      <div class="show_data">
        <keep-alive>
          <component
            :is="tabComponent"
            :uuid="anchorDetail.uuid"
            :enterpriseId="anchorDetail.enterpriseId"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import navTabs from "@/components/navTabs.vue";
import FansAnalysis from "@/components/FansAnalysis.vue";
import AnchorVideo from "@/components/AnchorVideo.vue";
import EbusinessAnalysis from "@/components/EbusinessAnalysis.vue";

export default {
  data() {
    return {
      anchorDetail: {},
      tabsList: [
        { tabTitle: "粉丝特征分析", tabComponent: "fans-analysis" },
        { tabTitle: "播主视频", tabComponent: "anchor-video" }
        // {tabTitle:'电商数据分析',tabComponent:'ebusiness-analysis'}
      ],
      tabComponent: "fans-analysis"
    };
  },
  methods: {
    getIndex(index) {
      this.tabComponent = this.tabsList[index].tabComponent;
    }
  },
  created() {
    let anchorDetail = this.$route.params.anchorDetail;
    if (anchorDetail) {
      this.anchorDetail = anchorDetail;
    } else {
      this.$router.back(-1);
    }
  },
  mounted() {
    // console.log(this.$route.params.name)
  },
  components: {
    navTabs,
    FansAnalysis,
    AnchorVideo,
    EbusinessAnalysis
  }
};
</script>
<style scoped>
.anchor_detail {
  display: flex;
  width: 100%;
  height: 96%;
}
.anchor_detail .left {
  flex-shrink: 0;
  width: 215px;
  display: flex;
  flex-direction: column;
  margin-right: 12px;
}
.anchor_detail .left .anchor_info {
  padding: 14px;
  box-sizing: border-box;
  border-radius: 16px;
  background: #ffffff;
  margin-bottom: 12px;
  font-size: 12px;
  color: #666666;
}
.anchor_detail .left .anchor_info .top_info {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}
.anchor_detail .left .anchor_info .top_info > img {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 4px 26px 0 rgba(0, 0, 0, 0.22);
  margin-right: 10px;
}
.anchor_detail .left .anchor_info .top_info > ul {
  list-style: none;
  flex-grow: 1;
}
.anchor_detail .left .anchor_info .signature {
  margin-bottom: 14px;
}
.anchor_detail .left .anchor_info .tags {
  display: inline-block;
  border-radius: 4px;
  color: #4a87ff;
  background: #e3f0ff;
  border: 1px solid #d7e5fc;
  padding: 4px 12px;
  line-height: 18px;
}
.anchor_detail .left .user_data {
  flex-grow: 1;
  background: #ffffff;
  border-radius: 16px;
  padding: 14px;
  box-sizing: border-box;
  display: flex;
}
.anchor_detail .left .user_data ul {
  list-style: none;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #eaf0f7;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
}
.anchor_detail .left .user_data ul li {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #eaf0f7;
  border-bottom: 1px solid #eaf0f7;
  box-sizing: border-box;
}
.anchor_detail .left .user_data ul li:nth-child(2n) {
  border-right: 0;
}
.anchor_detail .left .user_data ul li:not(:nth-child(2n)):nth-last-child(2),
.anchor_detail .left .user_data ul li:last-child {
  border-bottom: 0;
}
.anchor_detail .left .user_data ul li p {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-bottom: 5px;
}
.anchor_detail .left .user_data ul li h6 {
  font-size: 16px;
  color: #333333;
  font-weight: 500;
}
.anchor_detail .right {
  flex-grow: 1;
  height: 100%;
  background: #ffffff;
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.anchor_detail .right .top_tabs {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
}
.anchor_detail .right .top_tabs .tabs_box {
  flex-grow: 1;
  padding-left: 20px;
}
.anchor_detail .right .top_tabs .btn_back {
  flex-shrink: 0;
  height: 28px;
  padding: 0 16px;
  color: #ffffff;
  background-image: linear-gradient(-90deg, #ff714b 4%, #ff3029 96%);
  border-radius: 25px;
  line-height: 27px;
  font-size: 12px;
}
.anchor_detail .right .top_tabs .btn_back:hover {
  cursor: pointer;
}
.anchor_detail .right .show_data {
  flex-grow: 1;
  margin-top: 6px;
  overflow: auto;
}
</style>