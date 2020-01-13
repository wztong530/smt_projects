<template>
  <div class="search_bar">
    <h4 class="search_title">搜 &nbsp;&nbsp; 索：</h4>
    <div class="search_input">
      <input type="text" placeholder="请输入关键字搜索" v-model="content" />
      <button @click="search">搜</button>
      <i class="el-icon-delete delete_btn" @click="deleteContent" v-show="content"></i>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      content: ''
    }
  },
  methods:{
    search(){
      this.$emit('search', this.content)
    },
    deleteContent(){
      this.content = ''
      this.search()
    }
  }
}
</script>
<style scoped>
.search_bar{
  display: flex;
  align-items: center;
}
.search_bar .search_title {
  flex-shrink: 0;
  color: rgba(102, 102, 102, 0.85);
  font-weight: normal;
  margin-right: 10px;
  font-size: 14px;
}
.search_bar .search_input {
  width: 320px;
  height: 30px;
  border-radius: 20px;
  position: relative;
}
.search_bar .search_input input {
  width: 100%;
  height: 100%;
  border: 0;
  background: #f6f9fc;
  border-radius: 20px;
  outline: none;
  padding: 0 98px 0 20px;
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
}
.search_bar .search_input input::placeholder {
  color: rgba(0, 0, 0, 0.25);
  font-size: 14px;
}
.search_bar .search_input button {
  position: absolute;
  right: 0;
  width: 60px;
  height: 30px;
  background-image: linear-gradient(-90deg, #ff714b 4%, #ff3029 96%);
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border: 0;
  font-size: 14px;
  outline: none;
}
.search_bar .search_input button:hover {
  cursor: pointer;
}
.delete_btn{
  position: absolute;
  top: 7px;
  right: 72px;
  color: rgba(102, 102, 102, 0.85);
}
</style>