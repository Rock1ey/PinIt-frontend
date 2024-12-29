<template>
  <div class="create-post-container">
    <h2>发布帖子</h2>
    <form @submit.prevent="handlePostSubmit">
      <label for="title">标题</label>
      <input v-model="postForm.title" id="title" type="text" required />

      <label for="description">描述</label>
      <textarea v-model="postForm.description" id="description" required></textarea>

      <label for="files">图片上传</label>
      <input type="file" id="files" @change="handleFileChange" multiple />

      <div v-if="postForm.files.length > 0">
        <h3>已选择的图片：</h3>
        <ul>
          <li v-for="(file, index) in postForm.files" :key="index">
            {{ file.name }} ({{ file.size }} bytes)
          </li>
        </ul>
      </div>

      <button type="submit">发布</button>
      <button type="button" @click="cancelPost">取消</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const apiBase = useRuntimeConfig().public.apiBase

const postForm = ref({
  title: '',
  description: '',
  latitude: null,
  longitude: null,
  files: [],
});

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const { lat, lng } = route.query;
  console.log('发布帖子页面的坐标:', lat, lng);
  postForm.value.latitude = lat;
  postForm.value.longitude = lng;
});

const handleFileChange = (event) => {
  const files = event.target.files; // 获取选择的文件
  postForm.value.files = [...postForm.value.files, ...files]; // 将新选择的文件追加到已有的文件列表中
};

const handlePostSubmit = async () => {
  const formData = new FormData();
  formData.append('title', postForm.value.title);
  formData.append('description', postForm.value.description);
  formData.append('userId', '1'); // 用户 ID 暂时设为 1
  formData.append('latitude', postForm.value.latitude);
  formData.append('longitude', postForm.value.longitude);

  // 遍历文件并添加到 FormData 中
  Array.from(postForm.value.files).forEach((file) => {
    formData.append('images', file); // 为每个文件使用相同的字段名
  });

  try {
    const response = await axios.post(`${apiBase}/posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    });
    alert('发布成功！');
    console.log('帖子发布成功:', response.data);
    router.push('/home');
  } catch (error) {
    console.error('发布帖子失败:', error);
    alert('帖子发布失败，请稍后再试！');
  }
};

const cancelPost = () => {
  router.push('/home');
};
</script>


<style scoped>
.create-post-container {
  padding: 20px;
}

.create-post-container h2 {
  margin-bottom: 20px;
}

.create-post-container label {
  display: block;
  margin-bottom: 5px;
}

.create-post-container input,
.create-post-container textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.create-post-container button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-post-container button:hover {
  background-color: #45a049;
}

.create-post-container button[type="button"] {
  background-color: #f44336;
}

.create-post-container button[type="button"]:hover {
  background-color: #d32f2f;
}
</style>
