import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios';

router.beforeEach((to, from, next)=>{
  console.log("to.path",to.path)
  if(to.path=="/company"||to.path=="/partyBuild"||to.path=="/emergency"){
    let initParts = document.getElementsByClassName("showContent");
    for(let i=0;i<initParts.length;i++){
      initParts[i].style.display="block";
    }
  }
  console.log("localStorage.getItem.login",localStorage)
  if(to.path=="/main"&&localStorage.login=="false"){
    router.replace('/home/login');
  }
  next();   // 确保要调用 next 方法，否则钩子就不会被 resolved(发生阻塞)
});

Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
