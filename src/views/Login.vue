<template>
  <div
    class="login"
    :style="{backgroundImage:'url('+ loginBgUrl +')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"
  >
    <div class="left">
      <h3>
        <span>猩波客</span>内容电商
      </h3>
      <h3>客户端</h3>
      <h3 class="line"></h3>
    </div>
    <div class="right">
      <img src="@/assets/images/logo_big.png" />
      <div id="login"></div>
    </div>
  </div>
</template>
<script>
import { getUUID } from "@/utils/validate";
export default {
  name: "login",
  data() {
    return {
      loginBgUrl: require("@/assets/login_bg.png"),
      state: getUUID()
    };
  },
  created() {
    this.onLogin();
  },
  mounted: function() {
    var obj = new WxLogin({
      self_redirect: true,
      id: "login",
      appid: "wx70226623aafc2fb5",
      scope: "snsapi_login",
      redirect_uri: encodeURI(
        "https://mall.xpaik.com/smdouyin/mobile/weixin/mobileQrCallback"
      ),
      style: "black",
      state: this.state
    });
    var iframe = document.getElementsByTagName("iframe");
    console.log(iframe[0]);
    iframe[0].setAttribute(
      "sandbox",
      "allow-scripts allow-top-navigation allow-same-origin"
    );
  },
  methods: {
    onLogin() {
      if (localStorage.getItem("userInfo")) {
        //如果本地已登录授权过
        this.$router.push({ name: "home" });
      } else {
        let self = this;
        let websocket = null;
        if ("WebSocket" in window) {
          websocket = new WebSocket(
            "wss://mall.xpaik.com/smdouyin/mobile/socketServer/" + self.state
          );
        } else {
          alert("当前浏览器 不支持 websocket");
          self.$router.go(0);
        }
        //websocket 连接成功的监听
        websocket.onopen = function() {
          console.log("websocket 链接成功");
        };
        //websocket 请求回调获取后端的数据
        websocket.onmessage = function(event) {
          console.log(JSON.parse(event.data));
          let { content, msg, code } = JSON.parse(event.data);
          if (code == 0) {
            self.$message({
              message: "您暂时还没有管理权限！",
              type: "warning"
            });
            setTimeout(() => {
              self.$router.go(0);
            }, 3000);
          }
          if (code == 1) {
            //数据存储
            self.$store.commit('SAVE_USERINFO', content)
            //关闭浏览器清除websocket
            window.onbeforeunload = function() {
              websocket.close();
            };
            self.$router.push({ name: "home" });
          }
        };
      }
    }
  }
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10%;
  box-sizing: border-box;
}
.login .left {
  color: #ffffff;
}
.login .left h3 {
  font-size: 56px;
  font-weight: 600;
  margin: 10px 0;
  letter-spacing: 4px;
}
.login .left h3 span {
  color: #ff6545;
}
.login .left .line {
  background: #ff6545;
  border-radius: 4.5px;
  height: 9px;
  width: 128px;
  margin-top: 36px;
}
.login .right {
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 30px 10px;
  box-sizing: border-box;
}
.login .right > img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>