<template>
  <div class="nav_tabs">
    <ul>
      <li :class="chosenIndex == index ? 'active' : ''" @click="changeTab(index)" v-for="(item,index) in tabsList" v-bind:key="index">{{item.tabTitle}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{
      chosenIndex: 0
    }
  },
  props:{
    tabsList: {
      type: Array,
      required: true
    },
    outerIndex: {
      type: [String,Number]
    }
  },
  methods:{
    changeTab(index){
      if (this.chosenIndex == index) return
      this.chosenIndex = index
      this.$emit("tabChange",this.chosenIndex,this.outerIndex)
    }
  }
}
</script>
<style scoped>
.nav_tabs ul{
  list-style: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.nav_tabs ul li{
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #595959;
  padding: 0 30px;
  background: #f6f9fc;
  border-radius: 20px;
  margin: 10px -12.5px;
  position: relative;
}
.nav_tabs ul li.active{
  height: 32px;
  line-height: 32px;
  background-image: linear-gradient(-90deg, #ff714b 4%, #ff3029 96%);
  color: #ffffff;
  z-index: 1;
  padding: 0 18px;
  margin: 0 -4px;
}
.nav_tabs ul li.active:hover{
  cursor: default;
}
.nav_tabs ul li:not(.active):hover{
  cursor: pointer;
}
</style>