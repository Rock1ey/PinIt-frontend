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
        <div v-for="item in searchResults" :key="item.id" class="result-item">
          <div class="item-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <span class="location">{{ item.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNavBar from '../components/TopNavBar.vue';
import { ref } from 'vue';

const searchQuery = ref('');
const searchResults = ref([]);

const handleSearch = () => {
  // 搜索逻辑
  console.log('搜索:', searchQuery.value);
};
</script>

<style scoped>
.search-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.search-container {
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