<template>
  <div class="mainWin">
    <div id="cesiumContainer"></div>
    <div id="toolbar"></div>
    <div class="class0">
      <!-- <div id="topDiv" style="float:left;width:400px;color:white"></div> -->
    </div>
    <div class="titleCSS">
      <div class="class2">
        <a>圣之尧智慧园区</a>
      </div>
      <div style="width:41vw;position: absolute;top:0px;right:0px;z-index:90;">
        <div class="class1 company" title="企业管理" v-on:click="exchangeStyle('company')">
          <router-link to="/company">企业管理</router-link>
        </div>
        <div class="class1 partyBuild" title="智慧党建" v-on:click="exchangeStyle('partyBuild')">
          <router-link to="/partyBuild">智慧党建</router-link>
        </div>
        <div class="class1 emergency" title="智慧安防" v-on:click="exchangeStyle('emergency')">
          <router-link to="/emergency">智慧安防</router-link>
        </div>
      </div>
      <div style="width:18vw;height:64px;position: absolute;top:0px;right:0px;padding-top:12px;padding-right:16px;z-index:100;">
        <div class="tools" title="工具箱">
          <el-dropdown @command="handleCommand" size="mini">
            <span class="el-dropdown-link">
              <img src="../../../assets/images/tool.png" style="height: 100%;width: 100%;">
            </span>
            <el-dropdown-menu slot="dropdown" style="background-color:white;margin-top: 10px;">
              <el-dropdown-item command="a">长度测量</el-dropdown-item>
              <el-dropdown-item command="b">面积测量</el-dropdown-item>
              <el-dropdown-item command="c">清空测量</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="navigation" title="导航">
          <el-dropdown @command="handleCommand" size="mini">
            <span class="el-dropdown-link">
              <img src="../../../assets/images/navigation.png" style="height: 100%;width: 100%;">
            </span>
            <el-dropdown-menu slot="dropdown" style="background-color:white;margin-top: 10px;">
              <el-dropdown-item command="d">停车场</el-dropdown-item>
              <el-dropdown-item command="e">单位</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="back" title="返回" v-on:click="back">
          <img src="../../../assets/images/TileIcon.png" style="height: 100%;width: 100%;">
        </div>
      </div>
    </div>
    <div class="class3 showContent">
      <router-view name="part1"></router-view>
    </div>
    <div class="class4 showContent">
      <router-view name="part2"></router-view>
    </div>
    <div class="class5 showContent">
      <router-view name="part3"></router-view>
    </div>
    <div class="class6 showContent">
      <router-view name="part6"></router-view>
    </div>
    <div class="class7 showContent">
      <router-view name="part4"></router-view>
    </div>
    <div class="class8 showContent">
      <router-view name="part5"></router-view>
    </div>
    <div v-drag class="drag" v-show="videoWindow">
      <div class="close" v-on:click="stopVideo"></div>
      <div>
        <video id="camera" ref="video" muted autoplay loop crossorigin controls>
          <source src="../../../assets/videos/air-612-2.mp4" type="video/mp4">
          Your browser does not support the <code>video</code> element.
        </video>
      </div>
    </div>
    <div v-drag class="moreInfoCss" v-show="moreInfo">
      <div class="close" v-on:click="closeMoreInfo"></div>
      <div class="infoCss">
        <table class="table">
          <tr>
            <th>单位名称</th>
            <th>描述</th>
          </tr>
          <tr>
            <td>{{name}}</td>
            <td>{{description}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div id="toolTip"></div>
  </div>
</template>

<script>
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { Viewer } from 'cesium';
import * as Cesium from 'cesium';

// const base_url = "http://192.168.1.202:8025/ModelData";//公共url
const base_url = "http://localhost:8008";//本地服务
export default {
  name: 'CesiumContainer',
  components:{},
  data(){
    return{
      mouseEventHandler:null,
      viewer:null,
      maxHeight:900,
      videoWindow:false,
      moreInfo:false,
      isCompany:true,
      ScreenSpaceEventHandler:null,
      name:"",
      description:"",
    }
  },
  mounted() {
    this.viewer = new Viewer('cesiumContainer',{
      timeline:false,
      animation:false,
      fullscreenButton:false,
      infoBox:false,
      selectionIndicator:false,
      geocoder: false,                //是否显示地名查找控件
      sceneModePicker: false,         //是否显示投影方式控件
      navigationHelpButton: false,    //是否显示帮助信息控件
      baseLayerPicker: false,         //是否显示图层选择控件
      homeButton: false,              //是否显示Home按钮
      shouldAnimate: true,
    });
    this.viewer.scene.skyBox.show = true;
    this.viewer.scene.globe.show = false;//隐藏地图
    this.viewer._cesiumWidget._creditContainer.style.display = "none";
    console.log("Cesium VERSION=",Cesium.VERSION);
    if(1){
      var fixGltf = function(gltf) {
        if (!gltf.extensionsUsed) {
            return;
        }
        var v = gltf.extensionsUsed.indexOf('KHR_technique_webgl');
        var t = gltf.extensionsRequired.indexOf('KHR_technique_webgl');
        if (v !== -1) {
          gltf.extensionsRequired.splice(t, 1, 'KHR_techniques_webgl');
          gltf.extensionsUsed.splice(v, 1, 'KHR_techniques_webgl');
          gltf.extensions = gltf.extensions || {};
          gltf.extensions['KHR_techniques_webgl'] = {};
          gltf.extensions['KHR_techniques_webgl'].programs = gltf.programs;
          gltf.extensions['KHR_techniques_webgl'].shaders = gltf.shaders;
          gltf.extensions['KHR_techniques_webgl'].techniques = gltf.techniques;
          var techniques = gltf.extensions['KHR_techniques_webgl'].techniques;
          gltf.materials.forEach(function (mat, index) {
              gltf.materials[index].extensions['KHR_technique_webgl'].values = gltf.materials[index].values;
              gltf.materials[index].extensions['KHR_techniques_webgl'] = gltf.materials[index].extensions['KHR_technique_webgl'];
              var vtxfMaterialExtension = gltf.materials[index].extensions['KHR_techniques_webgl'];
              for (var value in vtxfMaterialExtension.values) {
                  var us = techniques[vtxfMaterialExtension.technique].uniforms;
                  for (var key in us) {
                      if (us[key] === value) {
                          vtxfMaterialExtension.values[key] = vtxfMaterialExtension.values[value];
                          delete vtxfMaterialExtension.values[value];
                          break;
                      }
                  }
              };
          });
          techniques.forEach(function (t) {
              for (var attribute in t.attributes) {
                  var name = t.attributes[attribute];
                  t.attributes[attribute] = t.parameters[name];
              };
              for (var uniform in t.uniforms) {
                  var name = t.uniforms[uniform];
                  t.uniforms[uniform] = t.parameters[name];
              };
          });
        }
      }
      Object.defineProperties(Cesium.Model.prototype, {
          _cachedGltf: {
              set: function (value) {
                  this._vtxf_cachedGltf = value;
                  if (this._vtxf_cachedGltf && this._vtxf_cachedGltf._gltf) {
                      fixGltf(this._vtxf_cachedGltf._gltf);
                  }
              },
              get: function () {
                  return this._vtxf_cachedGltf;
              }
          }
      });
    }
    var tileset = new Cesium.Cesium3DTileset({
      url: base_url+"/data/tileset.json",
      // url: base_url+"/output/tileset.json",
      // url: "http://localhost:8008/data/tileset.json",
    });
    this.viewer.scene.primitives.add(tileset);
    tileset.readyPromise.then(function(tileset) {//高度
      var boundingSphere = tileset.boundingSphere; 
      var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);            
      var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
      var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -14);
      var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
      tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    });
    //设置初始位置
    var x=121.131214613;
    var y=31.165150441;
    this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(x,y, this.maxHeight)
    });

    // homeButton
    var that = this;
    // let topDiv = document.getElementById("topDiv");
    // let height = this.viewer.camera.positionCartographic.height.toFixed(2);
    // topDiv.innerHTML="点击坐标的位置为：<br>经度：121.12983，<br>纬度：31.16552，<br>高度："+height;

    let initParts = document.getElementsByClassName("showContent");
    for(let i=0;i<initParts.length;i++){
      initParts[i].style.display="none";
    }

    // addLabels
    this.addLabels(this.viewer);
    this.addMouseEvent(this.viewer);
    this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 0;//相机的高度的最小值
	  this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = this.maxHeight;  //相机高度的最大值

    // 亮度设置
    var stages = this.viewer.scene.postProcessStages;
    this.viewer.scene.brightness =  this.viewer.scene.brightness || stages.add(Cesium.PostProcessStageLibrary.createBrightnessStage());
    this.viewer.scene.brightness.enabled = true;
    this.viewer.scene.brightness.uniforms.brightness = Number(1.2);
  },
  methods:{
    addLabels(viewer){
      //张江智慧园区
      viewer.entities.add({
        id:"yuanqu",
        name : '张江智慧园区',
        type:"unit",
        position : Cesium.Cartesian3.fromDegrees(121.129523235,31.165036896,10),
        point : { //点
            pixelSize : 5,
            color : Cesium.Color.RED,
            outlineColor : Cesium.Color.WHITE,
            outlineWidth : 2
        },
        label : { //文字标签
            text : '张江·人工智能智慧园区',
            font : '10pt monospace',
            style : Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth : 2,
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
            pixelOffset : new Cesium.Cartesian2( 0, -9 )   //偏移量
        }
      });
      //圣之尧
      viewer.entities.add({
          id:"szy",
          name : '圣之尧',
          type:"unit",
          position : Cesium.Cartesian3.fromDegrees(121.129798934,31.165762615,15),
          // point : { //点
          //     pixelSize : 5,
          //     color : Cesium.Color.RED,
          //     outlineColor : Cesium.Color.WHITE,
          //     outlineWidth : 2
          // },
          billboard:{
            image: base_url+'/images/ploughuav.png',
            // width: 20,
            // height: 20,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            scale: 1,
          },
          label : { //文字标签
              text : '圣之尧',
              font : '10pt monospace',
              style : Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth : 2,
              verticalOrigin : Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
              pixelOffset : new Cesium.Cartesian2( 0, -9 )   //偏移量
          }
      });
      //征世科技-point
      viewer.entities.add({
          id:"zhengshi",
          name : '征世科技',
          type:"unit",
          position : Cesium.Cartesian3.fromDegrees(121.131851734,31.164354997,30),
          point : { //点
              pixelSize : 5,
              color : Cesium.Color.RED,
              outlineColor : Cesium.Color.WHITE,
              outlineWidth : 2
          },
          label : { //文字标签
              text : '征世科技',
              font : '10pt monospace',
              style : Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth : 2,
              verticalOrigin : Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
              pixelOffset : new Cesium.Cartesian2( 0, -9 )   //偏移量
          }
      });
      //疏散路线1
      viewer.entities.add({
        id:"polyline1",
        name : '疏散路线1',
        show:false,
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            121.131997020,31.165625152,3,
            121.129745382,31.165234691,3,
            121.129823691,31.164784112,3,
          ]),
          width: 5,
          material: new Cesium.PolylineArrowMaterialProperty(
            Cesium.Color.RED
          ),
        }
      });
      //停车场1
      viewer.entities.add({
        id:"P1",
        name : '停车场1',
        show:false,
        // position : Cesium.Cartesian3.fromDegrees(121.129646816,31.165445997,10),
        rectangle : {
          coordinates: Cesium.Rectangle.fromDegrees(
            121.129567158,
            31.165318254,
            121.129707407,
            31.165745099
          ),
          material: Cesium.Color.GREEN.withAlpha(0.5),
          rotation: Cesium.Math.toRadians(13),
          stRotation: Cesium.Math.toRadians(180)
        }
      });
      //停车场2
      viewer.entities.add({
        id:"P2",
        name : '停车场2',
        show:false,
        // position : Cesium.Cartesian3.fromDegrees(121.129597242,31.165607373,10),
        rectangle : {
          coordinates: Cesium.Rectangle.fromDegrees(
            121.132320308,
            31.165796179,
            121.132454637,
            31.166118714
          ),
          material: Cesium.Color.GREEN.withAlpha(0.5),
          rotation: Cesium.Math.toRadians(13),
          stRotation: Cesium.Math.toRadians(180)
        }
      });
      //疏散路线2
      viewer.entities.add({
        id:"polyline3",
        name : '疏散路线2',
        show:false,
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            121.132438915,31.165482823,3,
            121.132476414,31.165325387,3,
            121.129649574,31.164799960,3,
          ]),
          width: 5,
          material: new Cesium.PolylineArrowMaterialProperty(
            Cesium.Color.ORANGE
          ),
        }
      });
      //摄像头1
      viewer.entities.add({
        id:"camera1",
        name : '摄像头1',
        position : Cesium.Cartesian3.fromDegrees(121.129797705,31.164741683,10),
        billboard:{
          image: base_url+'/images/camera.jpg',
          width: 20,
          height: 20,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 1,
        }
      });
      //摄像头2
      viewer.entities.add({
        id:"camera2",
        name : '摄像头2',
        position: Cesium.Cartesian3.fromDegrees(121.129873036, 31.165169932,10),
        billboard:{
          image: base_url+'/images/camera.jpg',
          width: 20,
          height: 20,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 1,
        }
      });
      //上海圣之尧智能科技有限公司
      viewer.entities.add({
        id:"Ploughuav",
        name : '上海圣之尧智能科技有限公司',
        show:false,
        // position : Cesium.Cartesian3.fromDegrees(121.129646816,31.165445997,10),
        rectangle : {
          coordinates: Cesium.Rectangle.fromDegrees(
            121.129792800,//xi
            31.165295651,//nan
            121.129937626,//dong
            31.165797055,//bei
          ),
          material: Cesium.Color.AQUA.withAlpha(0.5),
          rotation: Cesium.Math.toRadians(13),
          stRotation: Cesium.Math.toRadians(90)
        }
      });
      //征世科技-rectangle
      viewer.entities.add({
        id:"zhengshikeji",
        name : '征世科技',
        show:false,
        // position : Cesium.Cartesian3.fromDegrees(121.129646816,31.165445997,10),
        rectangle : {
          coordinates: Cesium.Rectangle.fromDegrees(
            121.131705586,//xi
            31.164259644,//nan
            121.132665047,//dong
            31.164608542,//bei
          ),
          material: Cesium.Color.AQUA.withAlpha(0.5),
          rotation: Cesium.Math.toRadians(10.5),
          // stRotation: Cesium.Math.toRadians(90)
        }
      });
    },
    addMouseEvent(viewer){
      var that=this;
      this.mouseEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      var labelEntity = viewer.entities.add({
        name:"提示信息",
        position: Cesium.Cartesian3.fromDegrees(0, 0),
        label: {
          text: '',
          font: '15px sans-serif',
          pixelOffset: new Cesium.Cartesian2(8, 8),//y大小根据行数和字体大小改变
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
          showBackground: true,
          backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 1.0)
        }
      });
      labelEntity.show = false;
      this.mouseEventHandler.setInputAction(function(click){
        var pick = viewer.scene.pick(click.position);
        if(pick && pick.id && pick.id.id){
          if(pick.id.id=="yuanqu"){
            viewer.camera.flyTo({
              destination: Cesium.Cartesian3.fromDegrees(121.129900519,31.164789990, 800),
            });
          }else if(pick.id.id=="camera1"){
            that.$refs.video.src = base_url+"/videos/air-612-5.mp4";
            that.$refs.video.play();
            that.videoWindow=true;
          }else if(pick.id.id=="camera2"){
            that.$refs.video.src = base_url+"/videos/air-613-3.mp4";
            that.$refs.video.play();
            that.videoWindow=true;
          }else if(pick.id.id=="P1"){
            that.$store.commit('setNavigation',"nav-p1");
          }else if(pick.id.id=="P2"){
            that.$store.commit('setNavigation',"nav-p2");
          }else if(pick.id.id=="Ploughuav"){
            that.$store.commit('setNavigation',"nav-szy");
          }else if(pick.id.id=="zhengshikeji"){
            that.$store.commit('setNavigation',"nav-zs");
          }
          if (click.position) {
            labelEntity.show = true;
            var cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);//
            if (cartesian) {
              labelEntity.position = cartesian;
              labelEntity.show = true;
              labelEntity.label.text = pick.id.name;
              if(pick.id.type=="unit"){
                that.moreInfo = true;
                that.name = pick.id.name;
                that.description = pick.id.id;
              }
            } else {
              labelEntity.show = false;
            }
          }
        }else{
          labelEntity.show = false;
        }
        //获取鼠标位置，camera.pickEllipsoid()返回一个cartesian类型位置
        var my_ellipsoid = viewer.scene.globe.ellipsoid;
        let click_position =  viewer.scene.camera.pickEllipsoid(click.position,my_ellipsoid);
        //位置数据转换只地理数据类型
        let carto_position = my_ellipsoid.cartesianToCartographic(click_position);
        //cesium函数转换至地理数据类型的经纬度
        let longitude_x = Cesium.Math.toDegrees(carto_position.longitude).toFixed(9);
        let longitude_y = Cesium.Math.toDegrees(carto_position.latitude).toFixed(9);
        //topDiv是html中的div
        // let topDiv = document.getElementById("topDiv");
        // let height = viewer.camera.positionCartographic.height.toFixed(2);
        // topDiv.innerHTML="点击坐标的位置为：<br>经度："+longitude_x+"，<br>纬度："+longitude_y+"，<br>高度："+height;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    distance(){//距离计算
      var that=this;
        // 取消双击事件-追踪该位置
      that.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      if(this.ScreenSpaceEventHandler){
        this.ScreenSpaceEventHandler.destroy(); //关闭事件句柄
      }
      this.ScreenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(that.viewer.scene._imageryLayerCollection);
      var positions = [];
      var poly = null;
      var tooltip = document.getElementById("toolTip");
      var distance = 0;
      var cartesian = null;
      var floatingPoint;
      tooltip.style.display = "block";

      this.ScreenSpaceEventHandler.setInputAction(function (movement) {
        tooltip.style.left = movement.endPosition.x + 3 + "px";
        tooltip.style.top = movement.endPosition.y - 25 + "px";
        tooltip.innerHTML = '<p>单击开始，右击结束</p>';
        // cartesian = viewer.scene.pickPosition(movement.endPosition);
        let ray = that.viewer.camera.getPickRay(movement.endPosition);
        cartesian = that.viewer.scene.globe.pick(ray, that.viewer.scene);
        //cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
        if (positions.length >= 2) {
          if (!Cesium.defined(poly)) {
            poly = new PolyLinePrimitive(positions);
          } else {
            positions.pop();
            cartesian.y += (1 + Math.random());
            positions.push(cartesian);
          }
          distance = getSpaceDistance(positions);
          tooltip.innerHTML='<p>'+distance+'米</p>';
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      this.ScreenSpaceEventHandler.setInputAction(function (movement) {
        tooltip.style.display = "none";
        // cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
        // cartesian = viewer.scene.pickPosition(movement.position);
        let ray = that.viewer.camera.getPickRay(movement.position);
        cartesian = that.viewer.scene.globe.pick(ray, that.viewer.scene);
        // console.log("cartesian",cartesian);
        if (positions.length == 0) {
          positions.push(cartesian.clone());
        }
        positions.push(cartesian);
        //在三维场景中添加Label
        //   var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var textDisance = distance + "米";
        // console.log(textDisance + ",lng:" + cartographic.longitude/Math.PI*180.0);
        floatingPoint = that.viewer.entities.add({
          name: '空间直线距离',
          // position: Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180,cartographic.height),
          position: positions[positions.length - 1],
          point: {
            pixelSize: 5,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
          },
          label: {
            text: textDisance,
            font: '18px sans-serif',
            fillColor: Cesium.Color.GOLD,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(20, -20),
          }
        });
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      this.ScreenSpaceEventHandler.setInputAction(function (movement) {
        that.ScreenSpaceEventHandler.destroy(); //关闭事件句柄
        positions.pop(); //最后一个点无效
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

      var PolyLinePrimitive = (function () {
        function _(positions) {
          this.options = {
            name: '直线',
            polyline: {
              show: true,
              positions: [],
              material: Cesium.Color.CHARTREUSE,
              width: 10,
              clampToGround: true
            }
          };
          this.positions = positions;
          this._init();
        }

        _.prototype._init = function () {
          var _self = this;
          var _update = function () {
            return _self.positions;
          };
          //实时更新polyline.positions
          this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
          that.viewer.entities.add(this.options);
        };

        return _;
      })();

      //空间两点距离计算函数
      function getSpaceDistance(positions) {
        var distance = 0;
        for (var i = 0; i < positions.length - 1; i++) {
          var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
          var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);
          /**根据经纬度计算出距离**/
          var geodesic = new Cesium.EllipsoidGeodesic();
          geodesic.setEndPoints(point1cartographic, point2cartographic);
          var s = geodesic.surfaceDistance;
          //返回两点之间的距离
          s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
          distance = distance + s;
        }
        return distance.toFixed(2);
      }
    },
    area(){//面积计算
      var that=this;
      // 取消双击事件-追踪该位置
      that.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      // 鼠标事件
      if(this.ScreenSpaceEventHandler){
        this.ScreenSpaceEventHandler.destroy(); //关闭事件句柄
      }
      this.ScreenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(that.viewer.scene._imageryLayerCollection);
      var positions = [];
      var tempPoints = [];
      var polygon = null;
      // var tooltip = document.getElementById("toolTip");
      var cartesian = null;
      var floatingPoint;//浮动点
      // tooltip.style.display = "block";
      
      this.ScreenSpaceEventHandler.setInputAction(function(movement){
        // tooltip.style.left = movement.endPosition.x + 3 + "px";
        // tooltip.style.top = movement.endPosition.y - 25 + "px";
        // tooltip.innerHTML ='<p>单击开始，右击结束</p>';
        // cartesian = viewer.scene.pickPosition(movement.endPosition); 
        let ray = that.viewer.camera.getPickRay(movement.endPosition);
        cartesian = that.viewer.scene.globe.pick(ray, that.viewer.scene);
          //cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
          if(positions.length >= 2){
              if (!Cesium.defined(polygon)) {
                  polygon = new PolygonPrimitive(positions);
              }else{
                  positions.pop();
                  // cartesian.y += (1 + Math.random());
                  positions.push(cartesian);
              }
              // tooltip.innerHTML='<p>'+distance+'米</p>';
          }
      },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      
      this.ScreenSpaceEventHandler.setInputAction(function(movement){
          // tooltip.style.display = "none";
          // cartesian = viewer.scene.pickPosition(movement.position); 
        let ray = that.viewer.camera.getPickRay(movement.position);
        cartesian = that.viewer.scene.globe.pick(ray, that.viewer.scene);
        // cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
        if(positions.length == 0) {
            positions.push(cartesian.clone());
        }
        //positions.pop();
        positions.push(cartesian);
        //在三维场景中添加点
        var cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1]);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
        var heightString = cartographic.height;
        tempPoints.push({ lon: longitudeString, lat: latitudeString ,hei:heightString});
        floatingPoint = that.viewer.entities.add({
          name : '多边形面积',
          position : positions[positions.length - 1],         
          point : {
              pixelSize : 5,
              color : Cesium.Color.RED,
              outlineColor : Cesium.Color.WHITE,
              outlineWidth : 2,
              heightReference:Cesium.HeightReference.CLAMP_TO_GROUND 
          }
        }); 
      },Cesium.ScreenSpaceEventType.LEFT_CLICK);
      
      this.ScreenSpaceEventHandler.setInputAction(function(movement){
        that.ScreenSpaceEventHandler.destroy();
        positions.pop();
        var textArea = getArea(tempPoints) + "平方公里";
        that.viewer.entities.add({
          name : '多边形面积',
          position : positions[positions.length - 1],
          // point : {
          //  pixelSize : 5,
          //  color : Cesium.Color.RED,
          //  outlineColor : Cesium.Color.WHITE,
          //  outlineWidth : 2,
          //  heightReference:Cesium.HeightReference.CLAMP_TO_GROUND 
          // },
          label : {
            text : textArea,
            font : '18px sans-serif',
            fillColor : Cesium.Color.GOLD,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth : 2,
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
              pixelOffset : new Cesium.Cartesian2(20, -40),
              heightReference:Cesium.HeightReference.CLAMP_TO_GROUND
          }
        });
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK );   
      var radiansPerDegree = Math.PI / 180.0;//角度转化为弧度(rad) 
      var degreesPerRadian = 180.0 / Math.PI;//弧度转化为角度
      //计算多边形面积
      function getArea(points) {
          var res = 0;
          //拆分三角曲面
          for (var i = 0; i < points.length - 2; i++) {
              var j = (i + 1) % points.length;
              var k = (i + 2) % points.length;
              var totalAngle = Angle(points[i], points[j], points[k]);
              var dis_temp1 = distance(positions[i], positions[j]);
              var dis_temp2 = distance(positions[j], positions[k]);
              res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle)) ;
              // console.log(res);
          }
          return (res/1000000.0).toFixed(4);
      }
      /*角度*/
      function Angle(p1, p2, p3) {
          var bearing21 = Bearing(p2, p1);
          var bearing23 = Bearing(p2, p3);
          var angle = bearing21 - bearing23;
          if (angle < 0) {
              angle += 360;
          }
          return angle;
      }
      /*方向*/
      function Bearing(from, to) {
          var lat1 = from.lat * radiansPerDegree;
          var lon1 = from.lon * radiansPerDegree;
          var lat2 = to.lat * radiansPerDegree;
          var lon2 = to.lon * radiansPerDegree;
          var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
          if (angle < 0) {
              angle += Math.PI * 2.0;
          }
          angle = angle * degreesPerRadian;//角度
          return angle;
      } 
      var PolygonPrimitive = (function(){
          function _(positions){
              this.options = {
                  name:'多边形',
                  polygon : {
                      hierarchy : [],
                      // perPositionHeight : true,
                      material : Cesium.Color.GREEN.withAlpha(0.5),
                      // heightReference:20000
                  }
              };
              this.hierarchy = {positions};
              this._init();
          }
          _.prototype._init = function(){
              var _self = this;
              var _update = function(){
                  return _self.hierarchy;
              };
              //实时更新polygon.hierarchy
              this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update,false);
              that.viewer.entities.add(this.options);
          };
          return _;
      })();
      function distance(point1,point2){
          var point1cartographic = Cesium.Cartographic.fromCartesian(point1);
          var point2cartographic = Cesium.Cartographic.fromCartesian(point2);
          /**根据经纬度计算出距离**/
          var geodesic = new Cesium.EllipsoidGeodesic();
          geodesic.setEndPoints(point1cartographic, point2cartographic);
          var s = geodesic.surfaceDistance;
          //返回两点之间的距离
          s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2)); 
          return s;
      }
    },
    clean(){//清除测量工具
      for(let i=this.viewer.entities.values.length-1;i>=0;i--){
        if(this.viewer.entities.values[i].name=="空间直线距离"||this.viewer.entities.values[i].name=="多边形面积"||this.viewer.entities.values[i].name=="直线"||this.viewer.entities.values[i].name=="多边形"){
          let removeId = this.viewer.entities.values[i].id;
          this.viewer.entities.removeById(removeId);
        }
      }
    },
    stopVideo(){//关闭视频播放
      this.videoWindow = false;
      this.$refs.video.pause();
    },
    closeMoreInfo(){
      this.moreInfo = false;
    },
    parkingGuide(){//停车场导航开始，显示位置
      this.viewer.dataSources.removeAll();
      for(let i=0;i<this.viewer.entities.values.length;i++){
        if(this.viewer.entities.values[i].id=="P1"||this.viewer.entities.values[i].id=="P2"){
          this.viewer.entities.values[i].show = true;
        }else if(this.viewer.entities.values[i].id=="Ploughuav"||this.viewer.entities.values[i].id=="zhengshikeji"){
          this.viewer.entities.values[i].show = false;
        }
      }
    },
    companyGuide(){
      this.viewer.dataSources.removeAll();
      for(let i=0;i<this.viewer.entities.values.length;i++){
        if(this.viewer.entities.values[i].id=="Ploughuav"||this.viewer.entities.values[i].id=="zhengshikeji"){
          this.viewer.entities.values[i].show = true;
        }else if(this.viewer.entities.values[i].id=="P1"||this.viewer.entities.values[i].id=="P2"){
          this.viewer.entities.values[i].show = false;
        }
      }
    },
    back(){
      window.location.href="http://localhost:8888/"
    },
    handleCommand(command) {
      switch(command){
        case "a":
          this.distance();
          break;
        case "b":
          this.area();
          break;
        case "c":
          this.clean();
        break;
        case "d":
          this.parkingGuide();
        break;
        case "e":
          this.companyGuide();
        break;
      }
      this.$message('click on item ' + command);
    },
    exchangeStyle(type){
      console.log("type",document.getElementsByClassName("company"))
      switch(type){
        case "company":
          document.getElementsByClassName("company")[0].classList.add("activeMenu");
          document.getElementsByClassName("partyBuild")[0].classList.remove("activeMenu");
          document.getElementsByClassName("emergency")[0].classList.remove("activeMenu");
          break;
        case "partyBuild":
          document.getElementsByClassName("partyBuild")[0].classList.add("activeMenu");
          document.getElementsByClassName("emergency")[0].classList.remove("activeMenu");
          document.getElementsByClassName("company")[0].classList.remove("activeMenu");
          break;
        case "emergency":
          document.getElementsByClassName("emergency")[0].classList.add("activeMenu");
          document.getElementsByClassName("partyBuild")[0].classList.remove("activeMenu");
          document.getElementsByClassName("company")[0].classList.remove("activeMenu");
          break;
        default:
          break;
      }
    }
  },
  computed:{
    checkedLayers(){//图层 安防
      return (this.$store.getters.getSecurityCheckedLayers);
    },
    currentCompany(){//企业选择
      return this.$store.getters.getCompanyChecked;
    },
    navigations(){
      return this.$store.getters.getNavigation;
    }
  },
  watch: {
    checkedLayers() {//图层显示
      for(let i=0;i<this.viewer.entities.values.length;i++){
        if(this.viewer.entities.values[i].id=="polyline1"||this.viewer.entities.values[i].id=="polyline3"||this.viewer.entities.values[i].id=="camera1"||this.viewer.entities.values[i].id=="camera2"){
          this.viewer.entities.values[i].show = false;
        }
      }
      for(let i=0;i<this.viewer.entities.values.length;i++){
        for (let j = 0; j < this.checkedLayers.length; j++) {
          if(this.checkedLayers[j]=="疏散路线1"){
            if(this.viewer.entities.values[i].id=="polyline1"){
              this.viewer.entities.values[i].show = true;
              break;
            }
          }
          if(this.checkedLayers[j]=="疏散路线2"){
            if(this.viewer.entities.values[i].id=="polyline3"){
              this.viewer.entities.values[i].show = true;
              break;
            }
          }
          if(this.checkedLayers[j]=="监控设备1"){
            if(this.viewer.entities.values[i].id=="camera1"){
              this.viewer.entities.values[i].show = true;
              break;
            }
          }
          if(this.checkedLayers[j]=="监控设备2"){
            if(this.viewer.entities.values[i].id=="camera2"){
              this.viewer.entities.values[i].show = true;
              break;
            }
          }
        }
      }
    },
    currentCompany(){//选择企业
      if(this.currentCompany){
        switch(this.currentCompany.name){
          case "张江智慧园区":
            this.viewer.camera.flyTo({
              destination: Cesium.Cartesian3.fromDegrees(121.129900519,31.164789990, 800),
            });
            break;
          case "圣之尧":
            this.viewer.camera.flyTo({
              destination: Cesium.Cartesian3.fromDegrees(121.129818656,31.165636589, 270),
            });
            break;
        }
      }else{
        console.log("currentCompany is null");
      }
    },
    navigations(){//导航路线/“导航”动作
      let flag = false;
      console.log("navigations");
      for(let i=0;i<this.viewer.entities.values.length;i++){//还原图层颜色
        if(this.viewer.entities.values[i].id=="P1"||this.viewer.entities.values[i].id=="P2"||this.viewer.entities.values[i].id=="Ploughuav"||this.viewer.entities.values[i].id=="zhengshikeji"){
          this.viewer.entities.values[i].rectangle.material.color=Cesium.Color.GREEN.withAlpha(0.5);
          this.viewer.entities.values[i].show=false;
        }
      }
      switch(this.navigations){
        case "nav-p1":
          this.viewer.dataSources.removeAll();
          var czml = [
            {
              id: "document",
              name: "CZML Point1 - Time Dynamic",
              version: "1.0",
            },
            {
              id: "point",
              availability: "2012-08-04T16:00:00Z/2012-08-04T16:01:00Z",
              position: {
                epoch: "2012-08-04T16:00:00Z",
                cartographicDegrees: [
                  0,121.129653610,31.164765427,3,
                  2,121.131309683,31.165084665,3,
                  3,121.131190241,31.165514937,3,
                  5,121.129698801,31.165259547,3,
                ],
              },
              billboard:{
                image: base_url+'/images/b9.png',
                width: 20,
                height: 20,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                scale: 1,
                show:[
                  {
                    interval:"2012-08-04T16:00:00Z/2012-08-04T16:01:00Z",
                    boolean:true
                  }
                ],
              },
              // point: {
              //   color: {
              //     rgba: [255, 255, 255, 128],
              //   },
              //   outlineColor: {
              //     rgba: [255, 0, 0, 128],
              //   },
              //   outlineWidth: 3,
              //   pixelSize: 15,
              // },
            },
            {
              id: "Line1",
              name: "导航路线：停车场1",
              polyline: {
                positions: {
                  cartographicDegrees: [
                    121.129653610,31.164765427,3,
                    121.131309683,31.165084665,3,
                    121.131190241,31.165514937,3,
                    121.129698801,31.165259547,3,
                  ],
                },
                material: {
                  solidColor: {
                    color: {
                      rgba: [255, 0, 0, 255],
                    },
                  },
                },
                width: 5,
                clampToGround: true,
              },
            },
          ];
          var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
          this.viewer.dataSources.add(dataSourcePromise);
          for(let i=0;i<this.viewer.entities.values.length;i++){//修改颜色
            if(this.viewer.entities.values[i].id=="P1"){
              // console.log("nav-p1",this.viewer.entities.values[i]);
              this.viewer.entities.values[i].show=true;
              this.viewer.entities.values[i].rectangle.material.color=Cesium.Color.RED.withAlpha(0.5);
            }
          }
          break;
        case "nav-p2":
          this.viewer.dataSources.removeAll();
          var czml = [
            {
              id: "document",
              name: "CZML Point2 - Time Dynamic",
              version: "1.0",
            },
            {
              id: "point",
              availability: "2012-08-04T16:00:00Z/2012-08-04T16:01:00Z",
              position: {
                epoch: "2012-08-04T16:00:00Z",
                cartographicDegrees: [
                  0,121.129654767,31.164752168,3,
                  4,121.132537762,31.165311865,3,
                  6,121.132386152,31.165894045,3,
                ],
              },
              billboard:{
                image: base_url+'/images/b9.png',
                width: 20,
                height: 20,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                scale: 1,
              },
            },
            {
              id: "Line2",
              name: "导航路线：停车场2",
              polyline: {
                positions: {
                  cartographicDegrees: [
                    121.129654767,31.164752168,3,
                    121.132537762,31.165311865,3,
                    121.132386152,31.165894045,3,
                  ],
                },
                material: {
                  solidColor: {
                    color: {
                      rgba: [255, 0, 0, 255],
                    },
                  },
                },
                width: 5,
                clampToGround: true,
              },
            },
          ];
          var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
          this.viewer.dataSources.add(dataSourcePromise);
          for(let i=0;i<this.viewer.entities.values.length;i++){//修改颜色
            if(this.viewer.entities.values[i].id=="P2"){
              this.viewer.entities.values[i].show=true;
              this.viewer.entities.values[i].rectangle.material.color=Cesium.Color.RED.withAlpha(0.5);
            }
          }
          break;
        case "nav-szy":
          this.viewer.dataSources.removeAll();
          var czml = [
            {
              id: "document",
              name: "CZML Point3 - Time Dynamic",
              version: "1.0",
            },
            {
              id: "point",
              availability: "2012-08-04T16:00:00Z/2012-08-04T16:05:00Z",
              position: {
                epoch: "2012-08-04T16:00:00Z",
                cartographicDegrees: [
                  0,121.129654767,31.164752168,3,
                  4,121.129935126,31.164819340,3,
                  8,121.129724163,31.165528168,3,
                  // 12,121.129796080,31.165534456,3,
                ],
              },
              billboard:{
                image: base_url+'/images/b9.png',
                width: 20,
                height: 20,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                scale: 1,
              },
            },
            {
              id: "Line3",
              name: "导航路线：圣之尧",
              polyline: {
                positions: {
                  cartographicDegrees: [
                    121.129654767,31.164752168,3,
                    121.129935126,31.164819340,3,
                    121.129724163,31.165528168,3,
                    121.129796080,31.165534456,3,
                  ],
                },
                material: {
                  solidColor: {
                    color: {
                      rgba: [	212,1,255, 255],
                    },
                  },
                },
                width: 5,
                clampToGround: true,
              },
            },
          ];
          var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
          this.viewer.dataSources.add(dataSourcePromise);
          for(let i=0;i<this.viewer.entities.values.length;i++){//修改颜色
            if(this.viewer.entities.values[i].id=="Ploughuav"){
              this.viewer.entities.values[i].show=true;
              this.viewer.entities.values[i].rectangle.material.color=Cesium.Color.RED.withAlpha(0.5);
            }
          }
          break;
        case "nav-zs":
          this.viewer.dataSources.removeAll();
          var czml = [
            {
              id: "document",
              name: "CZML Point4 - Time Dynamic",
              version: "1.0",
            },
            {
              id: "point",
              availability: "2012-08-04T16:00:00Z/2012-08-04T16:01:00Z",
              position: {
                epoch: "2012-08-04T16:00:00Z",
                cartographicDegrees: [
                  0,121.129653610,31.164765427,3,
                  3,121.131309683,31.165084665,3,
                  5,121.131415526,31.164685336,3,
                  6,121.131566297,31.164585217,3,
                  7,121.131623405,31.164388541,3,
                  // 13,121.131707228,31.164392165,3,
                ],
              },
              billboard:{
                image: base_url+'/images/b9.png',
                width: 20,
                height: 20,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                scale: 1,
              },
            },
            {
              id: "Line4",
              name: "导航路线：征世科技",
              polyline: {
                positions: {
                  cartographicDegrees: [
                    121.129653610,31.164765427,3,
                    121.131309683,31.165084665,3,
                    121.131415526,31.164685336,3,
                    121.131566297,31.164585217,3,
                    121.131623405,31.164388541,3,
                    121.131707228,31.164392165,3,
                  ],
                },
                material: {
                  solidColor: {
                    color: {
                      rgba: [	212,242,231, 255],
                    },
                  },
                },
                width: 5,
                clampToGround: true,
              },
            },
          ];
          var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
          this.viewer.dataSources.add(dataSourcePromise);
          for(let i=0;i<this.viewer.entities.values.length;i++){//修改颜色
            if(this.viewer.entities.values[i].id=="zhengshikeji"){
              this.viewer.entities.values[i].show=true;
              this.viewer.entities.values[i].rectangle.material.color=Cesium.Color.RED.withAlpha(0.5);
            }
          }
          break;
        default:
          this.viewer.dataSources.removeAll();
          // for(let i=0;i<this.viewer.entities.values.length;i++){
          //   if(this.viewer.entities.values[i].id=="zhengshikeji"||!flag&&this.viewer.entities.values[i].id=="P1"||!flag&&this.viewer.entities.values[i].id=="P2"||this.viewer.entities.values[i].id=="Ploughuav"){
          //     this.viewer.entities.values[i].show = false;
          //   }
          // }
      }
    }
  },
  directives:{//拖动窗口
    drag(el,binding){
      el.onmousedown = function(e){
        var disx = e.pageX - el.offsetLeft;
        var disy = e.pageY - el.offsetTop;
        document.onmousemove = function (e){
          var xx = e.pageX - disx+'px';
          var yy = e.pageY - disy+'px';
          el.style.left = xx;
          el.style.top = yy;
        };
      };
      el.onmouseup = function(e){
        document.onmousemove = null;
      }
    }
  }
}
</script>
<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
.titleCSS{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 64px;
  background-color: rgb(31 31 31);
}
.class0{
  width: 100%;
  position: absolute;
  left: 5px;
  top: 90vh;
}
.class1{
  float:left;
  text-align:center;
  /* border-radius: 5px; */
  /* height: 64px; */
  /* width: 130px; */
  margin-left:24px;
  margin-right: 24px;
  background-color:rgb(10 10 10);
  /* border: 1px solid #303336; */
  margin-top: 20px;
  /* background-size: cover; */
  /* z-index:6; */
  /* cursor:pointer; */
}
.class1 a{
  font-size: 24px;
  color: rgb(153 ,153,153);
}
/* .class1:hover{
  color: #fff;
  fill: #fff;
  background-size: cover;
  border-color: #aef;
  box-shadow: 0 0 8px #fff;
} */
.mainWin{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background: #000000;
}
.class2{
  /* width:350px; */
  text-align:center;
  /* position: absolute; */
  /* left: 6px; */
  /* top: 6px; */
  margin-top: 7px;
  margin-bottom: 14px;
  height:40px;
}
.class2 a{
  font-size: 36px;color:rgb(254 255 255);
}
.img{
  float:left;
  height: 100px;
  width: 90px;
  margin-left: 6px;
  background: #993f3f url(../../../assets/images/ploughuav.png);
}
.showContent{
  width:460px;
  height: 268px;
  position: absolute;
  background:url(../../../assets/images/part_bg.png);
}
.class3{
  left: 6px;
  top: 70px;
}
.class4{
  left: 6px;
  top: 350px;
}
.class5{
  left: 6px;
  top: 630px;
}
.class6{
  right: 6px;
  top: 70px;
}
.class7{
  right: 6px;
  top: 350px;
}
.class8{
  right: 6px;
  top: 630px;
}
.back{
  /* position: absolute;
  right: 132px;
  top: 7px; */
  float:right;
  width:36px;
  height:36px;
  background-color:black;
  border: 1px solid #303336;
  color: rgb(243 245 242);
  margin-left: 24px;
}
.back:hover{
  color: #fff;
  fill: #fff;
  background-size: cover;
  border-color: #aef;
  box-shadow: 0 0 8px #fff;
  text-align:center;
  border-radius: 5px;
}
.drag{
  position: absolute;
  left: 500px;
  top: 350px;
  min-width: 400px;
  min-height: 100px;
  max-width: 800px;
  max-height: 600px;
  background-color:black;
}
.moreInfoCss{
  position: absolute;
  left: 500px;
  top: 350px;
  /* min-width: 60px; */
  min-height: 50px;
  max-width: 800px;
  max-height: 600px;
  /* background-color:black; */
}
.infoCss{
  width: 100%;
  background-color:black;
  float:inline-end;
}
.close{
  width:10px;height:10px;background-color:#9bf7f7;float:right;margin-left: 80px;margin-top:5px;margin-right:5px;margin-bottom:5px;border-radius:5px;
}
.videoDiv{
  float: left;
}
.plate_title{
    margin-top: 5px;
    margin-bottom: 5px;
}
h3{
    margin-top: 3px;
    margin-bottom: 3px;
}
.tools{
  /* position: absolute;
  right: 50px;
  top: 7px; */
  /* background-color:#3280FC; */
  float:right;
  border: 1px solid #303336;
  color: rgb(243 245 242);
  width: 36px;
  height: 36px;
  /* text-align:center; */
  border-radius: 5px;
  margin-left: 24px;
}
.tools:hover{
  color: #fff;
  fill: #fff;
  background-size: cover;
  border-color: #aef;
  box-shadow: 0 0 8px #fff;
}
.layers{
  position: absolute;
  left: 558px;
  top: 35px;
  width: 90px;
  background-color:#fff;
  border: 1px solid #037ffa;
}

a {
  text-decoration: none;
  color: rgb(243 245 242);
}
.navigation{
  /* position: absolute;
  right: 92px;
  top: 7px; */
  float:right;
  background-color:#3280FC;
  border: 1px solid #303336;
  color: rgb(243 245 242);
  width: 36px;
  height: 36px;
  text-align:center;
  border-radius: 5px;
  margin-left: 24px;
}
.navigation:hover{
  color: #fff;
  fill: #fff;
  background-size: cover;
  border-color: #aef;
  box-shadow: 0 0 8px #fff;
}
/* .th{border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;} */
.table{border:solid #add9c0; border-width:1px 1px 1px 1px;background-color: rgb(138, 161, 161);}
.el-dropdown-menu {
  border:1px;
  color:#666;
  border-radius: 2px;
  padding: 0;
  /* margin: 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style:none;
}

.el-dropdown-menu__item:not(.is-disabled):hover{
  background-color:#e6f4fb;
  color:#666;
}
.activeMenu a{
  color: rgb(255 255 255);
}
</style>