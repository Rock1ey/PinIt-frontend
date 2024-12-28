<template>
  <div class="top-nav">
    <div class="nav-item" :class="{ active: currentTab === 'home' }" @click="switchTab('home')">
      <i class="fas fa-home"></i>
      <span>首页</span>
    </div>
    <div class="nav-item" :class="{ active: currentTab === 'search' }" @click="switchTab('search')">
      <i class="fas fa-search"></i>
      <span>搜索</span>
    </div>
    <div class="nav-item" :class="{ active: currentTab === 'favorites' }" @click="switchTab('favorites')">
      <i class="fas fa-heart"></i>
      <span>收藏</span>
    </div>
    <div class="nav-item" :class="{ active: currentTab === 'profile' }" @click="switchTab('profile')">
      <i class="fas fa-user"></i>
      <span>我的</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const currentTab = ref(route.name?.toLowerCase() || 'home');

const switchTab = (tab) => {
  currentTab.value = tab;
  switch (tab) {
    case 'home':
      router.push('/home');
      break;
    case 'search':
      router.push('/search');
      break;
    case 'favorites':
      router.push('/favorites');
      break;
    case 'profile':
      router.push('/profile');
      break;
    default:
      break;
  }
};
</script>

<style scoped>
.top-nav {
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-item {
  cursor: pointer;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-item i {
  font-size: 20px;
  margin-bottom: 4px;
}

.nav-item span {
  font-size: 12px;
}

.nav-item.active {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}
</style> 