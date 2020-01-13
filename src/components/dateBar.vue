<template>
  <div class="date_bar">
    <h4 class="title">起止时间：</h4>
    <el-date-picker v-model="dateRange" type="daterange" :editable="false" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy.MM.dd" range-separator="——"  @change="dateChange"></el-date-picker>
    <i class="el-icon-date icon"></i>
  </div>
</template>
<script>
export default {
  data(){
    return{
      dateRange:''
    }
  },
  methods: {
    dateChange(){
      function addZero(num){
        return num < 10 ? ('0' + num) : num
      }
      function timeFormat(val){
        let newVal = new Date(val)
        return '' + newVal.getFullYear() + addZero(newVal.getMonth() + 1) + addZero(newVal.getDate())
      }
      let startTime = this.dateRange ? timeFormat(this.dateRange[0]) + '000000' : ''
      let endTime = this.dateRange ? timeFormat(this.dateRange[1]) + '235959' : ''
      this.$emit('dateChange', { startTime, endTime })
    }
  }
}
</script>
<style>
.el-date-editor .el-range-separator{
  line-height: 22px;
  margin: 0 -6px;
  color: rgba(0,0,0,0.25);
}
.el-input__icon{
  width: 0;
}
.el-date-editor .el-range-input{
  color: rgba(0,0,0,0.25);
  background: #F6F9FC;
}
.el-date-editor .el-range__close-icon{
  font-size: 20px;
  line-height: 28px;
  margin-left: -8px;
}
</style>
<style scoped>
.date_bar{
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 28px;
}
.date_bar .title{
  font-size: 14px;
  color: rgba(0,0,0,0.85);
  font-weight: normal;
  margin-right: 10px;
  white-space: nowrap;
}
.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
  width: 300px;
  border-radius: 20px;
  background: #F6F9FC;
  border: 0;
  padding-left: 16px;
  box-sizing: border-box;
}
.el-input__inner{
  height: 32px;
}
.date_bar .icon{
  position: absolute;
  top: 8px;
  right: 24px;
  color: rgba(0,0,0,0.25);
}

</style>