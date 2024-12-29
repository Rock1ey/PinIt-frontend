<template>
  <div class="home-container">
    <TopNavBar />
    <div class="main-content">
      <div id="map" style="width: 100%; height: 90%;"></div> <!-- 地图容器 -->
      <div class="mark-button" @click="handleAddMark">
        <i class="fas fa-plus"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNavBar from '../components/TopNavBar.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useHead } from '#app';  // 用于动态添加 head 中的内容
import axios from "axios";

const apiBase = useRuntimeConfig().public.apiBase
const router = useRouter();
const ak = 'zt31YM0EGBHMVXXxvYNYqokODUDbyPVg';
const mapContainerId = 'map';

const posts = ref([]); // 使用 ref 来存储从 API 获取的帖子
let tempMarker = null;  // 用于存储临时的蓝色标记
let infoWindow = null;  // 用于存储提示框

// 获取帖子数据的函数
const fetchPosts = async () => {
  try {
    const response = await axios.get(`${apiBase}/posts`); // 替换成你的后端 API URL
    posts.value = response.data; // 将返回的数据存储到 posts 中
    console.log('posts加载完毕');
    addMarkersToMap();  // 获取完帖子后再添加标记
  } catch (error) {
    console.error("获取帖子数据失败:", error);
  }
};

// 提取出的添加标记函数
const addMarkersToMap = () => {
  const map = new BMap.Map(mapContainerId);  // 使用百度地图 API 初始化地图
  const point = new BMap.Point(121.215, 31.287);  // 设置地图中心点
  map.centerAndZoom(point, 15);  // 设置缩放级别
  map.enableScrollWheelZoom(true); // 启用滚轮缩放

  // 遍历所有帖子，添加标记到地图
  posts.value.forEach(post => {
    const postPoint = new BMap.Point(post.longitude, post.latitude);
    const marker = new BMap.Marker(postPoint); // 创建标记
    map.addOverlay(marker);

    // 创建一个标签显示帖子的标题
    const label = new BMap.Label(post.title, {
      offset: new BMap.Size(-10, -30) // 设置标签的位置，-20 为标签距离标记的垂直偏移量
    });

    // 设置标签样式（例如背景颜色、字体等）
    label.setStyle({
      color: "black",
      fontSize: "14px",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      padding: "5px",
      borderRadius: "3px",
      fontFamily: "Arial"
    });

    // 将标签添加到标记上
    marker.setLabel(label);

    // 给标记添加点击事件，点击标记进入帖子详情页
    marker.addEventListener('click', () => {
      router.push({ name: 'post-detail', query: { id: post.id } });
    });
  });

  // 监听右键点击事件
  map.addEventListener('rightclick', function(e) {
    const clickedPoint = e.point; // 获取点击的坐标
    console.log('右键点击的坐标:', clickedPoint);

    // 在点击的位置添加蓝色标记
    if (tempMarker) {
      map.removeOverlay(tempMarker);  // 如果已有标记，先移除
    }

    tempMarker = new BMap.Marker(clickedPoint);  // 使用蓝色标记
    map.addOverlay(tempMarker);

    // 创建提示框并设置内容
    if (infoWindow) {
      map.removeOverlay(infoWindow);  // 如果已有提示框，先移除
    }

    infoWindow = new BMap.InfoWindow('单击标记发布帖子', {
      width: 150,
      height: 50,
      title: "在此处...",
    });

    // 打开提示框
    tempMarker.openInfoWindow(infoWindow);

    // 给提示框添加点击事件
    tempMarker.addEventListener('click', () => {
      // 将坐标传递到发布帖子页面
      router.push({ name: 'create-post', query: { lat: clickedPoint.lat, lng: clickedPoint.lng } });
    });
  });
};

onMounted(() => {
  // 动态添加百度地图的脚本
  useHead({
    script: [
      {
        src: `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=initBaiduMap`,
        async: true,
        defer: true,
      },
    ],
  });

  fetchPosts(); // 获取所有帖子

  // 定义地图的初始化函数
  window.initBaiduMap = addMarkersToMap;  // 使用 addMarkersToMap 作为地图加载的回调函数
});
</script>

<style scoped>
.home-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  position: relative;
}

#map {
  height: 400px;
}

.map-container {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
}

.mark-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #42b983;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>