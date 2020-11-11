import Vue from 'vue';
import VueRouter from 'vue-router';
import CesiumContainer from '@/views/main/CesiumContainer.vue';
import home from '@/views/login/home';
import login from '@/views/login/login';
import regist from '@/views/login/regist';


import securityLayers from '@/views/emergency/securityLayers';
import monitoring from '@/views/emergency/monitoring';
import conduct from "@/views/emergency/conduct";
import individualMobile from "@/views/emergency/individualMobile";
import multimedia from "@/views/emergency/multimedia";
import navigation from "@/views/emergency/navigation";

import companyInfo from '@/views/companyInfo/companyInfo';
import companyInfo_part1 from '@/views/companyInfo/companyInfo_part1';
import companyInfo_part2 from '@/views/companyInfo/companyInfo_part2';
import companyInfo_part3 from '@/views/companyInfo/companyInfo_part3';
import companyInfo_part5 from '@/views/companyInfo/companyInfo_part5';
import companyInfo_part6 from "@/views/companyInfo/companyInfo_part6";

import partyBuild1 from '@/views/partyBuild/partyBuild1';
import partyBuild2 from '@/views/partyBuild/partyBuild2';
import partyBuild3 from '@/views/partyBuild/partyBuild3';
import partyBuild4 from '@/views/partyBuild/partyBuild4';
import partyBuild5 from '@/views/partyBuild/partyBuild5';
import partyBuild6 from '@/views/partyBuild/partyBuild6';

import upload from '@/views/ContextCapture/upload';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect:"/home/login",//登录
    redirect:"/main"
  },
  {
    path: '/main',
    name: 'cesiumContainer',
    component: CesiumContainer,
    children: [
      {//智慧安防
        path:"/emergency",
        name:"emergency",
        components:{
          part1:securityLayers,
          part2:monitoring,
          part3:conduct,
          part4:individualMobile,
          part5:multimedia,
          part6:navigation,
        }
      },
      {//企业管理
        path:"/company",
        name:"company",
        components:{
          part1:companyInfo,
          part2:companyInfo_part1,
          part3:companyInfo_part2,
          part4:companyInfo_part3,
          part5:companyInfo_part5,
          part6:companyInfo_part6
        }
      },
      {
        path:"/partyBuild",
        name:"partyBuild",
        components:{
          part1:partyBuild1,
          part2:partyBuild2,
          part3:partyBuild3,
          part4:partyBuild4,
          part5:partyBuild5,
          part6:partyBuild6,
        }
      },
    ]
  },
  {
    path:"/home",
    name:"home",
    component:home,
    children: [
      {
        path: 'login',
        name: 'login',
        component: login
      },
      {
        path: 'regist',
        name: 'regist',
        component: regist
      }
    ]
  },
  {
    path:"/upload",
    name:"upload",
    component:upload,
  },
]
const router = new VueRouter({
  mode:"history",
  base: process.env.BASE_URL,
  routes
})
export default router
