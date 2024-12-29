<template>
  <div class="post-detail-container">
    <h2>帖子详情</h2>
    <p><strong>标题:</strong> {{ post.title }}</p>
    <p><strong>内容:</strong> {{ post.content }}</p>

    <!-- 返回主页按钮 -->
    <button @click="goHome">返回首页</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const post = ref({
  title: '',
  content: ''
});

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const { lat, lng } = route.query;
  console.log('帖子详情页面的坐标:', lat, lng);

  // 假设我们从后端获取帖子的详细信息
  post.value = {
    title: '帖子标题',
    content: '这是帖子的详细内容'
  };
});

// 返回到首页的函数
const goHome = () => {
  router.push('/home');
};
</script>
