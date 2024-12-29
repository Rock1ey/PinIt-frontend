<template>
  <div class="profile-page">
    <TopNavBar />
    <div class="profile-container">
      <div class="user-info">
        <div class="avatar">
          <img :src="userInfo.avatar" alt="用户头像">
          <!-- 将 input 标签放置在 img 标签下方 -->
          <input type="file" @change="handleAvatarUpload" accept="image/*" class="avatar-upload">
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

      <div v-if="isEditing" class="edit-form">
        <h3>编辑资料</h3>
        <form @submit.prevent="handleSaveChanges">
          <label for="username">用户名</label>
          <input type="text" v-model="userInfo.username" id="username" required />

          <label for="bio">简介</label>
          <textarea v-model="userInfo.bio" id="bio" required></textarea>

          <button type="submit">保存</button>
          <button type="button" @click="cancelEdit">取消</button>
        </form>
      </div>

      <div class="my-posts">
        <h3 >我发布的帖子</h3>
        <div v-for="postContents in userInfo.posts" :key="post.id" class="post-item">
          <h4>{{ postContents.title }}</h4>
          <p>{{ postContents.description }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TopNavBar from '../components/TopNavBar.vue';
import { useRouter } from 'vue-router';
import { useState } from "#app";
import axios from 'axios';

const apiBase = useRuntimeConfig().public.apiBase
const router = useRouter();
const user = useState('user');

const isEditing = ref(false);

const userInfo = ref({
  username: user.value.username,
  avatar: user.value?.avatar || '/logo.jpg', // 假设 logo.jpg 在 public 文件夹下
  bio: user.value?.bio || '这个人很懒，什么都没有写',
  postContents:[
    { id: 1, title: '示例帖子1', description: '这是第一个帖子的描述', location: '北京市', image: 'https://example.com/image1.jpg' },
    { id: 2, title: '示例帖子2', description: '这是第二个帖子的描述', location: '上海市', image: 'https://example.com/image2.jpg' }
  ],
  posts: 0,
  favorites: 0
});

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('id',user.value.id)
    formData.append('avatar', file);

    try {
      const response = await axios.post(`${apiBase}/user/upload-avatar`, formData,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });
      userInfo.value.avatar = response.data.avatar; // 更新用户头像URL
      alert('头像更新成功');
    } catch (error) {
      console.error('头像上传请求失败:', error);
      alert('头像上传失败');
    }
  }
};

const editProfile = () => {
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  // 恢复为用户当前资料
  userInfo.value.username = user.value.username;
  userInfo.value.bio = user.value.bio;
};

const handleSaveChanges = async () => {
  const updatedUser = {
    id: user.value.id,
    username: userInfo.value.username,
    bio: userInfo.value.bio,
  };

  try {
    const response = await axios.put(`${apiBase}/user/${user.value.id}`, updatedUser, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    userInfo.value = response.data; // 更新前端显示的用户信息
    user.value = response.data; // 更新全局用户信息
    alert('资料更新成功');
    isEditing.value = false; // 结束编辑
  } catch (error) {
    console.error('更新资料失败:', error);
    alert('资料更新失败');
  }
};

const logout = () => {
  // 清除用户信息
  user.value = null; // 将状态重置为 null
  // 跳转到登录页面
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
  background-image: url('../assets/background.png');
}

.user-info {
  text-align: center;
  margin-bottom: 30px;
}


.avatar {
  position: relative; /* 添加相对定位 */
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
.avatar-upload {
  position: absolute; /* 添加绝对定位 */
  bottom: 0;
  left: 50%;
  transform: translateX(-50%); /* 使 input 位于容器中央 */
  opacity: 0; /* 使 input 透明，点击时显示 */
  z-index: 1; /* 确保 input 在 img 之上 */
  cursor: pointer; /* 显示指针光标 */
  width: 100%; /* 使 input 填满整个容器 */
  height: 30px; /* 调整高度 */
  background-color: rgba(0, 0, 0, 0.5); /* 添加背景色 */
  color: rgb(0, 0, 0); /* 文字颜色 */
  border: none; /* 移除边框 */
  font-size: 12px; /* 调整字体大小 */
  line-height: 30px; /* 调整行高 */
  text-align: center; /* 文本居中 */
}
.avatar-upload:hover {
  opacity: 0.8; /* 鼠标悬停时改变透明度 */
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
.my-posts {
  margin-top: 20px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.post-item {
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  color:black;
}

.post-item p {
  margin: 5px 0;
}
</style>