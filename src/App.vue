<template>
  <div id="app" @click="isTimeOut">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      lastTime: null, // 最后一次点击的时间
      currentTime: null, // 当前点击的时间
      timeOut: 1000 * 60 *1 // 设置超时时间:3分钟
    }
  },
  created () {
    this.lastTime = new Date().getTime();
    console.log("this.$router.path",this.$router)
    if(this.$router.currentRoute.path == '/company'||this.$router.currentRoute.path == '/partyBuild'||this.$router.currentRoute.path == '/emergency'){
      this.$router.replace('/main')
    }
  },
  methods: {
    isTimeOut () {
      this.currentTime = new Date().getTime() // 记录这次点击的时间
      if (this.currentTime - this.lastTime > this.timeOut) { // 判断上次最后一次点击的时间和这次点击的时间间隔是否大于30分钟
      console.log("isTimeOut",this.timeOut)
      console.log("this.$store.getters.getUserInfo",this.$store.getters.getUserInfo)
        if (localStorage.login=="true") { // 如果是登录状态
          this.$router.push({name: 'login'});
          this.$store.commit('setUserInfo', null);
          localStorage.setItem("login","false");
        } else {
          this.lastTime = new Date().getTime()
        }
      } else {
        this.lastTime = new Date().getTime() // 如果在30分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
      }
    }
  }
}
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: "微软雅黑";  /*  设置字体 */
  margin: 0px auto /* 去除上下的边距*/
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
