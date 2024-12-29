<template>
  <div class="favorites-page">
    <TopNavBar />
    <div class="favorites-container">
      <div v-for="item in favorites" :key="item.id" class="favorite-item" @click="goToPostDetail(item.id)">
        <div class="item-image">
          <img v-if="item.imageUrls" :src="item.imageUrls[0]" :alt="item.title">
        </div>
        <div class="item-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="item-footer">
<!--            <span class="location">{{ item.location }}</span>-->
            <i class="fas fa-heart favorite-icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNavBar from '../components/TopNavBar.vue';
import { ref, onMounted } from 'vue';
import { useState } from "#app";
import { useRouter } from 'vue-router';
import axios from 'axios';

const apiBase = useRuntimeConfig().public.apiBase
const user = useState('user');
const router = useRouter();
const favorites = ref([]);  // 用于存储用户的收藏列表

// 获取用户收藏数据的函数
const fetchUserFavorites = async (userId) => {
  try {
    const response = await axios.get(`${apiBase}/favorites/user/${userId}`);
    favorites.value = response.data;  // 设置收藏数据
  } catch (error) {
    console.error('获取收藏失败:', error);
  }
};

// 页面加载时调用 API 获取数据
onMounted(() => {
  const userId = user.value.id;  // 获取当前用户的 ID，假设保存在 `user` 状态中
  if (userId) {
    fetchUserFavorites(userId);
  }
});

const goToPostDetail = (postId) => {
  // 跳转到帖子详情页面
  router.push({ name: 'post-detail', query: { id: postId } });
};

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