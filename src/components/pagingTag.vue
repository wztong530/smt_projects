<template>
  <div class="paging_tag">
    <el-pagination layout="prev, pager, next, jumper, total" :page-size="pageSize" :total="total" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  props:{
    pageSize:{
      type: [Number,String],
      required: true
    },
    total:{
      type: [Number,String],
      required: true
    }
  },
  methods:{
    handleCurrentChange(val){
      this.$emit('changeCurrent',val)
    },
  }
}
</script>
<style>
.el-pagination .btn-next, .el-pagination .btn-prev{
  border: 1px solid #D9D9D9;
  border-radius: 6px;
  padding: 0;
  margin: 0 3px;
}
.el-pagination button, .el-pagination span:not([class*=suffix]){
  min-width: 28px;
}
.el-pager li{
  border: 1px solid #D9D9D9;
  border-radius: 6px;
  padding: 0;
  margin: 0 3px;
  min-width: 28px;
  line-height: 27px;
  color: rgba(0,0,0,0.65);
  font-weight: normal;
}
.el-pager li.active+li{
  border-left: 1px solid #D9D9D9;
}
.el-pager li.active{
  background-image: linear-gradient(-90deg, #FF714B 4%, #FF3029 96%);
  color: #ffffff;
  border: 0;
}
.el-pagination button:hover{
  color: #FF714B;
}
.el-pagination__total{
  margin-left: 24px;
}
</style>