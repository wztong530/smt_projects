<template>
  <div class="header">
    <!-- 左侧导航控制栏 -->
    <div class="left">
      <el-menu :collapse="navCollapse" class="el-menu-vertical-demo">
        <el-menu-item disabled>
          <img class="logo" src="@/assets/images/logo.png" />
          <h4>
            <span>猩波客</span>
            <span>内容电商客户端</span>
          </h4>
        </el-menu-item>
      </el-menu>
      <img class="nav_switch" :src="navSwitch" @click="changeNavCollapse" />
    </div>
    <!-- 右侧用户信息 -->
    <div class="right">
      <!-- <p>帮助手册</p>
      <div class="tips">
        <img class="icon_xiaoxi" src="@/assets/images/icon-xiaoxi.png" />
        <i class="icon_num">2</i>
      </div>-->
      <div class="user_info">
        <img class="avatar" :src="userInfo.avatarImageUrl" />
        <h6>你好，{{userInfo.nickName}}</h6>
        <el-dropdown trigger="click" @command="commandHandle">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='quit'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      navCollapse: false,
      navSwitch: require("@/assets/images/icon-shouqi.png"),
      // userInfo: ""
    };
  },
  methods: {
    changeNavCollapse() {
      this.navCollapse = !this.navCollapse;
      this.navCollapse
        ? (this.navSwitch = require("@/assets/images/icon-zhankai.png"))
        : (this.navSwitch = require("@/assets/images/icon-shouqi.png"));
      this.$emit("navCollapseChange", this.navCollapse);
    },
    commandHandle(command) {
      if(command == 'quit') {
        this.$store.commit('REMOVE_USERINFO')
        this.$router.push({ name: "login" });
      }
    }
  },
  created() {

  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  }
};
</script>
<style scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header .left {
  display: flex;
  align-items: center;
}
.el-menu {
  background: transparent;
  display: flex;
  align-items: center;
  width: auto;
  border: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
}
.el-menu-item {
  display: flex;
  align-items: center;
}
.el-menu-item.is-disabled {
  opacity: 1;
}
.logo {
  width: 48px;
  height: 48px;
  margin-right: 18px;
  border-radius: 50%;
}
h4 {
  font-size: 18px;
  color: #ffffff;
  margin-top: -8px;
}
h4 span:nth-child(2) {
  color: #fe6545;
}
.nav_switch {
  width: 24px;
  height: 24px;
  margin-left: 100px;
}
.header .right {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #ffffff;
}
.header .right > p {
  font-size: 16px;
  color: #fff5f5;
  margin: 0 24px;
}
.header .right .tips {
  position: relative;
  margin: 5px 24px 0;
}
.header .right .tips .icon_xiaoxi {
  width: 22px;
  height: 22px;
}
.header .right .tips .icon_num {
  background-image: linear-gradient(-180deg, #ff714b 5%, #ff3029 98%);
  border-radius: 5px;
  color: #ffffff;
  font-size: 11px;
  font-style: normal;
  width: 15px;
  height: 15px;
  position: absolute;
  top: -6px;
  right: -6px;
  text-align: center;
  line-height: 14px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
  font-size: 20px;
}
.el-dropdown-menu {
  border-radius: 10px;
  padding: 0;
}
.el-dropdown-menu__item {
  color: #ff3029;
}
.header .right .user_info {
  display: flex;
  margin: 0 24px;
  align-items: center;
}
.header .right .user_info .avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}
.header .right .user_info h6 {
  font-size: 16px;
  margin: 0 22px 0 12px;
}
</style>