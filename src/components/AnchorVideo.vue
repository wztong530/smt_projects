<template>
  <div class="anchor_video">
    <ul>
      <li
        v-for="(item, index) in videoList"
        :key="index"
        :style="{backgroundImage:'url('+item.cover+')',backgroundSize:'cover',backgroundRepeat:'no-repeat', backgroundPosition:'center center'}"
        @click="enterPage(item.shareUrl)"
      >
        <div class="bottom">
          <div class="left">
            <img src="@/assets/images/icon_play.png" alt />
            <p>{{item.playCount | numFormat}}</p>
          </div>
          <p>{{item.showDate}}天前</p>
        </div>
        <div class="bottom_bg"></div>
      </li>
    </ul>
    <!-- 分页 -->
    <div class="page_box">
      <paging-tag :pageSize="pageSize" :total="total" @changeCurrent="getCurrent"></paging-tag>
    </div>
  </div>
</template>
<script>
import pagingTag from "@/components/pagingTag.vue";
import { videoList } from "@/utils/api.js";

export default {
  data() {
    return {
      pageSize: 12,
      total: 1,
      videoList: []
    };
  },
  props: {
    uuid: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    loadVideoList(page) {
      videoList({
        anchorUuid: this.uuid,
        limit: this.pageSize,
        page
      })
        .then(res => {
          let { records, total } = res.data;
          this.total = total;
          records.forEach(item => {
            let date =
              item.createTime.slice(0, 4) +
              "/" +
              item.createTime.slice(4, 6) +
              "/" +
              item.createTime.slice(6, 8) +
              " " +
              item.createTime.slice(8, 10) +
              ":" +
              item.createTime.slice(10, 12) +
              ":" +
              item.createTime.slice(12);
            item.showDate = Math.ceil(
              (new Date().getTime() - new Date(date).getTime()) /
                (24 * 60 * 60 * 1000)
            );
          });
          this.videoList = records;
        })
        .catch(err => console.log(err));
    },
    //当前页
    getCurrent(currentPage) {
      this.loadVideoList(currentPage);
    },
    //跳转至视频播放页
    enterPage(shareUrl) {
      window.open(shareUrl, "_blank");
    }
  },
  created() {
    this.loadVideoList(1);
  },
  components: {
    pagingTag
  }
};
</script>
<style scoped>
.anchor_video {
  position: relative;
  height: 100%;
  padding-bottom: 30px;
  box-sizing: border-box;
}
.anchor_video ul {
  width: 100%;
  height: 100%;
  overflow: auto;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.anchor_video ul li {
  width: 168px;
  height: 295px;
  border-radius: 10px;
  position: relative;
  margin: 0 10px 10px 0;
}
.anchor_video ul li:hover {
  cursor: pointer;
}
.anchor_video ul li .bottom_bg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 32px;
  opacity: 0.5;
  background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  border-radius: 10px;
}
.anchor_video ul li .bottom {
  z-index: 1;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #ffffff;
  padding: 0 10px;
  box-sizing: border-box;
}
.anchor_video ul li .bottom .left {
  display: flex;
  align-items: center;
}
.anchor_video ul li .bottom .left img {
  width: 12px;
  height: 12px;
  margin-right: 3px;
  margin-top: 1px;
}
/* 分页 */
.page_box {
  background: #ffffff;
  position: absolute;
  width: 100%;
  text-align: right;
  bottom: 0;
  left: 0;
  padding-top: 4px;
  box-sizing: border-box;
}
</style>