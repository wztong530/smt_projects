<template>
  <header>
    <div class="pc">
      <div class="cont">
        <a class="logo" @click="jump">
          <!-- <img src="../assets/logo.svg" alt /> -->
        </a>
        <div class="nav-btn-con">
          <div class="register-btn" @click="toNavigate('login')">
            <img src="../assets/zhuce.svg" alt />
            <p>注册</p>
          </div>
           <div class="login-btn" @click="toNavigate('login')">
            <img src="../assets/dengluyonghuming.svg" alt />
            <p>登录</p>
          </div>
          <!-- <div class="login-btn" @click="toNavigate('login')" v-if="!this.userInfo">
            <img src="../assets/dengluyonghuming.svg" alt />
            <p>登录</p>
          </div>
          <div class="login-btn" @click="toNavigate('Index')" v-else>
            <img src="../assets/dengluyonghuming.svg" alt />
            <p>登录</p>
          </div> -->
        </div>
      </div>
    </div>
    <div class="mob">
      <div class="cont">
        <a class="logo" @click="jump">
          <!-- <img src="../assets/logo.svg" alt /> -->
        </a>
        <div class="nav-btn-con">
          <div @click="isShow" class="nav-btn"></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
let storage = window.sessionStorage;
import { mapGetters, mapActions } from "vuex";
import Qs from "qs";
export default {
  name: "Header",
  data() {
    return {
      navData: [{ tit: "首页", links: "/" }],
      num: "",
      selShow: false,
      closeStatus: false,
    };
  },
//   computed: {
//     ...mapGetters(["userInfo"])
//   },
  created() {
    if (storage["selNumsmart"]) {
      this.num = storage["selNumsmart"];
    } else {
      this.num = 0;
    }
  },
  methods: {
    selMenus(index) {
      storage["selNumsmart"] = index;
      this.selShow = false;
    },
    isShow() {
      //点击：左侧菜单栏 收起-展开
      this.selShow = !this.selShow;
    },
    jump() {
      storage["selNumsmart"] = 0;
      this.selShow = false;
      this.$router.push({ path: "/index" });
    },
    //路由切换
    toNavigate(name, data = {}) {
      this.$router.push({
        name: name,
        params: data
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  display: flex;
  justify-content: center;
  height: 8vh;
  background: #020616;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 3;
}
.pc {
  display: flex;
  width: 95%;
}
.cont {
  display: inline-flex;
  align-items: center;
  width: 100%;
}
.logo {
  width: 11.5vw;
  cursor: pointer;
}
.logo img {
  display: block;
  width: 100%;
}
.nav-btn-con {
  width: 90%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.nav-btn-con .login-btn {
  margin-left: 5.4vw;
}
.nav-btn-con .register-btn,
.nav-btn-con .login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.nav-btn-con .register-btn a,
.nav-btn-con .login-btn a {
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.nav-btn-con .register-btn img,
.nav-btn-con .login-btn img {
  width: 0.9vw;
  height: 2.78vh;
  margin-right: 0.8vw;
}
.nav-btn-con .register-btn p,
.nav-btn-con .login-btn p {
  font-family: PingFangSC-Regular;
  font-size: 1.76vh;
  color: #ffffff;
  letter-spacing: 0;
}

@media screen and (min-width: 751px) {
  .nav_bg {
    position: absolute;
    right: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(228, 228, 226, 0.95);
    z-index: -1;
    -webkit-animation: scaleIn 2s ease-in-out;
    animation: scaleIn 2s ease-in-out;
  }
  nav {
    height: 100%;
    -webkit-animation: opac 2s ease-in-out;
    animation: opac 2s ease-in-out;
  }

  nav li a:hover {
    color: #5bb8de;
    font-size: 2.86vw;
    font-family: "PingFangSC-Semibold";
    -webkit-transition: font-size 0.2s;
    transition: font-size 0.2s;
  }

  @-webkit-keyframes scaleIn {
    0% {
      width: 0vw;
      height: 0vw;
      border-radius: 50%;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
    10% {
      width: 10vw;
      height: 10vw;
      border-radius: 50%;
      -webkit-transform: scale(10);
      -moz-transform: scale(10);
      -ms-transform: scale(10);
      -o-transform: scale(10);
      transform: scale(10);
    }
    20% {
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
      -webkit-transform: scale(20);
      -moz-transform: scale(20);
      -ms-transform: scale(20);
      -o-transform: scale(20);
      transform: scale(20);
    }
    30% {
      width: 30vw;
      height: 30vw;
      border-radius: 50%;
      -webkit-transform: scale(320);
      -moz-transform: scale(30);
      -ms-transform: scale(30);
      -o-transform: scale(30);
      transform: scale(30);
    }
    50% {
      border-radius: 50%;
      -webkit-transform: scale(50);
      -moz-transform: scale(50);
      -ms-transform: scale(50);
      -o-transform: scale(50);
      transform: scale(50);
    }
    60% {
      border-radius: 50%;
      -webkit-transform: scale(60);
      -moz-transform: scale(60);
      -ms-transform: scale(60);
      -o-transform: scale(60);
      transform: scale(60);
    }
    100% {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      -webkit-transform: scale(100);
      -moz-transform: scale(100);
      -ms-transform: scale(100);
      -o-transform: scale(100);
      transform: scale(100);
    }
  }
  @keyframes scaleIn {
    0% {
      width: 0vw;
      height: 0vw;
      border-radius: 50%;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
    10% {
      width: 10vw;
      height: 10vw;
      border-radius: 50%;
      -webkit-transform: scale(10);
      -moz-transform: scale(10);
      -ms-transform: scale(10);
      -o-transform: scale(10);
      transform: scale(10);
    }
    20% {
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
      -webkit-transform: scale(20);
      -moz-transform: scale(20);
      -ms-transform: scale(20);
      -o-transform: scale(20);
      transform: scale(20);
    }
    30% {
      width: 30vw;
      height: 30vw;
      border-radius: 50%;
      -webkit-transform: scale(320);
      -moz-transform: scale(30);
      -ms-transform: scale(30);
      -o-transform: scale(30);
      transform: scale(30);
    }
    50% {
      border-radius: 50%;
      -webkit-transform: scale(50);
      -moz-transform: scale(50);
      -ms-transform: scale(50);
      -o-transform: scale(50);
      transform: scale(50);
    }
    60% {
      border-radius: 50%;
      -webkit-transform: scale(60);
      -moz-transform: scale(60);
      -ms-transform: scale(60);
      -o-transform: scale(60);
      transform: scale(60);
    }
    100% {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      -webkit-transform: scale(100);
      -moz-transform: scale(100);
      -ms-transform: scale(100);
      -o-transform: scale(100);
      transform: scale(100);
    }
  }

  @-webkit-keyframes opac {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes opac {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
