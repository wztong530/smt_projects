<template>
  <div class="home">
    <el-container>
      <el-header height="75px">
        <my-header @navCollapseChange="getNavCollapse"></my-header>
      </el-header>
      <el-main>
        <div class="aside">
          <aside-nav :asideCollapse="navCollapse"></aside-nav>
        </div>
        <div class="main">
          <div class="bg_top"></div>
          <div class="bg_bottom"></div>
          <div class="container">
            <!-- <router-view /> -->
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import myHeader from "@/components/Header.vue";
import asideNav from "@/components/AsideNav.vue";

export default {
  name: "home",
  data(){
    return{
      navCollapse: false
    }
  },
  methods:{
    getNavCollapse(e){
      this.navCollapse = e
    }
  },
  components: {
    myHeader,
    asideNav
  }
};
</script>
<style scoped>
.main .container{
  z-index: 1;
  width: 97%;
  height: 97%;
  margin-top: 3%;
}
.main{
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.main .bg_top{
  width: 100%;
  height: 20%;
  position: absolute;
  top: 0;
}
.main .bg_bottom{
  width: 100%;
  height: 80%;
  background: #eeeff3;
  position: absolute;
  top: 20%;
}
.home > .el-container {
  height: 100vh;
  background: #2e313a;
}
.el-header {
  background: #242730;
  width: 100%;
  padding: 0;
}
.el-main {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0;
}
.el-main .aside{
  background: #1D1F26;
  height: 100%;
}
</style>
