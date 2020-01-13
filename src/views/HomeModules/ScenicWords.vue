<template>
  <div class="scenic_words">
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
        <el-table-column label="热点词" >
          <template slot-scope="scope">
            <div class="text">{{scope.row.sentence}}</div>
          </template>
        </el-table-column>
        <el-table-column label="热度" header-align="center" align="center">
          <template slot-scope="scope">
            <div class="text">{{scope.row.hotLevel | numFormat}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="activeTime" label="统计时间" header-align="center" align="center"></el-table-column>
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
import { hotSentence } from '@/utils/api.js'

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
    //加载景点词列表
    loadHotSentence(page){
      let pageNo = page - 1, { pageSize, keyWord, startTime, endTime } = this
      hotSentence({
        pageNo, pageSize, keyWord, startTime, endTime
      }).then(res => {
        let { list, total} = res.data
        this.total = total
        this.tableData = list
      }).catch(err => console.log(err))
    },
    //起止时间事件
    getDateRange(e){
      this.startTime = e.startTime
      this.endTime = e.endTime
      this.loadHotSentence(1)
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
          this.loadHotSentence(1)
        }
      } else {
        this.keyWord = e
        this.loadHotSentence(1)
      }
    },
    //当前页
    getCurrent(currentPage){
      this.page = currentPage
      this.loadHotSentence(currentPage)
    }
  },
  created(){
    this.loadHotSentence(1)
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


</style>
<style scoped>
.scenic_words{
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
.table_box .text{
  padding: 12px 0;
  font-size: 16px;
}
.page_box{
  text-align: right;
  padding-top: 20px;
}

</style>