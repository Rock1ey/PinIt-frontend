<template>
  <div class="home-container">
    <TopNavBar />
    <div class="main-content">
      <div class="map-container">
        <!-- 这里后续会添加地图组件 -->
      </div>
      <div class="mark-button" @click="handleAddMark">
        <i class="fas fa-plus"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNavBar from '../components/TopNavBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleAddMark = () => {
  // 处理添加标记的逻辑
  console.log('添加标记');
};
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