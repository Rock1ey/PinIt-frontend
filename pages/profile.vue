<template>
  <div class="profile-page">
    <TopNavBar />
    <div class="profile-container">
      <div class="user-info">
        <div class="avatar">
          <img :src="userInfo.avatar" alt="用户头像">
        </div>
        <h2>{{ userInfo.username }}</h2>
        <p>{{ userInfo.bio }}</p>
      </div>

      <div class="stats">
        <div class="stat-item">
          <span class="number">{{ userInfo.posts }}</span>
          <span class="label">发布</span>
        </div>
        <div class="stat-item">
          <span class="number">{{ userInfo.favorites }}</span>
          <span class="label">收藏</span>
        </div>
      </div>

      <div class="settings">
        <div class="setting-item" @click="editProfile">
          <i class="fas fa-user-edit"></i>
          <span>编辑资料</span>
        </div>
        <div class="setting-item" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
          <span>退出登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNavBar from '../components/TopNavBar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userInfo = ref({
  username: '用户名',
  avatar: 'https://example.com/avatar.jpg',
  bio: '这是个人简介',
  posts: 0,
  favorites: 0
});

const editProfile = () => {
  console.log('编辑资料');
};

const logout = () => {
  // 退出登录逻辑
  router.push('/login');
};
</script>

<style scoped>
.profile-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.profile-container {
  flex: 1;
  padding: 20px;
}

.user-info {
  text-align: center;
  margin-bottom: 30px;
}

.avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  padding: 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.stat-item {
  text-align: center;
}

.number {
  display: block;
  font-size: 20px;
  font-weight: bold;
}

.label {
  color: #666;
}

.settings {
  padding: 0 20px;
}

.setting-item {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.setting-item i {
  margin-right: 10px;
  color: #666;
}
</style>