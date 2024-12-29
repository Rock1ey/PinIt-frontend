<template>
  <div class="post-detail-container">
    <h2>帖子详情</h2>
    <div v-if="post">
      <p><strong>标题:</strong> {{ post.title }}</p>
      <p><strong>内容:</strong> {{ post.description }}</p>

      <!-- 图片轮播部分 -->
      <div v-if="post.imageUrls.length > 0" class="image-gallery">
        <div class="image-container">
          <!-- 当前图片 -->
          <img :src="post.imageUrls[currentImageIndex]" alt="帖子图片" class="post-image" />
        </div>

        <!-- 图片切换按钮 -->
        <div class="image-controls">
          <button @click="prevImage" :disabled="currentImageIndex === 0">上一张</button>
          <button @click="nextImage" :disabled="currentImageIndex === post.imageUrls.length - 1">下一张</button>
        </div>
      </div>

      <!-- 发布者信息 -->
      <div>
        <strong>发布者:</strong>
        <img :src="post.avatarUrl || '/logo.jpg'" alt="发布者头像" class="avatar" />
        <span>{{ post.username }}</span>
      </div>

      <!-- 收藏按钮 -->
      <button @click="toggleFavorite" :class="['favorite-button', isFavorite ? 'favorite' : '']">
        <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
        {{ isFavorite ? '已收藏' : '收藏' }}
      </button>
    </div>

    <!-- 返回按钮 -->
    <button @click="goHome">返回</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useState } from "#app";
import axios from 'axios';

const apiBase = useRuntimeConfig().public.apiBase
const post = ref(null);  // 使用 null 初始化帖子数据
const currentImageIndex = ref(0);  // 当前显示的图片索引
const isFavorite = ref(false); // 是否已收藏
const route = useRoute();
const router = useRouter();
const user = useState('user');

// 获取帖子详情的 API
const fetchPostDetails = async (id) => {
  try {
    const response = await axios.get(`${apiBase}/posts/${id}`);  // 根据 id 请求后端
    post.value = response.data;  // 获取返回的数据并赋值给 post
    await checkFavorite(post.value.id);  // 获取帖子详情后，检查是否已收藏
  } catch (error) {
    console.error('获取帖子详情失败:', error);
  }
};

// 检查是否已收藏该帖子
const checkFavorite = async (postId) => {
  try {
    const userId = user.value.id;
    const formData = new FormData();
    formData.append('userId', userId)
    formData.append('postId', postId);
    const response = await axios.post(`${apiBase}/favorites/check`, formData, {
      headers:{
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data)
    isFavorite.value = response.data;  // 根据返回值设置收藏状态
  } catch (error) {
    console.error('检查收藏状态失败:', error);
  }
};

// 切换到上一张图片
const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

// 切换到下一张图片
const nextImage = () => {
  if (currentImageIndex.value < post.value.imageUrls.length - 1) {
    currentImageIndex.value++;
  }
};

onMounted(() => {
  const postId = route.query.id;  // 从 URL 获取帖子 id
  if (postId) {
    fetchPostDetails(postId);  // 根据 id 获取帖子详情
  }
});

// 切换收藏状态
const toggleFavorite = async () => {
  const userId = user.value.id;
  const postId = post.value.id;
  const formData = new FormData();
  formData.append('userId', userId)
  formData.append('postId', postId);

  try {
    if (isFavorite.value) {
      // 如果已收藏，调用取消收藏的 API
      await axios.delete(`${apiBase}/favorites/remove`, {params: {userId,postId}});
      console.log('取消收藏');
      isFavorite.value = false;
    } else {
      // 如果未收藏，调用添加收藏的 API
      await axios.post(`${apiBase}/favorites/add`, formData, {
        headers:{
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('成功收藏');
      isFavorite.value = true;
    }
  } catch (error) {
    console.error('收藏操作失败:', error);
  }
};

// 返回到首页的函数
const goHome = () => {
  router.back(); // 返回到上一个页面
};
</script>

<style scoped>
/* 样式部分，根据需要调整 */
.post-detail-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

/* 收藏按钮 */
.favorite-button {
  margin-top: 20px;
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

/* 收藏状态下的按钮样式 */
.favorite-button.favorite {
  background-color: #e64a19;  /* 红色背景 */
}

.favorite-button i {
  margin-right: 10px;
}

.favorite-button:hover {
  background-color: #c1351d;
}


/* 图片轮播容器 */
.image-gallery {
  margin-top: 20px;
  text-align: center;
}

.image-container {
  display: inline-block;
  margin-bottom: 10px;
}

.post-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* 图片切换按钮 */
.image-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.image-controls button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.image-controls button:disabled {
  background-color: #cccccc;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 10px;
}
</style>
