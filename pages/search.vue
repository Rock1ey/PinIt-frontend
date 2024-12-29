<template>
  <div class="search-page">
    <TopNavBar />
    <div class="search-container">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜索地点或帖子"
          @input="handleSearch"
        >
        <i class="fas fa-search search-icon"></i>
      </div>

      <div class="search-results">
        <div v-for="item in searchResults" :key="item.id" class="result-item" @click="goToPostDetail(item.id)">
          <div class="item-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
<!--            <span class="location">{{ item.location }}</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNavBar from '../components/TopNavBar.vue';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const apiBase = useRuntimeConfig().public.apiBase
const searchQuery = ref('');
const searchResults = ref([]);
const router = useRouter();

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    try {
      // 发起搜索请求
      const response = await axios.get(`${apiBase}/posts/search?title=${searchQuery.value}`);
      searchResults.value = response.data; // 假设后端返回的是一个包含帖子信息的数组
    } catch (error) {
      console.error('搜索请求失败:', error);
    }
  } else {
    searchResults.value = []; // 如果搜索框为空，清空结果
  }
};

const goToPostDetail = (postId) => {
  // 跳转到帖子详情页面
  router.push({ name: 'post-detail', query: { id: postId } });
};
</script>

<style scoped>
.search-page {
  
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.search-container {
  background-image: url('../assets/background.png');
  flex: 1;
  padding: 20px;
}

.search-box {
  position: relative;
  margin-bottom: 20px;
}

.search-box input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.result-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.item-content h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.item-content p {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
}

.location {
  color: #999;
  font-size: 12px;
}
</style>