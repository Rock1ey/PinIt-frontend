<template>
  <div class="favorites-page">
    <TopNavBar />
    <div class="favorites-container">
      <div v-for="item in favorites" :key="item.id" class="favorite-item">
        <div class="item-image">
          <img :src="item.image" :alt="item.title">
        </div>
        <div class="item-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="item-footer">
            <span class="location">{{ item.location }}</span>
            <i class="fas fa-heart favorite-icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNavBar from '../components/TopNavBar.vue';
import { ref } from 'vue';

const favorites = ref([
  {
    id: 1,
    title: '示例收藏',
    description: '这是一个示例收藏的描述',
    location: '北京市朝阳区',
    image: 'https://example.com/image.jpg'
  }
]);
</script>

<style scoped>
.favorites-page {
  
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.favorites-container {
  background-image: url('../assets/background.png');
  flex: 1;
  padding: 20px;
}

.favorite-item {
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-content {
  padding: 15px;
}

.item-content h3 {
  margin: 0 0 8px 0;
}

.item-content p {
  margin: 0 0 12px 0;
  color: #666;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.location {
  color: #999;
  font-size: 14px;
}

.favorite-icon {
  color: #ff4444;
}
</style>