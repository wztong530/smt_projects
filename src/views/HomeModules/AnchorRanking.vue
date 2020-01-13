<template>
  <div class="anchor_ranking">
    <!-- 分类 -->
    <div class="category_box">
      <h6>分 &nbsp;&nbsp; 类：</h6>
      <div class="tabs_box">
        <nav-tabs :tabsList="tabsList" @tabChange="getIndex"></nav-tabs>
      </div>
    </div>
    <!-- 主播排行表格 -->
    <div class="table_box">
      <el-table
        :data="tableData"
        height="100%"
        style="width: 100%;"
        :header-cell-style="{fontSize:'15px',color:'rgba(102,102,102,0.85)',background:'#FAFAFA'}"
      >
        <el-table-column label="排行" width="60" align="center">
          <template slot-scope="scope">{{scope.$index + 1 + (page - 1) * pageSize }}</template>
        </el-table-column>
        <el-table-column label="主播" min-width="150">
          <template slot-scope="scope">
            <div class="anchor_box">
              <img class="avatar" :src="scope.row.avatar" />
              <p class="name">{{scope.row.nickname}}</p>
              <img
                class="icon_aixin"
                :src="scope.row.isCollect ? require('@/assets/images/icon-shoucang2.svg') : require('@/assets/images/icon-shoucang1.svg')"
                @click="collectHandle(scope.$index, scope.row)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="newFansCount" label="粉丝数" width="90"></el-table-column>
        <el-table-column prop="newLikeCount" label="点赞数" width="90"></el-table-column>
        <el-table-column prop="newWorksCount" label="作品数" width="90"></el-table-column>
        <el-table-column prop="newFavoriteCount" label="收藏数" width="90"></el-table-column>
        <el-table-column label="操作" width="110" header-align="center" align="center">
          <template slot-scope="scope">
            <div class="btn_detail" @click="viewDetail(scope.$index, scope.row)">查看详情</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page_box">
      <paging-tag :pageSize='pageSize' :total='total' @changeCurrent='getCurrent'></paging-tag>
    </div>
  </div>
</template>
<script>
import navTabs from '@/components/navTabs.vue'
import pagingTag from '@/components/pagingTag.vue'
import { categoryList, anchorList } from '@/utils/api.js'
import { numFormat } from '@/filter/index.js'
import { mapState } from "vuex"

export default {
  data() {
    return {
      page: 1, // 当前页码 从1页开始
      pageSize: 20,
      total: 0,
      tabsList: [],
      categoryId: '',//分类id 空为全部
      tableData: []
    };
  },
  methods: {
    //加载分类列表
    loadCategoryList(){
      categoryList().then(res => {
        this.tabsList = res.data.map(item => {
          item.tabTitle = item.name
          return item
        })
        this.tabsList.unshift({tabTitle:'全部'})
      }).catch(err => console.log(err))
    },
    //加载主播列表
    loadAnchorList(page){
      let {pageSize, categoryId} = this
      anchorList({
        enterpriseId: this.enterpriseId,
        limit: pageSize, 
        categoryId, page
      }).then(res => {
        let { records, total } = res.data
        this.total = total
        records.forEach(item => {
          item.isCollect = false
          item.newFansCount = item.fansCount && numFormat(item.fansCount)
          item.newLikeCount = item.likeCount && numFormat(item.likeCount)
          item.newWorksCount = item.worksCount && numFormat(item.worksCount)
          item.newFavoriteCount = item.favoriteCount && numFormat(item.favoriteCount)
        })
        this.tableData = records
      }).catch(err => console.log(err))
    },
    //选择分类
    getIndex(index) {
      this.categoryId = this.tabsList[index].id
      this.page = 1
      this.loadAnchorList(1)
    },
    //收藏事件
    collectHandle(index, row) {
      this.tableData[index].isCollect = !row.isCollect;
    },
    //查看详情
    viewDetail(index, row) {
      console.log(index, row);
      this.$router.push({name:'anchorDetail',params:{anchorDetail:row}})
    },
    //当前页
    getCurrent(currentPage){
      this.page = currentPage
      this.loadAnchorList(currentPage)
    }
  },
  created(){
    this.loadCategoryList() //加载分类列表
    this.loadAnchorList(1) //加载主播列表
  },
  computed: {
    ...mapState({
      enterpriseId: state => state.userInfo.enterpriseId
    })
  },
  components:{
    navTabs,pagingTag
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
.page_box{
  text-align: right;
  padding-top: 20px;
}
.btn_detail {
  width: 88px;
  height: 32px;
  background-image: linear-gradient(-90deg, #ff714b 4%, #ff3029 96%);
  border-radius: 44px;
  color: #ffffff;
  text-align: center;
  line-height: 32px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
}
.btn_detail:hover{
  cursor: pointer;
}
.anchor_box {
  display: flex;
  align-items: center;
}
.anchor_box .avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #e3e3e3;
  margin-right: 10px;
}
.anchor_box .name {
  font-size: 15px;
  margin-right: 10px;
}
.anchor_box .icon_aixin {
  width: 16px;
  height: 16px;
}
.table_box {
  flex-grow: 1;
  overflow: hidden;
}
.table_box .el-table {
  color: #333333;
  font-size: 13px;
}
.category_box {
  display: flex;
}
.category_box h6 {
  font-size: 14px;
  font-weight: normal;
  color: rgba(102, 102, 102, 0.85);
  margin-right: 20px;
  padding-top: 16px;
  flex-shrink: 0;
}
.category_box .tabs_box {
  flex-grow: 1;
}
.anchor_ranking {
  width: 100%;
  height: 96%;
  background: #ffffff;
  border-radius: 16px;
  padding: 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>