<template>
  <div class="hot_videos">
    <!-- 顶部 日期 搜索 -->
    <div class="top_box">
      <date-bar @dateChange="getDateRange"></date-bar>
      <search-bar @search="searchHandle"></search-bar>
    </div>
    <!-- 主播排行表格 -->
    <div class="table_box">
      <el-table
        :data="tableData"
        height="100%"
        style="width: 100%;"
        :header-cell-style="{fontSize:'15px',color:'rgba(102,102,102,0.85)',background:'#FAFAFA'}"
      >
        <el-table-column label="视频" width="300">
          <template slot-scope="scope">
            <div class="anchor_card">
              <div class="cover" :style="{backgroundImage:'url('+scope.row.cover+')',backgroundSize:'cover',backgroundRepeat:'no-repeat', backgroundPosition:'center center'}"></div>
              <div class="content">
                <h4 class="title">{{scope.row.title}}</h4>
                <div class="sub_title">
                  <p>热词：</p>
                  <p>{{scope.row.sentence}}</p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="commentCount" label="评论" header-align="center" align="center"></el-table-column>
        <el-table-column prop="diggCount" label="点赞" header-align="center" align="center"></el-table-column>
        <el-table-column prop="downloadCount" label="下载" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shareCount" label="分享" header-align="center" align="center"></el-table-column>
        <el-table-column prop="forwardCount" label="转发" header-align="center" align="center"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" header-align="center" align="center" min-width="100"></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page_box">
      <paging-tag :pageSize='pageSize' :total='total' @changeCurrent='getCurrent'></paging-tag>
    </div>
  </div>
</template>
<script>
import searchBar from '@/components/searchBar.vue'
import dateBar from '@/components/dateBar.vue'
import pagingTag from '@/components/pagingTag.vue'
import { hotSentenceVideo } from '@/utils/api.js'
import { numFormat } from '@/filter/index.js'

export default {
  data() {
    return {
      page: 1, // 当前页码 从1页开始
      pageSize: 20,
      total: 0,
      keyWord: '',
      startTime: '',
      endTime: '',
      tableData: []
    };
  },
  methods: {
    //加载热点视频列表
    loadHotSentenceVideo(page){
      let pageNo = page - 1, { pageSize, keyWord, startTime, endTime } = this
      hotSentenceVideo({
        pageNo, pageSize, keyWord, startTime, endTime
      }).then(res => {
        let { list, total} = res.data
        this.total = total
        list.forEach(item => {
          item.commentCount = item.commentCount && numFormat(item.commentCount)
          item.diggCount = item.diggCount && numFormat(item.diggCount)
          item.downloadCount = item.downloadCount && numFormat(item.downloadCount)
          item.shareCount = item.shareCount && numFormat(item.shareCount)
          item.forwardCount = item.forwardCount && numFormat(item.forwardCount)
          item.createDate = item.createDate.substring(0,4) + '-' + item.createDate.substring(4,6) + '-' + item.createDate.substring(6,8) + ' ' + item.createDate.substring(8,10) + ':' + item.createDate.substring(10,12) + ':' + item.createDate.substring(12)
        })
        this.tableData = list
      }).catch(err => console.log(err))
    },
    //起止时间事件
    getDateRange(e){
      this.startTime = e.startTime
      this.endTime = e.endTime
      this.loadHotSentenceVideo(1)
    },
    //搜索事件
    searchHandle(e){
      let reg = /^\s*$/
      if (reg.test(e)){
        if (reg.test(this.keyWord)){
          this.$message({
            message: "请输入关键字搜索！",
            type: "warning"
          })
        } else {
          this.keyWord = e
          this.loadHotSentenceVideo(1)
        }
      } else {
        this.keyWord = e
        this.loadHotSentenceVideo(1)
      }
    },
    //当前页
    getCurrent(currentPage){
      this.page = currentPage
      this.loadHotSentenceVideo(currentPage)
    }
  },
  created(){
    this.loadHotSentenceVideo(1)
  },
  computed: {

  },
  components:{
    pagingTag,
    searchBar,
    dateBar
  }
};
</script>
<style>
.el-table__row>td{
	border: none;
}
.el-table::before{
  height: 0;
}
th.el-table_1_column_1 {
  padding-left: 16px;
}

</style>
<style scoped>
.hot_videos{
  width: 100%;
  height: 96%;
  background: #ffffff;
  border-radius: 16px;
  padding: 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.top_box{
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.table_box{
  flex-grow: 1;
  overflow: auto;
}
.anchor_card{
  width: 100%;
  display: flex;
}
.anchor_card .cover{
  flex-shrink: 0;
  align-self: center;
  width: 67px;
  height: 118px;
  border: 1px solid #E3E3E3;
  border-radius: 4px;
  margin-right: 16px;
}
.anchor_card .content{
  max-width: 196px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10px;
  box-sizing: border-box;
}
.anchor_card .content .title{
  font-size: 14px;
  color: #333333;
}
.anchor_card .content .sub_title{
  font-size: 14px;
  color: rgba(0,0,0,0.50);
}

.page_box{
  text-align: right;
  padding-top: 20px;
}

</style>