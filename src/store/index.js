import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    securityCheckedLayers:["监控设备1","监控设备2"],
    companyChecked:{},
    navigation:"",
    userinfo:null,
  },
  mutations: {
    setSecurityCheckedLayers(state,data){
      state.securityCheckedLayers=data;
    },
    setCompanyChecked(state,data){
      state.companyChecked=data;
    },
    setNavigation(state,data){
      state.navigation=data;
    },
    setUserInfo(state,data){
      state.userinfo=data;
    },
  },
  getters: {
    getSecurityCheckedLayers: state => state.securityCheckedLayers,
    getCompanyChecked: state => state.companyChecked,
    getNavigation: state => state.navigation,
    getUserInfo: state => state.userinfo,
  },
  actions: {
    // commitIfArea:({commit},ifArea)=>commit('setIfArea',ifArea),
  },
  modules: {
  }
})
