<template>
  <div class="aside_nav">
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="asideCollapse" background-color="#1D1F26" text-color="#FFFFFF" active-text-color="#FE6545" unique-opened>
      <el-submenu :index="item.index" v-for="(item, index) in asideNavList" :key="index">
        <template slot="title">
          <i class="icon" :style="{backgroundImage:'url('+ (item.isOpen ? item.iconUrlActive : item.iconUrl) +')'}"></i>
          <span slot="title">{{item.title}}</span>
        </template>
        <el-menu-item v-for="(subItem, index) in item.children" :key="index" :index="subItem.subIndex" :data-name="subItem.subIndex" @click="changePage($event)">{{subItem.subTitle}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      asideNavList: [
        {
          title: '主播发现',
          index: 'anchorDiscover',
          isOpen: true,
          iconUrlActive: require('@/assets/images/icon-zbfx.png'),
          iconUrl: require('@/assets/images/icon-zbfx02.png'),
          children: [
            { subTitle: '主播搜索', subIndex: 'anchorSearch' },
            { subTitle: '主播排行', subIndex: 'anchorRanking' }
          ]
        },
        {
          title: '热点数据',
          index: 'hotData',
          isOpen: false,
          iconUrlActive: require('@/assets/images/icon-rdsj.png'), 
          iconUrl: require('@/assets/images/icon-rdsj02.png'),
          children: [
            { subTitle: '热点词', subIndex: 'scenicWords' },
            { subTitle: '热点视频', subIndex: 'hotVideos' }
          ]
        },
      ],
      defaultActive: 'anchorSearch'
    };
  },
  props:{
    asideCollapse:{
      type: Boolean,
      required: true
    }
  },
  methods:{
    changePage(e){
      console.log('页面name',e.$attrs['data-name'])
      let path = e.$attrs['data-name']
      path && this.$router.push({name:path}).catch(err => err)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      this.asideNavList.forEach(item => {
        if (item.index == key) {
          item.isOpen = true
        } else {
          item.isOpen = false
        }
      })
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
      this.asideNavList.forEach(item => {
        item.index == key && (item.isOpen = false)
      })
    },
    //判断展开项
    judgeOpen(){
      let _this = this
      _this.asideNavList.forEach(item => {
        if (item.children.some(_item => _item.subIndex == _this.defaultActive)){
          item.isOpen = true
        } else {
          item.isOpen = false
        }
      })
    }
  },
  created(){
    console.log('路由',this.$route.name)
    this.defaultActive = this.$route.name
    this.judgeOpen()
  }
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu--collapse{
  width: 85px;
}
.el-menu{
  background: transparent;
  border: 0;

}
.el-menu-item{
  text-align: center;
}
.el-submenu__title > span{
  font-size: 16px;
}
.icon{
  display: inline-block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 13px;
}
.icon_zbfx{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('../assets/images/icon-zbfx.png') no-repeat center;
  background-size: contain;
  margin: 0 13px;
}

.el-submenu__icon-arrow{
  margin-top: -3px;
}

</style>